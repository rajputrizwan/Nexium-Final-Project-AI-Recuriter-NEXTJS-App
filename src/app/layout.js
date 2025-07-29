// app/layout.js
import { Toaster } from "sonner";
import "./globals.css";
import Provider from "./provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LayoutWrapper from "@/components/LayoutWrapper"; // new client wrapper

export const metadata = {
  title: "AI Interview Schedule Voice Agent - Next.js App",
  description: "A Next.js application for AI-powered recruitment",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Provider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
