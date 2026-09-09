import "./globals.css";
import { Manrope } from "next/font/google";
import DemoBanner from "./DemoBanner";
import { isSupabaseConfigured } from "@/lib/supabaseServer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "Brian's Smoothie Bar & Fitness",
  description:
    "Smoothie bar hours and menu, plus trainer-led fitness assessments, nutrition guidance, and meal prep.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        {!isSupabaseConfigured() && <DemoBanner />}
        <header className="site-header">
          <div className="wrap">
            <a href="/" className="brand">
              Brian&apos;s Smoothie Bar &amp; Fitness
            </a>
            <nav className="main-nav">
              <a href="/smoothie">Smoothie Bar</a>
              <a href="/fitness">Fitness</a>
              <a href="/fitness/nutrition">Nutrition Pathway</a>
              <a className="nav-cta" href="/fitness/book">Book Now</a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="wrap">
            <p>
              &copy; {new Date().getFullYear()} Brian&apos;s Smoothie Bar &amp;
              Fitness. All hours and prices subject to change week to week.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
