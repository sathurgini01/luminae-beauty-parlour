/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = "admin" | "worker" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
}

export type AppointmentStatus = "pending" | "confirmed" | "started" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  workerId: string; // "unassigned" if not yet assigned
  workerName: string;
  serviceId: string; // Can be serviceId or packageId
  serviceName: string;
  category: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: AppointmentStatus;
  price: number; // LKR
  duration: number; // in minutes
  notes?: string;
  feedback?: string;
  rating?: number;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  price: number; // LKR
  duration: number; // in minutes
  description: string;
}

export interface Package {
  id: string;
  name: string;
  services: string[]; // List of service services inside
  totalPrice: number; // Standard sum in LKR
  discountPrice: number; // Bundled offer price in LKR
  isPopular: boolean;
  description: string;
  inclusions: string[];
}

export interface LoyaltyPoints {
  userId: string;
  points: number;
  tier: "Bronze" | "Silver" | "Gold";
}

export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  category: string;
  price: number;
}

export interface WorkerDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string[];
  isActive: boolean;
  assignedCount: number;
}

export interface WorkerNotes {
  id: string;
  clientId: string;
  clientName: string;
  workerId: string;
  note: string;
  createdAt: string;
}
