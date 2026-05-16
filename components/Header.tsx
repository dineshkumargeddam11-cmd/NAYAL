import React, { useState } from "react";
import { MenuIcon, CloseIcon } from "./icons/UIIcons";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#budget-calculator", label: "Get Quotation" },
    { href: "#contact", label: "Contact Us" },
  ];

  return (
    <header className="sticky top-0 bg-brand-grey/95 backdrop-blur-lg shadow-lg z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#home" aria-label="Naya Luxe Home">
            <img
              src="https://i.postimg.cc/sX85B7k1/Gemini-Generated-Image-bsqp9dbsqp9dbsqp.png"
              alt="Naya Luxe Logo"
              className="h-14 w-auto object-contain"
            />
          </a>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-brand-white relative font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="text-brand-white"
          >
            {isMenuOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-brand-grey/95 backdrop-blur-lg shadow-lg">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-brand-white hover:text-brand-gold transition-colors duration-300 font-medium py-2"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
