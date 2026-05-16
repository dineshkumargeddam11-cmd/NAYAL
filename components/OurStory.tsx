import React from "react";
import { Home, ShieldCheck, Eye, Wallet, HeartHandshake } from "lucide-react";
import { motion } from "motion/react";

const HIGHLIGHTS = [
  {
    id: 1,
    icon: <Home className="w-5 h-5 text-sky-600" />,
    bg: "bg-sky-50",
    title: "30+",
    subtitle: "Projects Delivered",
    desc: "Handling residential, commercial, boutiques, cafes and end-to-end villa renovations.",
  },
  {
    id: 2,
    icon: <Wallet className="w-5 h-5 text-emerald-600" />,
    bg: "bg-emerald-50",
    title: "₹99,999/-",
    subtitle: "Starting Kitchen",
    desc: "Our beautiful, simple kitchens delivered affordably to your home.",
  },
  {
    id: 3,
    icon: <Eye className="w-5 h-5 text-purple-600" />,
    bg: "bg-purple-50",
    title: "Our Specialty",
    subtitle: "3D Visualization",
    desc: "Experience and feel your space perfectly modeled before a single brick is laid.",
  },
  {
    id: 4,
    icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
    bg: "bg-amber-50",
    title: "Pure Trust",
    subtitle: "End-to-End Transparency",
    badge: "Zero Hidden Cost",
    desc: "Complete disclosure of materials, process, and clear execution plans.",
  },
];

const HighlightCard = ({ item }: { item: (typeof HIGHLIGHTS)[0] }) => (
  <div className="flex-shrink-0 w-64 sm:w-auto bg-white border text-center border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between h-full">
    <div>
      <div
        className={`w-10 h-10 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
      >
        {item.icon}
      </div>
      <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
      <p className="text-xs text-gray-800 font-semibold mb-2">
        {item.subtitle}
      </p>
      {item.badge && (
        <div className="inline-flex items-center justify-center bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 border border-rose-200 shadow-sm">
          {item.badge}
        </div>
      )}
    </div>
    <p className="text-xs font-semibold text-gray-700 leading-relaxed mt-2">
      {item.desc}
    </p>
  </div>
);

const OurStory: React.FC = () => {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="inline-block border-2 border-sky-200 bg-white text-sky-900 px-8 py-2 md:py-3 rounded-t-2xl rounded-b-lg text-3xl md:text-4xl font-bold tracking-tight mb-3 shadow-[0_-4px_10px_rgba(224,242,254,0.5)]">
            How We Work
          </h2>
          <p className="text-base md:text-lg text-gray-800 font-semibold max-w-full px-4 text-center">
            Building spaces that tell your unique story.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Narrative Side */}
          <div className="space-y-6 min-w-0 w-full">
            <div className="inline-flex items-center space-x-2 text-sky-700 bg-sky-50 px-3 py-1 rounded-full text-sm font-semibold mb-2">
              <HeartHandshake className="w-4 h-4" />
              <span>Passion meets Purpose</span>
            </div>
            <p className="text-xl md:text-2xl font-light text-gray-800 leading-relaxed font-display">
              "We believe every space in your home{" "}
              <strong className="font-semibold text-sky-900 font-sans uppercase">
                TELLS STORIES
              </strong>{" "}
              and brings peace to the spaces you love."
            </p>

            <div className="space-y-5 text-gray-600">
              <p className="leading-relaxed">
                We are passionate interior designers and decorators who provide
                more than just wardrobes and kitchens—we give every client a
                true{" "}
                <strong className="text-gray-900 uppercase">
                  PERSONAL TOUCH
                </strong>
                . We don't just draft plans;{" "}
                <strong className="text-sky-900 font-medium uppercase">
                  WE HEAR YOUR STORIES AND CRAFT DESIGNS.
                </strong>
              </p>
              <p className="leading-relaxed">
                Our greatest investment in this business is{" "}
                <strong className="text-amber-600 font-medium uppercase">
                  TRUST
                </strong>
                . We never promise the "cheapest" solution, but we guarantee
                highly{" "}
                <strong className="text-gray-900 font-medium uppercase">
                  AFFORDABLE
                </strong>{" "}
                excellence. We deeply understand the value of your money.
              </p>
              <p className="leading-relaxed">
                We stay{" "}
                <strong className="text-gray-900 font-medium uppercase">
                  100% TRANSPARENT
                </strong>{" "}
                with our clients. We disclose everything regarding materials,
                execution workflows, and planning before we even begin, ensuring
                complete peace of mind.
              </p>
            </div>
          </div>

          {/* Highlights Side */}
          <div className="relative min-w-0 w-full">
            {/* decorative background element */}
            <div className="absolute inset-0 bg-sky-50/50 rounded-3xl -m-6 -z-10 hidden sm:block"></div>

            {/* Desktop Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-4 relative">
              {HIGHLIGHTS.map((item) => (
                <HighlightCard key={item.id} item={item} />
              ))}
            </div>

            {/* Mobile Floating Marquee */}
            <div className="sm:hidden -mx-6 overflow-hidden relative group">
              <motion.div
                className="flex gap-4 items-stretch pl-6 pr-4"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 7.5 }}
              >
                {[...HIGHLIGHTS, ...HIGHLIGHTS].map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="w-64 flex-shrink-0"
                  >
                    <HighlightCard item={item} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
