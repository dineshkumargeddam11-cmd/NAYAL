import React, { useState, useEffect } from "react";
import { CalculatorIcon } from "./icons/UIIcons";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const PROPERTY_TYPES = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "Villa",
  "Building",
] as const;
type PropertyType = (typeof PROPERTY_TYPES)[number];

const QUALITY_TIERS = ["Medium", "High", "Premium"] as const;
type QualityTier = (typeof QUALITY_TIERS)[number];

const ITEMS = [
  "Tv Unit",
  "Wardrobe",
  "Kitchen",
  "Vanity",
  "Bathroom",
  "Pooja Room",
  "False Ceiling",
  "Working Table",
  "Dressing Table",
  "Flooring",
] as const;
type ItemType = (typeof ITEMS)[number];

const QUOTATION_DATA: Record<
  PropertyType,
  Record<QualityTier, Record<ItemType, number>>
> = {
  "1 BHK": {
    Medium: {
      "Tv Unit": 18000,
      Wardrobe: 70000,
      Kitchen: 80000,
      Vanity: 15000,
      Bathroom: 25000,
      "Pooja Room": 20000,
      "False Ceiling": 30000,
      "Working Table": 15000,
      "Dressing Table": 12000,
      Flooring: 48000,
    },
    High: {
      "Tv Unit": 30000,
      Wardrobe: 95000,
      Kitchen: 120000,
      Vanity: 22000,
      Bathroom: 40000,
      "Pooja Room": 35000,
      "False Ceiling": 45000,
      "Working Table": 22000,
      "Dressing Table": 18000,
      Flooring: 72000,
    },
    Premium: {
      "Tv Unit": 45000,
      Wardrobe: 132000,
      Kitchen: 180000,
      Vanity: 35000,
      Bathroom: 60000,
      "Pooja Room": 50000,
      "False Ceiling": 70000,
      "Working Table": 30000,
      "Dressing Table": 25000,
      Flooring: 100000,
    },
  },
  "2 BHK": {
    Medium: {
      "Tv Unit": 18000,
      Wardrobe: 140000,
      Kitchen: 90000,
      Vanity: 15000,
      Bathroom: 50000,
      "Pooja Room": 20000,
      "False Ceiling": 45000,
      "Working Table": 15000,
      "Dressing Table": 12000,
      Flooring: 48000,
    },
    High: {
      "Tv Unit": 30000,
      Wardrobe: 190000,
      Kitchen: 135000,
      Vanity: 25000,
      Bathroom: 80000,
      "Pooja Room": 35000,
      "False Ceiling": 70000,
      "Working Table": 22000,
      "Dressing Table": 18000,
      Flooring: 72000,
    },
    Premium: {
      "Tv Unit": 45000,
      Wardrobe: 260000,
      Kitchen: 200000,
      Vanity: 40000,
      Bathroom: 120000,
      "Pooja Room": 55000,
      "False Ceiling": 105000,
      "Working Table": 30000,
      "Dressing Table": 25000,
      Flooring: 100000,
    },
  },
  "3 BHK": {
    Medium: {
      "Tv Unit": 18000,
      Wardrobe: 210000,
      Kitchen: 100000,
      Vanity: 15000,
      Bathroom: 75000,
      "Pooja Room": 20000,
      "False Ceiling": 60000,
      "Working Table": 15000,
      "Dressing Table": 12000,
      Flooring: 48000,
    },
    High: {
      "Tv Unit": 30000,
      Wardrobe: 285000,
      Kitchen: 150000,
      Vanity: 25000,
      Bathroom: 120000,
      "Pooja Room": 35000,
      "False Ceiling": 95000,
      "Working Table": 22000,
      "Dressing Table": 18000,
      Flooring: 72000,
    },
    Premium: {
      "Tv Unit": 45000,
      Wardrobe: 390000,
      Kitchen: 220000,
      Vanity: 45000,
      Bathroom: 180000,
      "Pooja Room": 60000,
      "False Ceiling": 140000,
      "Working Table": 30000,
      "Dressing Table": 25000,
      Flooring: 100000,
    },
  },
  "4 BHK": {
    Medium: {
      "Tv Unit": 18000,
      Wardrobe: 280000,
      Kitchen: 110000,
      Vanity: 20000,
      Bathroom: 100000,
      "Pooja Room": 25000,
      "False Ceiling": 80000,
      "Working Table": 15000,
      "Dressing Table": 12000,
      Flooring: 48000,
    },
    High: {
      "Tv Unit": 30000,
      Wardrobe: 380000,
      Kitchen: 165000,
      Vanity: 35000,
      Bathroom: 160000,
      "Pooja Room": 45000,
      "False Ceiling": 120000,
      "Working Table": 22000,
      "Dressing Table": 18000,
      Flooring: 72000,
    },
    Premium: {
      "Tv Unit": 45000,
      Wardrobe: 520000,
      Kitchen: 250000,
      Vanity: 55000,
      Bathroom: 240000,
      "Pooja Room": 75000,
      "False Ceiling": 180000,
      "Working Table": 30000,
      "Dressing Table": 25000,
      Flooring: 100000,
    },
  },
  Villa: {
    Medium: {
      "Tv Unit": 25000,
      Wardrobe: 350000,
      Kitchen: 150000,
      Vanity: 30000,
      Bathroom: 150000,
      "Pooja Room": 40000,
      "False Ceiling": 120000,
      "Working Table": 25000,
      "Dressing Table": 20000,
      Flooring: 80000,
    },
    High: {
      "Tv Unit": 45000,
      Wardrobe: 480000,
      Kitchen: 220000,
      Vanity: 50000,
      Bathroom: 240000,
      "Pooja Room": 65000,
      "False Ceiling": 180000,
      "Working Table": 35000,
      "Dressing Table": 28000,
      Flooring: 112000,
    },
    Premium: {
      "Tv Unit": 65000,
      Wardrobe: 650000,
      Kitchen: 350000,
      Vanity: 80000,
      Bathroom: 360000,
      "Pooja Room": 100000,
      "False Ceiling": 280000,
      "Working Table": 50000,
      "Dressing Table": 40000,
      Flooring: 160000,
    },
  },
  Building: {
    Medium: {
      "Tv Unit": 50000,
      Wardrobe: 700000,
      Kitchen: 300000,
      Vanity: 60000,
      Bathroom: 300000,
      "Pooja Room": 80000,
      "False Ceiling": 250000,
      "Working Table": 40000,
      "Dressing Table": 35000,
      Flooring: 140000,
    },
    High: {
      "Tv Unit": 90000,
      Wardrobe: 950000,
      Kitchen: 450000,
      Vanity: 100000,
      Bathroom: 480000,
      "Pooja Room": 130000,
      "False Ceiling": 380000,
      "Working Table": 60000,
      "Dressing Table": 50000,
      Flooring: 200000,
    },
    Premium: {
      "Tv Unit": 130000,
      Wardrobe: 1300000,
      Kitchen: 700000,
      Vanity: 160000,
      Bathroom: 720000,
      "Pooja Room": 200000,
      "False Ceiling": 580000,
      "Working Table": 80000,
      "Dressing Table": 70000,
      Flooring: 280000,
    },
  },
};

const BudgetCalculator: React.FC = () => {
  const [propertyType, setPropertyType] = useState<PropertyType | "">("");
  const [qualityTier, setQualityTier] = useState<QualityTier>("Medium");
  const [itemQuantities, setItemQuantities] = useState<
    Record<ItemType, number>
  >({
    "Tv Unit": 0,
    Wardrobe: 0,
    Kitchen: 0,
    Vanity: 0,
    Bathroom: 0,
    "Pooja Room": 0,
    "False Ceiling": 0,
    "Working Table": 0,
    "Dressing Table": 0,
    Flooring: 0,
  });
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // Re-calculate automatically when selections change
  useEffect(() => {
    const hasSelection = Object.values(itemQuantities).some((q) => q > 0);
    if (!propertyType || !hasSelection) {
      setEstimatedCost(null);
      return;
    }

    let total = 0;
    (Object.keys(itemQuantities) as ItemType[]).forEach((item) => {
      if (propertyType && qualityTier && itemQuantities[item] > 0) {
        total +=
          QUOTATION_DATA[propertyType][qualityTier][item] *
          itemQuantities[item];
      }
    });

    setEstimatedCost(total);
  }, [propertyType, qualityTier, itemQuantities]);

  const handleDownloadPDF = async () => {
    if (phone.length < 10) return;

    const selectedDetails = (Object.keys(itemQuantities) as ItemType[])
      .filter((item) => itemQuantities[item] > 0)
      .map((item) => `${item} (x${itemQuantities[item]})`)
      .join(", ");

    try {
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      const { db, handleFirestoreError, OperationType } = await import("../firebase");
      
      await addDoc(collection(db, "quotationRequests"), {
        phone,
        propertyType,
        qualityTier,
        items: selectedDetails,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      const { handleFirestoreError, OperationType } = await import("../firebase");
      handleFirestoreError(error, OperationType.CREATE, "quotationRequests");
    }

    const message = `Hello NAYA LUXE! I just checked a quotation on your website and would like the PDF.
Property: ${propertyType}
Quality: ${qualityTier}
Items: ${selectedDetails}
My Phone: ${phone}
Please send me the detailed PDF quotation!`;
    const whatsappUrl = `https://wa.me/918096450170?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="budget-calculator" className="pt-10 pb-24 bg-transparent">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-8 flex flex-col items-center">
          <h2 className="inline-block border-2 border-sky-200 bg-white text-sky-900 px-8 py-2 md:py-3 rounded-t-2xl rounded-b-lg text-3xl md:text-4xl font-bold tracking-tight mb-3 shadow-[0_-4px_10px_rgba(224,242,254,0.5)]">
            Get Quotation
          </h2>
          <p className="text-base md:text-lg text-gray-800 font-semibold">
            Instantly estimate your interior costs.
          </p>
        </div>

        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-xl shadow-sky-900/5 relative overflow-hidden ring-1 ring-gray-100">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <form className="space-y-8">
            <div>
              <label className="block text-sm uppercase tracking-wider font-bold text-gray-900 mb-4">
                1. Select Property Type
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {PROPERTY_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPropertyType(type)}
                    className={`py-2.5 px-1 sm:px-4 rounded-xl text-[12px] sm:text-sm font-semibold transition-all duration-300 border flex items-center justify-center gap-1 sm:gap-2 ${
                      propertyType === type
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-sky-50 hover:text-blue-700"
                    }`}
                  >
                    {propertyType === type && <Check className="w-4 h-4" />}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider font-bold text-gray-900 mb-4">
                2. Select Quality Tier
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                {QUALITY_TIERS.map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setQualityTier(tier)}
                    className={`py-2.5 px-1 sm:px-4 rounded-xl text-[12px] sm:text-sm font-semibold transition-all duration-300 border flex items-center justify-center gap-1 sm:gap-2 ${
                      qualityTier === tier
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-sky-50 hover:text-blue-700"
                    }`}
                  >
                    {qualityTier === tier && <Check className="w-4 h-4" />}
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider font-bold text-gray-900 mb-4">
                3. Select Items to Include
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
                {ITEMS.map((item) => {
                  const qty = itemQuantities[item];
                  const isMulti = ![
                    "Tv Unit",
                    "Kitchen",
                    "Pooja Room",
                    "Flooring",
                  ].includes(item);

                  return (
                    <div
                      key={item}
                      className={`p-2 sm:py-3 sm:px-4 rounded-xl text-[11px] sm:text-sm font-semibold transition-all duration-300 border flex flex-col items-center justify-center gap-1 sm:gap-2 min-h-[5rem] sm:h-28 relative ${
                        qty > 0
                          ? "bg-blue-50 text-blue-800 border-blue-500 shadow-sm"
                          : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-sky-50 hover:text-blue-700 cursor-pointer"
                      }`}
                      onClick={() => {
                        if (qty === 0)
                          setItemQuantities((p) => ({ ...p, [item]: 1 }));
                        else if (!isMulti)
                          setItemQuantities((p) => ({ ...p, [item]: 0 }));
                      }}
                    >
                      {isMulti && qty > 0 ? (
                        <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 w-full h-full">
                          <span className="text-[11px] sm:text-sm font-bold text-blue-900 leading-tight">
                            {item}
                          </span>
                          <div
                            className="flex items-center justify-between w-full mt-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setItemQuantities((p) => ({
                                  ...p,
                                  [item]: p[item] - 1,
                                }))
                              }
                              className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-blue-100/80 text-blue-800 rounded-full hover:bg-blue-200 transition-colors text-base"
                            >
                              -
                            </button>
                            <span className="font-bold text-sm sm:text-lg w-6 sm:w-8 text-center">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setItemQuantities((p) => ({
                                  ...p,
                                  [item]: p[item] + 1,
                                }))
                              }
                              className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-blue-100/80 text-blue-800 rounded-full hover:bg-blue-200 transition-colors text-base"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 pointer-events-none">
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                              qty > 0
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {qty > 0 && <Check className="w-3.5 h-3.5" />}
                          </div>
                          {item}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </form>

          <AnimatePresence>
            {estimatedCost !== null &&
              propertyType &&
              Object.values(itemQuantities).some((q) => q > 0) && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="bg-sky-50/80 border border-sky-100 rounded-2xl p-6 md:p-8 text-center"
                >
                  <h4 className="text-gray-800 text-xl md:text-2xl font-bold mb-6 tracking-wide font-display">
                    Get Your Detailed Quotation!
                  </h4>
                  <div className="max-w-md mx-auto mb-6 text-left">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      To download detailed PDF, please enter your phone number:
                    </label>
                    <input
                      type="tel"
                      placeholder="Phone Number (e.g. 9876543210)"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, ""))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 font-medium text-center tracking-widest text-lg shadow-inner"
                      maxLength={15}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={handleDownloadPDF}
                      disabled={phone.length < 10}
                      className={`font-bold py-3 px-8 rounded-full transition-all duration-200 flex items-center justify-center gap-2 ${
                        phone.length >= 10
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95 cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Download PDF{" "}
                      <span className="opacity-80 text-sm font-normal">
                        via WhatsApp
                      </span>
                    </button>
                    <a
                      href="#contact"
                      className="bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm active:scale-95 duration-200 flex justify-center items-center"
                    >
                      Contact Us
                    </a>
                  </div>
                  <p className="text-xs text-gray-400 mt-6">
                    *Our team will contact you shortly with the detailed PDF quote based on your selections.
                  </p>
                </motion.div>
              )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BudgetCalculator;
