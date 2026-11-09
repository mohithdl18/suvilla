import { BUSINESS } from "@/config/business";

export const metadata = {
  title: "Privacy Policy | SU VILLA",
  description:
    "What personal data SU VILLA collects when you book, why we collect it, how we use it, who can see it, and when it is deleted.",
};

const LAST_UPDATED = "9 November 2026";

// Each section: paragraphs (strings) and/or a bullet list.
const sections = [
  {
    title: "1. Who we are",
    content: [
      `This website (www.suvilla.in) and its booking service are run by ${BUSINESS.name}, ${BUSINESS.addressLines.join(" ")} This policy explains what personal data we collect when you book with us, why we collect it, how we use it, who can see it, and when it is deleted.`,
      "By ticking the Privacy Policy box in Your Details and completing a booking, you agree to your data being used as described here.",
    ],
  },
  {
    title: "2. What data we collect",
    content: ["When you make a booking, we collect:"],
    list: [
      "Your details: name, email address, phone number, postal address, city and PIN code.",
      "Your Aadhaar number, for guest identification. Only the last 4 digits are stored. The full number is never saved.",
      "Your GST number, only if you choose to enter one for a business invoice.",
      "Any special requests you write to us.",
      "Your stay: check-in and check-out dates, rooms or package, number of guests, meals and other add-ons, and any offer code used.",
      "Payment details: the amount paid, the payment reference and its status. Card, UPI and bank details are entered on Razorpay's secure page and are never seen or stored by SU VILLA.",
      "The date and time you accepted this Privacy Policy and our Terms and Conditions.",
      "Technical data: a temporary cookie that keeps your selected rooms reserved while you book, and your IP address, used only for a short time to protect the site against misuse.",
    ],
  },
  {
    title: "3. Why we collect it",
    list: [
      "To confirm and manage your reservation and prepare for your stay.",
      "To contact you about your booking, for example confirmations, changes or check-in arrangements.",
      "To issue your tax invoice and meet our legal and accounting obligations, including GST.",
      "To verify guest identity at check-in.",
      "To process payments, cancellations and refunds.",
      "To keep the booking system secure and prevent fraudulent bookings.",
    ],
  },
  {
    title: "4. How we use it",
    list: [
      "Your details are used only for your booking and stay at SU VILLA.",
      "We send you a booking confirmation email with your invoice. We do not send marketing emails or newsletters using these details.",
      "Your information is viewed only by authorised SU VILLA staff through a password-protected admin system.",
      "We never sell, rent or trade your personal data.",
    ],
  },
  {
    title: "5. Who we share it with",
    content: [
      "Your personal data is not shared with anyone outside the SU VILLA team.",
      "To run the booking service, we use a few trusted service providers. They handle data only on our behalf and only for the purpose below. They may not use it for anything else:",
    ],
    list: [
      "Razorpay: to process your payment securely.",
      "Resend: to deliver your booking confirmation email.",
      "Vercel and MongoDB Atlas: to host the website and store booking records securely.",
    ],
    after: [
      "We may also disclose information if required by law, for example to tax authorities or in response to a lawful request from government or police authorities.",
    ],
  },
  {
    title: "6. When your data is deleted",
    list: [
      "6 months after your check-out date, your personal contact details are permanently deleted from our booking system automatically. This includes your email address, phone number, postal address, Aadhaar digits and special requests.",
      "We keep only what the law requires on a tax invoice: your name, city, the booking dates, rooms, amounts paid and, if you provided one, your GST number and billing address. Indian GST law requires businesses to keep tax invoices for several years.",
      "If a booking is started but never paid, the details entered are deleted within 6 months.",
      "Temporary room holds and security records (such as IP addresses) are deleted automatically within hours.",
      "Razorpay keeps its own record of the payment transaction, as required of payment providers by law.",
    ],
  },
  {
    title: "7. How we protect your data",
    list: [
      "All data is sent over a secure, encrypted (HTTPS) connection.",
      "Booking records are stored in a secured database that only SU VILLA's booking system and authorised staff can access.",
      "The admin system is password protected, and actions such as cancellations need a separate PIN.",
      "We store only the last 4 digits of your Aadhaar number.",
    ],
  },
  {
    title: "8. Your choices",
    content: [
      `You can ask us to see, correct or delete your personal data at any time by emailing ${BUSINESS.email} or calling ${BUSINESS.phone}. We will respond within a reasonable time. We may need to keep the invoice details described above where the law requires it.`,
      "Entering a GST number is optional. All other details in the booking form are needed to complete a reservation.",
    ],
  },
  {
    title: "9. Changes to this policy",
    content: [
      "We may update this policy from time to time. The latest version is always on this page, with the date it was last updated.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F7FAEE] px-4 py-12 text-[#052a50] sm:px-8 sm:py-16">
      <article className="mx-auto max-w-4xl">
        <a
          href="/bookings"
          className="inline-flex items-center gap-2 text-sm font-medium hover:text-[#B34325]"
        >
          <span aria-hidden="true">←</span>
          Back to booking
        </a>

        <header className="mb-10 mt-8 border-b border-[#052a50]/15 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B34325]">
            SU VILLA
          </p>

          <h1 className="mt-3 font-body text-3xl sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#052a50]/70 sm:text-base">
            Your privacy matters to us. This page explains how SU VILLA
            collects, uses and protects the information you share when you
            book a stay with us.
          </p>

          <p className="mt-3 text-xs text-[#052a50]/55">Last updated: {LAST_UPDATED}</p>
        </header>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold sm:text-xl">
                {section.title}
              </h2>

              <div className="mt-3 space-y-3">
                {section.content?.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-sm leading-7 text-[#052a50]/75 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.list && (
                  <ul className="list-disc space-y-2 pl-5 marker:text-[#B34325]">
                    {section.list.map((item, index) => (
                      <li
                        key={index}
                        className="pl-1 text-sm leading-7 text-[#052a50]/75 sm:text-base"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.after?.map((paragraph, index) => (
                  <p
                    key={`after-${index}`}
                    className="text-sm leading-7 text-[#052a50]/75 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-12 border-t border-[#052a50]/15 pt-6">
          <p className="text-sm leading-6 text-[#052a50]/65">
            Questions about your data? Contact us at{" "}
            <a href={`mailto:${BUSINESS.email}`} className="font-semibold underline underline-offset-4">
              {BUSINESS.email}
            </a>{" "}
            or {BUSINESS.phone}.
          </p>

          <a
            href="/bookings"
            className="mt-6 inline-flex rounded-xl bg-[#e4b441] px-6 py-3 font-semibold transition"
          >
            Return to booking
          </a>
        </footer>
      </article>
    </main>
  );
}
