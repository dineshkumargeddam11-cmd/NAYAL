const fs = require('fs');
let content = fs.readFileSync('./components/BudgetCalculator.tsx', 'utf-8');

content = content.replace(
  'import React, { useState, useEffect } from "react";',
  'import React, { useState, useEffect, useRef } from "react";\nimport html2canvas from "html2canvas";\nimport { ImageDown } from "lucide-react";'
);

content = content.replace(
  'const [estimatedCost, setEstimatedCost] = useState<number | null>(null);',
  'const [estimatedCost, setEstimatedCost] = useState<number | null>(null);\n  const quotationRef = useRef<HTMLDivElement>(null);'
);

// fix phone string in PDF
content = content.replace(
  /`Phone: \+91 \$\{phone\}`/g,
  '`Date: ${new Date().toLocaleDateString()}`'
);

content = content.replace(
  /`NayaLuxe_Quotation_\$\{phone\}\.pdf`/g,
  '`NayaLuxe_Quotation_${Date.now()}.pdf`'
);

const jpgFn = `
  const handleDownloadJPG = async () => {
    if (!quotationRef.current) return;
    try {
      const canvas = await html2canvas(quotationRef.current, { scale: 2, backgroundColor: '#ffffff' });
      const image = canvas.toDataURL("image/jpeg", 1.0);
      const link = document.createElement("a");
      link.href = image;
      link.download = \`NayaLuxe_Quotation_\${Date.now()}.jpg\`;
      link.click();
    } catch (err) {
      console.error("Failed to download image", err);
    }
  };
`;

content = content.replace(
  'const handleDownloadPDF = () => {',
  jpgFn + '\n  const handleDownloadPDF = () => {'
);


const targetJSX = `<div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-green-100 w-full relative overflow-hidden">`;
content = content.replace(targetJSX, `<div ref={quotationRef} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-green-100 w-full relative overflow-hidden">`);

const buttonsJSX = `<button
                        onClick={handleDownloadPDF}
                        className="flex-1 font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95"
                      >
                        <FileText className="w-5 h-5" />
                        Download PDF
                      </button>`;
                      
const newButtonsJSX = `<div className="flex-1 flex gap-2">
                        <button
                          onClick={handleDownloadPDF}
                          className="flex-1 font-bold py-4 px-2 sm:px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95 text-sm sm:text-base"
                        >
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                          PDF
                        </button>
                        <button
                          onClick={handleDownloadJPG}
                          className="flex-1 font-bold py-4 px-2 sm:px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 active:scale-95 text-sm sm:text-base"
                        >
                          <ImageDown className="w-4 h-4 sm:w-5 sm:h-5" />
                          JPG
                        </button>
                      </div>`;

content = content.replace(buttonsJSX, newButtonsJSX);

fs.writeFileSync('./components/BudgetCalculator.tsx', content);
