import React from "react";
import { motion } from "motion/react";

const BRANDS = [
  {
    name: "Hafele",
    id: 1,
    domain: "hafele.com",
    logo: "https://i.postimg.cc/dhRm6fPn/image.png",
  },
  {
    name: "Hettich",
    id: 2,
    domain: "hettich.com",
    logo: "https://i.postimg.cc/87gmhS3K/image.png",
  },
  {
    name: "Blum",
    id: 3,
    domain: "blum.com",
    logo: "https://i.postimg.cc/Xr6kwbh2/image.png",
  },
  {
    name: "Kajaria",
    id: 4,
    domain: "kajariaceramics.com",
    logo: "https://i.postimg.cc/rD2NSkbN/image.png",
  },
  {
    name: "Kohler",
    id: 5,
    domain: "kohler.com",
    logo: "https://i.postimg.cc/QFZJp3PR/image.png",
  },
  {
    name: "CenturyPly",
    id: 6,
    domain: "centuryply.com",
    logo: "https://i.postimg.cc/sMC4pr8J/image.png",
  },
  {
    name: "Saint-Gobain",
    id: 7,
    domain: "saint-gobain.com",
    logo: "https://i.postimg.cc/4nTcL5PS/image.png",
  },
  {
    name: "Asian Paints",
    id: 8,
    domain: "asianpaints.com",
    logo: "https://i.postimg.cc/23fWcwGt/image.png",
  },
];

const Brands: React.FC = () => {
  return (
    <section className="py-10 md:py-16 bg-transparent border-t border-gray-200/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 flex flex-col items-center">
          <h2 className="inline-block border-2 border-sky-200 bg-white text-sky-900 px-8 py-2 md:py-3 rounded-t-2xl rounded-b-lg text-3xl md:text-4xl font-bold tracking-tight mb-3 shadow-[0_-4px_10px_rgba(224,242,254,0.5)]">
            Brands We Trust
          </h2>
          <p className="text-base md:text-lg text-gray-800 font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            We partner with industry-leading brands to bring you the highest
            quality materials, fittings, and finishes.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto flex overflow-hidden group">
          <motion.div
            className="flex gap-4 md:gap-6 items-center pr-4 md:pr-6"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...BRANDS, ...BRANDS].map((brand, index) => (
              <motion.div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 w-28 h-20 md:w-36 md:h-24 grayscale hover:grayscale-0"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  repeat: Infinity,
                  ease: "easeInOut",
                  duration: 3,
                  delay: index * 0.15,
                }}
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-w-[70px] max-h-[40px] md:max-w-[90px] md:max-h-[50px] object-contain transition-transform duration-300 hover:scale-105"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
