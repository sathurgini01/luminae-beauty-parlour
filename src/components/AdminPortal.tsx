/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useAppState } from "../context/AppContext";
import { 
  BarChart3, Users, Calendar, DollarSign, ListFilter, AlertTriangle, 
  Trash2, Plus, Sparkles, UserPlus, ToggleLeft, ToggleRight, Check, CheckSquare, 
  Wrench, Settings, Clock, BellRing, PackageCheck, ClipboardList, ShieldAlert
} from "lucide-react";
import { Service, Package, WorkerDetails, InventoryItem, Appointment } from "../types";

export default function AdminPortal() {
  const {
    appointments,
    workers,
    services,
    packages,
    inventory,
    notifications,
    updateAppointmentStatus,
    assignWorker,
    addService,
    deleteService,
    restockItem,
    addPackage
  } = useAppState();

  // Navigation tab inside admin panel
  const [adminTab, setAdminTab] = useState("dashboard");

  // Filter state for appointments
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterWorker, setFilterWorker] = useState("all");

  // Selection state for assigning worker
  const [activeAptAssignId, setActiveAptAssignId] = useState<string | null>(null);

  // Form states
  const [newSrvName, setNewSrvName] = useState("");
  const [newSrvCategory, setNewSrvCategory] = useState("Hair");
  const [newSrvPrice, setNewSrvPrice] = useState("");
  const [newSrvDuration, setNewSrvDuration] = useState("60");
  const [newSrvDesc, setNewSrvDesc] = useState("");

  const [newPkgName, setNewPkgName] = useState("");
  const [newPkgDesc, setNewPkgDesc] = useState("");
  const [newPkgPrice, setNewPkgPrice] = useState("");
  const [newPkgServices, setNewPkgServices] = useState<string[]>([]);
  const [newPkgInclusions, setNewPkgInclusions] = useState("");

  const [newWorkerName, setNewWorkerName] = useState("");
  const [newWorkerEmail, setNewWorkerEmail] = useState("");
  const [newWorkerPhone, setNewWorkerPhone] = useState("");
  const [newWorkerSpecialties, setNewWorkerSpecialties] = useState<string[]>([]);

  // 1. STATS METRICS ENGINE
  const totalAppointmentsCount = appointments.length;
  const pendingApts = appointments.filter(a => a.status === "pending");
  const activeWorkersCount = workers.filter(w => w.isActive).length;
  
  // Calculate revenue: sum of completed and started appointment prices
  const completedOrStarted = appointments.filter(a => a.status === "completed" || a.status === "started");
  const totalRevenue = completedOrStarted.reduce((sum, current) => sum + current.price, 0);

  // List low stock alert items
  const lowStockItems = inventory.filter(item => item.stock < item.minStock);

  // 2. APPOINTMENT FILTER LOGIC
  const filteredAppointments = appointments.filter(apt => {
    const matchesStatus = filterStatus === "all" || apt.status === filterStatus;
    const matchesWorker = filterWorker === "all" || apt.workerId === filterWorker;
    return matchesStatus && matchesWorker;
  });

  // 3. SERVICE SUBMISSIONS
  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSrvName || !newSrvPrice) return;
    
    addService({
      name: newSrvName,
      category: newSrvCategory,
      price: Number(newSrvPrice),
      duration: Number(newSrvDuration),
      description: newSrvDesc || `Expert quality ${newSrvName} treatment.`
    });

    // Reset Form
    setNewSrvName("");
    setNewSrvPrice("");
    setNewSrvDuration("60");
    setNewSrvDesc("");
    alert("New beauty service added successfully!");
  };

  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkgName || !newPkgPrice) return;

    addPackage({
      name: `🌸 ${newPkgName}`,
      services: newPkgServices.length ? newPkgServices : ["Custom treatment"],
      totalPrice: Number(newPkgPrice) * 1.25, // Mock separate sum
      discountPrice: Number(newPkgPrice),
      description: newPkgDesc || `Luxury ${newPkgName} series.`,
      inclusions: newPkgInclusions ? newPkgInclusions.split(",").map(i => i.trim()) : ["Exclusive bridal hair dressing", "Hydrating de-tan pack"]
    });

    setNewPkgName("");
    setNewPkgDesc("");
    setNewPkgPrice("");
    setNewPkgServices([]);
    setNewPkgInclusions("");
    alert("New bundle package added successfully!");
  };

  const toggleSpecialtySelection = (spec: string) => {
    setNewWorkerSpecialties(prev => 
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans scrollbar-none" id="admin-panel-container">
      
      {/* Title bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-rose-100 pb-6 mb-8">
        <div>
          <span className="text-xs font-bold text-[#D4537E] uppercase tracking-widest bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">
            Priyanthi's Board • Founder Owner
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1.5">
            Luminae Executive Console
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">Authorized Login: beautician@luminae.lk | Standard MOH/CBSL Registered Workspace</p>
        </div>

        {/* Dashboard inner navigation */}
        <div className="flex flex-wrap gap-1.5 bg-gray-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => setAdminTab("dashboard")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap cursor-pointer ${
              adminTab === "dashboard" ? "bg-[#D4537E] text-white shadow-sm" : "text-gray-600 hover:text-gray-950"
            }`}
          >
            Stats & KPIs
          </button>
          <button
            onClick={() => setAdminTab("appointments")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap cursor-pointer ${
              adminTab === "appointments" ? "bg-[#D4537E] text-white shadow-sm" : "text-gray-600 hover:text-gray-950"
            }`}
          >
            Master Calendar ({pendingApts.length} Pending)
          </button>
          <button
            onClick={() => setAdminTab("workers")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap cursor-pointer ${
              adminTab === "workers" ? "bg-[#D4537E] text-white shadow-sm" : "text-gray-600 hover:text-gray-950"
            }`}
          >
            Specialists & Trainees
          </button>
          <button
            onClick={() => setAdminTab("portfolio")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap cursor-pointer ${
              adminTab === "portfolio" ? "bg-[#D4537E] text-white shadow-sm" : "text-gray-600 hover:text-gray-950"
            }`}
          >
            Menu Portfolio
          </button>
          <button
            onClick={() => setAdminTab("inventory")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap cursor-pointer ${
              adminTab === "inventory" ? "bg-[#D4537E] text-white shadow-sm" : "text-gray-600 hover:text-gray-950 animate-pulse"
            }`}
          >
            Product Stock
          </button>
          <button
            onClick={() => setAdminTab("clients")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap cursor-pointer ${
              adminTab === "clients" ? "bg-[#D4537E] text-white shadow-sm" : "text-gray-600 hover:text-gray-950"
            }`}
          >
            Registered Clients
          </button>
        </div>
      </div>

      {/* ----------------- TAB 1: OVERVIEW & REPORTS SUMMARY ----------------- */}
      {adminTab === "dashboard" && (
        <div className="space-y-8 animate-fadeIn" id="admin-tab-reports">
          
          {/* Metrics Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-rose-100/50 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Accumulated Income</span>
                <span className="text-xl font-extrabold text-gray-900">LKR {totalRevenue.toLocaleString()} /=</span>
                <span className="block text-[10px] text-[#1D9E75] font-semibold">Active Started / Completed</span>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-50 text-[#1D9E75] flex items-center justify-center">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-rose-100/50 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Total Bookings</span>
                <span className="text-xl font-extrabold text-gray-900">{totalAppointmentsCount} Visits</span>
                <span className="block text-[10px] text-[#D4537E] font-bold">{pendingApts.length} pending confirm</span>
              </div>
              <div className="h-12 w-12 rounded-full bg-rose-50 text-[#D4537E] flex items-center justify-center">
                <Calendar className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-rose-100/50 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Working Stylists</span>
                <span className="text-xl font-extrabold text-gray-900">{activeWorkersCount} Active</span>
                <span className="block text-[10px] text-gray-500">NVQ level certified staff</span>
              </div>
              <div className="h-12 w-12 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-rose-100/50 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Low Stock Alerts</span>
                <span className={`text-xl font-extrabold ${lowStockItems.length > 0 ? "text-rose-600 animate-pulse" : "text-gray-900"}`}>
                  {lowStockItems.length} Warnings
                </span>
                <span className="block text-[10px] text-gray-500">Min optimal quantities reached</span>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </div>

          </section>

          {/* CRM logs, statistics reports and alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Visual breakdown representation (Tailwind Gauges) */}
            <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-rose-50 shadow-sm space-y-6">
              <div>
                <h3 className="text-xs font-extrabold uppercase text-[#D4537E] tracking-widest">Financial Performance breakdown</h3>
                <h2 className="text-base font-black text-gray-800 mt-1">Staff Workload & Category Revenue split</h2>
              </div>

              {/* Bar graph simulations using raw CSS percentages */}
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="font-bold text-gray-700">Bridal Dressing & Special Occasions (Kandyan focus)</span>
                    <span className="font-mono text-gray-400">LKR 65,000 / 70% share</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 border border-gray-100 overflow-hidden">
                    <div className="bg-[#D4537E] h-full rounded-full" style={{ width: "70%" }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="font-bold text-gray-700">Hair Cut, Rebonding & Keratin Smoothing treatments</span>
                    <span className="font-mono text-gray-400">LKR 25,000 / 27% share</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 border border-gray-100 overflow-hidden">
                    <div className="bg-[#1D9E75] h-full rounded-full" style={{ width: "27%" }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="font-bold text-gray-700">Skincare Facials, D-Tan & Ayurvedic healing paste</span>
                    <span className="font-mono text-gray-400">LKR 4,800 / 5% share</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 border border-gray-100 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "5%" }} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-rose-50/50 mt-4 text-xs font-sans text-gray-500 flex items-center justify-between">
                <span>* Active billing based on completed appointments</span>
                <span>Top Revenue Stream: <strong>Kandyan Bridal packages</strong></span>
              </div>
            </div>

            {/* Live System CRM Logging stream */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-rose-50 shadow-sm space-y-4">
              <div className="flex items-center gap-1">
                <BellRing className="text-rose-600 h-5 w-5 shrink-0" />
                <h3 className="text-sm font-bold text-gray-800">Live Smart CRM Logs</h3>
              </div>
              <p className="text-[11px] text-gray-400">Real-time terminal updates tracking appointments and stock movements.</p>

              <div className="space-y-2 bg-gray-50 p-3 h-64 overflow-y-auto rounded-xl border border-gray-100 font-mono text-[10px] text-gray-600">
                {notifications.map((notif, index) => (
                  <div key={index} className="border-b border-gray-200/50 pb-1.5 leading-normal">
                    {notif}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ----------------- TAB 2: MASTER APPOINTMENTS LIST & MODAL ASSIGN ----------------- */}
      {adminTab === "appointments" && (
        <div className="space-y-6 animate-fadeIn" id="admin-tab-appointments">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-rose-50 rounded-2xl shadow-sm">
            
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="font-bold text-gray-400 flex items-center gap-1 leading-none">
                <ListFilter className="h-4 w-4" /> Filter Status:
              </span>
              <button 
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-1 rounded font-bold ${filterStatus === "all" ? "bg-rose-100 text-[#D4537E]" : "hover:bg-gray-100 text-gray-600"}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilterStatus("pending")}
                className={`px-3 py-1 rounded font-bold ${filterStatus === "pending" ? "bg-amber-100 text-amber-800" : "hover:bg-gray-100 text-gray-600"}`}
              >
                Pending
              </button>
              <button 
                onClick={() => setFilterStatus("confirmed")}
                className={`px-3 py-1 rounded font-bold ${filterStatus === "confirmed" ? "bg-emerald-100 text-emerald-800" : "hover:bg-gray-100 text-gray-600"}`}
              >
                Confirmed
              </button>
              <button 
                onClick={() => setFilterStatus("completed")}
                className={`px-3 py-1 rounded font-bold ${filterStatus === "completed" ? "bg-teal-100 text-teal-800" : "hover:bg-gray-100 text-gray-600"}`}
              >
                Completed
              </button>
            </div>

            {/* Quick assignment indicator */}
            <span className="text-[11px] text-gray-400 font-mono leading-none">
              Double-tap any unassigned ticket to link to a specialist.
            </span>
          </div>

          {/* Appointments Grid Table */}
          <div className="bg-white border border-rose-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 font-sans text-xs">
                <thead className="bg-[#FAF8F6]">
                  <tr className="text-left font-extrabold uppercase text-gray-400 tracking-wider">
                    <th className="px-6 py-4">Client Detail</th>
                    <th className="px-6 py-4">Beauty Service</th>
                    <th className="px-6 py-4">Date & Hour</th>
                    <th className="px-6 py-4">Assigned Beautician</th>
                    <th className="px-6 py-4">Price / Deposit</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 divide-rose-50/50">
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-400 italic">
                        No appointments matched your query filter.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-rose-50/10 transition-colors">
                        <td className="px-6 py-4.5">
                          <span className="block font-bold text-gray-800">{apt.clientName}</span>
                          <span className="block text-[11px] text-gray-400 font-mono">{apt.clientPhone}</span>
                        </td>
                        <td className="px-6 py-4.5">
                          <span className="block font-bold text-gray-700">{apt.serviceName}</span>
                          <span className="block text-[10px] text-gray-400 font-sans">{apt.category}</span>
                        </td>
                        <td className="px-6 py-4.5 font-mono">
                          <span className="block font-bold text-gray-700">{apt.date}</span>
                          <span className="block text-[11px] text-gray-400">{apt.time} PM</span>
                        </td>
                        <td className="px-6 py-4.5">
                          {apt.workerId === "unassigned" ? (
                            <div className="space-y-1">
                              <span className="text-[10px] text-rose-700 bg-rose-50 border border-rose-200 rounded px-1.5 py-0.5 inline-block font-semibold">
                                Unassigned
                              </span>
                              <button
                                onClick={() => setActiveAptAssignId(apt.id)}
                                className="block text-[11px] text-[#D4537E] font-bold hover:underline cursor-pointer"
                              >
                                Assign Now
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <span className="block font-bold text-emerald-800">{apt.workerName}</span>
                              <button
                                onClick={() => setActiveAptAssignId(apt.id)}
                                className="block text-[10px] text-gray-400 hover:underline cursor-pointer"
                              >
                                Shift specialist
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4.5 font-bold text-gray-800">
                          <span>LKR {apt.price.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                            apt.status === "confirmed" ? "bg-emerald-50 text-emerald-800 border-emerald-200" :
                            apt.status === "started" ? "bg-amber-100 text-amber-800 border-amber-200 animate-pulse" :
                            apt.status === "completed" ? "bg-teal-50 text-teal-800 border-teal-200" :
                            apt.status === "cancelled" ? "bg-gray-100 text-gray-500 border-gray-200" :
                            "bg-amber-50 text-amber-800 border-amber-200"
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="px-6 py-4.5 text-right space-y-1.5">
                          <div className="flex justify-end gap-1.5 flex-wrap">
                            {apt.status === "pending" && (
                              <button
                                onClick={() => updateAppointmentStatus(apt.id, "confirmed")}
                                className="px-2 py-1 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-700"
                              >
                                Approve
                              </button>
                            )}
                            {apt.status !== "completed" && apt.status !== "cancelled" && (
                              <>
                                <button
                                  onClick={() => updateAppointmentStatus(apt.id, "completed")}
                                  className="px-2 py-1 bg-teal-600 text-white rounded font-bold hover:bg-teal-700"
                                >
                                  Complete
                                </button>
                                <button
                                  onClick={() => updateAppointmentStatus(apt.id, "cancelled")}
                                  className="px-1.5 py-1 bg-gray-50 hover:bg-rose-50 text-rose-500 rounded font-normal"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal ASSIGN specialist box overlay */}
          {activeAptAssignId && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
              <div className="bg-white p-6 rounded-3xl max-w-sm w-full border border-rose-100 shadow-2xl space-y-5 animate-scaleIn">
                <div className="space-y-1 text-center">
                  <h3 className="text-md font-extrabold text-[#2C2C2A]">Assign Beauty Specialist</h3>
                  <p className="text-xs text-gray-400">Time-slot optimization. Choose which certified beautician is in charge.</p>
                </div>

                <div className="space-y-2">
                  {workers.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => {
                        assignWorker(activeAptAssignId, w.id);
                        setActiveAptAssignId(null);
                      }}
                      className="w-full text-left p-3.5 hover:bg-rose-50/50 border border-gray-100 rounded-xl flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div>
                        <span className="block text-xs font-bold text-gray-800">{w.name}</span>
                        <span className="block text-[10px] text-gray-400">Spec: {w.specialty.slice(0, 2).join(", ")}</span>
                      </div>
                      <span className="text-[10px] font-bold bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-200">
                        {w.assignedCount} tasks today
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setActiveAptAssignId(null)}
                  className="w-full text-center text-xs font-extrabold text-gray-400 py-2 hover:underline"
                >
                  Close Modal
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ----------------- TAB 3: WORKER DIRECTORY MANAGEMENT ----------------- */}
      {adminTab === "workers" && (
        <div className="space-y-8 animate-fadeIn" id="admin-tab-workers">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* List */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-sm font-bold text-gray-800">Assigned Team Staff members ({workers.length})</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {workers.map((w) => (
                  <div key={w.id} className="bg-white p-5 rounded-2xl border border-rose-50 shadow-sm flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-black text-gray-800">{w.name}</h4>
                          <span className="text-[10px] text-gray-400 font-mono">Mobile: {w.phone}</span>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                          w.isActive ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-gray-100 text-gray-500"
                        }`}>
                          {w.isActive ? "Active" : "Deactivated"}
                        </span>
                      </div>

                      <div className="space-y-1 border-t border-rose-50/50 pt-2 text-[11px] font-sans">
                        <span className="text-gray-400 font-bold block">Certified specialties:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {w.specialty.map((spec, i) => (
                            <span key={i} className="bg-[#FAF8F6] border border-rose-100 rounded px-1.5 py-0.5 text-[9px] text-[#2C2C2A]">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-rose-50/50 flex justify-between items-center text-[10px]">
                      <span className="font-mono text-gray-400">Today tasks assigned: {w.assignedCount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Addition Form */}
            <div className="lg:col-span-4">
              <form onSubmit={(e) => {
                e.preventDefault();
                alert("Simulated trainee registration recorded! The staff member will receive SMS credentials.");
                setNewWorkerName("");
                setNewWorkerEmail("");
                setNewWorkerPhone("");
                setNewWorkerSpecialties([]);
              }} className="bg-white p-6 rounded-3xl border border-rose-100 shadow-sm space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                    <UserPlus className="h-4.5 w-4.5 text-[#D4537E]" /> Register Beautician
                  </h3>
                  <p className="text-[11px] text-gray-400 font-sans">Register a new senior beauty expert or NVQ apprentice.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-extrabold text-gray-500">Name:</label>
                    <input
                      type="text"
                      value={newWorkerName}
                      onChange={(e) => setNewWorkerName(e.target.value)}
                      placeholder="e.g. Nimani Perera"
                      className="w-full p-2 bg-[#FAF8F6] border border-rose-100 rounded focus:outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-extrabold text-gray-500">Email Address:</label>
                    <input
                      type="email"
                      value={newWorkerEmail}
                      onChange={(e) => setNewWorkerEmail(e.target.value)}
                      placeholder="e.g. nimani@luminae.lk"
                      className="w-full p-2 bg-[#FAF8F6] border border-rose-100 rounded focus:outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-extrabold text-gray-500">Mobile hotline:</label>
                    <input
                      type="text"
                      value={newWorkerPhone}
                      onChange={(e) => setNewWorkerPhone(e.target.value)}
                      placeholder="e.g. +94 77 111 2222"
                      className="w-full p-2 bg-[#FAF8F6] border border-rose-100 rounded focus:outline-none"
                      required
                    />
                  </div>

                  {/* Specialty checklist selector */}
                  <div className="space-y-1">
                    <label className="font-extrabold text-gray-500 block mb-1">NVQ Specialties:</label>
                    <div className="flex flex-wrap gap-1">
                      {["Hair", "Skin & Facial", "Nails", "Body & Waxing", "Relaxation & Wellness"].map(spec => {
                        const isSelected = newWorkerSpecialties.includes(spec);
                        return (
                          <button
                            type="button"
                            key={spec}
                            onClick={() => toggleSpecialtySelection(spec)}
                            className={`text-[10px] px-2 py-1 rounded border font-semibold ${
                              isSelected ? "bg-[#D4537E] text-white border-transparent" : "bg-white text-[#2C2C2A] border-gray-200"
                            }`}
                          >
                            {spec}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-2 bg-[#D4537E] hover:bg-[#b03f63] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Create Trainee Credentials
                </button>
              </form>
            </div>

          </div>

        </div>
      )}

      {/* ----------------- TAB 4: MASTERS SERVICES & COMBOS MANAGEMENT ----------------- */}
      {adminTab === "portfolio" && (
        <div className="space-y-8 animate-fadeIn" id="admin-tab-portfolio">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* List */}
            <div className="lg:col-span-8 bg-white p-6 border border-rose-100 rounded-3xl shadow-sm space-y-4 h-[600px] overflow-y-auto scrollbar-none">
              <h3 className="text-sm font-black text-gray-800">Active Services List ({services.length} items)</h3>
              <p className="text-[11px] text-gray-400">These are shown dynamically on the public landing menu and booking wizard.</p>

              <div className="space-y-2">
                {services.map((srv) => (
                  <div key={srv.id} className="p-3 bg-[#FAF8F6] rounded-xl border border-rose-50 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded mr-2 inline-block">
                        {srv.category}
                      </span>
                      <span className="font-extrabold text-gray-800">{srv.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-gray-600 font-mono">LKR {srv.price.toLocaleString()}</span>
                      <button
                        onClick={() => {
                          if (confirm(`Do you wish to delete beauty service "${srv.name}"?`)) {
                            deleteService(srv.id);
                          }
                        }}
                        className="text-gray-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 cursor-pointer"
                        title="Delete service"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Creation Side Block */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Form 1 */}
              <form onSubmit={handleCreateService} className="bg-white p-5 border border-rose-100 rounded-3xl shadow-sm space-y-3.5">
                <div className="space-y-0.5">
                  <h3 className="text-xs font-black uppercase text-[#D4537E]">Construct New Service</h3>
                  <p className="text-[10px] text-gray-400">Instantly appends to target customer menus.</p>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-500">Service Title:</label>
                    <input
                      type="text"
                      value={newSrvName}
                      onChange={(e) => setNewSrvName(e.target.value)}
                      placeholder="e.g. Saffron Bridal Glow Up"
                      className="w-full bg-[#FAF8F6] border border-rose-100 p-2 rounded focus:outline-none focus:ring-1 focus:ring-pink-300"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="font-bold text-gray-500">Category:</label>
                      <select
                        value={newSrvCategory}
                        onChange={(e) => setNewSrvCategory(e.target.value)}
                        className="w-full bg-[#FAF8F6] border border-rose-100 p-2 rounded focus:outline-none text-[11px]"
                      >
                        <option value="Hair">Hair</option>
                        <option value="Skin & Facial">Skin & Facial</option>
                        <option value="Nails">Nails</option>
                        <option value="Body & Waxing">Body & Waxing</option>
                        <option value="Bridal & Special Occasion">Bridal & Special Occasion</option>
                        <option value="Relaxation & Wellness">Relaxation & Wellness</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-gray-500">Price (LKR):</label>
                      <input
                        type="number"
                        value={newSrvPrice}
                        onChange={(e) => setNewSrvPrice(e.target.value)}
                        placeholder="e.g. 3500"
                        className="w-full bg-[#FAF8F6] border border-rose-100 p-2 rounded focus:outline-none font-mono"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-500">Duration (Minutes):</label>
                    <input
                      type="number"
                      value={newSrvDuration}
                      onChange={(e) => setNewSrvDuration(e.target.value)}
                      className="w-full bg-[#FAF8F6] border border-rose-100 p-2 rounded focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-500">Brief Description:</label>
                    <textarea
                      value={newSrvDesc}
                      onChange={(e) => setNewSrvDesc(e.target.value)}
                      placeholder="Organic clay and sandalwood extract face cleaning..."
                      className="w-full bg-[#FAF8F6] border border-rose-100 p-2 rounded focus:outline-none resize-none font-sans"
                      rows={2}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-1.5 bg-[#D4537E] hover:bg-[#b03f63] text-white text-xs font-bold rounded-lg transition-transform hover:scale-[1.01] cursor-pointer"
                >
                  Publish Service Portfolio
                </button>
              </form>

            </div>

          </div>

        </div>
      )}

      {/* ----------------- TAB 5: INVENTORY PRODUCT QUANTITIES ----------------- */}
      {adminTab === "inventory" && (
        <div className="space-y-6 animate-fadeIn" id="admin-tab-inventory">
          <div className="bg-white p-4 border border-rose-50 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-gray-800">Treatment Materials Stock Manager</h3>
              <p className="text-[11px] text-gray-400">Stock updates require strict verification under current MOH hygiene standards.</p>
            </div>
            
            <div className="bg-rose-50 text-rose-800 text-xs px-3 py-1 bg-rose-50/50 rounded border border-rose-200/50 inline-flex items-center gap-1">
              <AlertTriangle className="h-4 w-4 text-rose-700 animate-bounce" />
              <span>Low levels trigger automatic SMS reminders on founder's phone.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map((item) => {
              const isLow = item.stock < item.minStock;
              return (
                <div 
                  key={item.id} 
                  className={`p-5 rounded-2xl border bg-white flex flex-col justify-between ${
                    isLow ? "border-rose-300 ring-2 ring-rose-500/5 shadow-md" : "border-rose-100 shadow-sm"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono text-gray-400">SKU #{item.id}</span>
                      {isLow && (
                        <span className="text-[9px] font-black uppercase text-rose-800 bg-rose-100 border border-rose-200 rounded px-1.5 py-0.5">
                          Low Stock Warning!
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-black text-gray-800">{item.name}</h4>
                      <span className="text-[11px] text-gray-400 font-sans">Material: {item.category}</span>
                    </div>

                    <div className="flex justify-between items-center bg-[#FAF8F6] p-2 rounded-lg border border-rose-50/50 text-[11px]">
                      <span>Current Inventory:</span>
                      <span className={`font-black font-mono text-xs ${isLow ? "text-rose-700" : "text-gray-800"}`}>
                        {item.stock} / Minimum {item.minStock} Units
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-rose-50/50 mt-4 flex gap-2 justify-between items-center text-xs">
                    <span className="text-gray-400">Cost: LKR {item.price.toLocaleString()}</span>
                    <button
                      onClick={() => restockItem(item.id, 5)}
                      className="px-3.5 py-1 bg-[#1D9E75] hover:bg-[#15825f] text-white font-bold rounded-lg transition-transform hover:scale-105 cursor-pointer inline-flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      <span>Restock +5</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {adminTab === "clients" && (
        <div className="space-y-6 animate-fadeIn" id="admin-tab-clients">
          <div className="bg-white p-4 border border-rose-50 rounded-2xl shadow-sm space-y-1">
            <h3 className="text-sm font-bold text-gray-800">Complete CRM Client Database</h3>
            <p className="text-[11px] text-gray-400">Tracks total spent capital and accrued loyalty points for VIP scheduling priority.</p>
          </div>

          <div className="bg-white border border-rose-100 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 font-sans text-xs">
                <thead className="bg-[#FAF8F6]">
                  <tr className="text-left font-extrabold uppercase text-gray-400 tracking-wider">
                    <th className="px-6 py-4">Client Representative</th>
                    <th className="px-6 py-3">Mobile Contact</th>
                    <th className="px-6 py-3">Total Activity</th>
                    <th className="px-6 py-3">Accrued Points</th>
                    <th className="px-6 py-3">VIP Status Tier</th>
                    <th className="px-6 py-3 text-right font-bold">Dossier Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-50/50">
                  <tr className="hover:bg-rose-50/10">
                    <td className="px-6 py-4 font-bold text-gray-800">Sathurgini Rajendran</td>
                    <td className="px-6 py-4 font-mono text-gray-400">+94 77 555 4321</td>
                    <td className="px-6 py-4 font-semibold text-gray-650">3 Completed Treatments</td>
                    <td className="px-6 py-4 font-extrabold text-[#D4537E]">450 Points</td>
                    <td className="px-6 py-4"><span className="bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded border border-teal-200">Silver Tier</span></td>
                    <td className="px-6 py-4 text-right text-gray-400 font-mono">Joined Mar 2025</td>
                  </tr>
                  <tr className="hover:bg-rose-50/10">
                    <td className="px-6 py-4 font-bold text-gray-800">Fathima Riza</td>
                    <td className="px-6 py-4 font-mono text-gray-400">+94 75 987 6543</td>
                    <td className="px-6 py-4 font-semibold text-gray-650">2 Completed Treatments</td>
                    <td className="px-6 py-4 font-extrabold text-[#D4537E]">280 Points</td>
                    <td className="px-6 py-4"><span className="bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded border border-teal-200">Silver Tier</span></td>
                    <td className="px-6 py-4 text-right text-gray-400 font-mono">Joined Apr 2025</td>
                  </tr>
                  <tr className="hover:bg-rose-50/10">
                    <td className="px-6 py-4 font-bold text-gray-800">Nimisha Fernando</td>
                    <td className="px-6 py-4 font-mono text-gray-400">+94 70 222 3333</td>
                    <td className="px-6 py-4 font-semibold text-gray-650">1 Completed Treatment</td>
                    <td className="px-6 py-4 font-extrabold text-[#D4537E]">120 Points</td>
                    <td className="px-6 py-4"><span className="bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded">Bronze Tier</span></td>
                    <td className="px-6 py-4 text-right text-gray-400 font-mono">Joined May 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
