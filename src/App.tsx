/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { AppProviderObj, useAppState } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import CustomerPortal from "./components/CustomerPortal";
import AdminPortal from "./components/AdminPortal";
import WorkerPortal from "./components/WorkerPortal";
import LoginRegister from "./components/LoginRegister";

function MainAppLayout() {
  const { currentRole } = useAppState();
  const [activeView, setActiveView] = useState("landing");

  // Handle successful logins redirects
  const handleAuthSuccess = (role: string) => {
    if (role === "admin") {
      setActiveView("admin-dashboard");
    } else if (role === "worker") {
      setActiveView("worker-dashboard");
    } else {
      setActiveView("customer-dashboard");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F6] text-[#2C2C2A] font-sans selection:bg-[#D4537E]/25 overflow-x-hidden">
      
      {/* Navigation Header */}
      <Navbar onNavigate={setActiveView} activeView={activeView} />

      {/* Main Multi-route Body Assembler */}
      <main className="flex-grow">
        
        {/* VIEW 1: Public & Customer Portal views */}
        {(activeView === "landing" || 
          activeView === "services" || 
          activeView === "packages" || 
          activeView === "trends" || 
          activeView === "story" || 
          activeView === "book" || 
          activeView === "customer-dashboard") && (
          <CustomerPortal activeSection={activeView} onNavigate={setActiveView} />
        )}

        {/* VIEW 2: Secure Administrative panel */}
        {activeView === "admin-dashboard" && (
          <div className="bg-[#FAF8F6] min-h-screen">
            {currentRole === "admin" ? (
              <AdminPortal />
            ) : (
              <div className="max-w-md mx-auto py-24 text-center space-y-4 px-4">
                <div className="text-rose-600 font-bold bg-rose-50 p-4 rounded-2xl border border-rose-100">
                  ⚠️ Administrative Authorization Restricted
                </div>
                <p className="text-xs text-gray-400">Please switch your Active role to "Admin (Owner)" in the top simulation controller to gain authorized access.</p>
                <button 
                  onClick={() => setActiveView("login")}
                  className="px-4 py-1.5 bg-[#D4537E] text-white text-xs font-bold rounded-lg"
                >
                  Go to login
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: Therapist/Worker calendar appointments list */}
        {activeView === "worker-dashboard" && (
          <div className="bg-[#FAF8F6] min-h-screen">
            {currentRole === "worker" ? (
              <WorkerPortal />
            ) : (
              <div className="max-w-md mx-auto py-24 text-center space-y-4 px-4">
                <div className="text-rose-600 font-bold bg-rose-50 p-4 rounded-2xl border border-rose-100">
                  ⚠️ Therapist Authorization Restricted
                </div>
                <p className="text-xs text-gray-400">Please switch your Active role to "Worker (Anusha)" in the top simulation controller to unlock scheduling features.</p>
                <button 
                  onClick={() => setActiveView("login")}
                  className="px-4 py-1.5 bg-[#D4537E] text-white text-xs font-bold rounded-lg"
                >
                  Go to login
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: Authorized login and join templates screen */}
        {(activeView === "login" || activeView === "register" || activeView === "forgot") && (
          <LoginRegister 
            initialMode={activeView as "login" | "register" | "forgot"}
            onSuccess={handleAuthSuccess} 
            onNavigate={setActiveView} 
          />
        )}

      </main>

      {/* Floating simulated green WhatsApp CRM overlay */}
      <WhatsAppButton />

      {/* Corporate compliant footer bar with directions */}
      <Footer onNavigate={setActiveView} />

    </div>
  );
}

export default function App() {
  return (
    <AppProviderObj>
      <MainAppLayout />
    </AppProviderObj>
  );
}
