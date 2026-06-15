/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Package, User, WorkerDetails, Appointment, InventoryItem, WorkerNotes } from "../types";

// Service categories: Hair, Skin & Facial, Nails, Body & Waxing, Bridal & Special Occasion, Relaxation & Wellness
export const MOCK_SERVICES: Service[] = [
  // --- Hair ---
  { id: "h1", name: "Designer Haircut & Styling", category: "Hair", audience: "Everyone", price: 3200, duration: 45, description: "Personalized haircut for women, men, and teens, suited to face shape and lifestyle with wash and finish." },
  { id: "h2", name: "Hair Wash, Blow Dry & Finish", category: "Hair", audience: "Everyone", price: 2200, duration: 30, description: "Hydrating wash followed by expert styling for sleek, volume, curls, or natural everyday finish." },
  { id: "h3", name: "Global Colouring / Highlights", category: "Hair", audience: "Everyone", price: 14500, duration: 120, description: "Premium colour application, lowlights, balayage, or tone correction for short and long hair." },
  { id: "h4", name: "Keratin Smooth Treatment", category: "Hair", audience: "Everyone", price: 25000, duration: 180, description: "Deep nourishing protein application to eliminate frizz, restore shine, and smooth hair." },
  { id: "h5", name: "Rebonding & Relaxing", category: "Hair", audience: "Everyone", price: 28000, duration: 240, description: "Long-lasting smoothing or straightening care using premium Japanese technology, includes pre-care serum." },
  { id: "h6", name: "Scalp Treatment & Henna Pack", category: "Hair", audience: "Everyone", price: 4500, duration: 60, description: "Traditional Sri Lankan cooling henna blend with virgin coconut oil to treat dandruff and strengthen roots." },
  { id: "h7", name: "Men's Classic Cut & Beard Sculpting", category: "Hair", audience: "Men", price: 1800, duration: 30, description: "Clean haircut, neckline tidy, beard shaping, and finishing for a sharp everyday look." },
  { id: "h8", name: "Hair Botox Repair Treatment", category: "Hair", audience: "Everyone", price: 18500, duration: 150, description: "Modern frizz-control repair mask with amino acids for softer, shinier hair without heavy straightening." },
  { id: "h9", name: "Korean Layer Cut & Soft Styling", category: "Hair", audience: "Everyone", price: 4200, duration: 60, description: "Trendy layered shaping with curtain fringe, texture, or soft movement styling for short and long hair." },
  { id: "h10", name: "Fade Cut, Beard Spa & Hot Towel", category: "Hair", audience: "Men", price: 3500, duration: 50, description: "Modern fade, beard detailing, hot towel care, and refreshing finish for a clean premium grooming look." },

  // --- Skin & Facial ---
  { id: "s1", name: "Unisex Cleansing Facial", category: "Skin & Facial", audience: "Everyone", price: 2500, duration: 45, description: "Gentle exfoliation, steam, blackhead care, and hydrating mask for all skin types." },
  { id: "s2", name: "Ayurvedic Herbal Treatment", category: "Skin & Facial", audience: "Everyone", price: 4800, duration: 75, description: "Infused with pure local sandalwood, wild turmeric (Kasthuri Kaha), and red rice powder." },
  { id: "s3", name: "Deep Pore / Collagen Facial", category: "Skin & Facial", audience: "Everyone", price: 8500, duration: 90, description: "Deep cleansing and collagen ampoule care with cold hammer firming for tired or textured skin." },
  { id: "s4", name: "Melo-White D-Tan & Tan Removal", category: "Skin & Facial", audience: "Everyone", price: 3800, duration: 50, description: "Effective botanical peel that softens solar tanning from Sri Lanka's tropical climate." },
  { id: "s5", name: "Eyebrow Threading & Grooming", category: "Skin & Facial", audience: "Everyone", price: 350, duration: 15, description: "Precise threading and shaping for clean, balanced brows for women and men." },
  { id: "s6", name: "HydraGlow Aqua Facial", category: "Skin & Facial", audience: "Everyone", price: 9800, duration: 75, description: "Modern hydration facial with deep cleanse, serum infusion, and cooling mask for fresh event-ready skin." },
  { id: "s7", name: "Acne Calm & Oil-Control Facial", category: "Skin & Facial", audience: "Everyone", price: 6200, duration: 70, description: "Gentle pore care for oily or acne-prone skin, with calming mask and non-greasy moisturizer." },
  { id: "s8", name: "Men's Beard & Face Detox Facial", category: "Skin & Facial", audience: "Men", price: 5200, duration: 60, description: "Deep cleansing facial around beard lines, blackhead care, steam, and soothing after-shave hydration." },

  // --- Nails ---
  { id: "n1", name: "Express Manicure & Pedicure", category: "Nails", audience: "Everyone", price: 3500, duration: 60, description: "Nail shaping, cuticle tidy, scrub, light massage, and optional clear, natural, or colour coat." },
  { id: "n2", name: "Luxury Gel Pedicure", category: "Nails", audience: "Everyone", price: 5500, duration: 75, description: "Long-lasting high-shine soak-off gel polish or natural groomed finish, including a salt soak." },
  { id: "n3", name: "Builder Gel Extensions & Nail Art", category: "Nails", audience: "Women", price: 8500, duration: 120, description: "Full set builder gel nails with custom art, clean minimal designs, or event-ready polish." },
  { id: "n4", name: "Paraffin Wax Nourishment", category: "Nails", audience: "Everyone", price: 2500, duration: 30, description: "Warm vitamin-E paraffin dip for hands and feet to soften dry cuticles." },
  { id: "n5", name: "Men's Clean Hand & Foot Grooming", category: "Nails", audience: "Men", price: 4200, duration: 60, description: "Natural nail trim, buff, cuticle tidy, heel smoothing, and no-polish professional finish." },

  // --- Body & Waxing ---
  { id: "w1", name: "Arms & Legs Honey Waxing", category: "Body & Waxing", audience: "Everyone", price: 6500, duration: 75, description: "Hydrating professional wax care for smooth arms and legs, with sensitive-skin options." },
  { id: "w2", name: "Underarm & Bikini Waxing", category: "Body & Waxing", audience: "Women", price: 3000, duration: 30, description: "Gentle sensitive-skin wax formula for intimate area hair removal." },
  { id: "w3", name: "Detoxifying Body Scrub & Polish", category: "Body & Waxing", audience: "Everyone", price: 7500, duration: 90, description: "Sri Lankan coffee and sea salt body polish for smoother, fresher-looking skin." },
  { id: "w4", name: "Back & Chest Grooming Wax", category: "Body & Waxing", audience: "Men", price: 7000, duration: 70, description: "Professional back or chest waxing with calming after-care for a neat, comfortable finish." },

  // --- Bridal & Special Occasion ---
  { id: "b1", name: "Traditional Kandyan Bridal Makeover", category: "Bridal & Special Occasion", audience: "Women", price: 65000, duration: 240, description: "The ultimate cultural hallmark. Includes secure saree draping, jewelry pinning, hair updo, and photogenic airbrush makeup." },
  { id: "b2", name: "Western/Modern Bridal Makeup", category: "Bridal & Special Occasion", audience: "Women", price: 55000, duration: 180, description: "Elegant dewy skin finish with soft pastel highlights, stylish modern waves, and veil placement." },
  { id: "b3", name: "Party Hair, Makeup & Outfit Styling", category: "Bridal & Special Occasion", audience: "Everyone", price: 12000, duration: 90, description: "Event styling for sarees, suits, party hair, makeup, grooming touch-ups, and photo-ready finishing." },
  { id: "b4", name: "Groom Styling & Camera-Ready Makeup", category: "Bridal & Special Occasion", audience: "Men", price: 18000, duration: 90, description: "Hair setting, beard tidy, shine-control grooming makeup, and outfit finishing for weddings or photoshoots." },

  // --- Relaxation & Wellness ---
  { id: "v1", name: "Head, Neck & Shoulder Massage", category: "Relaxation & Wellness", audience: "Everyone", price: 2500, duration: 30, description: "Relieves muscle tension using pure warm herbal oil (Siddhalepa or Neeladi oil)." },
  { id: "v2", name: "Ayurvedic Shirodhara Therapy", category: "Relaxation & Wellness", audience: "Everyone", price: 9500, duration: 90, description: "Traditional continuous pouring of warm medicated oil on the forehead to support calm and rest." },
  { id: "v3", name: "Foot Reflexology & Leg Recovery", category: "Relaxation & Wellness", audience: "Everyone", price: 4200, duration: 45, description: "Modern foot pressure therapy and leg massage for customers who stand, walk, travel, or work long hours." }
];

export const MOCK_PACKAGES: Package[] = [
  {
    id: "pkg1",
    name: "Basic Glow — Daily Care",
    audience: "Everyone",
    services: ["Eyebrow Threading & Grooming", "Unisex Cleansing Facial", "Paraffin Wax Nourishment"],
    totalPrice: 5350,
    discountPrice: 3900,
    isPopular: false,
    description: "Your go-to routine care for young professionals and university students.",
    inclusions: ["Eyebrow grooming", "Basic facial cleansing", "Warm paraffin hand massage", "LKR 1,450 savings!"]
  },
  {
    id: "pkg2",
    name: "Refresh & Shine — Weekly Combo",
    audience: "Everyone",
    services: ["Hair Wash, Blow Dry & Finish", "Scalp Treatment & Henna Pack", "Melo-White D-Tan & Tan Removal", "Express Manicure & Pedicure"],
    totalPrice: 13700,
    discountPrice: 9900,
    isPopular: true,
    description: "Highly requested combo designed to reverse busy workweek stress and sun damage.",
    inclusions: ["Professional blowout", "Dandruff/anti-hairfall scalp treatment", "Full de-tan facial", "Standard manicure & pedicure", "LKR 3,800 discount"]
  },
  {
    id: "pkg3",
    name: "Relax & Restore — Weekend Spa",
    audience: "Everyone",
    services: ["Ayurvedic Herbal Treatment", "Ayurvedic Shirodhara Therapy", "Head, Neck & Shoulder Massage"],
    totalPrice: 16800,
    discountPrice: 12500,
    isPopular: false,
    description: "A calming holistic escape for students, professionals, and busy families.",
    inclusions: ["Kasthuri Kaha Kasthuri herbal facial", "90-minute warm oil head pouring", "Stress-relief shoulder rubdown"]
  },
  {
    id: "pkg4",
    name: "Nails & Groomed Hands Focus",
    audience: "Everyone",
    services: ["Luxury Gel Pedicure", "Builder Gel extensions & Nail Art", "Paraffin Wax Nourishment"],
    totalPrice: 16500,
    discountPrice: 12000,
    isPopular: false,
    description: "Premium hand and foot care for clean natural grooming, subtle polish, or bold custom art.",
    inclusions: ["Gel spa pedicure or natural buff finish", "Optional extensions or custom hand-painted themes", "Paraffin bath treatment"]
  },
  {
    id: "pkg5",
    name: "Bridal & Groom Event Ready",
    audience: "Everyone",
    services: ["Traditional Kandyan Bridal Makeover", "Express Manicure & Pedicure", "Keratin Smooth Treatment", "Arms & Legs Honey Waxing"],
    totalPrice: 99500,
    discountPrice: 80000,
    isPopular: true,
    description: "Our signature wedding and event series for brides, grooms, and close family members.",
    inclusions: [
      "Traditional Kandyan, Western, or groom-ready event look",
      "Saree, dress, or suit styling support",
      "Hands and legs waxing or grooming care",
      "Nail manicuring and moisturizing",
      "Complimentary trial styling session (arranged 3 weeks prior)",
      "High-value booking: 50% deposit required"
    ]
  },
  {
    id: "pkg6",
    name: "Pre-Event Care Series (1-Month)",
    audience: "Everyone",
    services: ["Ayurvedic Herbal Treatment", "Deep Pore / Anti-Aging Collagen Facial", "Detoxifying Body Scrub & Polish", "Scalp Treatment & Henna Pack"],
    totalPrice: 25300,
    discountPrice: 19500,
    isPopular: false,
    description: "4-week multi-session care plan for brides, grooms, graduates, and event guests.",
    inclusions: [
      "4 continuous weekly custom facials",
      "Full body deep-cleansing scrub",
      "Scalp hair fall treatment package",
      "Final styling or makeup trial session"
    ]
  },
  {
    id: "pkg7",
    name: "Family Weekend Combo",
    audience: "Everyone",
    services: ["Designer Haircut & Styling", "Men's Classic Cut & Beard Sculpting", "Unisex Cleansing Facial"],
    totalPrice: 7500,
    discountPrice: 5500,
    isPopular: false,
    description: "Perfect weekend treat for couples, friends, siblings, and children.",
    inclusions: ["1 long-hair cut & finish", "1 short-hair cut or beard trim", "1 basic soothing facial", "Special children cuts are 15% off extra"]
  },
  {
    id: "pkg8",
    name: "Student Special — Budget Savers",
    audience: "Everyone",
    services: ["Designer Haircut & Styling", "Eyebrow Threading & Grooming", "Unisex Cleansing Facial"],
    totalPrice: 6050,
    discountPrice: 3500,
    isPopular: false,
    description: "Exclusive budget companion for university and college students with valid student ID cards.",
    inclusions: ["Classic trend haircut", "Eyebrow precision grooming", "Gentle deep cleanser layer"]
  },
  {
    id: "pkg9",
    name: "Men's Modern Grooming Pro",
    audience: "Men",
    services: ["Fade Cut, Beard Spa & Hot Towel", "Men's Beard & Face Detox Facial", "Men's Clean Hand & Foot Grooming"],
    totalPrice: 13100,
    discountPrice: 9900,
    isPopular: true,
    description: "A sharp, modern grooming package for work, dates, interviews, weddings, and photoshoots.",
    inclusions: ["Fade or classic cut", "Beard spa and hot towel", "Face detox facial", "Natural hand and foot grooming", "LKR 3,200 savings"]
  },
  {
    id: "pkg10",
    name: "Couple / Bestie Glow Duo",
    audience: "Everyone",
    services: ["Designer Haircut & Styling", "HydraGlow Aqua Facial", "Foot Reflexology & Leg Recovery"],
    totalPrice: 34800,
    discountPrice: 27500,
    isPopular: false,
    description: "A shared pamper day for couples, siblings, friends, or parent-and-child bookings.",
    inclusions: ["2 designer cuts or styling finishes", "2 HydraGlow Aqua facials", "2 foot recovery sessions", "Same-day paired appointment support"]
  }
];

export const MOCK_USERS: User[] = [
  { id: "usr_admin", name: "Priyanthi Gunasekara", email: "beautician@luminae.lk", phone: "+94 77 123 4567", role: "admin", createdAt: "2024-01-10" },
  
  { id: "usr_worker1", name: "Anusha Perera", email: "anusha@luminae.lk", phone: "+94 71 456 7890", role: "worker", createdAt: "2024-02-15" },
  { id: "usr_worker2", name: "Sanduni Jayasekara", email: "sanduni@luminae.lk", phone: "+94 72 890 1234", role: "worker", createdAt: "2024-05-01" },
  { id: "usr_worker3", name: "Dilshan Silva", email: "dilshan@luminae.lk", phone: "+94 76 345 6789", role: "worker", createdAt: "2025-01-20" },
  { id: "usr_worker4", name: "Kavindu Perera", email: "kavindu@luminae.lk", phone: "+94 74 234 5678", role: "worker", createdAt: "2025-04-08" },

  { id: "usr_cust1", name: "sathurgini kalanan", email: "sathurgini@gmail.com", phone: "+94 77 555 4321", role: "customer", createdAt: "2025-03-12" },
  { id: "usr_cust2", name: "Fathima Riza", email: "fathima@gmail.com", phone: "+94 75 987 6543", role: "customer", createdAt: "2025-04-10" },
  { id: "usr_cust3", name: "Nimisha Fernando", email: "nimisha@gmail.com", phone: "+94 70 222 3333", role: "customer", createdAt: "2025-05-18" }
];

export const MOCK_WORKERS: WorkerDetails[] = [
  { id: "usr_worker1", name: "Anusha Perera", email: "anusha@luminae.lk", phone: "+94 71 456 7890", specialty: ["Skin & Facial", "Bridal & Special Occasion", "Body & Waxing"], isActive: true, assignedCount: 3 },
  { id: "usr_worker2", name: "Sanduni Jayasekara", email: "sanduni@luminae.lk", phone: "+94 72 890 1234", specialty: ["Hair", "Nails", "Body & Waxing"], isActive: true, assignedCount: 2 },
  { id: "usr_worker3", name: "Dilshan Silva", email: "dilshan@luminae.lk", phone: "+94 76 345 6789", specialty: ["Hair", "Relaxation & Wellness", "Men's Grooming"], isActive: true, assignedCount: 1 },
  { id: "usr_worker4", name: "Kavindu Perera", email: "kavindu@luminae.lk", phone: "+94 74 234 5678", specialty: ["Skin & Facial", "Men's Grooming", "Hair"], isActive: true, assignedCount: 0 }
];

export const MOCK_CLIENT_NOTES: WorkerNotes[] = [
  { id: "nt1", clientId: "usr_cust1", clientName: "sathurgini kalanan", workerId: "usr_worker1", note: "Has a faint skin allergic reaction to regular tea tree wax. Switched into organic strawberry or cold honey wax with zero redness.", createdAt: "2026-05-12" },
  { id: "nt2", clientId: "usr_cust2", clientName: "Fathima Riza", workerId: "usr_worker2", note: "Prefers Japanese rebonding chemicals with strong protection serum. Hair gets oily very quickly.", createdAt: "2026-06-01" },
  { id: "nt3", clientId: "usr_cust1", clientName: "sathurgini kalanan", workerId: "usr_worker3", note: "Requests light shoulder pressure during wellness massage. Enjoys warm Neeladi hair oil treatment.", createdAt: "2026-06-10" }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "apt1",
    clientId: "usr_cust1",
    clientName: "sathurgini kalanan",
    clientPhone: "+94 77 555 4321",
    workerId: "usr_worker1",
    workerName: "Anusha Perera",
    serviceId: "b1",
    serviceName: "Traditional Kandyan Bridal Makeover",
    category: "Bridal & Special Occasion",
    date: "2026-06-12",
    time: "09:00",
    status: "confirmed",
    price: 65000,
    duration: 240,
    notes: "Kandyan style with complete gold jewelry pinning. Bride has wedding saree to drape."
  },
  {
    id: "apt2",
    clientId: "usr_cust2",
    clientName: "Fathima Riza",
    clientPhone: "+94 75 987 6543",
    workerId: "usr_worker2",
    workerName: "Sanduni Jayasekara",
    serviceId: "h4",
    serviceName: "Keratin Smooth Treatment",
    category: "Hair",
    date: "2026-06-12",
    time: "14:00",
    status: "started",
    price: 25000,
    duration: 180,
    notes: "Requires deep wash and post-treatment moisture conditioner recommendations."
  },
  {
    id: "apt3",
    clientId: "usr_cust3",
    clientName: "Nimisha Fernando",
    clientPhone: "+94 70 222 3333",
    workerId: "usr_worker3",
    workerName: "Dilshan Silva",
    serviceId: "v1",
    serviceName: "Head, Neck & Shoulder Massage",
    category: "Relaxation & Wellness",
    date: "2026-06-12",
    time: "17:30",
    status: "pending",
    price: 2500,
    duration: 30,
    notes: "Sore shoulders from desk job. Use herbal Siddhalepa spray if possible."
  },
  {
    id: "apt4",
    clientId: "usr_cust1",
    clientName: "sathurgini kalanan",
    clientPhone: "+94 77 555 4321",
    workerId: "usr_worker1",
    workerName: "Anusha Perera",
    serviceId: "s2",
    serviceName: "Ayurvedic Herbal Treatment",
    category: "Skin & Facial",
    date: "2026-06-15",
    time: "11:00",
    status: "confirmed",
    price: 4800,
    duration: 75,
    notes: "Nourishing facial using sandalwood and Kasthuri Kaha powder."
  },
  {
    id: "apt5",
    clientId: "usr_cust2",
    clientName: "Fathima Riza",
    clientPhone: "+94 75 987 6543",
    workerId: "usr_worker2",
    workerName: "Sanduni Jayasekara",
    serviceId: "n3",
    serviceName: "Builder Gel extensions & Nail Art",
    category: "Nails",
    date: "2026-06-18",
    time: "10:30",
    status: "confirmed",
    price: 8500,
    duration: 120,
    notes: "Wants a beautiful coastal blue tone with hand painted details."
  },
  {
    id: "apt_past1",
    clientId: "usr_cust1",
    clientName: "sathurgini kalanan",
    clientPhone: "+94 77 555 4321",
    workerId: "usr_worker1",
    workerName: "Anusha Perera",
    serviceId: "s5",
    serviceName: "Eyebrow Threading & Grooming",
    category: "Skin & Facial",
    date: "2026-06-01",
    time: "15:00",
    status: "completed",
    price: 350,
    duration: 15,
    notes: "Eyebrow cleaning",
    feedback: "Extremely tidy threading job. Anusha is super polite and quick!",
    rating: 5
  },
  {
    id: "apt_past2",
    clientId: "usr_cust3",
    clientName: "Nimisha Fernando",
    clientPhone: "+94 70 222 3333",
    workerId: "usr_worker2",
    workerName: "Sanduni Jayasekara",
    serviceId: "h2",
    serviceName: "Hair Wash & Professional Blow Dry",
    category: "Hair",
    date: "2026-06-05",
    time: "16:00",
    status: "completed",
    price: 2200,
    duration: 30,
    notes: "Going to a graduation ceremony. Curled blowout styling.",
    feedback: "My curls stayed flawless all evening! Beautiful service.",
    rating: 5
  }
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: "inv1", name: "Imported Keratin Nourish Solution (1L)", stock: 3, minStock: 5, category: "Hair", price: 18500 },
  { id: "inv2", name: "Luxury Organic Strawberry Cold Wax (2Kg)", stock: 8, minStock: 4, category: "Wax", price: 6200 },
  { id: "inv3", name: "Herbal kasthuri Kaha & Sandalwood Clay Pack", stock: 15, minStock: 10, category: "Facial", price: 3400 },
  { id: "inv4", name: "Medicated Neeladi Hair Oil (Siddhalepa 500ml)", stock: 2, minStock: 4, category: "Massage", price: 1200 },
  { id: "inv5", name: "Professional UV Nail Extension Builder Gel", stock: 12, minStock: 6, category: "Nails", price: 4500 },
  { id: "inv6", name: "High-grade Japanese Rebonding Serum", stock: 1, minStock: 3, category: "Hair", price: 21500 }
];

export interface ComparisonEra {
  id: string;
  name: string;
  duration: string;
  badge: "Old" | "Mid" | "Modern" | "Current";
  tools: string[];
  features: string[];
  payments: string[];
  scheduling: string[];
  marketing: string[];
}

export const COMPARISON_ERAS: ComparisonEra[] = [
  {
    id: "e1",
    name: "Traditional Era",
    duration: "Pre-2000",
    badge: "Old",
    tools: ["Basic scissors", "Home-made wooden chairs", "Home-brewed herbal extracts", "Traditional henna paste"],
    features: ["Natural coconut oil care", "Herbal remedies", "Basic haircut styles"],
    payments: ["Strictly Cash-only in Rupees"],
    scheduling: ["Walk-in only", "No phone or bookings available"],
    marketing: ["Strictly word of mouth in local village"]
  },
  {
    id: "e2",
    name: "Transition Era",
    duration: "2000–2015",
    badge: "Mid",
    tools: ["Professional adjustable chairs", "Hood dryers", "Basic steamers", "Early facial kits"],
    features: ["Imported basic cosmetics", "Nail filing", "Bleaching & hair colouring"],
    payments: ["Cash-only", "Early manual paper receipts for record-keeping"],
    scheduling: ["Phone-based landline calls", "Paper appointments book"],
    marketing: ["Printed price boards", "Local newspaper ads", "Cardboard pamphlets"]
  },
  {
    id: "e3",
    name: "Digital Era",
    duration: "2015–2022",
    badge: "Modern",
    tools: ["High-power hair blowers", "Professional styling mirrors", "LED skin lamps", "UV nail lamps"],
    features: ["Branded chemical lines", "Hair rebonding & keratin", "Gel nail extensions"],
    payments: ["Swipe card POS terminal (Visa/Mastercard)", "Invoiced receipts"],
    scheduling: ["早期 Online booking websites / email", "Excel schedules"],
    marketing: ["Branded Facebook page", "Vibrant Instagram updates"]
  },
  {
    id: "e4",
    name: "Smart Parlour",
    duration: "2023–Now",
    badge: "Current",
    tools: ["Modern smart treatment machines", "Vaporizers", "Active CRM tablets", "Digital checkout registers"],
    features: ["LankaQR Code displays", "Ayurvedic Spa combos", "Korean trends", "CRM notes tracking allergies"],
    payments: ["Instant LankaQR transfer (Sampath Vishwa / BOC / FriMi)", "Digital POS", "Digital SMS invoices"],
    scheduling: ["Multi-role booking app", "Automated WhatsApp booking confirmations & reminders"],
    marketing: ["Google Business Profiles", "TikTok makeup transformations", "WhatsApp campaigns"]
  }
];
