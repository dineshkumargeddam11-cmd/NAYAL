import React from "react";
import { TESTIMONIALS } from "../constants";
import { QuoteIcon } from "./icons/UIIcons";

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 flex flex-col items-center">
          <h2 className="inline-block border-2 border-sky-200 bg-white text-sky-900 px-8 py-2 md:py-3 rounded-t-2xl rounded-b-lg text-3xl md:text-4xl font-bold tracking-tight mb-3 shadow-[0_-4px_10px_rgba(224,242,254,0.5)]">
            What Our Clients Say
          </h2>
          <p className="text-base md:text-lg text-gray-800 font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            We are proud to have created spaces that our clients love to live
            and work in.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-4 sm:p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300"
            >
              <QuoteIcon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-brand-gold mb-3 sm:mb-4" />
              <p className="text-gray-600 italic mb-4 sm:mb-6 text-xs sm:text-base leading-relaxed">
                "{testimonial.comment}"
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  className="h-10 w-10 sm:h-14 sm:w-14 rounded-full sm:mr-4 object-cover"
                />
                <div className="text-center sm:text-left">
                  <p className="font-bold text-brand-grey text-sm sm:text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
