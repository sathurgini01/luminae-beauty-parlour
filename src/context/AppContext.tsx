/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, WorkerDetails, Appointment, Service, Package, InventoryItem, WorkerNotes, UserRole } from "../types";
import { MOCK_SERVICES, MOCK_PACKAGES, MOCK_USERS, MOCK_WORKERS, MOCK_APPOINTMENTS, MOCK_INVENTORY, MOCK_CLIENT_NOTES } from "../lib/mockData";

interface AppContextType {
  currentUser: User | null;
  currentRole: UserRole | "guest";
  appointments: Appointment[];
  workers: WorkerDetails[];
  services: Service[];
  packages: Package[];
  inventory: InventoryItem[];
  clientNotes: WorkerNotes[];
  notifications: string[];

  // Authentication
  login: (email: string, role: UserRole) => boolean;
  registerCustomer: (name: string, email: string, phone: string) => void;
  logout: () => void;
  setCurrentUserForce: (user: User | null) => void;

  // Actions
  addAppointment: (appointment: Omit<Appointment, "id" | "status" | "workerName">) => void;
  updateAppointmentStatus: (id: string, status: Appointment["status"]) => void;
  assignWorker: (appointmentId: string, workerId: string) => void;
  addClientNote: (clientId: string, clientName: string, workerId: string, note: string) => void;
  addService: (service: Omit<Service, "id">) => void;
  updateService: (id: string, updated: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addPackage: (pkg: Omit<Package, "id">) => void;
  restockItem: (id: string, amount: number) => void;
  addFeedback: (id: string, feedback: string, rating: number) => void;
  addNotificationCount: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getStoredValue = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;

  const cached = window.localStorage.getItem(key);
  if (!cached) return fallback;

  try {
    return JSON.parse(cached) as T;
  } catch {
    return fallback;
  }
};

const setStoredValue = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const OLD_CUSTOMER_NAME = "Sathurgini Rajendran";
const UPDATED_CUSTOMER_NAME = "sathurgini kalanan";

const normalizeCustomerName = (name: string) => {
  return name === OLD_CUSTOMER_NAME ? UPDATED_CUSTOMER_NAME : name;
};

const normalizeUser = (user: User | null): User | null => {
  if (!user) return user;
  if (user.id === "usr_cust1" || user.email === "sathurgini@gmail.com" || user.name === OLD_CUSTOMER_NAME) {
    return { ...user, name: UPDATED_CUSTOMER_NAME };
  }
  return user;
};

const normalizeAppointments = (appointments: Appointment[]): Appointment[] => {
  return appointments.map(appointment => ({
    ...appointment,
    clientName: normalizeCustomerName(appointment.clientName)
  }));
};

const normalizeClientNotes = (notes: WorkerNotes[]): WorkerNotes[] => {
  return notes.map(note => ({
    ...note,
    clientName: normalizeCustomerName(note.clientName)
  }));
};

export const AppProviderObj = ({ children }: { children: ReactNode }) => {
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  // Load initial state from LocalStorage or use beautiful default mock data
  // Keep the first render identical on the server and client, then hydrate
  // browser-only localStorage values after mount.
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);

  const [workers, setWorkers] = useState<WorkerDetails[]>(MOCK_WORKERS);

  const [services, setServices] = useState<Service[]>(MOCK_SERVICES);

  const [packages, setPackages] = useState<Package[]>(MOCK_PACKAGES);

  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);

  const [clientNotes, setClientNotes] = useState<WorkerNotes[]>(MOCK_CLIENT_NOTES);

  const defaultNotifications = [
    "Welcome to Luminae Beauty & Parlour virtual management environment.",
    "Today scheduling status: 3 appointments assigned. Traditional Kandyan bridal is at 09:00.",
    "Low product warning: High-grade Japanese Rebonding Serum is critical (1 left)."
  ];
  const [notifications, setNotifications] = useState<string[]>(defaultNotifications);

  useEffect(() => {
    setCurrentUser(normalizeUser(getStoredValue<User | null>("luminae_user", null)));
    setAppointments(normalizeAppointments(getStoredValue("luminae_appointments", MOCK_APPOINTMENTS)));
    setWorkers(getStoredValue("luminae_workers", MOCK_WORKERS));
    setServices(getStoredValue("luminae_services", MOCK_SERVICES));
    setPackages(getStoredValue("luminae_packages", MOCK_PACKAGES));
    setInventory(getStoredValue("luminae_inventory", MOCK_INVENTORY));
    setClientNotes(normalizeClientNotes(getStoredValue("luminae_client_notes", MOCK_CLIENT_NOTES)));
    setNotifications(getStoredValue("luminae_notifications", defaultNotifications));
    setHasLoadedStorage(true);
  }, []);

  // Keep LocalStorage synchronized
  useEffect(() => {
    if (!hasLoadedStorage) return;
    setStoredValue("luminae_user", currentUser);
  }, [currentUser, hasLoadedStorage]);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    setStoredValue("luminae_appointments", appointments);
  }, [appointments, hasLoadedStorage]);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    setStoredValue("luminae_workers", workers);
  }, [workers, hasLoadedStorage]);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    setStoredValue("luminae_services", services);
  }, [services, hasLoadedStorage]);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    setStoredValue("luminae_packages", packages);
  }, [packages, hasLoadedStorage]);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    setStoredValue("luminae_inventory", inventory);
  }, [inventory, hasLoadedStorage]);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    setStoredValue("luminae_client_notes", clientNotes);
  }, [clientNotes, hasLoadedStorage]);

  useEffect(() => {
    if (!hasLoadedStorage) return;
    setStoredValue("luminae_notifications", notifications);
  }, [notifications, hasLoadedStorage]);

  // Auth Functions
  const login = (email: string, role: UserRole): boolean => {
    const foundUser = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.role === role
    );
    if (foundUser) {
      setCurrentUser(foundUser);
      addNotificationCount(`Successful login: ${foundUser.name} as ${foundUser.role}`);
      return true;
    }
    // If not found, create a mock user session dynamically
    const dynamicUser: User = {
      id: `usr_${Date.now()}`,
      name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
      email: email,
      phone: "+94 77 999 8888",
      role: role,
      createdAt: new Date().toISOString().split("T")[0]
    };
    setCurrentUser(dynamicUser);
    addNotificationCount(`New session started: ${dynamicUser.name} (${dynamicUser.role})`);
    return true;
  };

  const registerCustomer = (name: string, email: string, phone: string) => {
    const newCust: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone: phone || "+94 77 000 1111",
      role: "customer",
      createdAt: new Date().toISOString().split("T")[0]
    };
    // Prepend user
    setCurrentUser(newCust);
    addNotificationCount(`New customer registration successful: ${name}`);
  };

  const logout = () => {
    if (currentUser) {
      addNotificationCount(`Logged out session for ${currentUser.name}`);
    }
    setCurrentUser(null);
  };

  const setCurrentUserForce = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      addNotificationCount(`Switched active role to: ${user.name} (${user.role})`);
    } else {
      addNotificationCount(`Switched to Guest/Visitor Mode`);
    }
  };

  // State actions
  const addNotificationCount = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setNotifications(prev => [`[${timestamp}] ${msg}`, ...prev.slice(0, 49)]);
  };

  const addAppointment = (aptData: Omit<Appointment, "id" | "status" | "workerName">) => {
    const worker = workers.find(w => w.id === aptData.workerId);
    const newApt: Appointment = {
      ...aptData,
      id: `apt_${Date.now()}`,
      status: "pending",
      workerName: worker ? worker.name : "Unassigned"
    };
    setAppointments(prev => [...prev, newApt]);
    addNotificationCount(`New booking request: ${newApt.clientName} for ${newApt.serviceName}`);

    // Adjust worker count if assigned
    if (worker) {
      setWorkers(prev => prev.map(w => w.id === worker.id ? { ...w, assignedCount: w.assignedCount + 1 } : w));
    }
  };

  const updateAppointmentStatus = (id: string, status: Appointment["status"]) => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === id) {
        addNotificationCount(`Appointment status changed: Apt #${id.slice(-4)} is now [${status.toUpperCase()}]`);
        return { ...apt, status };
      }
      return apt;
    }));
  };

  const assignWorker = (appointmentId: string, workerId: string) => {
    const targetWorker = workers.find(w => w.id === workerId);
    if (!targetWorker) return;

    setAppointments(prev => prev.map(apt => {
      if (apt.id === appointmentId) {
        // Decrease old worker's task count if existing
        if (apt.workerId && apt.workerId !== "unassigned") {
          setWorkers(wPrev => wPrev.map(w => w.id === apt.workerId ? { ...w, assignedCount: Math.max(0, w.assignedCount - 1) } : w));
        }
        // Increase new worker's count
        setWorkers(wPrev => wPrev.map(w => w.id === workerId ? { ...w, assignedCount: w.assignedCount + 1 } : w));
        
        addNotificationCount(`Assigned Specialist: Anusha/Sanduni/Dilshan for appointment #${appointmentId.slice(-4)}`);
        return {
          ...apt,
          workerId,
          workerName: targetWorker.name,
          status: "confirmed" // Auto confirm when assigned
        };
      }
      return apt;
    }));
  };

  const addClientNote = (clientId: string, clientName: string, workerId: string, note: string) => {
    const newNote: WorkerNotes = {
      id: `nt_${Date.now()}`,
      clientId,
      clientName,
      workerId,
      note,
      createdAt: new Date().toISOString().split("T")[0]
    };
    setClientNotes(prev => [newNote, ...prev]);
    addNotificationCount(`Recorded client treatment specification note for ${clientName}`);
  };

  const addService = (srv: Omit<Service, "id">) => {
    const newSrv: Service = {
      ...srv,
      id: `srv_${Date.now()}`
    };
    setServices(prev => [newSrv, ...prev]);
    addNotificationCount(`Added new parlour service: ${srv.name} (${srv.category})`);
  };

  const updateService = (id: string, updated: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    addNotificationCount(`Updated service info for element: ${id}`);
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    addNotificationCount(`Deleted beauty service: ${id}`);
  };

  const addPackage = (pkg: Omit<Package, "id">) => {
    const newPkg: Package = {
      ...pkg,
      id: `pkg_${Date.now()}`,
      isPopular: false
    };
    setPackages(prev => [newPkg, ...prev]);
    addNotificationCount(`Constructed bridal/combination package: ${pkg.name}`);
  };

  const restockItem = (id: string, amount: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const updatedStock = item.stock + amount;
        addNotificationCount(`Restocked ${item.name}: +${amount} (New stock: ${updatedStock})`);
        return { ...item, stock: updatedStock };
      }
      return item;
    }));
  };

  const addFeedback = (id: string, feedback: string, rating: number) => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === id) {
        addNotificationCount(`Customer verified visit feedback on visit #${id.slice(-4)}: ${rating} Stars`);
        return { ...apt, feedback, rating };
      }
      return apt;
    }));
  };

  const currentRole = currentUser ? currentUser.role : "guest";

  return (
    <AppContext.Provider value={{
      currentUser,
      currentRole,
      appointments,
      workers,
      services,
      packages,
      inventory,
      clientNotes,
      notifications,
      login,
      registerCustomer,
      logout,
      setCurrentUserForce,
      addAppointment,
      updateAppointmentStatus,
      assignWorker,
      addClientNote,
      addService,
      updateService,
      deleteService,
      addPackage,
      restockItem,
      addFeedback,
      addNotificationCount
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppState must be wrapped inside AppProviderObj");
  return context;
};
