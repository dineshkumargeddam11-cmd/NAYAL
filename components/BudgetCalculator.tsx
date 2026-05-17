import React, { useState, useEffect } from "react";
import { CalculatorIcon } from "./icons/UIIcons";
import { Check, Download, Send, Phone, Lock, FileText, IndianRupee } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { auth } from "../firebase";
import jsPDF from "jspdf";
import "jspdf-autotable";


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
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState("");

  // Re-calculate automatically when selections change
  useEffect(() => {
    // If auth is already granted for a phone, and we're here, we can keep it authenticated unless phone changes.
    // However, if they change the quote, they stay authenticated to view it.
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

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved
        }
      });
    }
  };

  const handleSendOtp = async () => {
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = (window as any).recaptchaVerifier;
      const phoneNumberWithCode = `+91${phone}`; // Default to India country code
      const result = await signInWithPhoneNumber(auth, phoneNumberWithCode, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
    } catch (err: any) {
      console.error("Error sending OTP:", err);
      setError("Failed to send OTP. Please check your phone number and try again.");
      if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.clear();
        (window as any).recaptchaVerifier = null;
      }
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6 || !confirmationResult) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      setIsAuthenticated(true);
      // Save leads to firestore when authenticated
      const selectedDetails = (Object.keys(itemQuantities) as ItemType[])
        .filter((item) => itemQuantities[item] > 0)
        .map((item) => `${item} (x${itemQuantities[item]})`)
        .join(", ");
        
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      const { db, handleFirestoreError, OperationType } = await import("../firebase");
      
      try {
          await addDoc(collection(db, "quotationRequests"), {
            phone,
            propertyType,
            qualityTier,
            items: selectedDetails,
            estimatedCost,
            createdAt: serverTimestamp()
          });
      } catch (firestoreErr) {
          handleFirestoreError(firestoreErr, OperationType.CREATE, "quotationRequests");
      }

    } catch (err: any) {
      console.error("Error verifying OTP:", err);
      setError("Incorrect OTP. Please try again.");
    }
    setLoading(false);
  };

  const handleDownloadPDF = () => {
    if (!estimatedCost) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // App Header
    doc.setFontSize(22);
    doc.setTextColor(34, 34, 34);
    doc.setFont("helvetica", "bold");
    doc.text("NAYA LUXE", pageWidth / 2, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Interiors & Decors", pageWidth / 2, 27, { align: "center" });
    doc.text("Estimated Quotation", pageWidth / 2, 34, { align: "center" });

    // Details snippet
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.text(`Phone: +91 ${phone}`, 14, 50);
    doc.text(`Property: ${propertyType}`, 14, 56);
    doc.text(`Quality Tier: ${qualityTier}`, 14, 62);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 68);

    // Table Data
    const tableColumn = ["Item Description", "Quantity", "Unit Cost", "Total"];
    const tableRows: any[] = [];
    
    let totalComputed = 0;
    (Object.keys(itemQuantities) as ItemType[]).forEach((item) => {
      if (itemQuantities[item] > 0) {
        const qty = itemQuantities[item];
        const unitCost = QUOTATION_DATA[propertyType as PropertyType][qualityTier as QualityTier][item];
        const itemTotal = unitCost * qty;
        totalComputed += itemTotal;
        tableRows.push([
          item,
          qty,
          `Rs. ${unitCost.toLocaleString()}`,
          `Rs. ${itemTotal.toLocaleString()}`
        ]);
      }
    });

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 75,
      theme: 'grid',
      headStyles: { fillColor: [34, 34, 34], textColor: [255, 255, 255] },
      styles: { fontSize: 10, cellPadding: 4 },
      margin: { top: 75 }
    });

    const finalY = (doc as any).lastAutoTable.finalY || 75;
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(34, 34, 34);
    doc.text(`Estimated Total: Rs. ${totalComputed.toLocaleString()}`, 14, finalY + 15);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);
    doc.text("*This is an estimated quotation generated automatically.", pageWidth / 2, finalY + 30, { align: "center" });
    doc.text("Actual prices may vary after the final design consultation.", pageWidth / 2, finalY + 35, { align: "center" });

    doc.save(`NayaLuxe_Quotation_${phone}.pdf`);
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
          <div id="recaptcha-container"></div>
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

          <AnimatePresence mode="wait">
            {estimatedCost !== null &&
              propertyType &&
              Object.values(itemQuantities).some((q) => q > 0) && (
                <motion.div
                  key="quotation-panel"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="bg-sky-50/80 border border-sky-100 rounded-2xl p-6 md:p-8 text-center"
                >
                  <h4 className="text-gray-800 text-xl md:text-2xl font-bold mb-6 tracking-wide font-display">
                    Your Tailored Estimation
                  </h4>

                  {!isAuthenticated ? (
                    <div className="max-w-md mx-auto mb-6 text-left">
                      <p className="text-sm text-gray-600 mb-6 text-center">
                        Please verify your mobile number to reveal the quotation amount and download the detailed PDF.
                      </p>
                      
                      {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
                          {error}
                        </div>
                      )}

                      {!otpSent ? (
                        <div className="flex flex-col gap-4">
                          <label className="block text-sm font-semibold text-gray-700">
                            Enter Phone Number
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="tel"
                              placeholder="e.g. 9876543210"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 font-medium text-lg shadow-inner"
                              maxLength={15}
                              disabled={loading}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={phone.length < 10 || loading}
                            className={`w-full font-bold py-3 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                              phone.length >= 10 && !loading
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95 cursor-pointer"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            {loading ? "Sending OTP..." : "Send OTP"}
                            {!loading && <Send className="w-4 h-4 ml-1" />}
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4">
                          <label className="block text-sm font-semibold text-gray-700">
                            Enter OTP sent to +91 {phone}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              placeholder="6-digit OTP"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-800 font-medium tracking-[0.2em] text-center text-xl shadow-inner"
                              maxLength={6}
                              disabled={loading}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={otp.length < 6 || loading}
                            className={`w-full font-bold py-3 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                              otp.length === 6 && !loading
                                ? "bg-green-600 text-white shadow-lg shadow-green-600/20 hover:bg-green-700 active:scale-95 cursor-pointer"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            {loading ? "Verifying..." : "Verify & Reveal"}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setOtpSent(false);
                              setOtp("");
                              setError("");
                            }}
                            className="text-center text-sm text-gray-500 hover:text-gray-800 transition-colors mt-2"
                            disabled={loading}
                          >
                            Change phone number
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="max-w-xl mx-auto flex flex-col items-center gap-6"
                    >
                      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-green-100 w-full relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 text-green-50 opacity-50">
                          <IndianRupee className="w-40 h-40" />
                        </div>
                        <h5 className="text-gray-500 font-medium text-sm md:text-base uppercase tracking-wider mb-2">Estimated Total Cost</h5>
                        <div className="flex items-end justify-center gap-2">
                          <span className="text-3xl md:text-4xl text-gray-400 font-light hidden sm:block">Rs.</span>
                          <span className="text-4xl md:text-6xl font-bold text-gray-900 tabular-nums tracking-tight">
                            ₹{estimatedCost.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-4 max-w-sm mx-auto">
                          *This is an approximate estimation. Actual costs may vary based on specific material choices and final measurements.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-center gap-4 w-full px-4">
                        <button
                          onClick={handleDownloadPDF}
                          className="flex-1 font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95"
                        >
                          <FileText className="w-5 h-5" />
                          Download PDF Quotation
                        </button>
                        <a
                          href="#contact"
                          className="flex-1 bg-white text-gray-900 font-bold py-4 px-6 rounded-xl hover:bg-gray-50 transition-colors border-2 border-gray-200 shadow-sm active:scale-95 duration-200 flex justify-center items-center gap-2"
                        >
                          <Phone className="w-5 h-5" />
                          Contact Expert
                        </a>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BudgetCalculator;
