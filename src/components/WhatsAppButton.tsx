/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { MessageSquare, Send, Check, X, Bell } from "lucide-react";
import { useAppState } from "../context/AppContext";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [userMessage, setUserMessage] = useState("");
  const [isSuccessSent, setIsSuccessSent] = useState(false);
  const { addNotificationCount } = useAppState();

  const templates = [
    {
      label: "👰 Kandyan Bridal Package",
      text: "Hello Luminae, I want to inquire about availability and the 50% deposit process for the Traditional Kandyan Bridal package for a wedding in late 2026. Thanks!"
    },
    {
      label: "🎓 Student Discount",
      text: "Hi Luminae team! I'm a university student. Can I book the LKR 3,500 Student Special package this coming weekend? Here is my student ID card details query."
    },
    {
      label: "💆 Weekend Ayurvedic Spa Session",
      text: "Hello! Quick question: is Shirodhara therapy available at your Colombo 07 branch this coming Sunday afternoon?"
    },
    {
      label: "💅 Nail Art Custom inquiry",
      text: "Hi inside Luminae, I have a photo of custom resort nail art I want Sanduni to paint. Do you accept custom design requests during a luxury gel pedicure?"
    }
  ];

  // Set initial text when opening or shifting template
  const handleSelectTemplate = (idx: number) => {
    setSelectedTemplate(idx);
    setUserMessage(templates[idx].text);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setUserMessage(templates[selectedTemplate].text);
    setIsSuccessSent(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    // Simulate sending message
    setIsSuccessSent(true);
    addNotificationCount(`WhatsApp Enquiry Sent: "${userMessage.substring(0, 30)}..."`);
    
    // Auto-close after a delay
    setTimeout(() => {
      setIsOpen(false);
      setIsSuccessSent(false);
    }, 2800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans" id="whatsapp-widget">
      {/* Floating Action Button */}
      <button
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        className="h-14 w-14 rounded-full bg-[#1D9E75] hover:bg-[#15825f] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-all duration-300 ring-4 ring-emerald-500/10 cursor-pointer animate-bounce relative"
        title="WhatsApp Assistant CRM"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <MessageSquare className="h-6 w-6 stroke-[2.5]" id="whatsapp-icon" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[9px] font-bold text-white items-center justify-center">1</span>
        </span>
      </button>

      {/* Interactive CRM Drawer */}
      {isOpen && (
        <div className="absolute bottom-18 right-0 w-80 sm:w-96 bg-white border border-rose-100/55 rounded-2xl shadow-2xl overflow-hidden z-50 animate-slideUp">
          
          {/* Header */}
          <div className="bg-[#1D9E75] p-4 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-sm">
                  L
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-none">Luminae WhatsApp Representative</h4>
                  <span className="text-[10px] text-emerald-100 flex items-center gap-1 mt-1 font-medium">
                    <span className="h-2 w-2 bg-emerald-300 rounded-full inline-block animate-pulse"></span>
                    Online • Responds within 10 mins
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full"
                aria-label="Close WhatsApp chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-[11px] text-emerald-50/80 mt-2.5 leading-relaxed bg-black/10 p-2 rounded-lg">
              <strong>WhatsApp CRM Tip:</strong> Live bookings are managed via this digital portal. Fill out any quick template message below to notify our senior beauticians.
            </p>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 max-h-[380px] overflow-y-auto bg-[#FAF8F6]">
            {isSuccessSent ? (
              <div className="py-6 text-center space-y-3 animate-fadeIn">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-[#1D9E75] flex items-center justify-center mx-auto shadow-sm">
                  <Check className="h-6 w-6 stroke-[3]" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-800">Message Dispatched Successfully!</h5>
                  <p className="text-[11px] text-gray-500 mt-1 px-4 leading-relaxed">
                    Your enquiry has been received. A Luminae specialist will review your request and text you shortly.
                  </p>
                </div>
                <div className="bg-emerald-50 text-[10px] text-emerald-800 p-2 rounded border border-emerald-100 inline-flex items-center gap-1.5 font-medium">
                  <Bell className="h-3 w-3 animate-bounce" />
                  <span>Our team will follow up soon</span>
                </div>
              </div>
            ) : (
              <>
                {/* Template Chips */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Select Quick Query Template:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {templates.map((tpl, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelectTemplate(i)}
                        className={`text-[10px] font-semibold px-2.5 py-1.5 rounded-full border transition-all text-left cursor-pointer ${
                          selectedTemplate === i
                            ? "bg-[#1D9E75] text-white border-transparent shadow-sm"
                            : "bg-white hover:bg-rose-50 text-gray-700 border-gray-200"
                        }`}
                      >
                        {tpl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Edit Message Form */}
                <form onSubmit={handleSendMessage} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Customize Your Message:
                    </label>
                    <textarea
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      rows={4}
                      className="w-full p-2.5 text-xs text-[#2C2C2A] bg-white border border-rose-200/50 rounded-lg focus:ring-2 focus:ring-[#1D9E75] focus:border-[#1D9E75] focus:outline-none resize-none font-sans"
                      placeholder="Type your custom request here..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-[#1D9E75] hover:bg-[#15825f] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow hover:shadow-lg transition-all cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send WhatsApp Enquiry</span>
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Footer branding */}
          <div className="bg-gray-50 px-4 py-2.5 text-center text-[10px] text-gray-400 border-t border-gray-100 flex items-center justify-center gap-1">
            <span>Powered by</span>
            <span className="font-extrabold text-gray-600">Luminae Smart CRM</span>
          </div>

        </div>
      )}
    </div>
  );
}
