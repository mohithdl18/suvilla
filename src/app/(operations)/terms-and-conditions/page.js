
export const metadata = {
  title: "Terms and Conditions | SU VILLA",
  description:
    "Read the booking, payment, cancellation and guest policies for SU VILLA.",
};

const sections = [
  {
    title: "1. General",
    content: [
      "Please take time to read these terms and conditions governing the www.suvilla.in website. By accessing this website, you agree to accept, without limitation or qualification, all of these terms and conditions of use. If you do not agree to these terms, please do not use the site.",
    ],
  },
  {
    title: "2. Site Availability",
    content: [
      "The site is accessible worldwide to anyone with Internet access. However, the site may not be continuously available due to maintenance or repairs, computer problems or crashes, disruption in Internet service or other unforeseen circumstances.",
    ],
  },
  {
    title: "3. Use of www.suvilla.in",
    content: [
      "You may only use this website to make genuine and valid reservations or purchases. You may not use this website to make any fraudulent, false or speculative reservation.",
      "You will be financially liable for all uses of this website made by you, and you are responsible for keeping your booking details and account information confidential.",
    ],
  },
  {
    title: "4. Reservations, Amendment and Cancellation",
    content: [
      "All reservations are subject to availability. Reservations made on this site are considered conditional until a confirmation number is sent to the guest by email. SU VILLA may, from time to time, contact guests to re-confirm reservations and to prevent fraudulent bookings.",
      "Should guests wish to amend a reservation, they should contact SU VILLA at the earliest opportunity. Amendments are subject to availability, and SU VILLA will not be liable should it be unable to provide its products and services due to unavailability.",
      "If SU VILLA, for reasons beyond its control, needs to reject or change a confirmed reservation, it will make all reasonable attempts to offer an alternative. If no alternative is accepted by the guest, SU VILLA will refund any amount paid and consider the reservation cancelled. This is the limit of SU VILLA's liability.",
      "SU VILLA reserves the right to impose a cancellation fee per room per night in the event of a late cancellation or a no-show at the property.",
      "SU VILLA does not guarantee acknowledgement of reservations or transactions made on this site where unforeseen circumstances, omissions or errors occur.",
    ],
  },
  {
    title: "5. Charges and Payment Terms",
    content: [
      "Payment for a reservation is collected online at the time of booking through our secure payment partner, Razorpay. A reservation is confirmed only after the payment has been successfully completed.",
      "If the payment terms are not complied with, SU VILLA reserves the right to cancel the booking without liability.",
      "Disclaimer: Payments made through sources other than the official SU VILLA website (www.suvilla.in), authorised partners (B2B/B2C), Online Travel Agencies (OTAs), or directly with SU VILLA by phone will not be accepted.",
    ],
  },
  {
    title: "6. Cancellation Policy",
    content: [
      "Bookings cancelled less than 7 days before arrival: no refund will be issued.",
      "Bookings cancelled more than 7 days before arrival: a full refund will be provided.",
      "Refund processing time: refunds may take up to 15 bank working days to reflect in the guest's account.",
    ],
  },
  {
    title: "7. Internet Rates",
    content: [
      "SU VILLA reserves the right to change, modify and adjust rates with or without prior notice. The price shown at the time of booking is the price charged for that confirmed reservation.",
    ],
  },
  {
    title: "8. Special Offers and Promotions",
    content: [
      "Offers and promotions are subject to the specific terms, conditions and restrictions listed on the site. SU VILLA reserves the right to modify or withdraw any programme, offer or promotion at any time.",
    ],
  },
  {
    title: "9. Important Notice – No Loud Music After 10:30 PM",
    content: [
      "Dear Guests, as per government noise pollution regulations, playing loud music, DJ, or using high-volume speakers is strictly prohibited after 10:30 PM.",
      "We kindly request all guests to keep music and television volume low after 10:30 PM, avoid loud conversations and disturbances, and respect the comfort and privacy of other guests and neighbouring properties.",
      "Your cooperation is highly appreciated in maintaining a peaceful and pleasant atmosphere at SU VILLA SAKALESHAPURA. Thank you for your understanding and cooperation.",
    ],
  },
  {
    title: "10. House Rules",
    content: [
      "Entry & Exit Restrictions: Entry to and exit from the property after 10:30 PM is restricted and permitted only with prior management approval.",
      "Maintain Silence: Guests are requested to avoid loud conversations, shouting and any activities that may disturb others.",
      "Cooperation: All guests are expected to follow these rules to ensure a safe and peaceful stay.",
    ],
  },
  {
    title: "11. Limitation of Liability and Disclaimer",
    content: [
      "Errors or omissions may sometimes occur. SU VILLA does not warrant the accuracy, timeliness, currency or completeness of the contents of this site, including without limitation any information relating to rates and room availability. SU VILLA disclaims any warranty of any kind, whether express or implied, as to any matter relating to this website and other web links, including without limitation merchantability or fitness for any particular purpose.",
      "SU VILLA will not be responsible for any damages, including without limitation damages for loss of profits, arising in contract or from your use or inability to use this site.",
      "SU VILLA does not guarantee that this site is free from infection by viruses and shall not be liable for any resulting damage or loss.",
      "In no event shall SU VILLA or its agents, affiliates, representatives or licensors be liable for any indirect, incidental or consequential damages whatsoever (including, without limitation, damages for loss of profits or loss of information) arising from the use or inability to use the contents of this site, even if SU VILLA has been informed of the possibility of such damages.",
      "The site may contain links to other websites, directly or indirectly. Those sites are provided by independent third parties, and SU VILLA is not responsible for their availability or content.",
      "Nothing in these terms limits rights or remedies that cannot legally be excluded. These terms are governed by the laws of India.",
    ],
  },
];

export default function TermsAndConditionsPage() {
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
            Terms and Conditions
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#052a50]/70 sm:text-base">
            Please read these terms carefully before completing your
            reservation. They describe the general conditions for using
            the SU VILLA booking service.
          </p>
        </header>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold sm:text-xl">
                {section.title}
              </h2>

              <div className="mt-3 space-y-3">
                {section.content.map((paragraph, index) => (
                  <p
                    key={index}
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
            For questions about a reservation or these terms, please
            contact SU VILLA using the official contact details published
            on the website.
          </p>

          <a
            href="/bookings"
            className="mt-6 inline-flex rounded-xl bg-[#e4b441] px-6 py-3 font-semibold  transition"
          >
            Return to booking
          </a>
        </footer>
      </article>
    </main>
  );
}
