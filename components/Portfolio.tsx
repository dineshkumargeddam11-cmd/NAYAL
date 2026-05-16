import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const PORTFOLIO_IMAGES = [
  "https://i.postimg.cc/L8ct6nLt/Gemini-Generated-Image-h5ajd8h5ajd8h5aj.png",
  "https://i.postimg.cc/DyQXrnWQ/Untitled-design-4.png",
  "https://i.postimg.cc/s2zMNS5w/generated-image-20.jpg",
  "https://i.postimg.cc/JzRjg93C/Gemini-Generated-Image-3e1xyi3e1xyi3e1x.png",
  "https://i.postimg.cc/ZnCjgX6T/photo3203465467463665116.jpg",
  "https://i.postimg.cc/ZYwdQM0z/Whats-App-Image-2025-10-29-at-15-36-41.jpg",
  "https://i.postimg.cc/Bbn16xYg/Whats-App-Image-2025-10-29-at-15-36-41-1.jpg",
  "https://i.postimg.cc/4yfpcCd3/Whats-App-Image-2025-10-29-at-15-36-42-1.jpg",
  "https://i.postimg.cc/mkBcZz2r/Gemini-Generated-Image-dslytidslytidsly-1.png",
  "https://i.postimg.cc/YC3dtYrZ/Gemini-Generated-Image-k46v2dk46v2dk46v.png",
  "https://i.postimg.cc/xj4HBP4V/15.png",
  "https://i.postimg.cc/4yq9tJ9G/1.png",
  "https://i.postimg.cc/1XKJG7QL/Gemini-Generated-Image-89fy8689fy8689fy.png",
];

const Portfolio: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! + 1) % PORTFOLIO_IMAGES.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (prev) =>
          (prev! - 1 + PORTFOLIO_IMAGES.length) % PORTFOLIO_IMAGES.length,
      );
    }
  };

  return (
    <section
      id="portfolio"
      className="pt-10 pb-16 bg-transparent overflow-hidden relative"
    >
      <style>{`
                @keyframes slide-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-100% / 3)); }
                }
                .animate-slide-left {
                    animation: slide-left 50s linear infinite;
                    width: fit-content;
                }
                .animate-slide-left:hover {
                    animation-play-state: paused;
                }
            `}</style>

      <div className="container mx-auto px-6 mb-8">
        <div className="text-center flex flex-col items-center">
          <h2 className="inline-block border-2 border-sky-200 bg-white text-sky-900 px-8 py-2 md:py-3 rounded-t-2xl rounded-b-lg text-3xl md:text-4xl font-bold tracking-tight mb-3 shadow-[0_-4px_10px_rgba(224,242,254,0.5)]">
            Our Design Portfolio
          </h2>
          <p className="text-base md:text-lg text-gray-800 font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            Explore our meticulously crafted interior designs.
          </p>
        </div>
      </div>

      <div className="relative w-full flex flex-col overflow-hidden pointer-events-auto">
        {/* Single Row - Sliding Left */}
        <div className="flex animate-slide-left gap-6 md:gap-8 px-4">
          {[...PORTFOLIO_IMAGES, ...PORTFOLIO_IMAGES, ...PORTFOLIO_IMAGES].map(
            (img, i) => {
              const originalIndex = i % PORTFOLIO_IMAGES.length;
              return (
                <div
                  key={`portfolio-${i}`}
                  onClick={() => openGallery(originalIndex)}
                  className="flex-shrink-0 w-72 md:w-96 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-gray-200 cursor-pointer group"
                >
                  <img
                    src={img}
                    alt="Portfolio"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[600ms]"
                    loading="lazy"
                  />
                </div>
              );
            },
          )}
        </div>
      </div>

      {/* Image Gallery Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeGallery}
        >
          <button
            onClick={closeGallery}
            className="absolute top-6 right-6 text-white/70 hover:text-brand-gold transition-colors z-50 p-2"
            aria-label="Close gallery"
          >
            <X className="w-10 h-10" />
          </button>

          <div
            className="relative w-full max-w-7xl max-h-[90vh] flex flex-col items-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full flex items-center justify-center">
              <img
                src={PORTFOLIO_IMAGES[selectedImageIndex]}
                alt={`Portfolio view`}
                className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-lg select-none"
              />

              <button
                onClick={prevImage}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-brand-gold text-white p-3 md:p-4 rounded-full transition-all transform hover:scale-110 backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-brand-gold text-white p-3 md:p-4 rounded-full transition-all transform hover:scale-110 backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            <div className="mt-4 text-white/50 tracking-widest text-sm uppercase">
              Image {selectedImageIndex + 1} of {PORTFOLIO_IMAGES.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
