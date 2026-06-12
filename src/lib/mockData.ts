/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Package, User, WorkerDetails, Appointment, InventoryItem, WorkerNotes } from "../types";

// Service categories: Hair, Skin & Facial, Nails, Body & Waxing, Bridal & Special Occasion, Relaxation & Wellness
export const MOCK_SERVICES: Service[] = [
  // --- Hair ---
  { id: "h1", name: "Designer Haircut & styling", category: "Hair", price: 3200, duration: 45, description: "Personalized haircut suited to your face structure, includes therapeutic wash and rough dry." },
  { id: "h2", name: "Hair Wash & Professional Blow Dry", category: "Hair", price: 2200, duration: 30, description: "Hydrating wash followed by expert blowout and styling (sleek, volume, or curls)." },
  { id: "h3", name: "Global Hair Colouring / Highlights", category: "Hair", price: 14500, duration: 120, description: "Premium imported colour application or customized balayage with high-contrast highlights." },
  { id: "h4", name: "Keratin Smooth Treatment", category: "Hair", price: 25000, duration: 180, description: "Deep nourishing protein application to eliminate frizz, restore shine, and straighten hair." },
  { id: "h5", name: "Rebonding & Relaxing", category: "Hair", price: 28000, duration: 240, description: "Permanent hair straightening using premium Japanese technology, includes pre-care serum." },
  { id: "h6", name: "Scalp Treatment & Henna Pack", category: "Hair", price: 4500, duration: 60, description: "Traditional Sri Lankan cooling henna blend with virgin coconut oil to treat dandruff and strengthen roots." },
  { id: "h7", name: "Men's Classic Cut & Beard Sculpting", category: "Hair", price: 1800, duration: 30, description: "Specialized men's grooming section that boosts parlour revenue by 35%." },

  // --- Skin & Facial ---
  { id: "s1", name: "Basic Cleansing Facial", category: "Skin & Facial", price: 2500, duration: 45, description: "Gentle exfoliation, steam, blackhead extractions, and light hydrating mask." },
  { id: "s2", name: "Ayurvedic Herbal Treatment", category: "Skin & Facial", price: 4800, duration: 75, description: "Infused with pure local sandalwood, wild turmeric (Kasthuri Kaha), and red rice powder." },
  { id: "s3", name: "Deep Pore / Anti-Aging Collagen Facial", category: "Skin & Facial", price: 8500, duration: 90, description: "Premium cellular recovery with active collagen ampoules and cold hammer firming technology." },
  { id: "s4", name: "Melo-White D-Tan & Tan Removal", category: "Skin & Facial", price: 3800, duration: 50, description: "Effective botanical peel that reverses solar tanning from Sri Lanka's tropical climate." },
  { id: "s5", name: "Eyebrow Threading & Shaping", category: "Skin & Facial", price: 350, duration: 15, description: "Highly precise thread line shaping for clean, symmetrical arches." },

  // --- Nails ---
  { id: "n1", name: "Express Manicure & Pedicure", category: "Nails", price: 3500, duration: 60, description: "Nail shaping, cuticle tidy, dead skin scrubbing, light massage, and standard base + colour coat." },
  { id: "n2", name: "Luxury Gel Pedicure", category: "Nails", price: 5500, duration: 75, description: "Long-lasting high-shine soak-off gel polish cured under UV LED, including a salt soak." },
  { id: "n3", name: "Builder Gel extensions & Nail Art", category: "Nails", price: 8500, duration: 120, description: "Full set acrylic/builder gel nails topped with beautiful custom hand-painted Sri Lankan resort designs." },
  { id: "n4", name: "Paraffin Wax Nourishment", category: "Nails", price: 2500, duration: 30, description: "Warm vitamin-E parrafin dip for hands and feet to soften dry cuticles." },

  // --- Body & Waxing ---
  { id: "w1", name: "Full Arms & Legs Honey Waxing", category: "Body & Waxing", price: 6500, duration: 75, description: "Hydrating professional fruit wax removal for completely smooth limbs." },
  { id: "w2", name: "Underarm & Bikini Waxing", category: "Body & Waxing", price: 3000, duration: 30, description: "Gentle sensitive-skin wax formula for intimate area hair removal." },
  { id: "w3", name: "Detoxifying Body Scrub & Polish", category: "Body & Waxing", price: 7500, duration: 90, description: "Exfoliating Sri Lankan coffee and sea salt full body scrub to reveal glowing skin." },

  // --- Bridal & Special Occasion ---
  { id: "b1", name: "Traditional Kandyan Bridal Makeover", category: "Bridal & Special Occasion", price: 65000, duration: 240, description: "The ultimate cultural hallmark. Includes secure saree draping (7 folds), heavy jewelry pinning, hair updo, and photogenic airbrush makeup." },
  { id: "b2", name: "Western/Modern Bridal Makeup", category: "Bridal & Special Occasion", price: 55000, duration: 180, description: "Elegant dewy skin finish with soft pastel highlights, stylish modern waves and veil placement." },
  { id: "b3", name: "Saree Draping & Party Hair / Makeup", category: "Bridal & Special Occasion", price: 12000, duration: 90, description: "Expert draping of Kandyan, Gujarati, or modern drape styles with matching hair updo." },

  // --- Relaxation & Wellness ---
  { id: "v1", name: "Head, Neck & Shoulder Massage", category: "Relaxation & Wellness", price: 2500, duration: 30, description: "Relieves muscle tension using pure warm herbal oil (Siddhalepa or Neeladi oil)." },
  { id: "v2", name: "Ayurvedic Shirodhara Therapy", category: "Relaxation & Wellness", price: 9500, duration: 90, description: "Traditional continuous pouring of warm medicated oil on the third eye to treat stress and insomnia." }
];

export const MOCK_PACKAGES: Package[] = [
  {
    id: "pkg1",
    name: "🌸 Basic Glow — Daily Care",
    services: ["Eyebrow Threading & Shaping", "Basic Cleansing Facial", "Paraffin Wax Nourishment"],
    totalPrice: 5350,
    discountPrice: 3900,
    isPopular: false,
    description: "Your go-to routine pampering for young professionals and university students.",
    inclusions: ["Eyebrow shaping", "Basic facial cleansing", "Warm paraffin hand massage", "LKR 1,450 savings!"]
  },
  {
    id: "pkg2",
    name: "✨ Refresh & Shine — Weekly Combo",
    services: ["Hair Wash & Professional Blow Dry", "Scalp Treatment & Henna Pack", "Melo-White D-Tan & Tan Removal", "Express Manicure & Pedicure"],
    totalPrice: 13700,
    discountPrice: 9900,
    isPopular: true,
    description: "Highly requested combo designed to reverse busy workweek stress and sun damage.",
    inclusions: ["Professional blowout", "Dandruff/anti-hairfall scalp treatment", "Full de-tan facial", "Standard manicure & pedicure", "LKR 3,800 discount"]
  },
  {
    id: "pkg3",
    name: "💆 Relax & Restore — Weekend Spa",
    services: ["Ayurvedic Herbal Treatment", "Ayurvedic Shirodhara Therapy", "Head, Neck & Shoulder Massage"],
    totalPrice: 16800,
    discountPrice: 12500,
    isPopular: false,
    description: "A profound holistic escape returning your body to perfect physical equilibrium.",
    inclusions: ["Kasthuri Kaha Kasthuri herbal facial", "90-minute warm oil head pouring", "Stress-relief shoulder rubdown"]
  },
  {
    id: "pkg4",
    name: "💅 Nails & Glam Art Focus",
    services: ["Luxury Gel Pedicure", "Builder Gel extensions & Nail Art", "Paraffin Wax Nourishment"],
    totalPrice: 16500,
    discountPrice: 12000,
    isPopular: false,
    description: "Flaunted by beauty influencers. Premium long-wear acrylics with beautiful customized details.",
    inclusions: ["Gel spa pedicure", "Nail extensions with custom hand-painted themes", "Paraffin bath treatment"]
  },
  {
    id: "pkg5",
    name: "👰 Bridal Bliss — Full Kandyan/Western",
    services: ["Traditional Kandyan Bridal Makeover", "Express Manicure & Pedicure", "Keratin Smooth Treatment", "Full Arms & Legs Honey Waxing"],
    totalPrice: 99500,
    discountPrice: 80000,
    isPopular: true,
    description: "Our signature and most profitable wedding series. Includes trial makeup, saree draping, and pre-care services.",
    inclusions: [
      "Traditional Kandyan or Western bridal look",
      "Saree/dress styling & draping helper",
      "Full hands & legs strawberry waxing",
      "Nail manicuring + moisturizing",
      "Complimentary trial makeup session (arranged 3 weeks prior)",
      "High-value booking: 50% deposit required"
    ]
  },
  {
    id: "pkg6",
    name: "🎀 Pre-Bridal Care Series (1-Month)",
    services: ["Ayurvedic Herbal Treatment", "Deep Pore / Anti-Aging Collagen Facial", "Detoxifying Body Scrub & Polish", "Scalp Treatment & Henna Pack"],
    totalPrice: 25300,
    discountPrice: 19500,
    isPopular: false,
    description: "4-week multi-session glow plan for brides-to-be.",
    inclusions: [
      "4 continuous weekly custom facials",
      "Full body deep-cleansing scrub",
      "Scalp hair fall treatment package",
      "Final makeup trial session"
    ]
  },
  {
    id: "pkg7",
    name: "👨‍👩‍👧 Family weekend Combo",
    services: ["Designer Haircut & styling", "Men's Classic Cut & Beard Sculpting", "Basic Cleansing Facial"],
    totalPrice: 7500,
    discountPrice: 5500,
    isPopular: false,
    description: "Perfect weekend treat for couples and their children.",
    inclusions: ["1 Ladies cut & blow dry", "1 Gents cut & trim", "1 basic soothing facial", "Special children cuts are 15% off extra"]
  },
  {
    id: "pkg8",
    name: "🎓 Student Special — Budget Savers",
    services: ["Designer Haircut & styling", "Eyebrow Threading & Shaping", "Basic Cleansing Facial"],
    totalPrice: 6050,
    discountPrice: 3500,
    isPopular: false,
    description: "Exclusive budget companion for university and college students with valid student ID cards.",
    inclusions: ["Classic trend hair cut", "Eyebrow precision grooming", "Gentle deep cleanser layer"]
  }
];

export const MOCK_USERS: User[] = [
  { id: "usr_admin", name: "Priyanthi Gunasekara", email: "beautician@luminae.lk", phone: "+94 77 123 4567", role: "admin", createdAt: "2024-01-10" },
  
  { id: "usr_worker1", name: "Anusha Perera", email: "anusha@luminae.lk", phone: "+94 71 456 7890", role: "worker", createdAt: "2024-02-15" },
  { id: "usr_worker2", name: "Sanduni Jayasekara", email: "sanduni@luminae.lk", phone: "+94 72 890 1234", role: "worker", createdAt: "2024-05-01" },
  { id: "usr_worker3", name: "Dilshan Silva", email: "dilshan@luminae.lk", phone: "+94 76 345 6789", role: "worker", createdAt: "2025-01-20" },

  { id: "usr_cust1", name: "Sathurgini Rajendran", email: "sathurgini@gmail.com", phone: "+94 77 555 4321", role: "customer", createdAt: "2025-03-12" },
  { id: "usr_cust2", name: "Fathima Riza", email: "fathima@gmail.com", phone: "+94 75 987 6543", role: "customer", createdAt: "2025-04-10" },
  { id: "usr_cust3", name: "Nimisha Fernando", email: "nimisha@gmail.com", phone: "+94 70 222 3333", role: "customer", createdAt: "2025-05-18" }
];

export const MOCK_WORKERS: WorkerDetails[] = [
  { id: "usr_worker1", name: "Anusha Perera", email: "anusha@luminae.lk", phone: "+94 71 456 7890", specialty: ["Skin & Facial", "Bridal & Special Occasion", "Body & Waxing"], isActive: true, assignedCount: 3 },
  { id: "usr_worker2", name: "Sanduni Jayasekara", email: "sanduni@luminae.lk", phone: "+94 72 890 1234", specialty: ["Hair", "Nails", "Body & Waxing"], isActive: true, assignedCount: 2 },
  { id: "usr_worker3", name: "Dilshan Silva", email: "dilshan@luminae.lk", phone: "+94 76 345 6789", specialty: ["Hair", "Relaxation & Wellness"], isActive: true, assignedCount: 1 }
];

export const MOCK_CLIENT_NOTES: WorkerNotes[] = [
  { id: "nt1", clientId: "usr_cust1", clientName: "Sathurgini Rajendran", workerId: "usr_worker1", note: "Has a faint skin allergic reaction to regular tea tree wax. Switched into organic strawberry or cold honey wax with zero redness.", createdAt: "2026-05-12" },
  { id: "nt2", clientId: "usr_cust2", clientName: "Fathima Riza", workerId: "usr_worker2", note: "Prefers Japanese rebonding chemicals with strong protection serum. Hair gets oily very quickly.", createdAt: "2026-06-01" },
  { id: "nt3", clientId: "usr_cust1", clientName: "Sathurgini Rajendran", workerId: "usr_worker3", note: "Requests light shoulder pressure during wellness massage. Enjoys warm Neeladi hair oil treatment.", createdAt: "2026-06-10" }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "apt1",
    clientId: "usr_cust1",
    clientName: "Sathurgini Rajendran",
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
    clientName: "Sathurgini Rajendran",
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
    clientName: "Sathurgini Rajendran",
    clientPhone: "+94 77 555 4321",
    workerId: "usr_worker1",
    workerName: "Anusha Perera",
    serviceId: "s5",
    serviceName: "Eyebrow Threading & Shaping",
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
