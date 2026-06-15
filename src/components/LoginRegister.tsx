/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { useAppState } from "../context/AppContext";
import { Sparkles, Mail, Lock, Phone, User, KeyRound, AlertTriangle, ArrowRight } from "lucide-react";
import { UserRole } from "../types";

interface LoginRegisterProps {
  initialMode: "login" | "register" | "forgot";
  onSuccess: (role: UserRole) => void;
  onNavigate: (section: string) => void;
}

export default function LoginRegister({ initialMode, onSuccess, onNavigate }: LoginRegisterProps) {
  const { login, registerCustomer } = useAppState();
  const [mode, setMode] = useState<"login" | "register" | "forgot">(initialMode);
  
  // Login fields
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  
  // Register fields
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  // Forgot Password helper
  const [forgotSent, setForgotSent] = useState(false);

  // Quick template loading helper
  const handleLoadCredentials = (selectedRole: UserRole) => {
    if (selectedRole === "admin") {
      setEmail("beautician@luminae.lk");
      setRole("admin");
    } else if (selectedRole === "worker") {
      setEmail("anusha@luminae.lk");
      setRole("worker");
    } else if (selectedRole === "customer") {
      setEmail("sathurgini@gmail.com");
      setRole("customer");
    }
    setErrorText("");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorText("Please provide an email address.");
      return;
    }

    setIsLoading(true);
    setErrorText("");

    setTimeout(() => {
      const ok = login(email, role);
      setIsLoading(false);
      if (ok) {
        onSuccess(role);
      } else {
        setErrorText("Unmatched registration session.");
      }
    }, 850);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail) {
      setErrorText("Please fill out your name and email.");
      return;
    }

    setIsLoading(true);
    setErrorText("");

    setTimeout(() => {
      registerCustomer(regName, regEmail, regPhone);
      setIsLoading(false);
      onSuccess("customer");
    }, 900);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 font-sans" id="auth-portal-block">
      <div className="bg-white border border-rose-100 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        {/* Header styling */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#D4537E] to-[#FAF8F6] flex items-center justify-center mx-auto border border-pink-100">
            <Sparkles className="h-5 w-5 text-[#D4537E]" />
          </div>
          <div>
            <h2 className="text-lg font-black text-gray-900 tracking-tight">
              {mode === "login" ? "Welcome Back to Luminae" : 
               mode === "register" ? "Become a Luminae Member" : "Reset Portal Password"}
            </h2>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              {mode === "login" ? "Sign in to manage appointments, check loyalty points, and view your beauty or grooming history." :
               mode === "register" ? "Join our loyalty rewards program and reserve hair, skin, grooming, nails, or event styling slots." :
               "Type your email line to retrieve password reset links."}
            </p>
          </div>
        </div>

        {errorText && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-700" />
            <span className="font-medium">{errorText}</span>
          </div>
        )}

        {/* --- FORM 1: LOGIN --- */}
        {mode === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Email Address:</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400 border-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="beautician@luminae.lk or customer@gmail.com"
                  className="w-full bg-[#FAF8F6] border border-rose-100 rounded-lg py-2 pl-10 pr-4 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-pink-300 text-gray-800"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-extrabold text-gray-450 uppercase tracking-wider">Account Type:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full bg-[#FAF8F6] border border-rose-100 p-2.5 text-xs font-sans rounded-lg text-gray-700 focus:outline-none"
              >
                <option value="customer">Customer (sathurgini kalanan)</option>
                <option value="worker">Worker (Anusha Perera / Sanduni)</option>
                <option value="admin">Admin System Owner (Priyanthi)</option>
              </select>
            </div>

            {/* Quick account helper */}
            <div className="p-3.5 bg-rose-50/30 border border-rose-100 rounded-2xl space-y-2">
              <span className="block text-[9px] font-black text-[#D4537E] uppercase tracking-widest leading-none">Quick Login</span>
              <p className="text-[10px] text-gray-400 font-sans leading-none">Use a saved sample account to preview the portal:</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleLoadCredentials("admin")}
                  className="text-[10px] px-2.5 py-1 bg-white border border-rose-200 text-rose-800 rounded-md font-bold cursor-pointer"
                >
                  Fill Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadCredentials("worker")}
                  className="text-[10px] px-2.5 py-1 bg-white border border-emerald-200 text-emerald-800 rounded-md font-bold cursor-pointer"
                >
                  Fill Worker
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadCredentials("customer")}
                  className="text-[10px] px-2.5 py-1 bg-white border border-teal-200 text-teal-800 rounded-md font-bold cursor-pointer"
                >
                  Fill Client
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-[#D4537E] hover:bg-[#b03f63] text-white text-xs font-extrabold rounded-lg shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1 leading-none uppercase tracking-widest disabled:opacity-50"
            >
              <span>{isLoading ? "Signing In..." : "Complete Sign In"}</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>

            <div className="flex justify-between items-center text-[11px] pt-4 border-t border-rose-50 text-gray-400 font-sans">
              <button type="button" onClick={() => setMode("register")} className="hover:underline text-[#D4537E]">Create Member Account</button>
              <button type="button" onClick={() => setMode("forgot")} className="hover:underline">Forgot password?</button>
            </div>
          </form>
        )}

        {/* --- FORM 2: REGISTER --- */}
        {mode === "register" && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Full Name:</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400" />
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Nimisha Fernando"
                  className="w-full bg-[#FAF8F6] border border-rose-100 rounded-lg py-2 pl-10 pr-4 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-pink-300 text-gray-800 block"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Email Address:</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400" />
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="e.g. nimisha@gmail.com"
                  className="w-full bg-[#FAF8F6] border border-rose-100 rounded-lg py-2 pl-10 pr-4 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-pink-300 text-gray-800 block"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Mobile Number (WhatsApp reminders):</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400" />
                <input
                  type="text"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="e.g. +94 77 123 4567"
                  className="w-full bg-[#FAF8F6] border border-rose-100 rounded-lg py-2 pl-10 pr-4 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-pink-300 text-gray-800 block"
                />
              </div>
            </div>

            <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl">
              <p className="text-[10px] text-teal-800 leading-relaxed font-sans">
                <strong>Loyalty Tier Badge:</strong> New registration automatically qualifies for the <strong>Bronze Loyalty Club</strong>! Start accumulating points on your first LKR spend.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-[#D4537E] hover:bg-[#b03f63] text-white text-xs font-extrabold rounded-lg shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1 uppercase tracking-widest disabled:opacity-50"
            >
              <span>{isLoading ? "Saving..." : "Join Rewards Club"}</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>

            <div className="text-center text-[11px] pt-4 border-t border-rose-50 text-gray-400 font-sans">
              Already have an account? <button type="button" onClick={() => setMode("login")} className="hover:underline text-[#D4537E] font-bold">Sign In here</button>
            </div>
          </form>
        )}

        {/* --- FORM 3: FORGOT PASSWORD --- */}
        {mode === "forgot" && (
          <div className="space-y-4">
            {forgotSent ? (
              <div className="text-center py-6 space-y-4 animate-fadeIn">
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-gray-850">Simulated Reset Link Sent</h4>
                  <p className="text-[11px] text-gray-400 px-3 font-sans leading-relaxed">
                    A dummy password reset link has been dispatched to your email logs. Please check your spam folder or simulate login.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setForgotSent(false);
                    setMode("login");
                  }}
                  className="px-4 py-1.5 bg-[#FAF8F6] hover:bg-[#D4537E]/5 border border-rose-100 text-[#D4537E] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                setForgotSent(true);
              }} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Email Address:</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="e.g. myname@gmail.com"
                      className="w-full bg-[#FAF8F6] border border-rose-100 rounded-lg py-2 pl-10 pr-4 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-pink-300 text-gray-800 block"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#D4537E] hover:bg-[#b03f63] text-white text-xs font-extrabold rounded-lg shadow-md transition-colors cursor-pointer uppercase tracking-widest"
                >
                  Send Reset Instructions
                </button>

                <div className="text-center text-[11px] pt-4 border-t border-rose-50 text-gray-400 font-sans">
                  Remember password? <button type="button" onClick={() => setMode("login")} className="hover:underline text-[#D4537E] font-bold">Sign In here</button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
