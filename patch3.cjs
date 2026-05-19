const fs = require('fs');
let content = fs.readFileSync('./components/BudgetCalculator.tsx', 'utf-8');

// 1. Imports
content = content.replace(
\`import { Check, Download, Send, Phone, Lock, FileText, IndianRupee } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { auth } from "../firebase";\`,
\`import { Check, Download, Send, Phone, Lock, FileText, IndianRupee, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";\`
);

// 2. States
content = content.replace(
\`  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState("");\`,
\`  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);\`
);

const funcStart = content.indexOf('  const setupRecaptcha = () => {');
const funcEnd = content.indexOf('  const handleDownloadPDF = () => {');
if (funcStart !== -1 && funcEnd !== -1) {
  content = content.slice(0, funcStart) + content.slice(funcEnd);
}

const jsxStartSearch = \`                  <h4 className="text-gray-800 text-xl md:text-2xl font-bold mb-6 tracking-wide font-display">
                    Your Tailored Estimation
                  </h4>\`;
const divSearchEnd = \`                      <div className="flex flex-col sm:flex-row justify-center gap-4 w-full px-4">
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
                </motion.div>\`;

const blockStartIdx = content.indexOf(jsxStartSearch);
const blockEndIdx = content.indexOf(divSearchEnd) + divSearchEnd.length;

if (blockStartIdx !== -1 && blockEndIdx !== -1) {
  const replacementJsx = \`                  <h4 className="text-gray-800 text-xl md:text-2xl font-bold mb-6 tracking-wide font-display">
                    Your Tailored Estimation
                  </h4>
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
                          onClick={() => {
                            const selectedDetailsWhatsApp = (Object.keys(itemQuantities))
                              .filter((item) => itemQuantities[item as ItemType] > 0)
                              .map((item) => item + " (x" + itemQuantities[item as ItemType] + ")")
                              .join("\\n- ");
                            const text = "Hi Naya Luxe team! \\nI am looking for an interior quotation.\\n\\n*Property*: " + propertyType + "\\n*Quality*: " + qualityTier + "\\n\\n*Selected Items*:\\n- " + selectedDetailsWhatsApp + "\\n\\n*Estimated Cost*: ₹" + estimatedCost.toLocaleString();
                            const companyWhatsapp = '919876543210'; 
                            window.open("https://wa.me/" + companyWhatsapp + "?text=" + encodeURIComponent(text), "_blank");
                          }}
                          className="flex-1 font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 bg-[#25d366] text-white shadow-lg shadow-[#25d366]/20 hover:bg-[#128c7e] active:scale-95"
                        >
                          <MessageCircle className="w-5 h-5" />
                          Send via WhatsApp
                        </button>
                        <button
                          onClick={handleDownloadPDF}
                          className="flex-1 font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95"
                        >
                          <FileText className="w-5 h-5" />
                          Download PDF
                        </button>
                      </div>
                    </motion.div>
                </motion.div>\`;
                
  content = content.slice(0, blockStartIdx) + replacementJsx + content.slice(blockEndIdx);
} else {
  console.log("Could not find block boundaries!");
  if (blockStartIdx === -1) console.log("Missing jsxStartSearch");
  if (blockEndIdx < divSearchEnd.length) console.log("Missing divSearchEnd");
}

fs.writeFileSync('./components/BudgetCalculator.tsx', content);
