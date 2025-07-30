"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/sidebarLogo.png" alt="Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <NavLink href="/services-page" label="Services" />
              <NavLink href="/contact" label="Contact us" />
              {isLoggedIn && <NavLink href="/dashboard" label="Dashboard" />}
              {isLoggedIn ? (
                <UserDropdown onSignOut={handleSignOut} />
              ) : (
                <Link
                  href="/auth"
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink
              href="/services"
              label="Services"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavLink
              href="/contact"
              label="Contact us"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* Interviews link removed */}

            {isLoggedIn ? (
              <>
                <MobileNavLink
                  href="/profile"
                  label="Profile"
                  onClick={() => setIsMenuOpen(false)}
                />
                <MobileNavLink
                  href="/dashboard"
                  label="Dashboard"
                  onClick={() => setIsMenuOpen(false)}
                />
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleSignOut();
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// NavLink (desktop)
function NavLink({ href, label }) {
  return (
    <Link
      href={href}
      className="text-gray-700 hover:text-gray-900 transition-colors"
    >
      {label}
    </Link>
  );
}

// MobileNavLink
function MobileNavLink({ href, label, onClick }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

// UserDropdown
function UserDropdown({ onSignOut }) {
  return (
    <div className="relative group">
      <button className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
        <User size={18} className="text-gray-800" />
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200">
        <Link
          href="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Profile
        </Link>
        <Link
          href="/dashboard"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Dashboard
        </Link>
        <button
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={onSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
