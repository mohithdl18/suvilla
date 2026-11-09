import "server-only";

/**
 * Personal-data retention (see /privacy-policy).
 *
 * 6 months after a guest's check-out date, their personal details are removed
 * from the booking: email, phone number, Aadhaar (last 4 digits), special
 * requests and the email address the confirmation went to. The postal
 * address and PIN code are removed too, unless the guest gave a GST number.
 *
 * Kept, because GST law requires tax invoices to be kept for several years:
 * the guest's name, city, GST number (and billing address when a GST number
 * was given), the stay dates, rooms and amounts.
 *
 * Runs at most every 12 hours, triggered from the admin dashboard and from
 * new bookings, so no separate scheduled job is needed.
 */
export const RETENTION_MONTHS = 6;
const RUN_EVERY_MS = 12 * 60 * 60 * 1000;

function istDate(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** "YYYY-MM-DD" date (India time) that is RETENTION_MONTHS before `now`. */
export function retentionCutoff(now = new Date()) {
  const [y, m, d] = istDate(now).split("-").map(Number);
  const cutoff = new Date(Date.UTC(y, m - 1 - RETENTION_MONTHS, d));
  // e.g. 31 Aug − 6 months → 28/29 Feb, not 3 Mar.
  if (cutoff.getUTCDate() !== d) cutoff.setUTCDate(0);
  return cutoff.toISOString().slice(0, 10);
}

/** Claim the 12-hour run slot; false if another run happened recently. */
async function claimRun(db, now) {
  try {
    await db.collection("counters").findOneAndUpdate(
      {
        _id: "privacy-cleanup",
        $or: [{ last_run: { $exists: false } }, { last_run: { $lt: new Date(now.getTime() - RUN_EVERY_MS) } }],
      },
      { $set: { last_run: now } },
      { upsert: true }
    );
    return true;
  } catch (error) {
    if (error?.code === 11000) return false; // ran recently
    throw error;
  }
}

export async function removeExpiredPersonalData(db, { force = false } = {}) {
  const now = new Date();
  if (!force && !(await claimRun(db, now))) return { skipped: true };

  const cutoff = retentionCutoff(now);
  const bookings = db.collection("bookings_data");
  const due = { check_out: { $lt: cutoff }, personal_data_removed_at: { $exists: false } };

  // Billing address only matters on a GST (business) invoice.
  await bookings.updateMany(
    { ...due, $or: [{ "personal_info.gst_number": { $exists: false } }, { "personal_info.gst_number": { $in: ["", null] } }] },
    { $set: { "personal_info.address": "", "personal_info.pin_code": "" } }
  );

  await bookings.updateMany(
    { ...due, "email.to": { $exists: true } },
    { $set: { "email.to": "" } }
  );

  const result = await bookings.updateMany(due, {
    $set: {
      "personal_info.email": "",
      "personal_info.phone_number": "",
      "personal_info.aadhar_number": "",
      "personal_info.special_request": "",
      personal_data_removed_at: now,
    },
  });

  // Payment orders keep a copy of the details only until the booking is made.
  const ordersCutoff = new Date(`${cutoff}T00:00:00+05:30`);
  const orders = await db.collection("payment_orders").updateMany(
    { createdAt: { $lt: ordersCutoff }, customer: { $exists: true } },
    { $unset: { customer: "" } }
  );

  if (result.modifiedCount || orders.modifiedCount) {
    console.info("[privacy] Removed personal data", {
      bookings: result.modifiedCount,
      paymentOrders: orders.modifiedCount,
      checkOutBefore: cutoff,
    });
  }
  return { bookings: result.modifiedCount, paymentOrders: orders.modifiedCount, cutoff };
}

/** Never let the clean-up break the request that triggered it. */
export async function removeExpiredPersonalDataSafely(db) {
  try {
    return await removeExpiredPersonalData(db);
  } catch (error) {
    console.error("[privacy] Personal data clean-up failed:", error);
    return { error: true };
  }
}
