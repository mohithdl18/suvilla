# SU VILLA by the Creek — Website & Booking System

**Handover documentation**
Website: https://www.suvilla.in
Property: SU VILLA by the Creek, Ballupet, Sakleshpur, Hassan District, Karnataka
Handover date: November 2026

This document explains what the website does, how to run the resort from the admin dashboard, how to change prices and content, and how the technical setup works. Part A is for the resort team. Part B is for whoever looks after the website technically.

---

## Contents

**Part A — For the resort team**
1. What the website does
2. Rooms, packages and prices
3. How a guest books
4. The admin dashboard
5. Everyday tasks
6. Payments, refunds and cancellations
7. Confirmation emails and invoices

**Part B — Technical guide**
8. Technology used
9. Accounts and services
10. Environment variables
11. Running the project locally
12. Deploying to Vercel
13. Going live with Razorpay
14. Project structure
15. Database collections
16. API routes
17. Security measures
18. Changing prices, content and photos
19. Maintenance checklist
20. Troubleshooting

---

# Part A — For the resort team

## 1. What the website does

The website has two parts.

**The public site**
| Page | Address | What it shows |
|---|---|---|
| Home | `/` | The main landing page |
| About | `/about` | The story of SU VILLA |
| Rooms | `/rooms` | The four rooms and what they offer |
| Gallery | `/gallery` | Photos of the property, click any photo to view it full-screen |
| Blogs | `/blogs` | Articles about the stay and the area |
| Book now | `/bookings` | Live availability, prices and online payment |
| Terms & Conditions | `/terms-and-conditions` | Booking, payment, cancellation and house rules |

**The booking and admin system**
- Guests choose dates, rooms (or a whole-villa package), extra guests and add-ons, enter their details and pay online through Razorpay.
- The booking is confirmed only after the payment is verified by our server.
- The guest receives a confirmation email with a PDF invoice.
- The resort team manages everything from the admin dashboard at `/admin`.

## 2. Rooms, packages and prices

### Rooms
| Room ID | Name | Guests included | Maximum guests |
|---|---|---|---|
| Room1 | Family Suite 01 | 2 | 4 |
| Room2 | Family Suite 02 | 2 | 4 |
| Room3 | Couple Suite | 2 | 3 |
| Room4 | Pond View Cottage | 2 | 3 |

Breakfast is included in the room price.

### Room prices (per room, per night)
| | Weekday (Mon–Thu nights) | Weekend (Fri, Sat, Sun nights) | Long weekend (set by admin) |
|---|---|---|---|
| Room | ₹12,999 | ₹13,999 | ₹14,999 |
| Extra adult | ₹4,000 | ₹4,500 | ₹5,000 |
| Extra child (6–12 yrs) | ₹2,000 | ₹2,500 | ₹3,000 |

- Children under 6 stay free.
- A "night" is named by the date the guest sleeps there. A Friday check-in is a weekend night.
- A **long weekend** is any night the admin switches on in the dashboard calendar. It replaces the weekday or weekend price for that night only.
- The room card shows a crossed-out reference price of ₹15,999 next to the real price. This is display only and never charged.

### Whole-villa packages (per night)
| Package | Rooms | Guests included | Maximum guests | Price |
|---|---|---|---|---|
| Full Villa | Room1, Room2, Room3, Room4 | 18 | 22 | ₹1,00,000 |
| Full Villa without Cottage | Room1, Room2, Room3 | 16 | 19 | ₹85,000 |

- A package can only be booked when **every** room in it is free for all the chosen nights. Otherwise it shows as sold out.
- Guests above the included number are charged the normal extra adult / child rate for that night.
- A package and individual rooms cannot be combined in one booking.

### Add-ons
| Add-on | Price |
|---|---|
| Lunch | ₹550 per person per night |
| Dinner | ₹650 per person per night |
| Lunch + Dinner | ₹1,100 per person per night |
| Driver accommodation | ₹1,500 per driver per night (up to 4 drivers) |

Meals default to the total number of guests, and the guest can change this.

### Taxes and fees
- **GST: 18%**, charged on (subtotal − discount).
- **Platform fee: 2%**, charged on (subtotal − discount).
- Discount codes are applied **before** tax and the platform fee.

## 3. How a guest books

1. **Choose dates** on `/bookings`. Available rooms and packages are shown with the live price for those exact nights (weekday, weekend and long-weekend rates applied automatically).
2. **Select a room or package.** The button shows "Adding…" while the room is reserved. The room is then **held for 10 minutes** so nobody else can take it while the guest completes the booking.
3. **Add extra guests** using the + / − buttons on the room card.
4. **Open the cart** (round button, bottom right). Review the selection.
5. **Add-ons**: meals and driver accommodation.
6. **Your details**: name, email, phone, address, city, PIN code, Aadhaar number, an optional **GST number** (for business invoices) and special requests.
7. **Checkout**: the full price breakdown. Guests can apply an offer code here. Public offers are shown under the offers icon above the cart.
8. **Pay with Razorpay** (UPI, cards, net banking, wallets).
9. **Booking confirmed**: the guest sees a confirmation page and receives an email with the PDF invoice.

**Booking IDs** run in order through the year: `SV-INV-2026-0001`, `SV-INV-2026-0002` and so on. The number is given only when a booking is confirmed, so failed or refunded payments never use one up and there are no gaps. The count starts again at 0001 on 1 January (India time). The same ID is used as the invoice number.

If a payment goes through but the room was taken in the meantime (very rare), the system refunds the guest automatically.

## 4. The admin dashboard

**Address:** https://www.suvilla.in/admin

### Logging in
- Use the admin username and password set in the website settings (see section 10). They are not stored in the database.
- You stay logged in for **24 hours**, then you are logged out automatically.
- After 5 wrong attempts, login is blocked for 15 minutes from that connection.
- Always use **Log out** on shared computers.

### What's on the dashboard
| Section | What it does |
|---|---|
| **Stats** | Total bookings, active (upcoming / in-house) bookings and total amount collected |
| **Calendar** | Pick any night to see the status of all 4 rooms. Also used to switch **long weekend** pricing on or off for that night |
| **Room cards** | For the selected night: **Booked** rooms open the booking details; **Available** rooms can be **blocked** (and blocked rooms unblocked) |
| **Offers** | Create and manage discount codes |
| **Bookings table** | All bookings, 30 per page: booking ID, guest name, rooms, payment status, check-in / check-out. Click a row for full details |
| **Download** | Excel file of all bookings from the last N days |

### Booking details window
Opened by clicking a row in the bookings table or a booked room card. It shows:
- Guest: name, email, phone, address, city, PIN code, Aadhaar (last 4 digits only), **GST number**, special request
- Stay: dates, nights, rooms or package, guests
- Price breakdown, offer code used, payment ID and payment status
- Confirmation email status, with a button to **resend** it
- **Invoice** button (printable invoice)
- **Cancel booking** button (needs the cancel PIN)

## 5. Everyday tasks

### Block a room (maintenance, offline booking, owner's use)
1. Open `/admin` and pick the night in the calendar.
2. On the available room's card, click **Block room**.
3. The room can no longer be booked online for that night. Click **Unblock room** to release it.
Past dates cannot be blocked.

### Set a long weekend
1. Pick the night in the admin calendar.
2. Click **Enable long weekend**.
3. That night is now priced at ₹14,999 per room, ₹5,000 per extra adult and ₹3,000 per child. The booking page updates straight away.
4. Click **Disable long weekend** to go back to normal pricing.
Set it **night by night**. For a Friday–Sunday holiday, enable Friday, Saturday and Sunday nights separately.

### Create an offer code
1. Click **Offers** on the dashboard.
2. Enter the **code** (e.g. WINTER15), the **discount %** (1–99) and **valid for (days, from today)**.
3. Choose **Public** (shown to every guest under the offers icon) or **Private** (only works if you share the code).
4. Publish. The window lists only **active** offers. Click **Turn off**, then **Yes**, to end one early.

Turned-off and expired offers are deleted and no longer listed. Bookings that used a code keep it, with their discount, in their own record, and the admin audit log keeps a note of every offer published or turned off.
For private offers, use codes that are hard to guess, e.g. `SUV-K7Q2-FAMILY`.

### Cancel a booking
1. Open the booking details and click **Cancel booking**.
2. Enter the **cancel PIN**.
3. The booking is marked cancelled and its rooms become available again.
**Cancelling does not refund the money automatically.** Any refund must be issued in the Razorpay dashboard (see section 6), following the cancellation policy.

### Resend a confirmation email
Open the booking details and click **Resend email**.

### Download bookings for accounts
1. In the dashboard, choose **Bookings from last** (number of days).
2. Click download. You get an Excel file with:
   - **Sheet 1 – Bookings:** one row per booking, with the price breakdown, tax, platform fee, payment ID, the guest's GSTIN and a clickable **invoice link**.
   - **Sheet 2 – Line items:** every room, package and add-on line.
Cancelled bookings are shown in red and left out of the totals.

## 6. Payments, refunds and cancellations

- All payments go through **Razorpay** to the resort's bank account. Razorpay deducts its fee and settles the rest on the settlement schedule shown in your Razorpay dashboard.
- The price is calculated **on the server**, never in the guest's browser, so the amount cannot be changed by the guest.
- A booking is confirmed only after Razorpay's payment signature is verified. A Razorpay **webhook** confirms it again in the background, so bookings are confirmed even if the guest closes the window right after paying.

**Payment status in the dashboard**
| Status | Meaning |
|---|---|
| Paid | Payment captured, booking confirmed |
| Refund pending | A refund has started in Razorpay |
| Refunded | The refund is complete |

**Cancellation policy** (as published in the Terms & Conditions)
- Cancelled **more than 7 days** before arrival: full refund.
- Cancelled **less than 7 days** before arrival: no refund.
- Refunds can take up to **15 bank working days** to reach the guest.

**How to refund**
1. Log in to the Razorpay dashboard (https://dashboard.razorpay.com) in **Live mode**.
2. Go to **Payments** and search for the payment ID shown in the booking details.
3. Click **Refund**, choose full or partial, and confirm.
4. Cancel the booking in `/admin` with the cancel PIN so the rooms are released.

**Automatic refunds:** if two guests pay for the same room at the same moment, only the first booking is confirmed and the second payment is refunded automatically.

## 7. Confirmation emails and invoices

- Every confirmed booking gets a thank-you email with the stay details and a **PDF invoice** attached.
- Emails are sent through **Resend** from `bookings@mail.suvilla.in` (the domain `mail.suvilla.in` is verified in Resend).
- Each booking is emailed only once automatically. Use **Resend email** in the dashboard to send it again.
- If `EMAIL_BCC` is set, a copy of every confirmation is sent to the resort.
- Invoices show the guest's GSTIN when they entered one.
- SU VILLA's GSTIN **29ASZPS8413J3ZL** is printed at checkout (under the 18% tax line), on every invoice (PDF and printable) and in confirmation emails. It is set in `src/config/business.js`, together with the address and phone number used on invoices.

---

# Part B — Technical guide

## 8. Technology used

| Part | Technology |
|---|---|
| Framework | Next.js 16.4 (App Router, Turbopack), React 19 |
| Styling | Tailwind CSS 4, Framer Motion, Lucide icons |
| Database | MongoDB (Atlas), official `mongodb` driver |
| Payments | Razorpay (Orders API, Checkout, Webhooks) |
| Email | Resend |
| Invoices | PDFKit (PDF), write-excel-file (Excel export) |
| Hosting | Vercel |
| Node.js | 20 or newer (built and tested on 22) |

## 9. Accounts and services

The client should own every account below, with two-factor authentication switched on.

| Service | Used for | Where |
|---|---|---|
| Vercel | Hosting, deployments, environment variables | https://vercel.com |
| GitHub | Source code | the project repository |
| MongoDB Atlas | Database | https://cloud.mongodb.com |
| Razorpay | Payments and refunds | https://dashboard.razorpay.com |
| Resend | Confirmation emails | https://resend.com |
| Domain registrar / DNS | suvilla.in, mail.suvilla.in records | your domain provider |

At handover, change any password that was shared during development. That includes regenerating the Razorpay key secret, Resend API key and MongoDB database user password, and setting a new admin password and cancel PIN.

## 10. Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (Production). For local development, put them in a `.env.local` file in the project root. **Never commit `.env.local` to GitHub.**

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `MONGODB_DB` | No | Database name (default `suvilla_bookings`) |
| `RAZORPAY_KEY_ID` | Yes | Razorpay key ID (`rzp_live_…` in production, `rzp_test_…` locally) |
| `RAZORPAY_KEY_SECRET` | Yes | Razorpay key secret |
| `RAZORPAY_WEBHOOK_SECRET` | Yes | Secret entered when creating the Razorpay webhook |
| `APP_ORIGIN` | Yes | Site address: `https://www.suvilla.in` in production, `http://localhost:3000` locally |
| `ADMIN_USERNAME` | Yes | Admin login username |
| `ADMIN_PASSWORD` | Yes | Admin login password, **at least 10 characters** |
| `ADMIN_CANCEL_PIN` | Yes | PIN for cancelling bookings, **4–8 digits** |
| `RESEND_API_KEY` | Yes | Resend API key (emails are off without it) |
| `EMAIL_FROM` | Yes | e.g. `SU VILLA <bookings@mail.suvilla.in>` |
| `EMAIL_REPLY_TO` | No | Where guest replies go, e.g. the resort's inbox |
| `EMAIL_BCC` | No | Receive a copy of every confirmation |
| `CRON_SECRET` | No | Protects the hold-cleanup endpoint for a scheduled job |
| `HEALTHCHECK_SECRET` | No | Protects `/api/test-db` in production |
| `AUTO_REFUND_ON_CONFLICT` | No | Set to `false` to stop automatic refunds on double bookings (they are then flagged for manual refund) |

**`.env.local` template**
```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/
MONGODB_DB=suvilla_bookings

RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxx

APP_ORIGIN=http://localhost:3000

ADMIN_USERNAME=suvilla-admin
ADMIN_PASSWORD=change-me-to-a-long-password
ADMIN_CANCEL_PIN=482915

RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=SU VILLA <bookings@mail.suvilla.in>
EMAIL_REPLY_TO=
EMAIL_BCC=

CRON_SECRET=
HEALTHCHECK_SECRET=
```
After changing any variable in Vercel, **redeploy**. Variables only take effect on a new deployment.

## 11. Running the project locally

```bash
git clone <repository-url>
cd resort
npm install
# create .env.local (see section 10) with TEST Razorpay keys
npm run dev
```
Open http://localhost:3000. The admin is at http://localhost:3000/admin.

Other commands:
| Command | Does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (run before pushing to catch errors) |
| `npm start` | Run the production build locally |
| `npm run lint` | Lint the code |

Database collections and indexes are created automatically the first time the site connects. No manual setup is needed.

**Windows note:** Windows ignores letter case in folder names, but Vercel (Linux) does not. The API folder is `src/app/(operations)/api/Bookings` with a **capital B**, and it must stay that way. To rename a folder only by case in Git, do it in two steps:
`git mv Bookings tmp && git mv tmp Bookings`.

## 12. Deploying to Vercel

1. Push to the main branch on GitHub. Vercel builds and deploys automatically.
2. Set all environment variables (section 10) for **Production**.
3. Domain: `suvilla.in` and `www.suvilla.in` point to the Vercel project. `APP_ORIGIN` must exactly match the address guests use (`https://www.suvilla.in`).
4. After deploying, check: home page, `/bookings` shows availability, `/admin` login works.

## 13. Going live with Razorpay

1. In Razorpay, complete KYC and bank verification so the account shows **Activated**.
2. Add `https://www.suvilla.in` under Account & Settings → Website and app settings.
3. Switch the dashboard to **Live mode** → Account & Settings → API Keys → **Generate Key**. Save the secret immediately; it is shown only once.
4. Live mode → Account & Settings → Webhooks → **Add New Webhook**:
   - URL: `https://www.suvilla.in/api/payments/webhook`
   - Secret: a long random string (this becomes `RAZORPAY_WEBHOOK_SECRET`)
   - Events: `payment.authorized`, `payment.captured`, `payment.failed`, `order.paid`, `refund.processed`, `refund.failed`
5. Account & Settings → Payment Capture → **Automatic**.
6. In Vercel (Production), set `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` to the **live** values and redeploy.
7. Keep **test** keys in `.env.local` so local testing never charges real money.
8. Make one small real booking (e.g. with a 90% private offer code), check it in `/admin`, the email and Razorpay, then refund it and cancel it.

Test and live mode have **separate** keys and **separate** webhooks.

## 14. Project structure

```
src/
├─ app/
│  ├─ (experience)/          Public pages: home, about, rooms, gallery, blogs
│  │  └─ gallery/            Gallery page (reads public/images/gallery automatically)
│  └─ (operations)/
│     ├─ bookings/           Booking page
│     ├─ admin/              Admin dashboard, login, printable invoice
│     ├─ terms-and-conditions/  Terms, cancellation policy, house rules
│     └─ api/                Server routes (see section 16)
├─ components/
│  ├─ Bookings/              RoomsCard, PackagesCard, Cart, Addons, Details,
│  │                         Checkout, Confirmation, Modal
│  ├─ Admin/                 Dashboard, calendar, room grid, bookings table,
│  │                         offers, invoice export, booking details
│  └─ Footer/ …              Shared site components
├─ config/
│  ├─ pricing.js             THE price list (rooms, extras, meals, packages, tax)
│  ├─ business.js            Name, address, phone, GSTIN printed on invoices
│  └─ invoiceLines.js        Invoice line wording
├─ data/rooms.json           Room names, descriptions, amenities, photos
├─ lib/                      Server logic: pricing, payments, bookings, email,
│                            invoices, admin auth, validation, security
└─ logic/                    Client-side state and hooks
public/images/               All photos (rooms, gallery, site)
scripts/promo-codes.mjs      Command-line tool for offer codes
next.config.mjs              Security headers, server packages
```

## 15. Database collections

Database: `suvilla_bookings` (or the value of `MONGODB_DB`).

| Collection | Holds |
|---|---|
| `bookings_data` | Confirmed bookings: guest details (`personal_info`, incl. `gst_number`), rooms, dates, price breakdown, payment and email status |
| `room_nights` | One entry per booked room per night. A unique index makes double booking impossible |
| `room_availabilty` | Rooms blocked by the admin (the spelling is intentional; do not rename) |
| `temp_books` | 10-minute holds while a guest is booking (auto-deleted) |
| `payment_orders` | Every Razorpay order with its server-calculated amount, status and refunds. Before payment an order has an internal reference (`ORD-…`, also shown as the Razorpay receipt); once confirmed it is linked to the booking ID |
| `promo_codes` | Active offer codes (code, %, public/private, validity, usage count). Expired and turned-off codes are deleted |
| `long_weekends` | Nights marked as long weekend by the admin |
| `counters` | The running booking number for each year (`booking-2026` → last number used). **Do not edit or delete**, or numbers may repeat |
| `admin_sessions` | Admin login sessions (expire after 24 h) |
| `admin_audit` | Log of admin actions: logins and failed logins, viewing and cancelling bookings, wrong cancel PINs, blocking rooms, offers, long weekends, email resends and Excel downloads |
| `rate_limits` | Short-lived counters that block abuse (auto-deleted) |
| `webhook_events` | Processed Razorpay webhook IDs, to avoid processing twice (kept 30 days) |

Aadhaar numbers are stored and shown masked (last 4 digits only).

**Backups:** enable scheduled backups in MongoDB Atlas, or at least export `bookings_data` and `payment_orders` regularly. The Excel download in the admin is also a useful monthly record.

## 16. API routes

All routes are in `src/app/(operations)/api/`.

**Public**
| Route | Purpose |
|---|---|
| `GET /api/availability` | Available rooms for dates |
| `POST /api/Bookings/TempBooks` | Create / release the 10-minute room holds |
| `GET /api/pricing/long-weekends` | Long-weekend nights for a date range |
| `GET /api/offers` | Public offer codes |
| `POST /api/promo/validate` | Check an offer code |
| `POST /api/payments/create-order` | Calculate the price on the server and create the Razorpay order |
| `POST /api/payments/verify` | Verify the payment signature and confirm the booking |
| `POST /api/payments/webhook` | Razorpay webhook (signature checked) |

**Admin (need an admin login)**
`/api/admin/login`, `logout`, `session`, `stats`, `bookings`, `bookings/[id]`, `bookings/[id]/cancel`, `bookings/[id]/email`, `rooms`, `rooms/block`, `long-weekends`, `offers`, `invoices` (Excel).

**Maintenance**
- `GET /api/Bookings/TempBooks` with `Authorization: Bearer <CRON_SECRET>` cleans expired holds. This is optional because holds are also cleaned on every booking request and by a database TTL index.
- `GET /api/test-db` with `Authorization: Bearer <HEALTHCHECK_SECRET>` is a database health check (open only in development otherwise).

## 17. Security measures

- **Prices are server-side only.** The server recalculates every booking from `src/config/pricing.js` and the database, then compares it with what the guest saw. Changed amounts are rejected.
- **Payments:** Razorpay signatures are verified with HMAC for checkout and for the webhook (raw body). Each order can be used once, and payments are captured only for the exact expected amount.
- **No double bookings:** a unique index on room + night, plus automatic refund if a conflict ever happens.
- **Room holds** are tied to an HttpOnly session cookie, limited per visitor, and expire after 10 minutes.
- **Admin:** credentials only in environment variables, constant-time comparison, HttpOnly + SameSite=Strict session cookie, 24-hour expiry, login rate limit, cancel PIN, audit log.
- **Requests** from other websites are blocked (origin check against `APP_ORIGIN`). Rate limits apply on booking, promo and payment routes.
- **Headers:** Content-Security-Policy (allows Razorpay only), HSTS, X-Frame-Options DENY, no source maps in production.
- **Input validation** on every field (including GSTIN format), and Aadhaar masked.

## 18. Changing prices, content and photos

| To change | Edit | Then |
|---|---|---|
| Room, extra guest, meal, driver prices, tax, platform fee | `src/config/pricing.js` → `PRICES` | Redeploy |
| Packages (rooms, guests, price) | `src/config/pricing.js` → `PACKAGES` | Redeploy |
| Long-weekend nights | Admin dashboard calendar | Instant |
| Offer codes | Admin dashboard → Offers | Instant |
| Room names, descriptions, amenities, photos | `src/data/rooms.json` (photos in `public/images/rooms/`) | Redeploy |
| Crossed-out ₹15,999 reference price | `src/components/Bookings/RoomsCard.jsx` (search `15999`) | Redeploy |
| Resort name, address, phone, GSTIN on invoices | `src/config/business.js` | Redeploy |
| Terms, cancellation policy, house rules | `src/app/(operations)/terms-and-conditions/page.js` | Redeploy |
| Gallery photos | Add files to `public/images/gallery/` named `gallery-16.jpg`, `gallery-17.jpg` … (shown in number order). Optional captions in `src/app/(experience)/gallery/page.js` → `captions` | Redeploy |

Photo tips: resize to about 1800 px on the longest side and save as JPG (aim for under 500 KB) so pages load fast on mobile.

When prices change, also update the Rooms page text and the Terms page if they mention amounts.

## 19. Maintenance checklist

**Daily / weekly (resort team)**
- Check new bookings in `/admin`.
- Block rooms for offline bookings and maintenance.
- Switch on long weekends ahead of holidays.

**Monthly**
- Download the bookings Excel for accounts.
- Compare Razorpay settlements with the bookings total.
- Check Razorpay → Webhooks shows successful deliveries.
- Review the active offer codes and turn off any that are no longer needed.

**Every few months (technical)**
- `npm audit` and update Next.js / dependencies, then `npm run build` and test a booking in test mode.
- Check MongoDB Atlas backups and storage.
- Rotate the admin password and cancel PIN when staff change.

## 20. Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| "Cross-site request blocked" | `APP_ORIGIN` does not match the address in the browser. Use `https://www.suvilla.in` in production and `http://localhost:3000` locally, then redeploy |
| Admin page says the admin is not configured (503) | `ADMIN_USERNAME`, `ADMIN_PASSWORD` (10+ chars) or `ADMIN_CANCEL_PIN` (4–8 digits) missing or invalid |
| Login blocked | 5 wrong attempts. Wait 15 minutes |
| Guest paid but booking not in admin | Search Razorpay → Payments by payment ID or the `ORD-…` receipt, and check Webhooks. Confirm `RAZORPAY_WEBHOOK_SECRET` matches the live webhook. Payments that could not be confirmed are refunded automatically |
| "Too many requests" from Razorpay | Razorpay's own rate limit, usually in test mode. Wait a few minutes |
| No confirmation emails | `RESEND_API_KEY` / `EMAIL_FROM` missing, or the domain is not verified in Resend. Use **Resend email** after fixing |
| Long-weekend price not showing | Make sure the specific **night** is enabled (not just the check-out day). Refresh the booking page |
| Room shows sold out unexpectedly | It is booked, blocked by admin, or on a 10-minute hold by another guest |
| Vercel build fails with "module not found" | A folder name differs only in letter case (e.g. `Bookings`). See the Windows note in section 11 |
| Payments show success but money never arrives | Test keys are still in production. Switch to live keys (section 13) |

---

**Handover summary**
- Live site: https://www.suvilla.in · Admin: https://www.suvilla.in/admin
- Prices: `src/config/pricing.js` · Business details / GSTIN: `src/config/business.js`
- Secrets: Vercel environment variables only
- Resort GSTIN: 29ASZPS8413J3ZL (set in `src/config/business.js`)
- Before go-live: rotate all secrets, switch Razorpay to live, run one real test booking.
