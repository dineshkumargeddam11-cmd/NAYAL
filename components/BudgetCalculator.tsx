import React, { useState, useEffect, useRef } from "react";
import { CalculatorIcon } from "./icons/UIIcons";
import { Check, Download, Send, Phone, Lock, FileText, IndianRupee, MessageCircle, ImageDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


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
  "Lighting",
  "Painting",
  "Electrical",
  "Semi - Home Automation",
  "Full Home Automation",
  "3D Designing",
  "2 D Design",
  "Dining Area",
  "Drawing Room",
  "Foyer",
] as const;
type ItemType = (typeof ITEMS)[number];

const QUOTATION_DATA: Record<
  PropertyType,
  Record<QualityTier, Record<ItemType, number>>
> = {
  "1 BHK": {
    "Medium": {
      "Tv Unit": 18000,
      "Wardrobe": 70000,
      "Kitchen": 80000,
      "Vanity": 15000,
      "Bathroom": 25000,
      "Pooja Room": 20000,
      "False Ceiling": 30000,
      "Working Table": 15000,
      "Dressing Table": 12000,
      "Flooring": 48000,
      "Lighting": 20000,
      "Painting": 30000,
      "Electrical": 25000,
      "Semi - Home Automation": 50000,
      "Full Home Automation": 100000,
      "3D Designing": 15000,
      "2 D Design": 10000,
      "Dining Area": 30000,
      "Drawing Room": 40000,
      "Foyer": 10000
    },
    "High": {
      "Tv Unit": 30000,
      "Wardrobe": 95000,
      "Kitchen": 120000,
      "Vanity": 22000,
      "Bathroom": 40000,
      "Pooja Room": 35000,
      "False Ceiling": 45000,
      "Working Table": 22000,
      "Dressing Table": 18000,
      "Flooring": 72000,
      "Lighting": 30000,
      "Painting": 50000,
      "Electrical": 40000,
      "Semi - Home Automation": 80000,
      "Full Home Automation": 150000,
      "3D Designing": 25000,
      "2 D Design": 15000,
      "Dining Area": 50000,
      "Drawing Room": 70000,
      "Foyer": 15000
    },
    "Premium": {
      "Tv Unit": 45000,
      "Wardrobe": 132000,
      "Kitchen": 180000,
      "Vanity": 35000,
      "Bathroom": 60000,
      "Pooja Room": 50000,
      "False Ceiling": 70000,
      "Working Table": 30000,
      "Dressing Table": 25000,
      "Flooring": 100000,
      "Lighting": 50000,
      "Painting": 80000,
      "Electrical": 60000,
      "Semi - Home Automation": 120000,
      "Full Home Automation": 250000,
      "3D Designing": 40000,
      "2 D Design": 25000,
      "Dining Area": 80000,
      "Drawing Room": 100000,
      "Foyer": 25000
    }
  },
  "2 BHK": {
    "Medium": {
      "Tv Unit": 18000,
      "Wardrobe": 140000,
      "Kitchen": 90000,
      "Vanity": 15000,
      "Bathroom": 50000,
      "Pooja Room": 20000,
      "False Ceiling": 45000,
      "Working Table": 15000,
      "Dressing Table": 12000,
      "Flooring": 48000,
      "Lighting": 30000,
      "Painting": 45000,
      "Electrical": 37500,
      "Semi - Home Automation": 75000,
      "Full Home Automation": 150000,
      "3D Designing": 22500,
      "2 D Design": 15000,
      "Dining Area": 45000,
      "Drawing Room": 60000,
      "Foyer": 15000
    },
    "High": {
      "Tv Unit": 30000,
      "Wardrobe": 190000,
      "Kitchen": 135000,
      "Vanity": 25000,
      "Bathroom": 80000,
      "Pooja Room": 35000,
      "False Ceiling": 70000,
      "Working Table": 22000,
      "Dressing Table": 18000,
      "Flooring": 72000,
      "Lighting": 45000,
      "Painting": 75000,
      "Electrical": 60000,
      "Semi - Home Automation": 120000,
      "Full Home Automation": 225000,
      "3D Designing": 37500,
      "2 D Design": 22500,
      "Dining Area": 75000,
      "Drawing Room": 105000,
      "Foyer": 22500
    },
    "Premium": {
      "Tv Unit": 45000,
      "Wardrobe": 260000,
      "Kitchen": 200000,
      "Vanity": 40000,
      "Bathroom": 120000,
      "Pooja Room": 55000,
      "False Ceiling": 105000,
      "Working Table": 30000,
      "Dressing Table": 25000,
      "Flooring": 100000,
      "Lighting": 75000,
      "Painting": 120000,
      "Electrical": 90000,
      "Semi - Home Automation": 180000,
      "Full Home Automation": 375000,
      "3D Designing": 60000,
      "2 D Design": 37500,
      "Dining Area": 120000,
      "Drawing Room": 150000,
      "Foyer": 37500
    }
  },
  "3 BHK": {
    "Medium": {
      "Tv Unit": 18000,
      "Wardrobe": 210000,
      "Kitchen": 100000,
      "Vanity": 15000,
      "Bathroom": 75000,
      "Pooja Room": 20000,
      "False Ceiling": 60000,
      "Working Table": 15000,
      "Dressing Table": 12000,
      "Flooring": 48000,
      "Lighting": 40000,
      "Painting": 60000,
      "Electrical": 50000,
      "Semi - Home Automation": 100000,
      "Full Home Automation": 200000,
      "3D Designing": 30000,
      "2 D Design": 20000,
      "Dining Area": 60000,
      "Drawing Room": 80000,
      "Foyer": 20000
    },
    "High": {
      "Tv Unit": 30000,
      "Wardrobe": 285000,
      "Kitchen": 150000,
      "Vanity": 25000,
      "Bathroom": 120000,
      "Pooja Room": 35000,
      "False Ceiling": 95000,
      "Working Table": 22000,
      "Dressing Table": 18000,
      "Flooring": 72000,
      "Lighting": 60000,
      "Painting": 100000,
      "Electrical": 80000,
      "Semi - Home Automation": 160000,
      "Full Home Automation": 300000,
      "3D Designing": 50000,
      "2 D Design": 30000,
      "Dining Area": 100000,
      "Drawing Room": 140000,
      "Foyer": 30000
    },
    "Premium": {
      "Tv Unit": 45000,
      "Wardrobe": 390000,
      "Kitchen": 220000,
      "Vanity": 45000,
      "Bathroom": 180000,
      "Pooja Room": 60000,
      "False Ceiling": 140000,
      "Working Table": 30000,
      "Dressing Table": 25000,
      "Flooring": 100000,
      "Lighting": 100000,
      "Painting": 160000,
      "Electrical": 120000,
      "Semi - Home Automation": 240000,
      "Full Home Automation": 500000,
      "3D Designing": 80000,
      "2 D Design": 50000,
      "Dining Area": 160000,
      "Drawing Room": 200000,
      "Foyer": 50000
    }
  },
  "4 BHK": {
    "Medium": {
      "Tv Unit": 18000,
      "Wardrobe": 280000,
      "Kitchen": 110000,
      "Vanity": 20000,
      "Bathroom": 100000,
      "Pooja Room": 25000,
      "False Ceiling": 80000,
      "Working Table": 15000,
      "Dressing Table": 12000,
      "Flooring": 48000,
      "Lighting": 50000,
      "Painting": 75000,
      "Electrical": 62500,
      "Semi - Home Automation": 125000,
      "Full Home Automation": 250000,
      "3D Designing": 37500,
      "2 D Design": 25000,
      "Dining Area": 75000,
      "Drawing Room": 100000,
      "Foyer": 25000
    },
    "High": {
      "Tv Unit": 30000,
      "Wardrobe": 380000,
      "Kitchen": 165000,
      "Vanity": 35000,
      "Bathroom": 160000,
      "Pooja Room": 45000,
      "False Ceiling": 120000,
      "Working Table": 22000,
      "Dressing Table": 18000,
      "Flooring": 72000,
      "Lighting": 75000,
      "Painting": 125000,
      "Electrical": 100000,
      "Semi - Home Automation": 200000,
      "Full Home Automation": 375000,
      "3D Designing": 62500,
      "2 D Design": 37500,
      "Dining Area": 125000,
      "Drawing Room": 175000,
      "Foyer": 37500
    },
    "Premium": {
      "Tv Unit": 45000,
      "Wardrobe": 520000,
      "Kitchen": 250000,
      "Vanity": 55000,
      "Bathroom": 240000,
      "Pooja Room": 75000,
      "False Ceiling": 180000,
      "Working Table": 30000,
      "Dressing Table": 25000,
      "Flooring": 100000,
      "Lighting": 125000,
      "Painting": 200000,
      "Electrical": 150000,
      "Semi - Home Automation": 300000,
      "Full Home Automation": 625000,
      "3D Designing": 100000,
      "2 D Design": 62500,
      "Dining Area": 200000,
      "Drawing Room": 250000,
      "Foyer": 62500
    }
  },
  "Villa": {
    "Medium": {
      "Tv Unit": 25000,
      "Wardrobe": 350000,
      "Kitchen": 150000,
      "Vanity": 30000,
      "Bathroom": 150000,
      "Pooja Room": 40000,
      "False Ceiling": 120000,
      "Working Table": 25000,
      "Dressing Table": 20000,
      "Flooring": 80000,
      "Lighting": 70000,
      "Painting": 105000,
      "Electrical": 87500,
      "Semi - Home Automation": 175000,
      "Full Home Automation": 350000,
      "3D Designing": 52500,
      "2 D Design": 35000,
      "Dining Area": 105000,
      "Drawing Room": 140000,
      "Foyer": 35000
    },
    "High": {
      "Tv Unit": 45000,
      "Wardrobe": 480000,
      "Kitchen": 220000,
      "Vanity": 50000,
      "Bathroom": 240000,
      "Pooja Room": 65000,
      "False Ceiling": 180000,
      "Working Table": 35000,
      "Dressing Table": 28000,
      "Flooring": 112000,
      "Lighting": 105000,
      "Painting": 175000,
      "Electrical": 140000,
      "Semi - Home Automation": 280000,
      "Full Home Automation": 525000,
      "3D Designing": 87500,
      "2 D Design": 52500,
      "Dining Area": 175000,
      "Drawing Room": 245000,
      "Foyer": 52500
    },
    "Premium": {
      "Tv Unit": 65000,
      "Wardrobe": 650000,
      "Kitchen": 350000,
      "Vanity": 80000,
      "Bathroom": 360000,
      "Pooja Room": 100000,
      "False Ceiling": 280000,
      "Working Table": 50000,
      "Dressing Table": 40000,
      "Flooring": 160000,
      "Lighting": 175000,
      "Painting": 280000,
      "Electrical": 210000,
      "Semi - Home Automation": 420000,
      "Full Home Automation": 875000,
      "3D Designing": 140000,
      "2 D Design": 87500,
      "Dining Area": 280000,
      "Drawing Room": 350000,
      "Foyer": 87500
    }
  },
  "Building": {
    "Medium": {
      "Tv Unit": 50000,
      "Wardrobe": 700000,
      "Kitchen": 300000,
      "Vanity": 60000,
      "Bathroom": 300000,
      "Pooja Room": 80000,
      "False Ceiling": 250000,
      "Working Table": 40000,
      "Dressing Table": 35000,
      "Flooring": 140000,
      "Lighting": 120000,
      "Painting": 180000,
      "Electrical": 150000,
      "Semi - Home Automation": 300000,
      "Full Home Automation": 600000,
      "3D Designing": 90000,
      "2 D Design": 60000,
      "Dining Area": 180000,
      "Drawing Room": 240000,
      "Foyer": 60000
    },
    "High": {
      "Tv Unit": 90000,
      "Wardrobe": 950000,
      "Kitchen": 450000,
      "Vanity": 100000,
      "Bathroom": 480000,
      "Pooja Room": 130000,
      "False Ceiling": 380000,
      "Working Table": 60000,
      "Dressing Table": 50000,
      "Flooring": 200000,
      "Lighting": 180000,
      "Painting": 300000,
      "Electrical": 240000,
      "Semi - Home Automation": 480000,
      "Full Home Automation": 900000,
      "3D Designing": 150000,
      "2 D Design": 90000,
      "Dining Area": 300000,
      "Drawing Room": 420000,
      "Foyer": 90000
    },
    "Premium": {
      "Tv Unit": 130000,
      "Wardrobe": 1300000,
      "Kitchen": 700000,
      "Vanity": 160000,
      "Bathroom": 720000,
      "Pooja Room": 200000,
      "False Ceiling": 580000,
      "Working Table": 80000,
      "Dressing Table": 70000,
      "Flooring": 280000,
      "Lighting": 300000,
      "Painting": 480000,
      "Electrical": 360000,
      "Semi - Home Automation": 720000,
      "Full Home Automation": 1500000,
      "3D Designing": 240000,
      "2 D Design": 150000,
      "Dining Area": 480000,
      "Drawing Room": 600000,
      "Foyer": 150000
    }
  }
};

const BudgetCalculator: React.FC = () => {
  const [propertyType, setPropertyType] = useState<PropertyType | "">("");
  const [qualityTier, setQualityTier] = useState<QualityTier>("Medium");
  const [itemQuantities, setItemQuantities] = useState<
    Record<ItemType, number>
  >({
    "Tv Unit": 0,
    "Wardrobe": 0,
    "Kitchen": 0,
    "Vanity": 0,
    "Bathroom": 0,
    "Pooja Room": 0,
    "False Ceiling": 0,
    "Working Table": 0,
    "Dressing Table": 0,
    "Flooring": 0,
    "Lighting": 0,
    "Painting": 0,
    "Electrical": 0,
    "Semi - Home Automation": 0,
    "Full Home Automation": 0,
    "3D Designing": 0,
    "2 D Design": 0,
    "Dining Area": 0,
    "Drawing Room": 0,
    "Foyer": 0
});
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [phone, setPhone] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);
  const quotationRef = useRef<HTMLDivElement>(null);

  const handleWhatsAppRedirect = () => {
    const selectedDetails = (Object.keys(itemQuantities) as ItemType[])
      .filter((item) => itemQuantities[item] > 0)
      .map((item) => `${item} (x${itemQuantities[item]})`)
      .join("\n- ");
      
    const text = `Hi Naya Luxe team!
I am looking for an interior quotation for my property.
*My Contact Number:* ${phone}
*Property:* ${propertyType}
*Quality:* ${qualityTier}

*Selected Items:*
- ${selectedDetails}

*Estimated Cost:* ₹${estimatedCost?.toLocaleString()}

If you need a floor plan, just ping me back or reply me back.`;
    
    const companyWhatsapp = '918096450170';
    window.open(`https://wa.me/${companyWhatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

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
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 50);
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

    autoTable(doc, {
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

    // Contact Footer
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Hyderabad, India | nayaluxe2@gmail.com", pageWidth / 2, finalY + 50, { align: "center" });
    doc.text("+91 809 64 50 170 | +91 809 64 50 178", pageWidth / 2, finalY + 55, { align: "center" });

    doc.save(`NayaLuxe_Quotation_${Date.now()}.pdf`);
  };

  const handleDownloadJPG = async () => {
    if (!quotationRef.current) return;
    try {
      const canvas = await html2canvas(quotationRef.current, { scale: 2, backgroundColor: '#ffffff' });
      const image = canvas.toDataURL("image/jpeg", 1.0);
      const link = document.createElement("a");
      link.href = image;
      link.download = `NayaLuxe_Quotation_${Date.now()}.jpg`;
      link.click();
    } catch (err) {
      console.error("Failed to download image", err);
    }
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
                  const isMulti = ["Wardrobe", "Vanity", "Bathroom", "Working Table", "Dressing Table"].includes(item);

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

                  {!isRevealed ? (
                    <div className="max-w-md mx-auto mb-6 text-left">
                      <p className="text-sm text-gray-600 mb-6 text-center">
                        Please provide your contact number. Once you click enter, the quotation will be revealed to you and the details will be sent via WhatsApp!
                      </p>
                      <div className="flex flex-col gap-4">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            placeholder="e.g. 8096450170"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && phone.length >= 10) {
                                e.preventDefault();
                                handleWhatsAppRedirect();
                                setIsRevealed(true);
                              }
                            }}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 font-medium text-lg shadow-inner"
                            maxLength={15}
                          />
                        </div>
                        <button
                          onClick={() => {
                            handleWhatsAppRedirect();
                            setIsRevealed(true);
                          }}
                          disabled={phone.length < 10}
                          className={`w-full font-bold py-3 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                            phone.length >= 10
                              ? "bg-[#25d366] text-white shadow-lg shadow-[#25d366]/20 hover:bg-[#128c7e] active:scale-95 cursor-pointer"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          <MessageCircle className="w-5 h-5" />
                          Reveal Quotation
                        </button>
                        <p className="text-xs text-slate-500/80 text-center flex items-center justify-center gap-1.5 mt-2 font-medium">
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                          Your contact is safe, we protect your privacy and we will never disclose your details.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="max-w-xl mx-auto flex flex-col items-center gap-6"
                    >
                      <div ref={quotationRef} className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-green-100 w-full relative overflow-hidden">
                        <div className="mb-6 z-10 relative border-b border-gray-100 pb-6 text-left">
                          <h4 className="font-bold text-lg md:text-xl text-gray-900 mb-4">Quotation Summary</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm mb-5">
                            <div>
                              <span className="text-gray-500 block text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">Property</span>
                              <span className="font-semibold text-gray-800 text-sm md:text-base">{propertyType}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">Quality</span>
                              <span className="font-semibold text-gray-800 text-sm md:text-base">{qualityTier}</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2">Selected Items</span>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 pl-4 list-disc marker:text-brand-gold text-gray-800 font-medium text-sm md:text-base">
                              {(Object.keys(itemQuantities) as ItemType[])
                                .filter((item) => itemQuantities[item] > 0)
                                .map((item) => (
                                  <li key={item}>
                                    {item} <span className="text-gray-400 font-normal ml-1">(x{itemQuantities[item]})</span>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>

                        <div className="absolute -top-10 -right-10 text-green-50 opacity-50 pointer-events-none z-0">
                          <IndianRupee className="w-32 h-32 md:w-40 md:h-40" />
                        </div>
                        <div className="relative z-10 text-center">
                          <h5 className="text-gray-500 font-medium text-xs md:text-sm uppercase tracking-wider mb-2 mt-2">Estimated Total Cost</h5>
                          <div className="flex items-center justify-center gap-1.5 md:gap-2">
                            <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
                              ₹{estimatedCost.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 text-xs md:text-sm text-gray-700 mt-1 md:mt-2 bg-amber-50 p-3 md:p-4 rounded-xl border border-amber-200 text-left shadow-sm flex items-start gap-2.5 w-full">
                        <span className="text-lg md:text-xl leading-none shrink-0">💡</span>
                        <p className="leading-relaxed">
                          Don't worry, this is only an <strong>approximate amount</strong> for your idea. The real budget depends on materials—please schedule a call for clear-cut clarity.
                        </p>
                      </div>

                      <div className="flex flex-col items-center gap-4 w-full px-2 mt-2">
                        <button
                          onClick={handleWhatsAppRedirect}
                          className="w-full sm:w-auto font-bold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 bg-[#25d366] text-white shadow-md shadow-[#25d366]/20 hover:bg-[#128c7e] active:scale-95 text-sm md:text-base border border-transparent"
                        >
                          <MessageCircle className="w-5 h-5" />
                          Send via WhatsApp again
                        </button>
                        
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-xs text-gray-500 font-medium">Download as:</span>
                          <button
                            onClick={handleDownloadPDF}
                            className="flex items-center justify-center gap-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 py-1.5 px-3 rounded-lg transition-colors text-xs font-bold border border-blue-200 shadow-sm"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            PDF
                          </button>
                          <button
                            onClick={handleDownloadJPG}
                            className="flex items-center justify-center gap-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 py-1.5 px-3 rounded-lg transition-colors text-xs font-bold border border-indigo-200 shadow-sm"
                          >
                            <ImageDown className="w-3.5 h-3.5" />
                            JPG
                          </button>
                        </div>
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
