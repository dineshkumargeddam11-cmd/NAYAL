import React, { useState } from "react";
import { SendIcon } from "./icons/UIIcons";

const INTERIOR_SERVICES = [
  "Architectural Designs",
  "3D Visualization & Renders",
  "Modular Kitchens",
  "Wardrobes & Storage",
  "False Ceiling & Lighting",
  "Wall Paneling & Painting",
  "Flooring & Tiling",
  "Custom Furniture",
  "Bathroom & Vanity",
  "Home Automation",
  "Sound Designs & Home Theatres",
  "Civil Construction",
];

const BUSINESS_HOURS = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 01:00 PM",
  "01:00 PM - 02:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM",
];

const getNext15Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 15; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    const formatted = nextDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const value = nextDate.toISOString().split("T")[0];
    days.push({ label: formatted, value });
  }
  return days;
};

const ServiceRequestForm: React.FC = () => {
  const availableDays = getNext15Days();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
    budget: "Affordable",
    date: "",
    time: "",
    services: [] as string[],
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAppointmentBooked, setIsAppointmentBooked] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const isSelected = prev.services.includes(service);
      if (isSelected) {
        return {
          ...prev,
          services: prev.services.filter((s) => s !== service),
        };
      } else {
        return { ...prev, services: [...prev.services, service] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    try {
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      const { db, handleFirestoreError, OperationType } = await import("../firebase"); 
      
      await addDoc(collection(db, "appointments"), {
        ...formData,
        status: "pending",
        createdAt: serverTimestamp()
      });
    } catch (error) {
      const { handleFirestoreError, OperationType } = await import("../firebase");
      handleFirestoreError(error, OperationType.CREATE, "appointments");
    }

    setIsSubmitted(true);
  };

  const handleBookAppointment = async () => {
    if (formData.phone.length < 10) {
      alert("Please enter a valid phone number to book an appointment.");
      return;
    }

    try {
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      const { db, handleFirestoreError, OperationType } = await import("../firebase"); 
      
      await addDoc(collection(db, "appointments"), {
        ...formData,
        status: "pending",
        createdAt: serverTimestamp()
      });
    } catch (error) {
      const { handleFirestoreError, OperationType } = await import("../firebase");
      handleFirestoreError(error, OperationType.CREATE, "appointments");
    }

    const message = `Hello NAYA LUXE! I would like to book an appointment.
Name: ${formData.name || "Not provided"}
Phone: ${formData.phone}
Date: ${formData.date || "Not specified"}
Time: ${formData.time || "Not specified"}
Services Interested: ${formData.services.join(", ") || "Not specified"}`;

    setIsAppointmentBooked(true);
    window.open(
      `https://wa.me/918096450170?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  if (isAppointmentBooked) {
    return (
      <section id="contact" className="py-20 bg-transparent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-sky-800">
            Appointment Requested!
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            We've redirected you to WhatsApp to confirm your appointment. Our
            team will assist you shortly.
          </p>
          <button
            onClick={() => setIsAppointmentBooked(false)}
            className="mt-8 bg-sky-600 text-white hover:bg-sky-700 font-medium px-8 py-3 rounded-full transition-colors"
          >
            Return to Form
          </button>
        </div>
      </section>
    );
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-transparent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-grey">
            Thank You!
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Your request has been sent. We will get back to you shortly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 flex flex-col items-center">
          <h2 className="inline-block border-2 border-sky-200 bg-white text-sky-900 px-8 py-2 md:py-3 rounded-t-2xl rounded-b-lg text-3xl md:text-4xl font-bold tracking-tight mb-3 shadow-[0_-4px_10px_rgba(224,242,254,0.5)]">
            Ready to Start Your Project?
          </h2>
          <p className="text-base md:text-lg text-gray-800 font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            Fill out the form below and one of our design experts will be in
            touch with you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-brand-light-grey p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-gold focus:border-brand-gold"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-gold focus:border-brand-gold"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-gold focus:border-brand-gold"
              />
              <input
                type="text"
                name="pincode"
                placeholder="PIN Code"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-gold focus:border-brand-gold"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                name="budget"
                required
                onChange={handleChange}
                value={formData.budget}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-gold focus:border-brand-gold bg-white text-black"
              >
                <option value="Affordable">Affordable Budget</option>
                <option value="Mid-Range">Mid-Range Budget</option>
                <option value="Premium">Premium Budget</option>
              </select>
              <select
                name="date"
                required
                onChange={handleChange}
                value={formData.date}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-gold focus:border-brand-gold bg-white text-black"
              >
                <option value="" disabled>
                  Select Date
                </option>
                {availableDays.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
              <select
                name="time"
                required
                onChange={handleChange}
                value={formData.time}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-gold focus:border-brand-gold bg-white text-black"
              >
                <option value="" disabled>
                  Select Time
                </option>
                {BUSINESS_HOURS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 font-medium mb-2">
                Select Services Needed (Multiple):
              </label>
              <div className="flex flex-wrap gap-2">
                {INTERIOR_SERVICES.map((service) => (
                  <button
                    type="button"
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
                      formData.services.includes(service)
                        ? "bg-sky-100 text-sky-800 border-sky-300 shadow-md"
                        : "bg-white text-gray-600 border-gray-300 hover:border-sky-300 hover:text-sky-600"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                rows={2}
                required
                onChange={handleChange}
                className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-gold focus:border-brand-gold resize-none"
              ></textarea>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={handleBookAppointment}
                  className="flex-1 whitespace-nowrap bg-sky-100 text-sky-800 border border-sky-300 font-bold py-2 px-6 rounded-lg hover:bg-sky-200 transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-md"
                >
                  <span className="mr-2">📅</span>
                  Book Appointment
                </button>
                <button
                  type="submit"
                  className="flex-1 whitespace-nowrap bg-brand-grey text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-gold hover:text-brand-grey transition-all duration-300 flex items-center justify-center transform hover:scale-105"
                >
                  <SendIcon className="h-5 w-5 mr-2" />
                  Send Request
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Error Message if services are empty */}
      {/* We could add it if we want strict requirement, but currently it's just helpful. */}
    </section>
  );
};

export default ServiceRequestForm;
