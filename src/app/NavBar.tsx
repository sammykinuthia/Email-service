// Make sure to place this file in your components directory
"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";

const NavBar = () => {
  // Get the user from the client-side hook
  const { user } = useUser();
  const [scrolled, setScrolled] = useState(false);

  // Effect to detect page scroll
  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled to true if user scrolls more than 10px, else false
      setScrolled(window.scrollY > 10);
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "About", path: "/#about-us" },
    { name: "Features", path: "/#why-us" },
    { name: "Contact", path: "/#contact-us" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-blue-900/30 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container max-w-7xl w-full mx-auto p-4 flex justify-between items-center text-white">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src={"/logo.svg"} // Assuming you have a logo file here
            alt="Mail Service Logo"
            width={130}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="font-medium tracking-wider text-blue-200 hover:text-white transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <Link
              className="font-medium tracking-wider text-blue-200 hover:text-white transition-colors duration-300"
              href={"/dashboard"}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
         {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {/* ---- FIX IS HERE ---- */}
          <ClerkLoading>
            {/* Skeleton loader that matches the button's size */}
            <div className="h-[44px] w-[105px] rounded-full bg-white/10 animate-pulse"></div>
          </ClerkLoading>

          <ClerkLoaded>
            <SignedOut>
              <div className="px-5 py-2.5 bg-white text-blue-900 font-semibold rounded-full hover:bg-blue-100 transition-all duration-300 cursor-pointer">
                <SignInButton mode="modal" />
              </div>
            </SignedOut>
            <SignedIn>
              <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </ClerkLoaded>
          {/* ---- END OF FIX ---- */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;