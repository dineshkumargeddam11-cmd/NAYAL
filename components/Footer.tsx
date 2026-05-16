import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedInIcon,
} from "./icons/SocialIcons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-grey text-white">
      <div className="container mx-auto px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="flex flex-col items-start text-left">
            <img
              src="https://i.postimg.cc/sX85B7k1/Gemini-Generated-Image-bsqp9dbsqp9dbsqp.png"
              alt="Naya Luxe Logo"
              className="h-20 w-auto object-contain rounded-md"
            />
            <p className="mt-4 text-gray-400 text-sm">
              where dream meets design
            </p>
          </div>
          <div>
            <h3 className="hidden md:block text-lg font-semibold text-white uppercase">
              Quick Links
            </h3>
            <div className="mt-2 md:mt-4 space-y-2 text-left">
              <a
                href="#services"
                className="block text-gray-400 hover:text-brand-gold transition-colors duration-300"
              >
                Services
              </a>
              <a
                href="#portfolio"
                className="block text-gray-400 hover:text-brand-gold transition-colors duration-300"
              >
                Portfolio
              </a>
              <a
                href="#contact"
                className="block text-gray-400 hover:text-brand-gold transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div>
            <h3 className="hidden md:block text-lg font-semibold text-white uppercase">
              Connect With Us
            </h3>
            <div className="mt-2 md:mt-4 text-gray-400 space-y-1 text-left">
              <p>Hyderabad, India</p>
              <a
                href="mailto:nayaluxe2@gmail.com"
                className="block hover:text-brand-gold transition-colors duration-300"
              >
                nayaluxe2@gmail.com
              </a>
              <div>
                <a
                  href="tel:+918096450170"
                  className="block hover:text-brand-gold transition-colors duration-300"
                >
                  +91 809 64 50 170
                </a>
                <a
                  href="tel:+918096450178"
                  className="block hover:text-brand-gold transition-colors duration-300"
                >
                  +91 809 64 50 178
                </a>
              </div>
            </div>
            <div className="flex mt-4 space-x-4 justify-start">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-brand-gold transition-transform duration-300 transform hover:scale-110"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-brand-gold transition-transform duration-300 transform hover:scale-110"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-brand-gold transition-transform duration-300 transform hover:scale-110"
              >
                <TwitterIcon />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-brand-gold transition-transform duration-300 transform hover:scale-110"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} NAYA LUXE. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
