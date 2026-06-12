/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useAppState } from "../context/AppContext";
import { Sparkles, Menu, X, User, LogOut, ShieldAlert, Scissors, CalendarCheck2 } from "lucide-react";
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
        name: "Sathurgini Rajendran",
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
    if (!currentUser) return "bg-gray-100 text-gray-700 border-gray-200";
    if (currentUser.role === "admin") return "bg-pink-100 text-pink-700 border-pink-200";
    if (currentUser.role === "worker") return "bg-emerald-100 text-emerald-800 border-emerald-200";
    return "bg-teal-100 text-teal-800 border-teal-200";
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF8F6]/95 backdrop-blur-md border-b border-[#2C2C2A]/10 animate-slideDown" id="main-nav-bar">
      {/* Top Simulator Banner */}
      <div className="bg-[#FAF8F6] border-b border-[#2C2C2A]/5 py-1.5 px-4 text-[10px] uppercase tracking-wider font-mono text-[#2C2C2A] flex justify-between items-center z-50">
        <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#1D9E75] animate-pulse"></span>
          <span className="font-semibold text-[#7B3224]">Demo Mode:</span>
          <span className="hidden sm:inline opacity-60">Switch active personas to preview multi-role views instantly</span>
        </div>
        <div className="relative">
          <button 
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-none border text-[9px] font-bold tracking-widest uppercase transition-all cursor-pointer ${getRoleColor()}`}
            id="role-indicator-button"
            aria-expanded={isRoleDropdownOpen}
            aria-haspopup="true"
          >
            <span>Role: {getRoleLabel()}</span>
            <span className="text-[8px]">▼</span>
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-60 bg-[#FAF8F6] border border-[#2C2C2A]/15 rounded shadow-xl py-1 z-50 animate-fadeIn">
              <div className="px-3.5 py-2 border-b border-[#2C2C2A]/10 bg-white">
                <span className="block text-[10px] text-[#2C2C2A] font-bold tracking-widest uppercase">Select Persona:</span>
                <span className="block text-[9px] text-[#2C2C2A]/60 lowercase">Instantly loads private workspace UI</span>
              </div>
              
              <button 
                onClick={() => handleRoleSwitch("admin")}
                className="w-full text-left px-3.5 py-2 text-xs text-gray-800 hover:bg-white flex items-center justify-between transition-colors border-l-2 border-transparent hover:border-[#7B3224]"
              >
                <span className="font-medium">👩‍💼 Priyanthi (Admin / Owner)</span>
                <span className="text-[10px] bg-amber-100 text-[#7B3224] px-1.5 py-0.5 rounded">Owner</span>
              </button>

              <button 
                onClick={() => handleRoleSwitch("worker")}
                className="w-full text-left px-3.5 py-2 text-xs text-gray-800 hover:bg-white flex items-center justify-between transition-colors border-l-2 border-transparent hover:border-[#1D9E75]"
              >
                <span className="font-medium">💇‍♀️ Anusha Perera (Beautician)</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-850 px-1.5 py-0.5 rounded">Worker</span>
              </button>

              <button 
                onClick={() => handleRoleSwitch("customer")}
                className="w-full text-left px-3.5 py-2 text-xs text-gray-800 hover:bg-white flex items-center justify-between transition-colors border-l-2 border-transparent hover:border-teal-500"
              >
                <span className="font-medium">🌸 Sathurgini (Loyal Client)</span>
                <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded">Client</span>
              </button>

              <button 
                onClick={() => handleRoleSwitch("guest")}
                className="w-full text-left px-3.5 py-2 text-xs text-gray-800 hover:bg-white flex items-center justify-between transition-colors border-l-2 border-transparent hover:border-gray-400"
              >
                <span className="font-medium">🌐 Guest Visitor (Public Site)</span>
                <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">Visitor</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            {/* Brand Logo */}
            <button 
              onClick={() => handleNavClick("landing")}
              className="flex flex-col items-start group focus:outline-none rounded-lg p-1 text-left cursor-pointer"
            >
              <h1 className="text-3xl sm:text-4xl font-serif tracking-tight font-extralight text-[#7B3224] leading-none mb-0.5 transition-colors group-hover:text-[#2C2C2A] selection:bg-transparent">
                LUMINAE
              </h1>
              <p className="text-[9px] tracking-[0.25em] font-sans font-semibold uppercase opacity-60 leading-none text-[#2C2C2A]">
                The Sri Lankan Beauty Standard
              </p>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:ml-12 md:flex md:space-x-8 text-[11px] uppercase tracking-widest font-semibold">
              <button 
                onClick={() => handleNavClick("landing")}
                className={`inline-flex items-center px-1 pt-1 border-b-2 transition-all cursor-pointer ${
                  activeView === "landing" ? "border-[#7B3224] text-[#7B3224]" : "border-transparent text-[#2C2C2A]/70 hover:text-[#7B3224] hover:border-[#7B3224]/30"
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick("services")}
                className={`inline-flex items-center px-1 pt-1 border-b-2 transition-all cursor-pointer ${
                  activeView === "services" ? "border-[#7B3224] text-[#7B3224]" : "border-transparent text-[#2C2C2A]/70 hover:text-[#7B3224] hover:border-[#7B3224]/30"
                }`}
              >
                Services Menu
              </button>
              <button 
                onClick={() => handleNavClick("packages")}
                className={`inline-flex items-center px-1 pt-1 border-b-2 transition-all cursor-pointer ${
                  activeView === "packages" ? "border-[#7B3224] text-[#7B3224]" : "border-transparent text-[#2C2C2A]/70 hover:text-[#7B3224] hover:border-[#7B3224]/30"
                }`}
              >
                Packages
              </button>
              <button 
                onClick={() => handleNavClick("trends")}
                className={`inline-flex items-center px-1 pt-1 border-b-2 transition-all cursor-pointer ${
                  activeView === "trends" ? "border-[#7B3224] text-[#7B3224]" : "border-transparent text-[#2C2C2A]/70 hover:text-[#7B3224] hover:border-[#7B3224]/30"
                }`}
              >
                2025 SL Trends
              </button>
              <button 
                onClick={() => handleNavClick("story")}
                className={`inline-flex items-center px-1 pt-1 border-b-2 transition-all cursor-pointer ${
                  activeView === "story" ? "border-[#7B3224] text-[#7B3224]" : "border-transparent text-[#2C2C2A]/70 hover:text-[#7B3224] hover:border-[#7B3224]/30"
                }`}
              >
                Our Story
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
                      activeView.startsWith("admin") ? "bg-[#7B3224] text-white border-transparent" : "bg-[#FAF8F6] text-[#7B3224] border-rose-200/50 hover:bg-rose-50"
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
                      activeView.startsWith("worker") ? "bg-emerald-600 text-white border-transparent" : "bg-[#FAF8F6] text-emerald-800 border-emerald-200/50 hover:bg-emerald-50"
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
                      activeView.startsWith("customer") ? "bg-teal-600 text-white border-transparent" : "bg-[#FAF8F6] text-teal-800 border-teal-200/50 hover:bg-teal-50"
                    }`}
                  >
                    <User className="h-3.5 w-3.5" />
                    My Portal
                  </button>
                )}

                <button 
                  onClick={() => handleNavClick("book")}
                  className="px-4 py-1.5 bg-[#1D9E75] hover:bg-[#15825f] text-white font-bold text-xs rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  Book Instant
                </button>

                <button 
                  onClick={() => {
                    logout();
                    handleNavClick("landing");
                  }}
                  className="p-1.5 text-[#2C2C2A]/60 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="h-4.5 w-4.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleNavClick("login")}
                  className="text-xs font-bold text-[#2C2C2A]/80 hover:text-[#7B3224] px-3 py-1.5 cursor-pointer"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => handleNavClick("register")}
                  className="text-xs font-bold text-white bg-[#7B3224] hover:bg-[#63271b] px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                >
                  Join / Member
                </button>
                <button 
                  onClick={() => handleNavClick("book")}
                  className="px-4 py-1.5 bg-[#1D9E75] hover:bg-[#15825f] text-white font-bold text-xs rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            )}
          </div>

          {/* Menù Hamburger trigger for mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-[#2C2C2A]/75 hover:text-[#7B3224] focus:outline-none focus:ring-2 focus:ring-[#7B3224]/30 rounded-lg animate-pulse"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-rose-100 shadow-md">
          <div className="px-2 pt-2.5 pb-4 space-y-1">
            <button 
              onClick={() => handleNavClick("landing")}
              className={`block w-full text-left px-3 py-2 text-xs font-bold rounded-md ${
                activeView === "landing" ? "bg-rose-50 text-[#7B3224]" : "text-gray-700 hover:bg-rose-50/50"
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick("services")}
              className={`block w-full text-left px-3 py-2 text-xs font-bold rounded-md ${
                activeView === "services" ? "bg-rose-50 text-[#7B3224]" : "text-gray-700 hover:bg-rose-50/50"
              }`}
            >
              Services Menu
            </button>
            <button 
              onClick={() => handleNavClick("packages")}
              className={`block w-full text-left px-3 py-2 text-xs font-bold rounded-md ${
                activeView === "packages" ? "bg-rose-50 text-[#7B3224]" : "text-gray-700 hover:bg-rose-50/50"
              }`}
            >
              Packages
            </button>
            <button 
              onClick={() => handleNavClick("trends")}
              className={`block w-full text-left px-3 py-2 text-xs font-bold rounded-md ${
                activeView === "trends" ? "bg-rose-50 text-[#7B3224]" : "text-gray-700 hover:bg-rose-50/50"
              }`}
            >
              2025 SL Trends
            </button>
            <button 
              onClick={() => handleNavClick("story")}
              className={`block w-full text-left px-3 py-2 text-xs font-bold rounded-md ${
                activeView === "story" ? "bg-rose-50 text-[#7B3224]" : "text-gray-700 hover:bg-rose-50/50"
              }`}
            >
              Our Story
            </button>

            <div className="border-t border-rose-50 pt-3 mt-3 px-3">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 font-semibold">Active: {getRoleLabel()}</div>
                  {currentUser.role === "admin" && (
                    <button 
                      onClick={() => handleNavClick("admin-dashboard")}
                      className="w-full text-center py-2 text-xs font-bold bg-[#7B3224] text-white rounded-lg shadow-sm"
                    >
                      Admin Settings
                    </button>
                  )}
                  {currentUser.role === "worker" && (
                    <button 
                      onClick={() => handleNavClick("worker-dashboard")}
                      className="w-full text-center py-2 text-xs font-bold bg-emerald-600 text-white rounded-lg shadow-sm"
                    >
                      Worker Calendar
                    </button>
                  )}
                  {currentUser.role === "customer" && (
                    <button 
                      onClick={() => handleNavClick("customer-dashboard")}
                      className="w-full text-center py-2 text-xs font-bold bg-teal-600 text-white rounded-lg shadow-sm"
                    >
                      My Dashboard Portal
                    </button>
                  )}

                  <button 
                    onClick={() => handleNavClick("book")}
                    className="w-full text-center py-2 text-xs font-bold bg-[#1D9E75] text-white rounded-lg shadow-sm mt-1"
                  >
                    Instant booking
                  </button>

                  <button 
                    onClick={() => {
                      logout();
                      handleNavClick("landing");
                    }}
                    className="w-full text-center py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg mt-1"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <button 
                    onClick={() => handleNavClick("login")}
                    className="block w-full text-center py-2 text-xs font-bold text-gray-700 hover:bg-rose-50 border border-gray-200 rounded-md"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => handleNavClick("register")}
                    className="block w-full text-center py-2 text-xs font-bold bg-[#7B3224] text-white rounded-md"
                  >
                    Join / Register
                  </button>
                  <button 
                    onClick={() => handleNavClick("book")}
                    className="block w-full text-center py-2 text-xs font-bold bg-[#1D9E75] text-white rounded-md"
                  >
                    Book Now
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
