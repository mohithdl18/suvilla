import { Poppins, Ballet } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton.jsx";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ballet = Ballet({
  variable: "--font-ballet",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  metadataBase: new URL("https://www.suvilla.in"),
  title: "SU VILLA | BY THE CREEK",
  description:
    "Experience a peaceful luxury stay surrounded by the lush green hills of Sakleshpur.",

  authors: [{ name: "Creo Creators" }],

  icons: {
    icon: "/images/logo.png",
  },

  openGraph: {
    title: "SU VILLA | BY THE CREEK",
    description: "Experience a peaceful luxury stay surrounded by the lush green hills of Sakleshpur.",
    url: "https://www.suvilla.in/",
    siteName: "SU VILLA | BY THE CREEK",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 937,
        height: 860,
        alt: "SU VILLA by the Creek, Sakleshpur, seen from above",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SU VILLA | BY THE CREEK",
    description: "Experience a peaceful luxury stay surrounded by the lush green hills of Sakleshpur.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${ballet.variable}`}>
        {children}

        {/* <WhatsAppButton /> */}
        
      </body>
    </html>
  );
}