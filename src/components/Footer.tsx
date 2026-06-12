/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, Phone, Mail, MapPin, Clock, Heart } from "lucide-react";

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#2C2C2A] text-white/90 border-t border-[#FAF8F6]/10 animate-fadeIn" id="app-footer">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Column 1 - Brand Info */}
          <div className="space-y-4 font-sans">
            <div className="flex flex-col items-start gap-1">
              <span className="text-3xl font-serif tracking-tight font-extralight text-[#7B3224] leading-none mb-0.5 selection:bg-transparent">
                LUMINAE
              </span>
              <span className="block text-[8px] uppercase font-bold tracking-[0.2em] text-[#1D9E75] leading-none">
                Beauty & Parlour
              </span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-sans pt-2">
              Sri Lanka's premiere boutique for modern hair aesthetics, organic skin radiance, and prestigious Traditional Kandyan Bridal excellence.
            </p>
            <div className="pt-2 text-[10px] text-white/40 space-y-1 font-mono">
              <div>REG NO: LPV-48593/SL</div>
              <div>MOH PERMIT: MOH/COL/BP-43</div>
            </div>
          </div>

          {/* Column 2 - Core Locations */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold tracking-widest text-[#7B3224] uppercase font-sans">Our Parlours</h3>
            <ul className="text-xs space-y-4 text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#1D9E75] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-serif text-[13px] text-white">Colombo 07 Flagship</span>
                  <span className="text-white/50 leading-relaxed pt-0.5 block text-[11px]">45, Wijerama Mawatha, Colombo 7</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#1D9E75] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-serif text-[13px] text-white">Kandy Luxury Suite</span>
                  <span className="text-white/50 leading-relaxed pt-0.5 block text-[11px]">Level 2, Kandy City Centre, Kandy</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3 - Operating Hours */}
          <div className="space-y-4 font-sans">
            <h3 className="text-[11px] font-bold tracking-widest text-[#7B3224] uppercase">Hours & Availability</h3>
            <ul className="text-xs space-y-2 text-white/70">
              <li className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#7B3224]" />
                <span>Tue – Fri: 09:00 AM – 07:00 PM</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#7B3224]" />
                <span>Sat – Sun: 08:30 AM – 08:00 PM</span>
              </li>
              <li className="flex items-center gap-2 text-rose-300">
                <Clock className="h-3.5 w-3.5" />
                <span className="font-semibold">Monday: Closed for Sanitization</span>
              </li>
              <li className="pt-2 border-t border-white/5 text-[10px] text-white/40 leading-relaxed">
                * Kandyan Bridal styling is available from 04:00 AM on request.
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact & Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold tracking-widest text-[#7B3224] uppercase font-sans">Hotlines & Support</h3>
            <ul className="text-xs space-y-2.5 text-white/70 font-sans">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#1D9E75]" />
                <a href="tel:+94771234567" className="hover:text-white transition-colors font-mono">+94 77 123 4567</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#1D9E75]" />
                <a href="tel:+94112345678" className="hover:text-white transition-colors font-mono">+94 11 234 5678</a>
              </li>
              <li className="flex items-center gap-2 font-mono">
                <Mail className="h-3.5 w-3.5 text-[#1D9E75]" />
                <a href="mailto:appointments@luminae.lk" className="hover:text-white text-[11px] break-all transition-colors">appointments@luminae.lk</a>
              </li>
            </ul>
            <div className="pt-2">
              <button 
                onClick={() => onNavigate("book")}
                className="w-full py-2 bg-[#7B3224] hover:bg-[#63271b] text-white text-[10px] uppercase font-semibold tracking-widest rounded-none shadow transition-all duration-300 cursor-pointer"
              >
                Instant Booking
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-white/35 font-sans gap-4">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} LUMINAE Ceylon. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1.5 font-sans">
            <span>Crafted with pure respect in Sri Lanka</span>
            <Heart className="h-3 w-3 text-[#7B3224] fill-[#7B3224]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
