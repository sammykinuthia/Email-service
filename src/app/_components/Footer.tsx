// app/_components/Footer.tsx

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-black/20 text-white backdrop-blur-lg">
      <div className="container mx-auto max-w-7xl px-8 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Section 1: Logo and Slogan */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/logo.svg"
                alt="Royoltech Mail Service Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm text-blue-200">
              Simplifying email delivery for developers with a seamless and
              reliable API.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><Link href="/#about-us" className="text-blue-200 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/#why-us" className="text-blue-200 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/dashboard" className="text-blue-200 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/#contact-us" className="text-blue-200 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Section 3: Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-300" />
                <a href="mailto:info@royoltech.com" className="text-blue-200 hover:text-white transition-colors">
                  info@royoltech.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-300" />
                <a href="tel:+254756262131" className="text-blue-200 hover:text-white transition-colors">
                  +254 756 262 131
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-300" />
                <span className="text-blue-200">Nairobi, Kenya</span>
              </li>
            </ul>
          </div>

          {/* Section 4: Social Media */}
          <div>
            <h3 className="mb-4 text-lg font-semibold tracking-wider">
              Follow Us
            </h3>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Twitter" className="text-blue-300 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="www.facebook.com/royoltech" aria-label="Facebook" className="text-blue-300 hover:text-white transition-colors">
               <FaFacebook className="h-6 w-6" />
              </a>
              <a href="www.github.com/sammykinuthia" aria-label="GitHub" className="text-blue-300 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
            <a href="https://wa.me/254756262131" aria-label="WhatsApp" className="text-blue-300 hover:text-white transition-colors">
                <FaWhatsapp className="h-6 w-6" />
            </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Notice */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-blue-300">
          <p>&copy; {new Date().getFullYear()} Royoltech Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;