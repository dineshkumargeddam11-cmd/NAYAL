import React from "react";
import { WhatsAppIcon } from "./icons/SocialIcons";

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = "918096450170"; // Replace with your WhatsApp number including country code
  const message = "Hello NAYA LUXE! I'm interested in your design services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip / Greeting (shows on hover) */}
      <div className="mr-4 px-4 py-2 bg-white text-gray-800 text-sm font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-gray-100 hidden sm:block">
        Chat with a Design Expert 👋
        <div className="absolute top-1/2 -right-1 w-2 h-2 bg-white border-r border-t border-gray-100 transform -translate-y-1/2 rotate-45"></div>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] transform group-hover:scale-110 transition-all duration-300"
        aria-label="Contact us on WhatsApp"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full border-4 border-[#25D366] opacity-30 animate-ping"></span>
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
        </span>
        <WhatsAppIcon className="h-8 w-8" />
      </a>
    </div>
  );
};
