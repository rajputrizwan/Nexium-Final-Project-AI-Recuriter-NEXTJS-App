// app/layout.tsx or app/layout.js
import "./globals.css";
import Provider from "./provider";

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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
