/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useAppState } from "../context/AppContext";
import { Menu, X, User, LogOut, Scissors, CalendarCheck2 } from "lucide-react";
import { UserRole } from "../types";

interface NavbarProps {
  onNavigate: (view: string) => void;
  activeView: string;
}

export default function Navbar({ onNavigate, activeView }: NavbarProps) {
  const { currentUser, logout, setCurrentUserForce } = useAppState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // Simplified navigation support
  const handleNavClick = (view: string) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  const handleRoleSwitch = (role: UserRole | "guest") => {
    if (role === "guest") {
      setCurrentUserForce(null);
      handleNavClick("landing");
    } else if (role === "admin") {
      setCurrentUserForce({
        id: "usr_admin",
        name: "Priyanthi Gunasekara",
        email: "beautician@luminae.lk",
        phone: "+94 77 123 4567",
        role: "admin",
        createdAt: "2024-01-10"
      });
      handleNavClick("admin-dashboard");
    } else if (role === "worker") {
      setCurrentUserForce({
        id: "usr_worker1",
        name: "Anusha Perera",
        email: "anusha@luminae.lk",
        phone: "+94 71 456 7890",
        role: "worker",
        createdAt: "2024-02-15"
      });
      handleNavClick("worker-dashboard");
    } else if (role === "customer") {
      setCurrentUserForce({
        id: "usr_cust1",
        name: "sathurgini kalanan",
        email: "sathurgini@gmail.com",
        phone: "+94 77 555 4321",
        role: "customer",
        createdAt: "2025-03-12"
      });
      handleNavClick("customer-dashboard");
    }
    setIsRoleDropdownOpen(false);
  };

  const getRoleLabel = () => {
    if (!currentUser) return "Guest/Visitor";
    if (currentUser.role === "admin") return "Admin (Owner)";
    if (currentUser.role === "worker") return "Worker (Anusha)";
    if (currentUser.role === "customer") return "Customer (Sathurgini)";
    return currentUser.name;
  };

  const getRoleColor = () => {
    if (!currentUser) return "bg-[#F8F0EC] text-[#2C2C2A]/80 border-[#2C2C2A]/10";
    return "bg-[#F8F0EC] text-[#AF2B2D] border-[#AF2B2D]/20";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#F3C7D4]/45 shadow-sm animate-slideDown" id="main-nav-bar">
      {activeView !== "landing" && (
        <div className="bg-[#F8F0EC] border-b border-[#2C2C2A]/10 py-1.5 px-4 text-[10px] uppercase tracking-wider font-mono text-[#2C2C2A]/70 flex justify-between items-center z-50">
          <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#AF2B2D] animate-pulse"></span>
            <span className="font-semibold text-[#AF2B2D]">Workspace:</span>
            <span className="hidden sm:inline opacity-60">Choose the account area you want to view</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-none border text-[9px] font-bold tracking-widest uppercase transition-all cursor-pointer ${getRoleColor()}`}
              id="role-indicator-button"
              aria-expanded={isRoleDropdownOpen}
              aria-haspopup="true"
              aria-controls="role-switcher-menu"
            >
              <span>Role: {getRoleLabel()}</span>
              <span className="text-[8px]">▼</span>
            </button>

            {isRoleDropdownOpen && (
              <div id="role-switcher-menu" className="absolute right-0 mt-1.5 w-60 bg-[#F8F0EC] border border-[#2C2C2A]/15 rounded shadow-xl py-1 z-50 animate-fadeIn">
                <div className="px-3.5 py-2 border-b border-[#2C2C2A]/10 bg-white">
                  <span className="block text-[10px] text-[#2C2C2A] font-bold tracking-widest uppercase">Account Access:</span>
                  <span className="block text-[9px] text-[#2C2C2A]/60 lowercase">Open a customer, specialist, or owner area</span>
                </div>

                <button
                  onClick={() => handleRoleSwitch("admin")}
                  className="w-full text-left px-3.5 py-2 text-xs text-gray-800 hover:bg-white flex items-center justify-between transition-colors border-l-2 border-transparent hover:border-[#AF2B2D]"
                >
                  <span className="font-medium">Priyanthi (Admin / Owner)</span>
                  <span className="text-[10px] bg-amber-100 text-[#AF2B2D] px-1.5 py-0.5 rounded">Owner</span>
                </button>

                <button
                  onClick={() => handleRoleSwitch("worker")}
                  className="w-full text-left px-3.5 py-2 text-xs text-gray-800 hover:bg-white flex items-center justify-between transition-colors border-l-2 border-transparent hover:border-[#AF2B2D]"
                >
                  <span className="font-medium">Anusha Perera (Beautician)</span>
                  <span className="text-[10px] bg-[#F8F0EC] text-[#AF2B2D] px-1.5 py-0.5 rounded">Worker</span>
                </button>

                <button
                  onClick={() => handleRoleSwitch("customer")}
                  className="w-full text-left px-3.5 py-2 text-xs text-gray-800 hover:bg-white flex items-center justify-between transition-colors border-l-2 border-transparent hover:border-[#AF2B2D]"
                >
                  <span className="font-medium">Sathurgini (Loyal Client)</span>
                  <span className="text-[10px] bg-[#F8F0EC] text-[#AF2B2D] px-1.5 py-0.5 rounded">Client</span>
                </button>

                <button
                  onClick={() => handleRoleSwitch("guest")}
                  className="w-full text-left px-3.5 py-2 text-xs text-gray-800 hover:bg-white flex items-center justify-between transition-colors border-l-2 border-transparent hover:border-gray-400"
                >
                  <span className="font-medium">Guest Visitor (Public Website)</span>
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">Visitor</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            {/* Brand Logo */}
            <button 
              onClick={() => handleNavClick("landing")}
              className="flex items-center gap-3 group focus:outline-none rounded-xl p-1 text-left cursor-pointer"
              aria-label="Go to Luminae Beauty home"
            >
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF4F5] text-[#AF2B2D] ring-1 ring-[#F3C7D4] shadow-[0_8px_20px_rgba(175,43,45,0.12)] group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_24px_rgba(175,43,45,0.18)]">
                <span className="absolute inset-1.5 rounded-xl border border-white/85" />
                <span className="absolute left-2 top-2 text-[19px] font-serif italic leading-none text-[#D95F8D]">L</span>
                <Scissors className="relative ml-2 mt-2 h-5 w-5 rotate-[-28deg]" strokeWidth={1.7} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#F8B8BE]" />
                <span className="absolute bottom-2.5 left-3 h-px w-6 rounded-full bg-[#AF2B2D]/35" />
              </span>
              <span className="flex min-w-0 flex-col leading-none">
                <span className="text-[1.55rem] sm:text-[1.9rem] font-serif tracking-tight font-medium text-[#2C2C2A] selection:bg-transparent">
                  Luminae <span className="text-[#D95F8D]">Beauty</span>
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.26em] font-sans font-extrabold uppercase leading-none text-[#AF2B2D]/75 mt-1.5">
                  Beauty & Parlour
                </span>
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:ml-12 md:flex md:space-x-8 text-[11px] uppercase tracking-widest font-semibold">
              <button 
                onClick={() => handleNavClick("landing")}
                className={`inline-flex items-center px-1 pt-1 border-b-2 transition-all cursor-pointer ${
                  activeView === "landing" ? "border-[#AF2B2D] text-[#AF2B2D]" : "border-transparent text-[#2C2C2A]/70 hover:text-[#AF2B2D] hover:border-[#AF2B2D]/60"
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick("services")}
                className={`inline-flex items-center px-1 pt-1 border-b-2 transition-all cursor-pointer ${
                  activeView === "services" ? "border-[#AF2B2D] text-[#AF2B2D]" : "border-transparent text-[#2C2C2A]/70 hover:text-[#AF2B2D] hover:border-[#AF2B2D]/60"
                }`}
              >
                Services
              </button>
              <button 
                onClick={() => handleNavClick("packages")}
                className={`inline-flex items-center px-1 pt-1 border-b-2 transition-all cursor-pointer ${
                  activeView === "packages" ? "border-[#AF2B2D] text-[#AF2B2D]" : "border-transparent text-[#2C2C2A]/70 hover:text-[#AF2B2D] hover:border-[#AF2B2D]/60"
                }`}
              >
                Packages
              </button>
              <button 
                onClick={() => handleNavClick("trends")}
                className={`inline-flex items-center px-1 pt-1 border-b-2 transition-all cursor-pointer ${
                  activeView === "trends" ? "border-[#AF2B2D] text-[#AF2B2D]" : "border-transparent text-[#2C2C2A]/70 hover:text-[#AF2B2D] hover:border-[#AF2B2D]/60"
                }`}
              >
                Trends
              </button>
              <button 
                onClick={() => handleNavClick("story")}
                className={`inline-flex items-center px-1 pt-1 border-b-2 transition-all cursor-pointer ${
                  activeView === "story" ? "border-[#AF2B2D] text-[#AF2B2D]" : "border-transparent text-[#2C2C2A]/70 hover:text-[#AF2B2D] hover:border-[#AF2B2D]/60"
                }`}
              >
                About Us
              </button>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {currentUser ? (
              <div className="flex items-center gap-3">
                {/* Specific Role Dashboard Quick-Link */}
                {currentUser.role === "admin" && (
                  <button 
                    onClick={() => handleNavClick("admin-dashboard")}
                    className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      activeView.startsWith("admin") ? "bg-[#AF2B2D] text-white border-transparent" : "bg-[#F8F0EC] text-[#AF2B2D] border-rose-200/50 hover:bg-[#F8F0EC]"
                    }`}
                  >
                    <Scissors className="h-3.5 w-3.5" />
                    Admin Control
                  </button>
                )}
                {currentUser.role === "worker" && (
                  <button 
                    onClick={() => handleNavClick("worker-dashboard")}
                    className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      activeView.startsWith("worker") ? "bg-[#AF2B2D] text-white border-transparent" : "bg-[#F8F0EC] text-[#AF2B2D] border-[#AF2B2D]/20 hover:bg-[#F0E2DC]"
                    }`}
                  >
                    <CalendarCheck2 className="h-3.5 w-3.5" />
                    My Schedule
                  </button>
                )}
                {currentUser.role === "customer" && (
                  <button 
                    onClick={() => handleNavClick("customer-dashboard")}
                    className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      activeView.startsWith("customer") ? "bg-[#AF2B2D] text-white border-transparent" : "bg-[#F8F0EC] text-[#AF2B2D] border-[#AF2B2D]/20 hover:bg-[#F0E2DC]"
                    }`}
                  >
                    <User className="h-3.5 w-3.5" />
                    My Portal
                  </button>
                )}

                <button 
                  onClick={() => handleNavClick("book")}
                  className="px-5 py-2 bg-[#D95F8D] hover:bg-[#C94D7C] text-white font-bold text-xs rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  Book Appointment
                </button>

                <button 
                  onClick={() => {
                    logout();
                    handleNavClick("landing");
                  }}
                  className="p-1.5 text-[#2C2C2A]/60 hover:text-[#AF2B2D] rounded-lg hover:bg-[#F8F0EC] transition-colors cursor-pointer"
                  title="Sign Out"
                  aria-label="Sign out"
                >
                  <LogOut className="h-4.5 w-4.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleNavClick("login")}
                  className="text-xs font-bold text-[#2C2C2A]/75 hover:text-[#AF2B2D] px-3 py-1.5 cursor-pointer"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => handleNavClick("register")}
                  className="text-xs font-bold text-[#D95F8D] bg-[#FFF4F5] hover:bg-[#FDECEF] px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                >
                  Join / Member
                </button>
                <button 
                  onClick={() => handleNavClick("book")}
                  className="px-5 py-2 bg-[#D95F8D] hover:bg-[#C94D7C] text-white font-bold text-xs rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  Book Appointment
                </button>
              </div>
            )}
          </div>

          {/* Menù Hamburger trigger for mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-[#2C2C2A]/75 hover:text-[#AF2B2D] focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/40 rounded-lg animate-pulse"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links overlay */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation-menu" className="md:hidden bg-white border-t border-[#2C2C2A]/10 shadow-md">
          <div className="px-2 pt-2.5 pb-4 space-y-1">
            <button 
              onClick={() => handleNavClick("landing")}
              className={`block w-full text-left px-3 py-2 text-xs font-bold rounded-md ${
                activeView === "landing" ? "bg-[#F8F0EC] text-[#AF2B2D]" : "text-[#2C2C2A]/75 hover:bg-[#F8F0EC] hover:text-[#AF2B2D]"
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick("services")}
              className={`block w-full text-left px-3 py-2 text-xs font-bold rounded-md ${
                activeView === "services" ? "bg-[#F8F0EC] text-[#AF2B2D]" : "text-[#2C2C2A]/75 hover:bg-[#F8F0EC] hover:text-[#AF2B2D]"
              }`}
            >
              Services
            </button>
            <button 
              onClick={() => handleNavClick("packages")}
              className={`block w-full text-left px-3 py-2 text-xs font-bold rounded-md ${
                activeView === "packages" ? "bg-[#F8F0EC] text-[#AF2B2D]" : "text-[#2C2C2A]/75 hover:bg-[#F8F0EC] hover:text-[#AF2B2D]"
              }`}
            >
              Packages
            </button>
            <button 
              onClick={() => handleNavClick("trends")}
              className={`block w-full text-left px-3 py-2 text-xs font-bold rounded-md ${
                activeView === "trends" ? "bg-[#F8F0EC] text-[#AF2B2D]" : "text-[#2C2C2A]/75 hover:bg-[#F8F0EC] hover:text-[#AF2B2D]"
              }`}
            >
              Trends
            </button>
            <button 
              onClick={() => handleNavClick("story")}
              className={`block w-full text-left px-3 py-2 text-xs font-bold rounded-md ${
                activeView === "story" ? "bg-[#F8F0EC] text-[#AF2B2D]" : "text-[#2C2C2A]/75 hover:bg-[#F8F0EC] hover:text-[#AF2B2D]"
              }`}
            >
              About Us
            </button>

            <div className="border-t border-[#2C2C2A]/10 pt-3 mt-3 px-3">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="text-xs text-[#2C2C2A]/60 font-semibold">Active: {getRoleLabel()}</div>
                  {currentUser.role === "admin" && (
                    <button 
                      onClick={() => handleNavClick("admin-dashboard")}
                      className="w-full text-center py-2 text-xs font-bold bg-[#AF2B2D] text-white rounded-lg shadow-sm"
                    >
                      Admin Settings
                    </button>
                  )}
                  {currentUser.role === "worker" && (
                    <button 
                      onClick={() => handleNavClick("worker-dashboard")}
                      className="w-full text-center py-2 text-xs font-bold bg-[#AF2B2D] text-white rounded-lg shadow-sm"
                    >
                      Worker Calendar
                    </button>
                  )}
                  {currentUser.role === "customer" && (
                    <button 
                      onClick={() => handleNavClick("customer-dashboard")}
                      className="w-full text-center py-2 text-xs font-bold bg-[#AF2B2D] text-white rounded-lg shadow-sm"
                    >
                      My Dashboard Portal
                    </button>
                  )}

                  <button 
                    onClick={() => handleNavClick("book")}
                    className="w-full text-center py-2 text-xs font-bold bg-[#AF2B2D] text-white rounded-lg shadow-sm mt-1"
                  >
                    Book Appointment
                  </button>

                  <button 
                    onClick={() => {
                      logout();
                      handleNavClick("landing");
                    }}
                    className="w-full text-center py-2 text-xs font-bold text-[#2C2C2A]/75 hover:text-[#AF2B2D] hover:bg-[#F8F0EC] border border-[#2C2C2A]/10 rounded-lg mt-1"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <button 
                    onClick={() => handleNavClick("login")}
                    className="block w-full text-center py-2 text-xs font-bold text-[#2C2C2A]/75 hover:text-[#AF2B2D] hover:bg-[#F8F0EC] border border-[#2C2C2A]/10 rounded-md"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => handleNavClick("register")}
                    className="block w-full text-center py-2 text-xs font-bold bg-[#AF2B2D] text-white rounded-md"
                  >
                    Join / Register
                  </button>
                  <button 
                    onClick={() => handleNavClick("book")}
                    className="block w-full text-center py-2 text-xs font-bold bg-[#AF2B2D] text-white rounded-md"
                  >
                    Book Appointment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
