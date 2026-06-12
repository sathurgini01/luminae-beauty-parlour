/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useAppState } from "../context/AppContext";
import { 
  Scissors, Calendar, Clock, Clipboard, Search, CheckSquare, 
  User, Award, Eye, PlusCircle, Smile, BadgeAlert, Star, Sparkles
} from "lucide-react";
import { Appointment, WorkerNotes } from "../types";

export default function WorkerPortal() {
  const {
    currentUser,
    appointments,
    workers,
    clientNotes,
    updateAppointmentStatus,
    addClientNote,
    addNotificationCount
  } = useAppState();

  // Active simulated worker selection
  const [activeWorkerSimId, setActiveWorkerSimId] = useState("usr_worker1");
  const [noteSearch, setNoteSearch] = useState("");

  // Create Client Note States
  const [targetClientId, setTargetClientId] = useState("usr_cust1");
  const [newNoteText, setNewNoteText] = useState("");

  // Target active appointment detail
  const [selectedAptId, setSelectedAptId] = useState<string | null>(null);

  // Retrieve current active worker object
  const currentWorker = workers.find(w => w.id === activeWorkerSimId) || workers[0];

  // Retrieve worker specific appointments
  const assignedAppointments = appointments.filter(a => a.workerId === activeWorkerSimId);
  const todaysAssignments = assignedAppointments.filter(a => a.status !== "completed" && a.status !== "cancelled");
  const pastAssignments = assignedAppointments.filter(a => a.status === "completed");

  const handleLoggedNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    // Pick client details
    let cName = "Sathurgini Rajendran";
    if (targetClientId === "usr_cust2") cName = "Fathima Riza";
    if (targetClientId === "usr_cust3") cName = "Nimisha Fernando";

    addClientNote(targetClientId, cName, activeWorkerSimId, newNoteText);
    setNewNoteText("");
    alert("Specification note logged in local CRM records successfully!");
  };

  const getActiveApt = () => {
    return appointments.find(a => a.id === selectedAptId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans" id="worker-panel-outer">
      
      {/* Simulation Selector Bar */}
      <div className="bg-[#FAF8F6] border border-rose-100 p-4 rounded-3xl mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="space-y-0.5 text-center sm:text-left">
          <span className="text-[10px] uppercase font-black tracking-widest text-[#D4537E]">Worker Profile Quick-sim</span>
          <h4 className="text-xs font-bold text-gray-700">Simulate other active beauticians:</h4>
        </div>
        <div className="flex gap-2.5">
          {workers.map((w) => (
            <button
              key={w.id}
              onClick={() => {
                setActiveWorkerSimId(w.id);
                setSelectedAptId(null);
              }}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                activeWorkerSimId === w.id
                  ? "bg-[#D4537E] text-white border-transparent shadow"
                  : "bg-white text-gray-700 border-gray-200 hover:border-pink-200"
              }`}
            >
              {w.name.split(" ")[0]} ({w.assignedCount})
            </button>
          ))}
        </div>
      </div>

      {/* Greeting row */}
      <div className="bg-white border border-rose-50 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-xs font-bold text-emerald-800">
            <Smile className="h-4 w-4 shrink-0 text-emerald-700" />
            <span>Ayubowan! — certified beautician in charge</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Active Therapist: {currentWorker?.name}</h1>
          <p className="text-xs text-gray-500 font-sans max-w-lg leading-relaxed">
            Manage your daily appointments schedule, update seat status live, and review skin specification notes written by other therapists.
          </p>
        </div>

        {/* Worker specialty checklist */}
        <div className="space-y-1 bg-rose-50/10 p-4 rounded-2xl border border-rose-100/50 w-full md:w-80">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Your specialties:</span>
          <div className="flex flex-wrap gap-1">
            {currentWorker?.specialty.map((spec, i) => (
              <span key={i} className="text-[10px] font-bold px-2.5 py-1 bg-white border border-rose-100 text-[#D4537E] rounded-md shadow-xs">
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Assigned workload */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white border border-rose-50 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-800 border-b border-rose-50 pb-4 flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#D4537E]" />
              <span>Today's Assigned Treatments ({todaysAssignments.length})</span>
            </h3>

            {todaysAssignments.length === 0 ? (
              <div className="text-center py-10 space-y-2 text-gray-400">
                <Smile className="h-8 w-8 text-rose-300 mx-auto" />
                <p className="text-xs">Amazing work! Complete for the day.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todaysAssignments.map((apt) => (
                  <div 
                    key={apt.id} 
                    className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                      selectedAptId === apt.id ? "border-[#D4537E] bg-rose-50/20" : "border-gray-100 bg-[#FAF8F6] hover:border-rose-100"
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-gray-800">{apt.serviceName}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase border ${
                          apt.status === "confirmed" ? "bg-emerald-50 text-emerald-800 border-emerald-200" :
                          apt.status === "started" ? "bg-amber-100 text-amber-800 border-amber-200 animate-pulse" :
                          "bg-rose-50 text-rose-800 border-rose-200"
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-400 flex items-center gap-4 font-mono">
                        <span>🕒 Slot: {apt.time} PM</span>
                        <span>👤 Guest: {apt.clientName}</span>
                        <span>⏳ Time: {apt.duration} mins</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedAptId(apt.id)}
                        className="px-3 py-1 bg-white hover:bg-rose-50 text-[#D4537E] border border-rose-200 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Inspect Note</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detailed Inspect Box */}
          {selectedAptId && getActiveApt() && (
            <div className="bg-white border-2 border-[#D4537E]/20 p-6 rounded-3xl shadow-md space-y-4 animate-slideDown">
              <div className="flex justify-between items-start border-b border-rose-50 pb-3">
                <div>
                  <span className="text-[9px] uppercase font-black text-gray-400">Treatment Room Inspection</span>
                  <h3 className="text-sm font-bold text-[#2C2C2A]">{getActiveApt()?.serviceName}</h3>
                </div>
                <button 
                  onClick={() => setSelectedAptId(null)}
                  className="text-xs font-bold text-gray-400 hover:text-rose-600"
                >
                  Close Detail
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="block text-gray-400 font-bold uppercase text-[9px]">Client Details</span>
                    <span className="block text-gray-800 font-semibold">{getActiveApt()?.clientName}</span>
                    <span className="block text-gray-500 font-mono">{getActiveApt()?.clientPhone}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-gray-400 font-bold uppercase text-[9px]">Apt Value</span>
                    <span className="block text-emerald-800 font-semibold font-mono">LKR {getActiveApt()?.price.toLocaleString()} /=</span>
                    <span className="block text-[10px] text-gray-400">{getActiveApt()?.duration} minutes block</span>
                  </div>
                </div>

                <div className="space-y-1 bg-[#FAF8F6] p-3 rounded-xl border border-rose-50/50">
                  <span className="block text-gray-400 font-bold uppercase text-[9px]">Therapist client specific requests:</span>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans italic">
                    {getActiveApt()?.notes || "No special requests added to this specific booking card yet."}
                  </p>
                </div>

                {/* State progressions buttons */}
                <div className="pt-2 border-t border-rose-50/50 flex gap-2">
                  {getActiveApt()?.status === "confirmed" && (
                    <button
                      onClick={() => {
                        updateAppointmentStatus(getActiveApt()!.id, "started");
                        addNotificationCount(`Beautician ${currentWorker?.name} started service on client ${getActiveApt()?.clientName}`);
                      }}
                      className="flex-1 py-2 bg-[#D4537E] text-white font-bold rounded-lg text-center cursor-pointer shadow hover:scale-[1.01] transition-transform"
                    >
                      Start Treatment (Client seated)
                    </button>
                  )}
                  {getActiveApt()?.status === "started" && (
                    <button
                      onClick={() => {
                        updateAppointmentStatus(getActiveApt()!.id, "completed");
                        addNotificationCount(`Beautician ${currentWorker?.name} completed service on client ${getActiveApt()?.clientName}`);
                        setSelectedAptId(null);
                      }}
                      className="flex-1 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-center cursor-pointer shadow hover:scale-[1.01] transition-transform"
                    >
                      Mark as Completed (Ready for checkout!)
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Past appointments history details */}
          <div className="bg-white border border-rose-50 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-800 border-b border-rose-50 pb-4 flex items-center gap-1.5">
              <span>Past Treatment sessions completed ({pastAssignments.length})</span>
            </h3>
            {pastAssignments.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No historic treatments finished yet.</p>
            ) : (
              <div className="space-y-2.5">
                {pastAssignments.map(apt => (
                  <div key={apt.id} className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs flex justify-between items-center">
                    <div>
                      <span className="font-bold text-gray-700">{apt.serviceName}</span>
                      <span className="text-gray-400 block text-[10px]">Client: {apt.clientName} • Finished on: {apt.date}</span>
                    </div>
                    {apt.rating && (
                      <div className="flex gap-0.5" title={`${apt.rating} Star client feedback`}>
                        {Array.from({ length: apt.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right column: CRM Skin notes builder */}
        <div className="lg:col-span-4 space-y-6">
          
          <form onSubmit={handleLoggedNoteSubmit} className="bg-white p-6 border border-rose-100 rounded-3xl shadow-sm space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                <Clipboard className="h-4.5 w-4.5 text-[#D4537E]" />
                <span>Log Client Treatment specification</span>
              </h3>
              <p className="text-[11px] text-gray-400 font-sans">We track specifications such as hair bleach limits or herbal wax allergies.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-extrabold text-gray-550 block">Target Client:</label>
                <select
                  value={targetClientId}
                  onChange={(e) => setTargetClientId(e.target.value)}
                  className="w-full bg-[#FAF8F6] border border-rose-100 p-2 text-xs font-sans rounded focus:outline-none focus:ring-1 focus:ring-pink-300"
                >
                  <option value="usr_cust1">Sathurgini Rajendran (Colombo)</option>
                  <option value="usr_cust2">Fathima Riza (K KCC hotel)</option>
                  <option value="usr_cust3">Nimisha Fernando (Mount Lavinia)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-gray-550 block">Discovery Specification Note:</label>
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="E.g. sandwood paste allergy discoverey, requests Neeladi scalp oil rub..."
                  rows={4}
                  className="w-full p-2.5 bg-[#FAF8F6] border border-rose-100 text-xs font-sans rounded focus:outline-none focus:ring-1 focus:ring-pink-300 resize-none resize-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-1.5 bg-[#1D9E75] hover:bg-[#15825f] text-white text-xs font-bold rounded-lg transition-transform hover:scale-105 cursor-pointer shadow"
            >
              Log note in Cloud CRM
            </button>
          </form>

          {/* View list of client specifications write-downs */}
          <div className="bg-white border border-rose-50 rounded-3xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-wider">Historical records for reference</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search specs..."
                value={noteSearch}
                onChange={(e) => setNoteSearch(e.target.value)}
                className="w-full pl-8 p-1.5 bg-gray-50 border border-gray-200 rounded p-1 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-200"
              />
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto scrollbar-none font-sans">
              {clientNotes.filter(n => n.clientName.toLowerCase().includes(noteSearch.toLowerCase()) || n.note.toLowerCase().includes(noteSearch.toLowerCase())).map((n) => (
                <div key={n.id} className="p-3 bg-rose-50/10 border border-rose-100/50 rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-[#D4537E]">👤 {n.clientName}</span>
                    <span className="text-gray-400">{n.createdAt}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed font-sans">{n.note}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
