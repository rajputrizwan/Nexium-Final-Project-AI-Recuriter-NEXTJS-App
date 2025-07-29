"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Define which paths should not show navbar/footer
  const hideLayoutRoutes = [
    "/auth",
    "/login",
    "/signup",
    "/interview-room",
    "/dashboard",
    "/scheduled-interviews",
    "/all-interviews",
    "/billing",
    "/settings",
  ];

  const shouldHideLayout = hideLayoutRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}
