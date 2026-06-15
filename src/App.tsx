/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { useEffect, useState } from "react";
import { AppProviderObj, useAppState } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import CustomerPortal from "./components/CustomerPortal";
import AdminPortal from "./components/AdminPortal";
import WorkerPortal from "./components/WorkerPortal";
import LoginRegister from "./components/LoginRegister";

const viewToPath: Record<string, string> = {
  landing: "/",
  services: "/services",
  packages: "/packages",
  trends: "/trends",
  story: "/about",
  book: "/booking",
  login: "/login",
  register: "/register",
  forgot: "/forgot-password",
  "customer-dashboard": "/customer/bookings",
  "admin-dashboard": "/admin",
  "worker-dashboard": "/specialist"
};

const pathToView = (pathname: string) => {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  if (cleanPath === "/") return "landing";
  if (cleanPath === "/services") return "services";
  if (cleanPath === "/packages") return "packages";
  if (cleanPath === "/gallery" || cleanPath === "/trends") return "trends";
  if (cleanPath === "/about" || cleanPath === "/story") return "story";
  if (cleanPath === "/booking" || cleanPath === "/book") return "book";
  if (cleanPath === "/login") return "login";
  if (cleanPath === "/register") return "register";
  if (cleanPath === "/forgot-password" || cleanPath === "/forgot") return "forgot";
  if (cleanPath === "/customer" || cleanPath === "/customer/bookings") return "customer-dashboard";
  if (cleanPath === "/admin") return "admin-dashboard";
  if (cleanPath === "/specialist" || cleanPath === "/worker") return "worker-dashboard";
  return "landing";
};

function MainAppLayout({ initialView }: { initialView: string }) {
  const { currentRole } = useAppState();
  const [activeView, setActiveView] = useState(initialView);

  const handleNavigate = (view: string) => {
    setActiveView(view);
    if (typeof window === "undefined") return;
    const nextPath = viewToPath[view] || "/";
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ view }, "", nextPath);
    }
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      setActiveView(pathToView(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Handle successful logins redirects
  const handleAuthSuccess = (role: string) => {
    if (role === "admin") {
      handleNavigate("admin-dashboard");
    } else if (role === "worker") {
      handleNavigate("worker-dashboard");
    } else {
      handleNavigate("customer-dashboard");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F0EC] text-[#2C2C2A] font-sans selection:bg-[#AF2B2D]/25 overflow-x-hidden">
      
      {/* Navigation Header */}
      <Navbar onNavigate={handleNavigate} activeView={activeView} />

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
          <CustomerPortal activeSection={activeView} onNavigate={handleNavigate} />
        )}

        {/* VIEW 2: Secure Administrative panel */}
        {activeView === "admin-dashboard" && (
          <div className="bg-[#F8F0EC] min-h-screen">
            {currentRole === "admin" ? (
              <AdminPortal />
            ) : (
              <div className="max-w-md mx-auto py-24 text-center space-y-4 px-4">
                <div className="text-[#AF2B2D] font-bold bg-[#F8F0EC] p-4 rounded-2xl border border-rose-100">
                  ⚠️ Administrative Authorization Restricted
                </div>
                <p className="text-xs text-gray-400">Please sign in with the owner account to access the admin workspace.</p>
                <button 
                  onClick={() => handleNavigate("login")}
                  className="px-4 py-1.5 bg-[#AF2B2D] text-white text-xs font-bold rounded-lg"
                >
                  Go to login
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: Therapist/Worker calendar appointments list */}
        {activeView === "worker-dashboard" && (
          <div className="bg-[#F8F0EC] min-h-screen">
            {currentRole === "worker" ? (
              <WorkerPortal />
            ) : (
              <div className="max-w-md mx-auto py-24 text-center space-y-4 px-4">
                <div className="text-[#AF2B2D] font-bold bg-[#F8F0EC] p-4 rounded-2xl border border-rose-100">
                  ⚠️ Therapist Authorization Restricted
                </div>
                <p className="text-xs text-gray-400">Please sign in with a specialist account to access scheduling features.</p>
                <button 
                  onClick={() => handleNavigate("login")}
                  className="px-4 py-1.5 bg-[#AF2B2D] text-white text-xs font-bold rounded-lg"
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
            onNavigate={handleNavigate} 
          />
        )}

      </main>

      {/* Floating WhatsApp enquiry widget */}
      <WhatsAppButton />

      {/* Footer with contact details and directions */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}

export default function App({ initialView = "landing" }: { initialView?: string }) {
  return (
    <AppProviderObj>
      <MainAppLayout initialView={initialView} />
    </AppProviderObj>
  );
}

export { pathToView };
