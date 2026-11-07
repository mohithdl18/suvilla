<div align="center">

# SU VILLA by the Creek

**Boutique stays in the hills of Sakleshpur — with a booking system built in.**

[www.suvilla.in](https://www.suvilla.in) · Ballupet, Sakleshpur, Karnataka

![Next.js](https://img.shields.io/badge/Next.js-16.4-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Razorpay](https://img.shields.io/badge/Payments-Razorpay-0C2451?logo=razorpay&logoColor=white)
![Vercel](https://img.shields.io/badge/Hosted_on-Vercel-000000?logo=vercel&logoColor=white)

</div>

---

## About

SU VILLA by the Creek is a private villa resort beside a creek and pond in Sakleshpur, with four rooms, a pool, gardens and open-air spaces set among coffee and forest. This repository is the resort's website and its complete direct-booking system: guests check live availability, pick rooms or the whole villa, add meals, and pay online. The team runs everything from a private admin dashboard.

## Highlights

| For guests | For the resort team |
|---|---|
| Live availability and prices for the exact dates | Admin dashboard with stats, calendar and room status |
| Four rooms or whole-villa packages | Block rooms for offline bookings or maintenance |
| Weekday, weekend and long-weekend pricing | One-click long-weekend pricing per night |
| Extra guests, meals and driver stay add-ons | Public and private offer codes |
| Offer codes, optional GST number for invoices | Booking details, invoices, PIN-protected cancellations |
| Secure Razorpay payment (UPI, cards, net banking) | Excel export of bookings with invoice links |
| Instant confirmation email with PDF invoice | Resend confirmation emails anytime |
| Photo gallery, rooms, stories and terms | Every admin action logged |

**Secure by design:** prices are calculated only on the server, payments are verified with Razorpay signatures and webhooks, and a database lock makes double bookings impossible.

## Tech stack

**Next.js 16** (App Router) · **React 19** · **Tailwind CSS 4** · **MongoDB** · **Razorpay** · **Resend** · **PDFKit** · **Vercel**

## Quick start

```bash
npm install
# create .env.local with your keys — template in documentation.md, section 10
npm run dev
```

- Website: http://localhost:3000
- Booking page: http://localhost:3000/bookings
- Admin: http://localhost:3000/admin

Use **Razorpay test keys** locally. Live keys belong only in Vercel's production environment variables.

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | Lint the code |

## Where things live

| What | Where |
|---|---|
| Prices, packages, tax | `src/config/pricing.js` |
| Resort name, address, GSTIN on invoices | `src/config/business.js` |
| Room details and photos | `src/data/rooms.json`, `public/images/rooms/` |
| Gallery photos | `public/images/gallery/` (picked up automatically) |
| Public pages | `src/app/(experience)/` |
| Booking page, admin, terms, API | `src/app/(operations)/` |

## Documentation

The full handover guide covers the admin dashboard, everyday tasks, payments and refunds, environment variables, deployment, going live with Razorpay, the database, security and troubleshooting:

- [`documentation.md`](./documentation.md)
- [`documentation.txt`](./documentation.txt) (same content, plain text)

---

<div align="center">

© SU VILLA by the Creek · Designed and developed by Creo Creators

</div>
