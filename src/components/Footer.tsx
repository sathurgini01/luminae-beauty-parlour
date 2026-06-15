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
    <footer className="relative overflow-hidden bg-[#251617] text-[#FFF7F8] border-t border-[#D95F8D]/20 animate-fadeIn" id="app-footer">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,95,141,0.18),transparent_32%),linear-gradient(135deg,rgba(255,244,245,0.04),transparent_45%)]" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Column 1 - Brand Info */}
          <div className="space-y-4 font-sans">
            <div className="flex items-center gap-3">
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FFF4F5] text-[#AF2B2D] ring-1 ring-white/20 shadow-[0_10px_28px_rgba(0,0,0,0.22)]">
                <span className="absolute inset-1.5 rounded-xl border border-white/85" />
                <span className="absolute left-2.5 top-2 text-[21px] font-serif italic leading-none text-[#D95F8D]">L</span>
                <Scissors className="relative ml-2 mt-2 h-6 w-6 rotate-[-28deg]" strokeWidth={1.7} />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#F8B8BE]" />
                <span className="absolute bottom-3 left-3.5 h-px w-7 rounded-full bg-[#AF2B2D]/35" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-3xl font-serif tracking-tight font-medium text-white selection:bg-transparent">
                  Luminae <span className="text-[#F8B8BE]">Beauty</span>
                </span>
                <span className="block text-[8px] uppercase font-extrabold tracking-[0.26em] text-[#F8B8BE]/75 leading-none mt-1.5">
                  Beauty & Parlour
                </span>
              </span>
            </div>
            <p className="text-xs text-white/62 leading-relaxed font-sans pt-2">
              Sri Lanka's premium boutique for modern hair, glowing skin, men's grooming, event styling, and calm self-care rituals.
            </p>
            <div className="pt-2 text-[10px] text-white/42 space-y-1 font-mono">
              <div>REG NO: LPV-48593/SL</div>
              <div>MOH PERMIT: MOH/COL/BP-43</div>
            </div>
          </div>

          {/* Column 2 - Core Locations */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold tracking-widest text-[#F8B8BE] uppercase font-sans">Our Parlours</h3>
            <ul className="text-xs space-y-4 text-white/62">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#F8B8BE] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-serif text-[13px] text-white">Colombo 07 Flagship</span>
                  <span className="text-white/45 leading-relaxed pt-0.5 block text-[11px]">45, Wijerama Mawatha, Colombo 7</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#F8B8BE] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-serif text-[13px] text-white">Kandy Luxury Suite</span>
                  <span className="text-white/45 leading-relaxed pt-0.5 block text-[11px]">Level 2, Kandy City Centre, Kandy</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3 - Operating Hours */}
          <div className="space-y-4 font-sans">
            <h3 className="text-[11px] font-bold tracking-widest text-[#F8B8BE] uppercase">Hours & Availability</h3>
            <ul className="text-xs space-y-2 text-white/62">
              <li className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#F8B8BE]" />
                <span>Tue – Fri: 09:00 AM – 07:00 PM</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#F8B8BE]" />
                <span>Sat – Sun: 08:30 AM – 08:00 PM</span>
              </li>
              <li className="flex items-center gap-2 text-[#F8B8BE]">
                <Clock className="h-3.5 w-3.5" />
                <span className="font-semibold">Monday: Closed for Sanitization</span>
              </li>
              <li className="pt-2 border-t border-white/10 text-[10px] text-white/42 leading-relaxed">
                * Wedding, groom, and event styling is available from 04:00 AM on request.
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact & Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold tracking-widest text-[#F8B8BE] uppercase font-sans">Hotlines & Support</h3>
            <ul className="text-xs space-y-2.5 text-white/62 font-sans">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#F8B8BE]" />
                <a href="tel:+94771234567" className="hover:text-[#F8B8BE] transition-colors font-mono">+94 77 123 4567</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#F8B8BE]" />
                <a href="tel:+94112345678" className="hover:text-[#F8B8BE] transition-colors font-mono">+94 11 234 5678</a>
              </li>
              <li className="flex items-center gap-2 font-mono">
                <Mail className="h-3.5 w-3.5 text-[#F8B8BE]" />
                <a href="mailto:appointments@luminae.lk" className="hover:text-[#F8B8BE] text-[11px] break-all transition-colors">appointments@luminae.lk</a>
              </li>
            </ul>
            <div className="pt-2">
              <button 
                onClick={() => onNavigate("book")}
                className="w-full py-2.5 bg-[#D95F8D] hover:bg-[#F8B8BE] hover:text-[#251617] text-white text-[10px] uppercase font-semibold tracking-widest rounded-full shadow-lg shadow-black/20 transition-all duration-300 cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
            <div className="pt-2 flex flex-wrap gap-2">
              {["Instagram", "Facebook", "TikTok"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/55 hover:text-[#F8B8BE] hover:border-[#F8B8BE]/40 transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="relative border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-white/42 font-sans gap-4">
          <div className="flex items-center gap-1">
            <span>© 2026 LUMINAE Ceylon. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1.5 font-sans">
            <span>Crafted with pure respect in Sri Lanka</span>
            <Heart className="h-3 w-3 text-[#F8B8BE] fill-[#F8B8BE]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
