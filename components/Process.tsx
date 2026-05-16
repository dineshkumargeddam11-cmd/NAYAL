import React from "react";
import { ClipboardList, PenTool, Factory, Hammer } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: ClipboardList,
    title: "1. Consultation",
    description: "We meet to understand your vision, requirements, and budget.",
    colorText: "text-blue-600",
    colorBg: "bg-blue-50",
    colorBorder: "border-blue-200",
  },
  {
    icon: PenTool,
    title: "2. 3D Design",
    description:
      "Our experts create realistic 3D visualizations of your space to give you a perfect preview before manufacturing.",
    colorText: "text-purple-600",
    colorBg: "bg-purple-50",
    colorBorder: "border-purple-200",
  },
  {
    icon: Factory,
    title: "3. Factory Manufacturing",
    description:
      "Bespoke furniture is precision-crafted in our state-of-the-art factory to ensure maximum quality control.",
    colorText: "text-amber-600",
    colorBg: "bg-amber-50",
    colorBorder: "border-amber-200",
  },
  {
    icon: Hammer,
    title: "4. Flawless Installation",
    description:
      "Our specialized team ensures a perfect fit, finish, and timely handover of your dream home.",
    colorText: "text-emerald-600",
    colorBg: "bg-emerald-50",
    colorBorder: "border-emerald-200",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="inline-block border-2 border-sky-200 bg-white text-sky-900 px-8 py-2 md:py-3 rounded-t-2xl rounded-b-lg text-3xl md:text-4xl font-bold tracking-tight mb-3 shadow-[0_-4px_10px_rgba(224,242,254,0.5)]">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-gray-800 font-semibold max-w-2xl mx-auto">
            Our seamless 4-step process guarantees transparency, perfection, and
            a stress-free experience from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[48px] left-[12%] right-[12%] border-t-2 border-dashed border-gray-300 z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative z-10 flex flex-col items-center text-center p-4 border border-transparent hover:border-gray-100 rounded-3xl hover:bg-gray-50/50 transition-colors"
            >
              <div
                className={`w-24 h-24 rounded-full ${step.colorBg} ${step.colorBorder} flex items-center justify-center mb-6 shadow-sm border-4 group hover:scale-110 transition-transform duration-300`}
              >
                <step.icon
                  className={`w-10 h-10 ${step.colorText} transition-colors`}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-800 text-[15px] font-semibold leading-relaxed max-w-[250px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
