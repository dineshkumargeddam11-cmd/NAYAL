import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do you offer warranties on your interior designs?",
    answer:
      "Yes, we provide extensive warranties on our bespoke furniture, modular setups, and workmanship. Warranty periods vary depending on the specific materials and products used.",
  },
  {
    question: "How many days does 3D visualization take?",
    answer:
      "After our initial consultation and site measurement, our design experts typically deliver the first draft of 3D designs within 3 to 5 business days, depending on the scale and complexity of the project.",
  },
  {
    question: "Do you manufacture your own furniture?",
    answer:
      "Yes, we have our own state-of-the-art manufacturing factory. This allows us to ensure premium quality control, exact customization to your space, and timely delivery for all bespoke woodwork.",
  },
  {
    question: "Can you work with my existing furniture?",
    answer:
      "Absolutely. We seamlessly blend your cherished existing pieces with new bespoke elements and modular furniture to create a cohesive and personalized aesthetic.",
  },
  {
    question:
      "Do you provide services for commercial spaces like cafes and hotels?",
    answer:
      "Yes, beyond residential projects, we specialize in designing and executing commercial spaces, including offices, cafes, restaurants, and hotels. We create functional, aesthetically pleasing environments that align with your brand identity.",
  },
  {
    question: "Do you offer renovation services for existing spaces?",
    answer:
      "Absolutely! We provide end-to-end renovation services. Whether it's a single room makeover, a complete home transformation, or a commercial space update, our team seamlessly integrates new designs with your existing structure.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-transparent">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="inline-block border-2 border-sky-200 bg-white text-sky-900 px-8 py-2 md:py-3 rounded-t-2xl rounded-b-lg text-3xl md:text-4xl font-bold tracking-tight mb-3 shadow-[0_-4px_10px_rgba(224,242,254,0.5)]">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-gray-800 font-semibold">
            Answers to common questions about our interior design process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="font-bold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 pt-0 text-gray-800 text-base font-semibold leading-relaxed border-t border-gray-50 mt-2 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
