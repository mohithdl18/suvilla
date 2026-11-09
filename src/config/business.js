/** Details printed on invoices, emails and at checkout. */
export const BUSINESS = Object.freeze({
  name: "SU VILLA by the Creek", // full name used in emails and text
  brand: "SU VILLA", // large heading on invoices
  tagline: "by the Creek", // small line under the heading
  addressLines: [
    "# 293, Old B-M Road, Near Dewan's Estate,",
    "Old Bage Village, Sakaleshpura tq., Hassan dist.,",
    "Karnataka State, INDIA. Pin.573214",
  ],
  phone: "+91 9976-1-24-365",
  website: "suvilla.in",
  email: "info@suvilla.in",
  gstin: "29ASZPS8413J3ZL", // printed at checkout, on invoices and in confirmation emails
  logo: "/images/invoice-logo.png", // small copy of the emblem for invoices
});
