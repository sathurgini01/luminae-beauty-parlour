/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Phone, Mail, MapPin, Clock, Heart, Scissors } from "lucide-react";

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-white text-[#2C2C2A] border-t border-[#F3C7D4]/45 animate-fadeIn" id="app-footer">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Column 1 - Brand Info */}
          <div className="space-y-4 font-sans">
            <div className="flex items-center gap-3">
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FFF4F5] text-[#D95F8D] ring-1 ring-[#F3C7D4] shadow-sm">
                <Scissors className="h-6 w-6 rotate-[-22deg]" />
                <span className="absolute right-1.5 top-2.5 h-3 w-3 rounded-full bg-[#F8B8BE]" />
                <span className="absolute bottom-2.5 left-2 h-1.5 w-6 rounded-full bg-[#2C2C2A]/70 rotate-[-24deg]" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-3xl font-serif tracking-tight font-extralight text-[#2C2C2A] selection:bg-transparent">
                  Luminae<span className="text-[#D95F8D]">Beauty</span>
                </span>
                <span className="block text-[8px] uppercase font-bold tracking-[0.34em] text-[#2C2C2A]/55 leading-none mt-1">
                  Beauty & Self Care
                </span>
              </span>
            </div>
            <p className="text-xs text-[#2C2C2A]/55 leading-relaxed font-sans pt-2">
              Sri Lanka's premium boutique for modern hair, glowing skin, bridal styling, and calm self-care rituals.
            </p>
            <div className="pt-2 text-[10px] text-[#2C2C2A]/45 space-y-1 font-mono">
              <div>REG NO: LPV-48593/SL</div>
              <div>MOH PERMIT: MOH/COL/BP-43</div>
            </div>
          </div>

          {/* Column 2 - Core Locations */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold tracking-widest text-[#AF2B2D] uppercase font-sans">Our Parlours</h3>
            <ul className="text-xs space-y-4 text-[#2C2C2A]/65">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#AF2B2D] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-serif text-[13px] text-[#2C2C2A]">Colombo 07 Flagship</span>
                  <span className="text-[#2C2C2A]/50 leading-relaxed pt-0.5 block text-[11px]">45, Wijerama Mawatha, Colombo 7</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#AF2B2D] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-serif text-[13px] text-[#2C2C2A]">Kandy Luxury Suite</span>
                  <span className="text-[#2C2C2A]/50 leading-relaxed pt-0.5 block text-[11px]">Level 2, Kandy City Centre, Kandy</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3 - Operating Hours */}
          <div className="space-y-4 font-sans">
            <h3 className="text-[11px] font-bold tracking-widest text-[#AF2B2D] uppercase">Hours & Availability</h3>
            <ul className="text-xs space-y-2 text-[#2C2C2A]/65">
              <li className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#AF2B2D]" />
                <span>Tue – Fri: 09:00 AM – 07:00 PM</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#AF2B2D]" />
                <span>Sat – Sun: 08:30 AM – 08:00 PM</span>
              </li>
              <li className="flex items-center gap-2 text-[#AF2B2D]">
                <Clock className="h-3.5 w-3.5" />
                <span className="font-semibold">Monday: Closed for Sanitization</span>
              </li>
              <li className="pt-2 border-t border-[#2C2C2A]/10 text-[10px] text-[#2C2C2A]/45 leading-relaxed">
                * Kandyan Bridal styling is available from 04:00 AM on request.
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact & Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold tracking-widest text-[#AF2B2D] uppercase font-sans">Hotlines & Support</h3>
            <ul className="text-xs space-y-2.5 text-[#2C2C2A]/65 font-sans">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#AF2B2D]" />
                <a href="tel:+94771234567" className="hover:text-[#AF2B2D] transition-colors font-mono">+94 77 123 4567</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#AF2B2D]" />
                <a href="tel:+94112345678" className="hover:text-[#AF2B2D] transition-colors font-mono">+94 11 234 5678</a>
              </li>
              <li className="flex items-center gap-2 font-mono">
                <Mail className="h-3.5 w-3.5 text-[#AF2B2D]" />
                <a href="mailto:appointments@luminae.lk" className="hover:text-[#AF2B2D] text-[11px] break-all transition-colors">appointments@luminae.lk</a>
              </li>
            </ul>
            <div className="pt-2">
              <button 
                onClick={() => onNavigate("book")}
                className="w-full py-2.5 bg-[#D95F8D] hover:bg-[#C94D7C] text-white text-[10px] uppercase font-semibold tracking-widest rounded-full shadow transition-all duration-300 cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-[#2C2C2A]/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#2C2C2A]/45 font-sans gap-4">
          <div className="flex items-center gap-1">
            <span>© 2026 LUMINAE Ceylon. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1.5 font-sans">
            <span>Crafted with pure respect in Sri Lanka</span>
            <Heart className="h-3 w-3 text-[#AF2B2D] fill-[#AF2B2D]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
