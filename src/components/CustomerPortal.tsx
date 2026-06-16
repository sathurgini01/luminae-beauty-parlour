/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Image from "next/image";
import { useAppState } from "../context/AppContext";
import { 
  Sparkles, Gift, Clock, Calendar, CheckCircle, Search, Scissors, 
  MapPin, Phone, Mail, MessageCircle, HelpCircle, Star, Palette, Award, Trash2, ChevronRight, 
  ArrowRight, ShieldCheck, Heart, User, Sparkle, AlertCircle, ShoppingBag, 
  History, Eye, Droplets, Flower2, Gem, HandHeart, Leaf, Waves, Crown, Paintbrush
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Service, Package, Appointment } from "../types";
import { COMPARISON_ERAS } from "../lib/mockData";

import beautyHeroModelData from "../assets/images/home-unisex-beauticians-hero.jpg";
import haircutImgData from "../assets/images/style_haircut_cutting.jpg";
import skinFacialImgData from "../assets/images/style_skin_facial_men.jpg";
import nailsImgData from "../assets/images/style_nails_polish.jpg";
import teamKavinduMaleBeauticianData from "../assets/images/team_kavindu_male_beautician.jpg";
import teamDilshanBlowdryData from "../assets/images/team_dilshan_blowdry.jpg";
import teamAnushaFacialMaskData from "../assets/images/team_anusha_facial_mask.jpg";
import teamSanduniNailPolishData from "../assets/images/team_sanduni_nail_polish.jpg";
import aboutLuminaeUnisexStylistsData from "../assets/images/about_luminae_unisex_stylists.jpg";
import gallerySalonInteriorData from "../assets/images/gallery_salon_interior.jpg";
import galleryGroomPrepData from "../assets/images/gallery_groom_prep.jpg";
import galleryMenHairWashData from "../assets/images/gallery_men_hair_wash.jpg";
import galleryBridalPrepData from "../assets/images/gallery_bridal_prep.jpg";
import galleryHairWashData from "../assets/images/gallery_hair_wash.jpg";
import galleryProductsToolsData from "../assets/images/gallery_products_tools.jpg";
import galleryThreadingWaxingData from "../assets/images/gallery_threading_waxing.jpg";

const teamKavinduMaleBeautician = teamKavinduMaleBeauticianData.src;
const teamDilshanBlowdry = teamDilshanBlowdryData.src;
const teamAnushaFacialMask = teamAnushaFacialMaskData.src;
const teamSanduniNailPolish = teamSanduniNailPolishData.src;
const gallerySalonInterior = gallerySalonInteriorData.src;
const galleryGroomPrep = galleryGroomPrepData.src;
const galleryMenHairWash = galleryMenHairWashData.src;
const galleryBridalPrep = galleryBridalPrepData.src;
const galleryHairWash = galleryHairWashData.src;
const galleryProductsTools = galleryProductsToolsData.src;
const galleryThreadingWaxing = galleryThreadingWaxingData.src;

interface CustomerPortalProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const categoryIconMap: Record<string, LucideIcon> = {
  All: Sparkles,
  Hair: Scissors,
  "Skin & Facial": Flower2,
  Nails: Gem,
  "Body & Waxing": HandHeart,
  "Bridal & Special Occasion": Crown,
  "Relaxation & Wellness": Waves
};

const serviceIconMap: Record<string, LucideIcon> = {
  h1: Scissors,
  h2: Droplets,
  h3: Palette,
  h4: ShieldCheck,
  h5: Waves,
  h6: Leaf,
  h7: User,
  h8: Sparkles,
  h9: Scissors,
  h10: User,
  s1: Flower2,
  s2: Leaf,
  s3: Sparkles,
  s4: Sparkle,
  s5: Paintbrush,
  s6: Droplets,
  s7: ShieldCheck,
  s8: User,
  n1: Gem,
  n2: Sparkles,
  n3: Palette,
  n4: HandHeart,
  n5: HandHeart,
  w1: HandHeart,
  w2: ShieldCheck,
  w3: Droplets,
  w4: ShieldCheck,
  b1: Crown,
  b2: Heart,
  b3: Award,
  b4: Crown,
  v1: Waves,
  v2: Leaf,
  v3: Waves
};

const branchLocations = [
  {
    order: "01",
    name: "Colombo 07 Flagship",
    label: "Main Branch",
    address: "45, Wijerama Mawatha, Colombo 07",
    hours: "Tue - Fri: 9.00 AM - 7.00 PM",
    weekendHours: "Sat - Sun: 8.30 AM - 8.00 PM",
    phone: "+94 77 123 4567",
    note: "Best for haircut consultations, hair styling, facials, grooming, bridal care, and full treatment packages."
  },
  {
    order: "02",
    name: "Kandy Luxury Suite",
    label: "Second Branch",
    address: "Level 2, Kandy City Centre, Kandy",
    hours: "Tue - Fri: 9.30 AM - 6.30 PM",
    weekendHours: "Sat - Sun: 8.30 AM - 7.30 PM",
    phone: "+94 11 234 5678",
    note: "Ideal for gel nails, threading, skin care, men's grooming, and express beauty appointments."
  },
  {
    order: "03",
    name: "Jaffna Heritage Studio",
    label: "Northern Branch",
    address: "No. 18, Hospital Road, Jaffna",
    hours: "Tue - Fri: 9.00 AM - 6.30 PM",
    weekendHours: "Sat - Sun: 8.30 AM - 7.00 PM",
    phone: "+94 21 222 4589",
    note: "Best for bridal saree styling, threading, facials, haircuts, and family beauty appointments."
  },
  {
    order: "04",
    name: "Galle Fort Boutique",
    label: "Southern Branch",
    address: "32, Lighthouse Street, Galle Fort",
    hours: "Tue - Fri: 9.30 AM - 6.30 PM",
    weekendHours: "Sat - Sun: 8.30 AM - 7.30 PM",
    phone: "+94 91 224 7788",
    note: "Popular for bridal trials, resort-ready nails, waxing, blowouts, and facial glow packages."
  },
  {
    order: "05",
    name: "Negombo Coastal Salon",
    label: "Western Coast",
    address: "76, Lewis Place, Negombo",
    hours: "Tue - Fri: 9.00 AM - 7.00 PM",
    weekendHours: "Sat - Sun: 8.30 AM - 8.00 PM",
    phone: "+94 31 223 8090",
    note: "Great for destination wedding prep, hair colour, men's grooming, waxing, and quick polish finishes."
  },
  {
    order: "06",
    name: "Kurunegala City Parlour",
    label: "North Western",
    address: "14, Kandy Road, Kurunegala",
    hours: "Tue - Fri: 9.00 AM - 6.30 PM",
    weekendHours: "Sat - Sun: 8.30 AM - 7.30 PM",
    phone: "+94 37 222 6199",
    note: "Convenient for haircuts, rebonding consultations, facials, threading, and student packages."
  },
  {
    order: "07",
    name: "Matara Glow Studio",
    label: "Deep South",
    address: "22, Beach Road, Matara",
    hours: "Tue - Fri: 9.30 AM - 6.30 PM",
    weekendHours: "Sat - Sun: 8.30 AM - 7.30 PM",
    phone: "+94 41 223 7440",
    note: "Focused on skin care, bridal party prep, hair styling, pedicures, and tropical humidity-safe finishes."
  },
  {
    order: "08",
    name: "Batticaloa Lagoon Suite",
    label: "Eastern Branch",
    address: "9, Lake Road, Batticaloa",
    hours: "Tue - Fri: 9.00 AM - 6.00 PM",
    weekendHours: "Sat - Sun: 8.30 AM - 7.00 PM",
    phone: "+94 65 222 5166",
    note: "Ideal for event makeup, threading, facials, hair treatments, and family appointment blocks."
  }
];

const getServiceIcon = (service: Service) => {
  return serviceIconMap[service.id] || categoryIconMap[service.category] || Sparkles;
};

const getAudienceTagClasses = (audience?: Service["audience"] | Package["audience"]) => {
  if (audience === "Men") return "bg-sky-50 text-sky-700 border-sky-100";
  if (audience === "Women") return "bg-yellow-50 text-yellow-700 border-yellow-100";
  return "bg-emerald-50 text-emerald-700 border-emerald-100";
};

const getAudienceLabel = (audience?: Service["audience"] | Package["audience"]) => {
  if (!audience) return "For Everyone";
  return audience === "Everyone" ? "For Everyone" : `For ${audience}`;
};

export default function CustomerPortal({ activeSection, onNavigate }: CustomerPortalProps) {
  const { 
    currentUser, 
    appointments, 
    services, 
    packages, 
    addAppointment, 
    updateAppointmentStatus,
    addFeedback,
    workers 
  } = useAppState();

  // Search & Filter state for Services page
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Booking Wizard State
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedServiceType, setSelectedServiceType] = useState<"service" | "package">("service");
  const [chosenServiceIds, setChosenServiceIds] = useState<string[]>([]);
  const [chosenPackageId, setChosenPackageId] = useState("");
  const [bookingCustomerName, setBookingCustomerName] = useState("");
  const [bookingCustomerPhone, setBookingCustomerPhone] = useState("");
  const [bookingCustomerEmail, setBookingCustomerEmail] = useState("");
  const [bookingCustomerGender, setBookingCustomerGender] = useState<"Male" | "Female" | "Prefer not to say">("Prefer not to say");
  const [bookingBranch, setBookingBranch] = useState("Colombo 07 Flagship");
  const [bookingPaymentMethod, setBookingPaymentMethod] = useState("Pay at salon");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingStaff, setBookingStaff] = useState("unassigned");
  const [bookingNotes, setBookingNotes] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [showQRModal, setShowQRModal] = useState(false);

  // Review states inside loyalty portal
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewAptId, setReviewAptId] = useState<string | null>(null);

  const categories = ["All", "Hair", "Skin & Facial", "Nails", "Body & Waxing", "Bridal & Special Occasion", "Relaxation & Wellness"];
  const todayDate = new Date().toISOString().split("T")[0];

  // 1. SERVICES PAGE FILTER LOGIC
  const filteredServices = services.filter(srv => {
    const matchesSearch = srv.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          srv.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || srv.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Client specific lists
  const clientAppointments = appointments.filter(apt => apt.clientId === currentUser?.id);
  const upcomingBookings = clientAppointments.filter(apt => apt.status !== "completed" && apt.status !== "cancelled");
  const pastBookings = clientAppointments.filter(apt => apt.status === "completed");

  // Calculate stats for customer
  const totalVisits = pastBookings.length;
  // Dynamic loyalty score calculation: 10 points for every 1000 LKR spent
  const totalSpent = pastBookings.reduce((sum, apt) => sum + apt.price, 0);
  const loyaltyPoints = Math.floor(totalSpent / 150); // Generous points program

  const getTier = () => {
    if (loyaltyPoints >= 500) return "Gold";
    if (loyaltyPoints >= 200) return "Silver";
    return "Bronze";
  };

  const getTierColor = (tier: string) => {
    if (tier === "Gold") return "from-amber-400 to-yellow-600 text-white";
    if (tier === "Silver") return "from-gray-300 to-slate-500 text-slate-800";
    return "from-amber-600 to-amber-800 text-amber-50";
  };

  // 2. BOOKING ACTION TRIGGERS
  const triggerQuickBook = (id: string, type: "service" | "package") => {
    setSelectedServiceType(type);
    if (type === "service") {
      setChosenServiceIds([id]);
      setChosenPackageId("");
    } else {
      setChosenPackageId(id);
      setChosenServiceIds([]);
    }
    setBookingStep(1);
    onNavigate("book");
  };

  const toggleChosenService = (serviceId: string) => {
    setBookingError("");
    setChosenServiceIds(prev => (
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    ));
  };

  const selectedServices = services.filter(service => chosenServiceIds.includes(service.id));
  const selectedPackage = packages.find(pkg => pkg.id === chosenPackageId);
  const bookingPreviewName = selectedServiceType === "service"
    ? selectedServices.map(service => service.name).join(" + ")
    : selectedPackage?.name || "";
  const bookingPreviewPrice = selectedServiceType === "service"
    ? selectedServices.reduce((sum, service) => sum + service.price, 0)
    : selectedPackage?.discountPrice || 0;
  const bookingPreviewDuration = selectedServiceType === "service"
    ? selectedServices.reduce((sum, service) => sum + service.duration, 0)
    : 120;

  // Create booking
  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const customerName = bookingCustomerName.trim() || currentUser?.name || "";
    const customerPhone = bookingCustomerPhone.trim() || currentUser?.phone || "";
    const customerEmail = bookingCustomerEmail.trim() || currentUser?.email || "";

    if (!customerName || !customerPhone || !customerEmail) {
      setBookingError("Please enter your full name, phone number, and email.");
      return;
    }

    let bName = "";
    let bPrice = 0;
    let bCategory = "";
    let bDuration = 45;

    if (selectedServiceType === "service") {
      if (selectedServices.length === 0) return;
      bName = selectedServices.map(service => service.name).join(" + ");
      bPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
      bCategory = selectedServices.length === 1 ? selectedServices[0].category : "Multi-Service Booking";
      bDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0);
    } else {
      if (!selectedPackage) return;
      bName = selectedPackage.name;
      bPrice = selectedPackage.discountPrice;
      bCategory = "Bridal & Combo Packages";
      bDuration = 120; // Avg package
    }

    addAppointment({
      clientId: currentUser?.id || `guest_${Date.now()}`,
      clientName: customerName,
      clientPhone: customerPhone,
      workerId: bookingStaff,
      serviceId: selectedServiceType === "service" ? chosenServiceIds.join(",") : chosenPackageId,
      serviceName: bName,
      category: bCategory,
      date: bookingDate || new Date().toISOString().split("T")[0],
      time: bookingTime || "10:00",
      price: bPrice,
      duration: bDuration,
      notes: [
        `Email: ${customerEmail}`,
        `Customer gender: ${bookingCustomerGender}`,
        `Branch: ${bookingBranch}`,
        `Payment method: ${bookingPaymentMethod}`,
        bookingNotes ? `Notes: ${bookingNotes}` : ""
      ].filter(Boolean).join(" | ")
    });

    // Reset steps
    setBookingError("");
    setBookingStep(3); // Go to final confirmation screen with LankaQR code display
  };

  const submitClientReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAptId) return;
    addFeedback(reviewAptId, reviewComment, reviewRating);
    setReviewAptId(null);
    setReviewComment("");
    setReviewRating(5);
  };

  return (
    <div className="bg-[#F8F0EC] min-h-screen font-sans text-[#2C2C2A]" id="customer-core-portal">
      
      {/* ----------------- SECTION A: PUBLIC LANDING PAGE ----------------- */}
      {activeSection === "landing" && (
        <div className="pb-20">
          
          {/* Hero Banner */}
          <section className="relative min-h-[760px] overflow-hidden bg-[#FFF4F5]" id="section-hero">
            <div className="absolute inset-0 bg-[#FFF4F5]" />
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={beautyHeroModelData}
                alt="Men and women receiving beauty and grooming care at Luminae"
                fill
                priority
                quality={72}
                sizes="100vw"
                className="h-full w-full object-cover object-center opacity-100 animate-heroZoom"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFF4F5]/44 via-[#FFF4F5]/14 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[760px] flex items-center">
              <div className="max-w-3xl pt-12 pb-16 animate-heroCopy">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] tracking-[0.28em] uppercase font-extrabold text-[#D95F8D]">Look Good, Feel Confident</span>
                  <span className="h-px w-16 bg-[#D95F8D]/35" />
                </div>
                <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl text-[#1F1E1D] font-serif font-light leading-[1.08]">
                  <span className="hero-title-line">Groomed, Styled,</span>
                  <br />
                  <span className="hero-title-line delay-1">Reveal Your </span>
                  <span className="hero-title-line hero-accent-word italic font-normal text-[#B92E5C] [text-shadow:0_1px_0_#fff,0_3px_18px_rgba(255,255,255,0.95)]">Confidence</span>
                </h1>
                <div className="my-8 h-px w-80 max-w-full bg-gradient-to-r from-transparent via-[#D95F8D]/35 to-transparent" />
                <p className="text-sm sm:text-base text-[#2C2C2A]/65 leading-relaxed max-w-lg">
                  Luminae is a modern beauty and grooming parlour for women and men. From haircuts and beard sculpting to facials, nails, skincare, and event styling, we bring out your best look with care.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+94771234567"
                    className="px-8 py-3 bg-[#AF2B2D] hover:bg-[#8F2023] text-white text-[10px] uppercase font-extrabold tracking-widest rounded-full shadow-lg shadow-[#AF2B2D]/20 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call Now</span>
                  </a>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchTerm("");
                      onNavigate("services");
                    }}
                    className="px-8 py-3 bg-white hover:bg-[#fffafa] text-[#AF2B2D] text-[10px] uppercase font-extrabold tracking-widest rounded-full shadow-lg shadow-black/5 border border-[#F3C7D4] transition-colors cursor-pointer"
                  >
                    Explore Services
                  </button>
                  <button
                    onClick={() => onNavigate("book")}
                    className="px-8 py-3 bg-[#D95F8D] hover:bg-[#C94D7C] text-white text-[10px] uppercase font-extrabold tracking-widest rounded-full shadow-lg shadow-[#D95F8D]/20 transition-colors cursor-pointer"
                  >
                    Book Appointment
                  </button>
                </div>

                <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl animate-floatSoft">
                  <div className="flex items-center gap-3 border-r border-[#2C2C2A]/10 pr-4">
                    <span className="h-12 w-12 rounded-full bg-white border border-[#D95F8D]/15 text-[#D95F8D] flex items-center justify-center shadow-sm">
                      <User className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-extrabold uppercase tracking-wider text-[#2C2C2A]">Expert Beauticians</span>
                      <span className="block text-[11px] text-[#2C2C2A]/55 mt-1">Trained & certified</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 border-r border-[#2C2C2A]/10 pr-4">
                    <span className="h-12 w-12 rounded-full bg-white border border-[#D95F8D]/15 text-[#D95F8D] flex items-center justify-center shadow-sm">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-extrabold uppercase tracking-wider text-[#2C2C2A]">Premium Products</span>
                      <span className="block text-[11px] text-[#2C2C2A]/55 mt-1">High quality & skin safe</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-12 w-12 rounded-full bg-white border border-[#D95F8D]/15 text-[#D95F8D] flex items-center justify-center shadow-sm">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-extrabold uppercase tracking-wider text-[#2C2C2A]">Hygiene & Safety</span>
                      <span className="block text-[11px] text-[#2C2C2A]/55 mt-1">Your safety is priority</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Us */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10" id="section-about">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#F3C7D4]/60 shadow-sm bg-white">
                  <Image
                    src={aboutLuminaeUnisexStylistsData}
                    alt="Male and female Luminae stylists holding hair tools in a unisex salon"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    decoding="async"
                  />
                </div>
                <div className="absolute -bottom-5 right-5 bg-white border border-[#F3C7D4]/80 rounded-2xl px-5 py-4 shadow-lg max-w-[14rem]">
                  <span className="block text-3xl font-serif text-[#D95F8D]">10+</span>
                  <span className="block text-[10px] uppercase tracking-widest font-black text-[#2C2C2A]/55">Years of local beauty care</span>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <span className="text-[10px] text-[#AF2B2D] tracking-[0.22em] font-sans font-extrabold uppercase block">About Luminae</span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2A] font-light leading-tight">
                  A Sri Lankan beauty parlour built on trust, comfort, and careful finishing.
                </h2>
                <p className="text-sm text-[#2C2C2A]/60 leading-relaxed max-w-2xl">
                  Luminae Beauty & Parlour was founded by Priyanthi Gunasekara to bring modern salon standards into everyday Sri Lankan beauty care. Our Colombo 07 flagship and Kandy suite serve women, men, students, brides, and working professionals with hygienic treatments, honest advice, and clear pricing.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {[
                    ["Colombo 07", "Flagship branch with full hair, skin, grooming, and bridal services."],
                    ["Kandy Suite", "Easy city-centre visits for nails, grooming, facials, and threading."],
                    ["Local Care", "LankaQR, bank transfer, card, and cash payment support."]
                  ].map(([title, copy]) => (
                    <div key={title} className="bg-white border border-rose-100/70 rounded-2xl p-4 shadow-sm">
                      <h3 className="text-xs font-extrabold text-[#2C2C2A]">{title}</h3>
                      <p className="text-[11px] text-gray-500 leading-relaxed mt-2">{copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Our Services Category Cards bottom of Image 1 */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left description block: col-span-4 */}
              <div className="lg:col-span-4 space-y-4">
                <span className="text-[10px] text-[#AF2B2D] tracking-[0.2em] font-sans font-extrabold uppercase block">Professional Ranges</span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2A] font-light leading-tight">
                  Our Services
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed font-sans max-w-sm">
                  Beyond haircuts, discover premium care for every guest: creative colouring, beard grooming, Ayurvedic facials, nails, waxing, massage, and special occasion styling.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => {
                      setSelectedCategory("All");
                      onNavigate("services");
                    }}
                    className="text-xs font-extrabold text-[#AF2B2D] hover:text-[#AF2B2D] flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span>View full treatment menu</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Cards list: col-span-8 */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Haircuts Card */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("Hair");
                    setSearchTerm("");
                    onNavigate("services");
                  }}
                  className="group relative rounded-[2rem] overflow-hidden aspect-[3/4] cursor-pointer shadow-md shadow-black/5 hover:-translate-y-2 transition-all duration-500 border border-neutral-100 text-left focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/40"
                >
                  <Image src={haircutImgData} alt="Haircuts" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-[#2C2C2A] text-[10px] uppercase font-bold tracking-widest rounded-full shadow">
                      Haircuts
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div>
                      <h4 className="text-sm font-serif font-bold text-white">Sharp & Precision</h4>
                      <p className="text-[9px] text-[#F8F0EC]/75 uppercase tracking-wider font-semibold font-sans">Bob, layers & trims</p>
                    </div>
                    <span className="h-8 w-8 rounded-full bg-white text-[#AF2B2D] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                </button>

                {/* Skin & Facial Card */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("Skin & Facial");
                    setSearchTerm("");
                    onNavigate("services");
                  }}
                  className="group relative rounded-[2rem] overflow-hidden aspect-[3/4] cursor-pointer shadow-md shadow-black/5 hover:-translate-y-2 transition-all duration-500 border border-neutral-100 text-left focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/40"
                >
                  <Image src={skinFacialImgData} alt="Man receiving a professional facial treatment" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-[#2C2C2A] text-[10px] uppercase font-bold tracking-widest rounded-full shadow">
                      Skin & Facial
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div>
                      <h4 className="text-sm font-serif font-bold text-white">Glow Renewal</h4>
                      <p className="text-[9px] text-[#F8F0EC]/75 uppercase tracking-wider font-semibold font-sans">Facials, cleanse & care</p>
                    </div>
                    <span className="h-8 w-8 rounded-full bg-white text-[#AF2B2D] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                </button>

                {/* Nails Card */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("Nails");
                    setSearchTerm("");
                    onNavigate("services");
                  }}
                  className="group relative rounded-[2rem] overflow-hidden aspect-[3/4] cursor-pointer shadow-md shadow-black/5 hover:-translate-y-2 transition-all duration-500 border border-neutral-100 text-left focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/40"
                >
                  <Image src={nailsImgData} alt="Professional polished nails manicure" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-[#2C2C2A] text-[10px] uppercase font-bold tracking-widest rounded-full shadow">
                      Nails
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div>
                      <h4 className="text-sm font-serif font-bold text-white">Polished Finish</h4>
                      <p className="text-[9px] text-[#F8F0EC]/75 uppercase tracking-wider font-semibold font-sans">Gel, art & manicure</p>
                    </div>
                    <span className="h-8 w-8 rounded-full bg-white text-[#AF2B2D] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                </button>

              </div>
            </div>
          </section>

          {/* Why Choose Us section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-[#FFF7F8] p-8 sm:p-12 lg:p-16 text-[#2C2C2A] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative shadow-sm overflow-hidden border border-[#F3C7D4]/50 rounded-[1.75rem]">
              <div className="absolute top-0 right-0 h-48 w-48 bg-[#F8B8BE]/18 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-white/90 rounded-full blur-3xl pointer-events-none" />
              
              {/* Left stats column: col-span-4 */}
              <div className="relative lg:col-span-4 space-y-6">
                <span className="text-[10px] text-[#D95F8D] tracking-[0.25em] font-sans font-bold uppercase block">LUMINAE CEYLON</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#2C2C2A] leading-tight">Why Choose Us</h2>
                <p className="text-xs text-[#2C2C2A]/60 leading-relaxed font-sans pr-4 pt-1">
                  Discover premium styling, grooming, organic skin therapies, and personal consultations tailored to your look and lifestyle. Every treatment is delivered with trained artistry and hygienic care.
                </p>
                
                <div className="pt-6 border-t border-[#F3C7D4]/80 flex items-center gap-10">
                  <div>
                    <span className="block text-4xl font-serif font-light text-[#D95F8D]">30k</span>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#2C2C2A]/45 block mt-1">Satisfied Clients</span>
                  </div>
                  <div className="w-px h-10 bg-[#F3C7D4]" />
                  <div>
                    <span className="block text-4xl font-serif font-light text-[#D95F8D]">8</span>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#2C2C2A]/45 block mt-1">Salons Around Sri Lanka</span>
                  </div>
                </div>
              </div>

              {/* Right grid column: col-span-8 */}
              <div className="relative lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                {/* Card 1 */}
                <div className="bg-white border border-[#F3C7D4]/60 hover:border-[#D95F8D]/45 rounded-xl p-6 transition-colors space-y-3 shadow-sm">
                  <div className="h-9 w-9 rounded-full bg-[#FFF4F5] text-[#D95F8D] flex items-center justify-center">
                    <Award className="h-6 w-6 stroke-[1.25]" />
                  </div>
                  <h3 className="text-sm font-serif font-medium text-[#2C2C2A]">Supreme Artistry</h3>
                  <p className="text-xs text-[#2C2C2A]/55 leading-relaxed font-sans">
                    Our team of highly skilled and experienced stylists is dedicated to staying on the cutting edge of industry trends. Trust us to transform your vision into a stunning reality.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white border border-[#F3C7D4]/60 hover:border-[#D95F8D]/45 rounded-xl p-6 transition-colors space-y-3 shadow-sm">
                  <div className="h-9 w-9 rounded-full bg-[#FFF4F5] text-[#D95F8D] flex items-center justify-center">
                    <User className="h-6 w-6 stroke-[1.25]" />
                  </div>
                  <h3 className="text-sm font-serif font-medium text-[#2C2C2A]">Bespoke Consultations</h3>
                  <p className="text-xs text-[#2C2C2A]/55 leading-relaxed font-sans">
                    Your unique style is our priority. Enjoy personalized consultations with our stylists, ensuring a treatment plan that complements your features, lifestyle, and fashion.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white border border-[#F3C7D4]/60 hover:border-[#D95F8D]/45 rounded-xl p-6 transition-colors space-y-3 shadow-sm">
                  <div className="h-9 w-9 rounded-full bg-[#FFF4F5] text-[#D95F8D] flex items-center justify-center">
                    <Sparkles className="h-6 w-6 stroke-[1.25]" />
                  </div>
                  <h3 className="text-sm font-serif font-medium text-[#2C2C2A]">Setting Trends</h3>
                  <p className="text-xs text-[#2C2C2A]/55 leading-relaxed font-sans">
                    We're not just following trends; we're setting them. Step into the latest fashion with our trendsetting styles that keep you ahead of the local curve.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white border border-[#F3C7D4]/60 hover:border-[#D95F8D]/45 rounded-xl p-6 transition-colors space-y-3 shadow-sm">
                  <div className="h-9 w-9 rounded-full bg-[#FFF4F5] text-[#D95F8D] flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 stroke-[1.25]" />
                  </div>
                  <h3 className="text-sm font-serif font-medium text-[#2C2C2A]">Pure & Organic Care</h3>
                  <p className="text-xs text-[#2C2C2A]/55 leading-relaxed font-sans">
                    We believe in using only the best. Our premium hair care and styling products ensure not only a flawless finish but also the long-term health of your tropical hair.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Team Section matching Image 2 */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Side: Title and subtext */}
              <div className="lg:col-span-4 space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] text-[#AF2B2D] tracking-[0.2em] font-sans font-extrabold uppercase block">LUMINAE EXPERTS</span>
                  <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2A] font-light leading-tight">Our Team</h2>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans max-w-sm">
                    Meet the Luminae specialists behind every polished finish, glowing facial, bridal makeover, and clean grooming appointment.
                  </p>
                </div>

                {/* Team triggers & buttons */}
                <div className="space-y-4 pt-2">
                  <button 
                    onClick={() => onNavigate("book")}
                    className="px-6 py-2.5 bg-[#AF2B2D] hover:bg-[#8F2023] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-transform hover:scale-105 shadow-md inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Book With Our Team</span>
                  </button>
                  <div className="grid grid-cols-2 gap-3 pt-2 max-w-sm">
                    <div className="rounded-2xl bg-white border border-[#F3C7D4]/70 p-3">
                      <span className="block text-xl font-serif text-[#D95F8D]">4</span>
                      <span className="block text-[9px] uppercase tracking-widest font-bold text-[#2C2C2A]/45">Lead Specialists</span>
                    </div>
                    <div className="rounded-2xl bg-white border border-[#F3C7D4]/70 p-3">
                      <span className="block text-xl font-serif text-[#D95F8D]">7+</span>
                      <span className="block text-[9px] uppercase tracking-widest font-bold text-[#2C2C2A]/45">Care Categories</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Stylist cards stack */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Stylist 1 */}
                <div className="bg-[#E6DCD3] p-3 rounded-2xl border border-black/5 hover:border-[#AF2B2D]/30 transition-all duration-300 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="aspect-[4/5] rounded-xl overflow-hidden relative group">
                      <img src={teamKavinduMaleBeautician} alt="Kavindu Perera male beautician holding salon tools" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-[#AF2B2D] shadow-sm">Beautician</span>
                    </div>
                    <div className="pt-4 pb-2 px-2 text-center sm:text-left">
                      <h4 className="text-sm font-serif font-bold text-neutral-800">Kavindu Perera</h4>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 mt-1">Men's Beauty & Grooming Artist</p>
                      <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">Facials, hair care, beard grooming, and clean event-ready styling.</p>
                    </div>
                  </div>
                </div>

                {/* Stylist 2 */}
                <div className="bg-[#E6DCD3] p-3 rounded-2xl border border-black/5 hover:border-[#AF2B2D]/30 transition-all duration-300 shadow-sm sm:translate-y-4 flex flex-col justify-between">
                  <div>
                    <div className="aspect-[4/5] rounded-xl overflow-hidden relative group">
                      <img src={teamDilshanBlowdry} alt="Dilshan Silva blow drying and grooming a client's hair" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-[#AF2B2D] shadow-sm">Grooming</span>
                    </div>
                    <div className="pt-4 pb-2 px-2 text-center sm:text-left">
                      <h4 className="text-sm font-serif font-bold text-neutral-800">Dilshan Silva</h4>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 mt-1">Men's Grooming Specialist</p>
                      <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">Haircuts, beard shaping, scalp care, and wellness massage.</p>
                    </div>
                  </div>
                </div>

                {/* Stylist 3 */}
                <div className="bg-[#E6DCD3] p-3 rounded-2xl border border-black/5 hover:border-[#AF2B2D]/30 transition-all duration-300 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="aspect-[4/5] rounded-xl overflow-hidden relative group">
                      <img src={teamAnushaFacialMask} alt="Anusha Perera applying a hydrating facial mask" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-[#AF2B2D] shadow-sm">Skin Care</span>
                    </div>
                    <div className="pt-4 pb-2 px-2 text-center sm:text-left">
                      <h4 className="text-sm font-serif font-bold text-neutral-800">Anusha Perera</h4>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 mt-1">Skin & Bridal Specialist</p>
                      <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">Facials, waxing care, bridal prep, and sensitive-skin notes.</p>
                    </div>
                  </div>
                </div>

                {/* Stylist 4 */}
                <div className="bg-[#E6DCD3] p-3 rounded-2xl border border-black/5 hover:border-[#AF2B2D]/30 transition-all duration-300 shadow-sm sm:translate-y-4 xl:translate-y-0 flex flex-col justify-between">
                  <div>
                    <div className="aspect-[4/5] rounded-xl overflow-hidden relative group">
                      <img src={teamSanduniNailPolish} alt="Sanduni Jayasekara painting gel nail polish" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-[#AF2B2D] shadow-sm">Nails</span>
                    </div>
                    <div className="pt-4 pb-2 px-2 text-center sm:text-left">
                      <h4 className="text-sm font-serif font-bold text-neutral-800">Sanduni Jayasekara</h4>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 mt-1">Hair, Nails & Waxing Specialist</p>
                      <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">Gel nails, hair color, blowouts, waxing, and polish finishes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="section-gallery">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div className="space-y-2 max-w-xl">
                <span className="text-[10px] text-[#AF2B2D] tracking-[0.22em] font-sans font-extrabold uppercase block">Real Parlour Moments</span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2A] font-light leading-tight">Gallery</h2>
                <p className="text-xs text-gray-500 leading-relaxed">
                  A quick look at Luminae services, styling stations, nail work, facial care, and specialist-led appointments.
                </p>
              </div>
              <a
                href="#section-gallery"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#FFF7F8] text-[#AF2B2D] text-[10px] uppercase font-extrabold tracking-widest rounded-full border border-[#F3C7D4] shadow-sm transition-colors"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>See Gallery</span>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { src: galleryThreadingWaxing, title: "Salon Interior", span: "md:col-span-2" },
                { src: galleryGroomPrep, title: "Groom Prep", span: "" },
                { src: galleryProductsTools, title: "Bridal Prep", span: "" },
                { src: galleryMenHairWash, title: "Men's Hair Wash", span: "" },
                { src: gallerySalonInterior, title: "Products & Tools", span: "" },
                { src: galleryBridalPrep, title: "Reception", span: "" },
                { src: galleryHairWash, title: "Threading Care", span: "md:col-span-2" }
              ].map((item) => (
                <div key={item.title} className={`group relative aspect-[4/3] overflow-hidden rounded-2xl bg-white border border-white shadow-sm ${item.span}`}>
                  <img src={item.src} alt={`Luminae gallery - ${item.title}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-90" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-[#AF2B2D] shadow-sm">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Evolution Requirements Tab - The 4 Eras comparison */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="comparison-section">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-extrabold tracking-widest text-[#AF2B2D] uppercase">Sri Lankan Beauty Innovation</span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">The Evolution of Lankan Parlours</h2>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Explore how Sri Lankan beauty care has moved from simple walk-in treatments to modern online bookings, digital payments, and personal client care notes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
              {COMPARISON_ERAS.map((era) => {
                const isCurrent = era.badge === "Current";
                return (
                  <div 
                    key={era.id} 
                    className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                      isCurrent 
                        ? "bg-white border-rose-200 shadow-lg scale-102 ring-4 ring-[#AF2B2D]/5" 
                        : "bg-white border-neutral-100 hover:border-rose-100 shadow-sm"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{era.duration}</span>
                          <h3 className="text-base font-extrabold text-[#2C2C2A] tracking-tight mt-0.5">{era.name}</h3>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          era.badge === "Current" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" :
                          era.badge === "Modern" ? "bg-[#F8F0EC] text-[#AF2B2D]" :
                          era.badge === "Mid" ? "bg-amber-50 text-amber-800" : "bg-gray-100 text-gray-600"
                        }`}>
                          {era.badge}
                        </span>
                      </div>

                      <div className="space-y-2.5 pt-2 border-t border-rose-50/50">
                        <div>
                          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Services & Care:</span>
                          <p className="text-xs text-gray-600 font-sans leading-relaxed mt-0.5">{era.features.join(", ")}</p>
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tools Used:</span>
                          <p className="text-xs text-gray-600 font-sans mt-0.5">{era.tools.join(", ")}</p>
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payments:</span>
                          <p className="text-xs text-gray-600 font-sans mt-0.5">{era.payments.join(", ")}</p>
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Scheduling & CRM:</span>
                          <p className={`text-xs font-sans mt-0.5 ${isCurrent ? "text-emerald-700 font-bold" : "text-gray-600"}`}>{era.scheduling.join(", ")}</p>
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Marketing:</span>
                          <p className="text-xs text-gray-600 font-sans mt-0.5">{era.marketing.join(", ")}</p>
                        </div>
                      </div>
                    </div>

                    {isCurrent && (
                      <div className="pt-4 mt-4 border-t border-emerald-100 text-center">
                        <span className="text-[10px] font-black text-[#AF2B2D] block uppercase tracking-widest">Now Available at Luminae</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quick core requirement stats display */}
          <section className="bg-white border-y border-rose-100/50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight text-[#2C2C2A] font-serif font-light">MOH Sanitary Compliance</h3>
                  <p className="text-xs text-gray-500 font-sans leading-relaxed">
                    Our stations follow clean, organized salon practices with dedicated styling, wash, nail, and spa areas for a comfortable guest experience.
                  </p>
                </div>
                <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-[#F8F0EC] p-4 rounded-xl text-center space-y-1">
                    <span className="block text-2xl font-black text-[#AF2B2D]">3</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Styling Stations</span>
                  </div>
                  <div className="bg-[#F8F0EC] p-4 rounded-xl text-center space-y-1">
                    <span className="block text-2xl font-black text-[#AF2B2D]">2</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Wash Basins</span>
                  </div>
                  <div className="bg-[#F8F0EC] p-4 rounded-xl text-center space-y-1">
                    <span className="block text-2xl font-black text-[#AF2B2D]">1</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Private Spa Suite</span>
                  </div>
                  <div className="bg-[#F8F0EC] p-4 rounded-xl text-center space-y-1">
                    <span className="block text-2xl font-black text-emerald-700">100%</span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">MOH Permitted</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Branch Locations */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" id="section-locations">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">
                <span className="text-[10px] text-[#AF2B2D] tracking-[0.22em] font-sans font-extrabold uppercase block">Visit Luminae</span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2A] font-light leading-tight">
                  Our Parlour Locations
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed font-sans max-w-sm">
                  Choose the nearest Luminae branch for your appointment. We now cover 8 key Sri Lankan locations, including Colombo, Kandy, Jaffna, Galle, Negombo, Kurunegala, Matara, and Batticaloa.
                </p>
                <button
                  onClick={() => onNavigate("book")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#AF2B2D] hover:bg-[#8F2023] text-white text-[10px] uppercase font-extrabold tracking-widest rounded-full shadow-md transition-colors cursor-pointer"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Book a Visit</span>
                </button>

                <div className="space-y-5 pt-3">
                  {branchLocations.slice(-2).map((branch) => (
                    <div key={branch.name} className="bg-white border border-rose-100/70 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                      <div className="flex items-start gap-3">
                        <span className="h-11 w-11 rounded-2xl bg-[#FFF4F5] border border-[#AF2B2D]/10 text-[#AF2B2D] flex items-center justify-center font-serif text-lg shrink-0">
                          {branch.order}
                        </span>
                        <div>
                          <span className="block text-[9px] font-extrabold uppercase tracking-widest text-[#AF2B2D]">{branch.label}</span>
                          <h3 className="text-base font-serif font-medium text-[#2C2C2A] mt-1">{branch.name}</h3>
                        </div>
                      </div>

                      <div className="mt-5 space-y-3 text-xs text-gray-600 font-sans">
                        <div className="flex items-start gap-2.5">
                          <MapPin className="h-4 w-4 text-[#AF2B2D] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{branch.address}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Clock className="h-4 w-4 text-[#AF2B2D] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">
                            {branch.hours}<br />
                            {branch.weekendHours}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Phone className="h-4 w-4 text-[#AF2B2D] shrink-0" />
                          <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="font-bold text-[#2C2C2A] hover:text-[#AF2B2D] transition-colors">
                            {branch.phone}
                          </a>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-rose-100/70 flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-gray-500 leading-relaxed">{branch.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                {branchLocations.slice(0, -2).map((branch) => (
                  <div key={branch.name} className="bg-white border border-rose-100/70 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="h-11 w-11 rounded-2xl bg-[#FFF4F5] border border-[#AF2B2D]/10 text-[#AF2B2D] flex items-center justify-center font-serif text-lg">
                          {branch.order}
                        </span>
                        <div>
                          <span className="block text-[9px] font-extrabold uppercase tracking-widest text-[#AF2B2D]">{branch.label}</span>
                          <h3 className="text-base font-serif font-medium text-[#2C2C2A] mt-1">{branch.name}</h3>
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex h-8 w-8 rounded-full bg-[#F8F0EC] text-[#AF2B2D] items-center justify-center">
                        <MapPin className="h-4 w-4" />
                      </span>
                    </div>

                    <div className="mt-5 space-y-3 text-xs text-gray-600 font-sans">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="h-4 w-4 text-[#AF2B2D] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{branch.address}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Clock className="h-4 w-4 text-[#AF2B2D] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          {branch.hours}<br />
                          {branch.weekendHours}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="h-4 w-4 text-[#AF2B2D] shrink-0" />
                        <a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="font-bold text-[#2C2C2A] hover:text-[#AF2B2D] transition-colors">
                          {branch.phone}
                        </a>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-rose-100/70 flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-gray-500 leading-relaxed">{branch.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-8 overflow-hidden rounded-3xl border border-rose-100 shadow-sm bg-white min-h-[320px]">
                <iframe
                  title="Luminae Beauty Colombo 07 map"
                  src="https://www.google.com/maps?q=45%20Wijerama%20Mawatha%20Colombo%2007%20Sri%20Lanka&output=embed"
                  className="h-full min-h-[320px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="lg:col-span-4 bg-white border border-rose-100/70 rounded-3xl p-6 shadow-sm flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#AF2B2D]">Walk-in Info</span>
                  <h3 className="text-xl font-serif font-light text-[#2C2C2A]">Open hours, visits, and payments</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Appointments are recommended for bridal, colouring, rebonding, facial, and package bookings. Short services can be checked by WhatsApp before visiting.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="rounded-2xl bg-[#F8F0EC] p-3">
                    <span className="block font-black text-[#2C2C2A]">Tue - Fri</span>
                    <span className="text-gray-500">9.00 AM - 7.00 PM</span>
                  </div>
                  <div className="rounded-2xl bg-[#F8F0EC] p-3">
                    <span className="block font-black text-[#2C2C2A]">Weekend</span>
                    <span className="text-gray-500">8.30 AM - 8.00 PM</span>
                  </div>
                  <div className="rounded-2xl bg-[#F8F0EC] p-3">
                    <span className="block font-black text-[#2C2C2A]">Payments</span>
                    <span className="text-gray-500">Cash, card, bank, LankaQR</span>
                  </div>
                  <div className="rounded-2xl bg-[#F8F0EC] p-3">
                    <span className="block font-black text-[#2C2C2A]">Monday</span>
                    <span className="text-gray-500">Closed for sanitizing</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Packages Promo Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
              <div className="space-y-2">
                <span className="text-xs font-extrabold tracking-widest text-[#AF2B2D] uppercase">Exclusive Spa Packages</span>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Our Most Popular Combinations</h2>
              </div>
              <button 
                onClick={() => onNavigate("packages")}
                className="text-xs font-extrabold text-[#AF2B2D] hover:text-[#AF2B2D] flex items-center gap-1 cursor-pointer"
              >
                <span>View all 10 packages</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {packages.filter(p => p.isPopular).map((pkg) => (
                <div key={pkg.id} className="bg-white p-6 rounded-2xl border border-rose-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-transform hover:-translate-y-1 duration-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[10px] font-bold text-[#AF2B2D] bg-[#F8F0EC] px-2.5 py-1 rounded-full border border-[#AF2B2D]/20">
                          Popular Selection
                        </span>
                        <span className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap text-[10px] font-bold px-2.5 py-1 rounded-full border ${getAudienceTagClasses(pkg.audience)}`}>
                          {getAudienceLabel(pkg.audience)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-gray-400 line-through">LKR {pkg.totalPrice.toLocaleString()}</span>
                        <span className="block text-base font-black text-[#AF2B2D]">LKR {pkg.discountPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <h3 className="text-md font-bold text-gray-800">{pkg.name}</h3>
                    <p className="text-xs text-gray-500 font-sans leading-relaxed">{pkg.description}</p>
                    
                    <ul className="text-xs space-y-1.5 pt-2 border-t border-rose-50/50">
                      {pkg.inclusions.slice(0, 4).map((inc, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600 font-sans">
                          <CheckCircle className="h-3.5 w-3.5 text-[#AF2B2D] shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => triggerQuickBook(pkg.id, "package")}
                    className="w-full mt-6 py-2.5 bg-[#AF2B2D] hover:bg-[#8F2023] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Book Package Now
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" id="section-faq">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-4 space-y-4">
                <span className="text-[10px] text-[#AF2B2D] tracking-[0.22em] font-sans font-extrabold uppercase block">Before You Book</span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2A] font-light leading-tight">FAQ</h2>
                <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                  Quick answers for Sri Lankan customers checking prices, deposits, payment methods, and appointment timing.
                </p>
              </div>
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["Do you show prices before booking?", "Yes. Service and package pages show LKR prices, duration, and package discounts before you reserve."],
                  ["Can I book through WhatsApp?", "Yes. Use the WhatsApp button for quick questions, bridal prep, group bookings, and same-day availability checks."],
                  ["What payment methods do you accept?", "We accept cash, card, bank transfer, and LankaQR. Some large bridal/package bookings may need a deposit."],
                  ["Do you take walk-ins?", "Walk-ins are welcome when slots are free, but appointments are better for colouring, facials, rebonding, bridal, and spa packages."],
                  ["Are men's grooming services available?", "Yes. Haircuts, beard shaping, scalp care, facials, and wellness massage are available for men."],
                  ["Can I choose my specialist?", "Yes. You can pick Priyanthi, Anusha, Sanduni, Dilshan, or let the team assign the best available specialist."]
                ].map(([question, answer]) => (
                  <div key={question} className="bg-white border border-rose-100/70 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="h-9 w-9 rounded-full bg-[#FFF4F5] text-[#AF2B2D] flex items-center justify-center shrink-0">
                        <HelpCircle className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="text-xs font-extrabold text-[#2C2C2A]">{question}</h3>
                        <p className="text-[11px] text-gray-500 leading-relaxed mt-2">{answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" id="section-contact">
            <div className="bg-[#FFF7F8] border border-[#F3C7D4]/70 rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-5">
                <span className="text-[10px] text-[#AF2B2D] tracking-[0.22em] font-sans font-extrabold uppercase block">Contact Luminae</span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2A] font-light leading-tight">
                  Need a quick answer before booking?
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed max-w-md">
                  Send us your preferred date, service, branch, and any hair or skin notes. Our team will confirm the best slot and specialist.
                </p>
                <div className="space-y-3">
                  <a href="https://wa.me/94771234567?text=Hi%20Luminae%20team%2C%20I%20want%20to%20ask%20about%20an%20appointment." target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-[#1FAF65] px-4 py-3 text-white shadow-sm hover:bg-[#178D52] transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-xs font-extrabold uppercase tracking-widest">WhatsApp +94 77 123 4567</span>
                  </a>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a href="tel:+94771234567" className="flex items-center gap-3 rounded-2xl bg-white border border-rose-100 px-4 py-3 text-[#2C2C2A] hover:text-[#AF2B2D] transition-colors">
                      <Phone className="h-4 w-4 text-[#AF2B2D]" />
                      <span className="text-xs font-bold">Call +94 77 123 4567</span>
                    </a>
                    <a href="mailto:appointments@luminae.lk" className="flex items-center gap-3 rounded-2xl bg-white border border-rose-100 px-4 py-3 text-[#2C2C2A] hover:text-[#AF2B2D] transition-colors">
                      <Mail className="h-4 w-4 text-[#AF2B2D]" />
                      <span className="text-xs font-bold">appointments@luminae.lk</span>
                    </a>
                  </div>
                </div>
              </div>

              <form className="lg:col-span-7 bg-white border border-rose-100/80 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Name</span>
                    <input className="w-full rounded-xl border border-rose-100 bg-[#FFFDFD] px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/20" placeholder="Your name" />
                  </label>
                  <label className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Phone</span>
                    <input className="w-full rounded-xl border border-rose-100 bg-[#FFFDFD] px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/20" placeholder="+94..." />
                  </label>
                </div>
                <label className="space-y-1.5 block">
                  <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Service Needed</span>
                  <select className="w-full rounded-xl border border-rose-100 bg-[#FFFDFD] px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/20">
                    <option>Hair / Colouring</option>
                    <option>Skin & Facial</option>
                    <option>Nails</option>
                    <option>Bridal / Event Styling</option>
                    <option>Men's Grooming</option>
                  </select>
                </label>
                <label className="space-y-1.5 block">
                  <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">Message</span>
                  <textarea className="min-h-28 w-full rounded-xl border border-rose-100 bg-[#FFFDFD] px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/20" placeholder="Tell us your preferred branch, date, and any special notes." />
                </label>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <p className="text-[10px] text-gray-400">This demo form is for enquiries. For fastest response, use WhatsApp.</p>
                  <button onClick={() => onNavigate("book")} className="px-6 py-2.5 bg-[#AF2B2D] hover:bg-[#8F2023] text-white text-[10px] uppercase font-extrabold tracking-widest rounded-full shadow-md transition-colors cursor-pointer">
                    Book Online
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-[#F8F0EC] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-2 mb-10">
                <span className="text-xs font-extrabold text-[#AF2B2D] uppercase tracking-widest">Verified Guest Bookings</span>
                <h3 className="text-xl font-bold text-[#2C2C2A]">Testimonials from Loyal Clients</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-100 space-y-3">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(v => <Star key={v} className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />)}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans italic">
                    "Priyanthi did my Kandyan bridal draping and she is a true magician! The 7-fold drape was completely secure and I danced all night without a single pin shifting. Worth every single Rupee!"
                  </p>
                  <div>
                    <span className="block text-xs font-extrabold text-gray-800">Sathurgini R.</span>
                    <span className="text-[10px] text-gray-400 font-sans">Regular Client • Colombo 07</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-100 space-y-3">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(v => <Star key={v} className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />)}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans italic">
                    "I book the luxury gel pedicure with Sanduni every single month. Hand-painted ocean art details are gorgeous. Love their digital LankaQR quick scan receipt experience."
                  </p>
                  <div>
                    <span className="block text-xs font-extrabold text-gray-800">Nimisha F.</span>
                    <span className="text-[10px] text-gray-400 font-sans">Regular Client • Galle Road</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-100 space-y-3">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(v => <Star key={v} className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />)}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans italic">
                    "Japanese Rebonding gave my unmanageable waves a mirror shine that persists even in local tropical humidity. Very professional staff with international standard certificates."
                  </p>
                  <div>
                    <span className="block text-xs font-extrabold text-gray-800">Fathima Riza</span>
                    <span className="text-[10px] text-gray-400 font-sans">Corporate Client • Colombo KCC</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* ----------------- SECTION B: DETAILED SERVICES MENU ----------------- */}
      {activeSection === "services" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" id="section-services-menu">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-rose-100 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-[#AF2B2D] uppercase tracking-widest">Complete Menu</span>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Our Professional Services</h1>
              <p className="text-xs text-gray-500 font-sans">
                Explore our full service selection for men, women, teens, couples, families, and event guests. Every card shows whether it is for Men, Women, or Everyone.
              </p>
            </div>

            {/* Live Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search beauty services..."
                className="w-full bg-white border border-rose-200/60 rounded-xl py-2 pl-9 pr-4 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/30 focus:border-[#AF2B2D]"
              />
            </div>
          </div>

          {/* Category Slider */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const CategoryIcon = categoryIconMap[cat] || Sparkles;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition-all border cursor-pointer inline-flex items-center gap-2 ${
                    selectedCategory === cat
                      ? "bg-[#AF2B2D] text-white border-transparent shadow"
                      : "bg-white text-gray-700 border-gray-200 hover:border-[#AF2B2D]/40 hover:text-[#AF2B2D]"
                  }`}
                >
                  <CategoryIcon className="h-3.5 w-3.5" />
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Services Grid */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-16 bg-white border border-rose-100/40 rounded-3xl space-y-4">
              <HelpCircle className="h-10 w-10 text-gray-300 mx-auto" />
              <div>
                <h3 className="text-xs font-bold text-gray-700">No Services Found</h3>
                <p className="text-[11px] text-gray-400 mt-1">Try refining your keyword search or select a different category.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredServices.map((srv) => {
                const ServiceIcon = getServiceIcon(srv);
                return (
                  <div key={srv.id} className="bg-white p-5 rounded-2xl border border-rose-100/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between group">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="h-11 w-11 shrink-0 rounded-2xl bg-[#FFF4F5] text-[#AF2B2D] border border-[#AF2B2D]/10 flex items-center justify-center group-hover:bg-[#AF2B2D] group-hover:text-white transition-colors">
                            <ServiceIcon className="h-5 w-5" />
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="shrink-0 whitespace-nowrap text-[9px] uppercase font-bold text-[#AF2B2D] bg-[#F8F0EC] px-2 py-0.5 rounded">
                              {srv.category}
                            </span>
                            <span className={`inline-flex min-w-[5.7rem] shrink-0 items-center justify-center whitespace-nowrap text-[9px] uppercase font-black px-2.5 py-0.5 rounded-full border ${getAudienceTagClasses(srv.audience)}`}>
                              {getAudienceLabel(srv.audience)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="block text-xs font-black text-[#AF2B2D]">LKR {srv.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <h3 className="text-sm font-extrabold text-gray-800 group-hover:text-[#AF2B2D] transition-colors">
                        {srv.name}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans">{srv.description}</p>
                    </div>

                    <div className="flex justify-between items-center mt-5 pt-3 border-t border-rose-50/50 text-[11px]">
                      <span className="text-gray-400 font-mono flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-gray-400 inline" />
                        <span>{srv.duration} Minutes</span>
                      </span>
                      <button
                        onClick={() => triggerQuickBook(srv.id, "service")}
                        className="px-3.5 py-1 bg-[#AF2B2D] hover:bg-[#8F2023] text-white font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Book Service
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ----------------- SECTION C: PACKAGES EXPLORER ----------------- */}
      {activeSection === "packages" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" id="section-packages">
          <div className="text-center max-w-2xl mx-auto space-y-2 pb-2">
            <span className="text-xs font-extrabold tracking-widest text-[#AF2B2D] uppercase">Curated Beauty Collections</span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Our Ready-to-Use Packages</h1>
            <p className="text-xs text-gray-500 leading-relaxed font-sans">
              Combine and save! We bundle our top hair, grooming, nails, facials, and wellness services for men, women, students, couples, and families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {packages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`bg-white rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  pkg.isPopular 
                    ? "border-[#AF2B2D] shadow-lg xl:scale-101 ring-4 ring-[#AF2B2D]/5" 
                    : "border-rose-100 shadow-sm hover:border-rose-200 hover:shadow-md"
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute top-0 right-0 bg-[#AF2B2D] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-bl-xl shadow-sm">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-md font-bold text-gray-900">{pkg.name}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs text-gray-400 font-mono">Bundles: {pkg.services.length} Premium Services</p>
                      <span className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border ${getAudienceTagClasses(pkg.audience)}`}>
                        {getAudienceLabel(pkg.audience)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 font-sans leading-relaxed">{pkg.description}</p>

                  <div className="bg-[#F8F0EC] p-3 rounded-2xl border border-rose-50/50 flex justify-between items-center">
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase">Standard Cost</span>
                      <span className="text-xs text-gray-500 font-sans line-through">LKR {pkg.totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] text-emerald-800 font-bold uppercase">Package Deal</span>
                      <span className="text-lg font-black text-[#AF2B2D]">LKR {pkg.discountPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Inclusions & Perks:</span>
                    <ul className="text-xs space-y-1.5">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600 font-sans">
                          <CheckCircle className="h-3.5 w-3.5 text-[#AF2B2D] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-rose-50/50 mt-6 grid grid-cols-2 gap-3 items-center">
                  <span className="text-[10px] text-gray-400 font-sans leading-none">
                    * Reserve deposit depends on size
                  </span>
                  <button 
                    onClick={() => triggerQuickBook(pkg.id, "package")}
                    className="w-full py-2 bg-[#AF2B2D] hover:bg-[#8F2023] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer uppercase tracking-widest"
                  >
                    Book Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- SECTION D: 2025 TRENDS INFO BOARD ----------------- */}
      {activeSection === "trends" && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10" id="section-trends">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold tracking-widest text-[#AF2B2D] uppercase">Local Insights</span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Sri Lankan Hair & Beauty Trends — 2025</h1>
            <p className="text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto">
              What's currently driving high revenue and customer requests in urban Sri Lanka? Stay updated with the ultimate aesthetic movements.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Trend 1 */}
            <div className="bg-white p-6 rounded-2xl border border-rose-50 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <span className="text-[9px] font-black text-[#AF2B2D] bg-[#F8F0EC] px-2 py-0.5 rounded border border-[#AF2B2D]/20">
                  TREND #1 • HIGH REVENUE
                </span>
                <h3 className="text-base font-extrabold text-gray-800">Advanced Ayurvedic Sandalwood & kasthuri Kaha Facials</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">
                  Young professionals are rejecting heavy synthetic skin brighteners in favour of local, organic wild turmeric (Kasthuri Kaha), white sandalwood paste, and red rice scrubs. Perfect for reversing heat rashes, tropical pollution, and intense melasma tanning.
                </p>
                <div className="pt-1.5 flex items-center gap-4 text-xs font-bold text-[#AF2B2D]">
                  <span>Avg Price: LKR 4,800</span>
                  <span>•</span>
                  <span>Demand: +45% this summer</span>
                </div>
              </div>
              <div className="md:col-span-4 bg-[#F8F0EC] p-4 rounded-xl text-center border border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold block uppercase">Recommended Service</span>
                <span className="block text-xs font-bold text-gray-800 mt-1">Ayurvedic Herbal Treatment</span>
                <button 
                  onClick={() => triggerQuickBook("s2", "service")}
                  className="mt-3.5 w-full py-1 bg-[#AF2B2D] hover:bg-[#8F2023] text-white text-[11px] font-bold rounded-lg"
                >
                  Book Facial
                </button>
              </div>
            </div>

            {/* Trend 2 */}
            <div className="bg-white p-6 rounded-2xl border border-rose-50 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <span className="text-[9px] font-black text-[#AF2B2D] bg-[#F8F0EC] px-2 py-0.5 rounded border border-[#AF2B2D]/20">
                  TREND #2 • SOCIAL MEDIA CRAZE
                </span>
                <h3 className="text-base font-extrabold text-gray-800">Korean-inspired Pastel Highlights & Balayage</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">
                  TikTok and Instagram are driving massive demand for soft coppers, milk tea browns, and dewy ash streaks. These require sophisticated bleaching plexes to protect dark Sri Lankan hair shafts from breaking.
                </p>
                <div className="pt-1.5 flex items-center gap-4 text-xs font-bold text-[#AF2B2D]">
                  <span>Avg Price: LKR 14,500</span>
                  <span>•</span>
                  <span>Audience: 18 – 35 age group</span>
                </div>
              </div>
              <div className="md:col-span-4 bg-[#F8F0EC] p-4 rounded-xl text-center border border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold block uppercase">Recommended Service</span>
                <span className="block text-xs font-bold text-gray-800 mt-1">Global Colouring / Highlights</span>
                <button 
                  onClick={() => triggerQuickBook("h3", "service")}
                  className="mt-3.5 w-full py-1 bg-[#AF2B2D] hover:bg-[#8F2023] text-white text-[11px] font-bold rounded-lg"
                >
                  Book Colouring
                </button>
              </div>
            </div>

            {/* Trend 3 */}
            <div className="bg-white p-6 rounded-2xl border border-rose-50 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <span className="text-[9px] font-black text-[#AF2B2D] bg-[#F8F0EC] px-2 py-0.5 rounded border border-[#AF2B2D]/20">
                  TREND #3 • WEDDING ESSENTIAL
                </span>
                <h3 className="text-base font-extrabold text-[#2C2C2A]">Traditional Kandyan Bridal & Groom Styling Excellence</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">
                  Modern wedding clients expect comfort and polish. Luminae provides pre-event hair care, groom grooming, jewelry securing, saree draping, and photo-ready finishing for humid Sri Lankan celebrations.
                </p>
                <div className="pt-1.5 flex items-center gap-4 text-xs font-bold text-[#AF2B2D]">
                  <span>Avg Price: LKR 65,000</span>
                  <span>•</span>
                  <span>Best for wedding season</span>
                </div>
              </div>
              <div className="md:col-span-4 bg-[#F8F0EC] p-4 rounded-xl text-center border border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold block uppercase">Recommended Package</span>
                <span className="block text-xs font-bold text-gray-800 mt-1 font-serif">Bridal & Groom Event Ready</span>
                <button 
                  onClick={() => triggerQuickBook("pkg5", "package")}
                  className="mt-3.5 w-full py-1 bg-[#AF2B2D] hover:bg-[#8F2023] text-white text-[11px] font-bold rounded-lg"
                >
                  Book Event Pack
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ----------------- SECTION E: STORY & ABOUT US ----------------- */}
      {activeSection === "story" && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="section-story">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-extrabold tracking-widest text-[#AF2B2D] uppercase">Inception</span>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">Founder Priyanthi Gunasekara's Vision</h1>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                Luminae was established with a singular focus: to elevate Sri Lanka's salon standards beyond local competition. Founder Priyanthi holds National Vocational Qualifications (NVQ Level 3) and trained at London's premier styling institutes.
              </p>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                "We wanted to build an environment that respected our rich local healing heritage—such as using organic Kasthuri Kaha and Neeladi scalp oils—while equipping our junior trainees with tablets, POS cards, and live CRM notes to treat every guest with individual precision."
              </p>
            </div>
            <div className="bg-white p-6 border border-rose-100 rounded-3xl shadow-sm text-center space-y-4">
              <Award className="h-12 w-12 text-[#AF2B2D] mx-auto" />
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-800">Authorized Certifications</h3>
                <p className="text-xs text-gray-500 font-sans">Our salons hold valid approvals from local authorities:</p>
              </div>
              <ul className="text-xs text-left mx-auto max-w-xs space-y-2 font-sans bg-[#F8F0EC] p-4 rounded-xl border border-gray-100">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-[#AF2B2D] rounded-full"></span>
                  <span>Registered under Ceylon Chamber of Commerce</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-[#AF2B2D] rounded-full"></span>
                  <span>MOH Sanitary Permit 2026 Cleared</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-[#AF2B2D] rounded-full"></span>
                  <span>All Senior Stylists have NVQ Level 2-3</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Map & WhatsApp directions banner */}
          <div className="bg-white border border-rose-100 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-sm font-extrabold text-gray-800 flex items-center justify-center sm:justify-start gap-1.5">
                <MapPin className="h-4 w-4 text-[#AF2B2D]" />
                <span>Visit Us or Request Home Dressing</span>
              </h3>
              <p className="text-xs text-gray-500 font-sans">Colombo Wijerama Road or Kandy City Center suite. Home event styling service charge +LKR 3,000.</p>
            </div>
            <button
              onClick={() => onNavigate("book")}
              className="px-5 py-2 whitespace-nowrap bg-[#AF2B2D] hover:bg-[#8F2023] text-white text-xs font-bold rounded-lg shadow cursor-pointer"
            >
              Book a Visit
            </button>
          </div>

        </div>
      )}

      {/* ----------------- SECTION F: DYNAMIC BOOKING FLOW WIZARD ----------------- */}
      {activeSection === "book" && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="section-booking-wizard">
          <div className="bg-white border border-rose-100 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl space-y-7">
            
            {/* Steps Track Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pb-4 border-b border-rose-50">
              <span className="text-xs font-black text-[#AF2B2D] uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-[#AF2B2D] inline" />
                <span>Booking Desk</span>
              </span>
              <div className="flex gap-1.5 text-xs text-gray-400 font-bold">
                <span className={bookingStep >= 1 ? "text-[#AF2B2D]" : ""}>1. Choose</span>
                <span>/</span>
                <span className={bookingStep >= 2 ? "text-[#AF2B2D]" : ""}>2. Schedule</span>
                <span>/</span>
                <span className={bookingStep >= 3 ? "text-[#AF2B2D]" : ""}>3. Pay</span>
              </div>
            </div>

            {/* Step 1: Selection */}
            {bookingStep === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="space-y-2 max-w-2xl">
                  <h2 className="text-base font-black text-gray-800">What would you like to book?</h2>
                  <p className="text-xs text-gray-500 font-sans">Select individual service or dynamic value combination packages.</p>
                </div>

                {/* Tab selector */}
                <div className="grid grid-cols-2 gap-2 bg-[#F8F0EC] p-1 rounded-xl max-w-2xl">
                  <button
                    type="button"
                    onClick={() => setSelectedServiceType("service")}
                    className={`py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      selectedServiceType === "service" ? "bg-white text-[#AF2B2D] shadow-sm" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Individual Service
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedServiceType("package")}
                    className={`py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      selectedServiceType === "package" ? "bg-white text-[#AF2B2D] shadow-sm" : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    Bundled Package
                  </button>
                </div>

                {/* Sublist selection */}
                {selectedServiceType === "service" ? (
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">Select one or more services:</label>
                      <span className="text-[10px] font-bold text-[#AF2B2D] uppercase tracking-widest">{services.length} services available</span>
                    </div>
                    <div className="rounded-2xl border border-rose-100 bg-[#F8F0EC] p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {services.map(s => {
                        const isSelected = chosenServiceIds.includes(s.id);
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => toggleChosenService(s.id)}
                            aria-pressed={isSelected}
                            className={`w-full text-left rounded-xl border p-3 transition-all cursor-pointer ${
                              isSelected
                                ? "bg-white border-[#AF2B2D] shadow-sm"
                                : "bg-white/70 border-transparent hover:border-rose-200"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0 space-y-1">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className={`h-4 w-4 rounded border flex items-center justify-center text-[10px] font-black ${
                                    isSelected ? "bg-[#AF2B2D] border-[#AF2B2D] text-white" : "bg-white border-rose-200 text-transparent"
                                  }`}>
                                    ✓
                                  </span>
                                  <span className="text-xs font-extrabold text-gray-800 leading-snug">{s.name}</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 pl-5">
                                  <span className="text-[9px] uppercase font-bold text-[#AF2B2D] bg-[#F8F0EC] px-2 py-0.5 rounded">{s.category}</span>
                                  <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border ${getAudienceTagClasses(s.audience)}`}>
                                    {getAudienceLabel(s.audience)}
                                  </span>
                                  <span className="text-[9px] uppercase font-bold text-gray-400 bg-white px-2 py-0.5 rounded">{s.duration} min</span>
                                </div>
                              </div>
                              <span className="shrink-0 text-xs font-black text-[#AF2B2D]">LKR {s.price.toLocaleString()}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">Select one bundled package:</label>
                      <span className="text-[10px] font-bold text-[#AF2B2D] uppercase tracking-widest">{packages.length} packages available</span>
                    </div>
                    <div className="rounded-2xl border border-rose-100 bg-[#F8F0EC] p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {packages.map(p => {
                        const isSelected = chosenPackageId === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setBookingError("");
                              setChosenPackageId(p.id);
                            }}
                            aria-pressed={isSelected}
                            className={`w-full text-left rounded-xl border p-4 transition-all cursor-pointer ${
                              isSelected
                                ? "bg-white border-[#AF2B2D] shadow-sm"
                                : "bg-white/70 border-transparent hover:border-rose-200"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0 space-y-2">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className={`h-4 w-4 rounded-full border flex items-center justify-center text-[10px] font-black ${
                                    isSelected ? "bg-[#AF2B2D] border-[#AF2B2D] text-white" : "bg-white border-rose-200 text-transparent"
                                  }`}>
                                    ✓
                                  </span>
                                  <span className="text-xs font-extrabold text-gray-800 leading-snug">{p.name}</span>
                                </div>
                                <p className="text-[11px] text-gray-500 leading-relaxed pl-5">{p.description}</p>
                                <div className="flex flex-wrap gap-1.5 pl-5">
                                  <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border ${getAudienceTagClasses(p.audience)}`}>
                                    {getAudienceLabel(p.audience)}
                                  </span>
                                  <span className="text-[9px] uppercase font-bold text-gray-400 bg-white px-2 py-0.5 rounded">{p.services.length} services</span>
                                  {p.isPopular && (
                                    <span className="text-[9px] uppercase font-bold text-[#AF2B2D] bg-[#F8F0EC] px-2 py-0.5 rounded">popular</span>
                                  )}
                                </div>
                                <div className="pl-5 text-[10px] text-gray-400 leading-relaxed">
                                  {p.inclusions.slice(0, 3).join(" • ")}
                                </div>
                              </div>
                              <div className="shrink-0 text-right">
                                <span className="block text-[10px] text-gray-400 line-through">LKR {p.totalPrice.toLocaleString()}</span>
                                <span className="block text-xs font-black text-[#AF2B2D]">LKR {p.discountPrice.toLocaleString()}</span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Live pricing display */}
                {((selectedServiceType === "service" && selectedServices.length > 0) || (selectedServiceType === "package" && chosenPackageId)) && (
                  <div className="bg-[#F8F0EC] border border-[#AF2B2D]/10 rounded-2xl p-4 space-y-1.5">
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Cost Summary preview:</span>
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-xs text-gray-700 font-bold leading-relaxed">
                        {bookingPreviewName}
                        {selectedServiceType === "service" && (
                          <span className="block text-[10px] text-gray-400 mt-1">Estimated time: {bookingPreviewDuration} minutes</span>
                        )}
                      </span>
                      <span className="shrink-0 text-xs font-black text-[#AF2B2D]">
                        LKR {bookingPreviewPrice.toLocaleString()} /-
                      </span>
                    </div>
                  </div>
                )}

                <div className="pt-2 max-w-2xl mx-auto">
                  {bookingError && (
                    <p className="mb-3 rounded-lg border border-[#AF2B2D]/20 bg-[#FFF4F5] px-3 py-2 text-xs font-bold text-[#AF2B2D]" role="alert">
                      {bookingError}
                    </p>
                  )}
                  <button
                    onClick={() => {
                      if (selectedServiceType === "service" && selectedServices.length === 0) {
                        setBookingError("Please select at least one service first.");
                        return;
                      }
                      if (selectedServiceType === "package" && !chosenPackageId) {
                        setBookingError("Please select a package first.");
                        return;
                      }
                      setBookingError("");
                      setBookingStep(2);
                    }}
                    className="w-full py-2 bg-[#AF2B2D] hover:bg-[#8F2023] text-white text-xs font-bold rounded-lg transition-transform hover:scale-[1.01] cursor-pointer text-center flex items-center justify-center gap-1 shadow"
                  >
                    <span>Proceed to Schedule</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date, Time & Specialist */}
            {bookingStep === 2 && (
              <form onSubmit={handleCompleteBooking} className="space-y-6 animate-fadeIn">
                <div className="space-y-2 max-w-2xl">
                  <h2 className="text-base font-black text-gray-800">Date & Personal Specialist</h2>
                  <p className="text-xs text-gray-500 font-sans">Add your contact details, choose your preference, and pick an open slot.</p>
                </div>

                <div className="rounded-2xl border border-rose-100 bg-[#FFFDFD] p-4 sm:p-5 space-y-4">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-[#AF2B2D]">Customer Details</span>
                  {bookingError && (
                    <p className="rounded-lg border border-[#AF2B2D]/20 bg-[#FFF4F5] px-3 py-2 text-xs font-bold text-[#AF2B2D]" role="alert">
                      {bookingError}
                    </p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label htmlFor="booking-customer-name" className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Full Name:</label>
                    <input
                      id="booking-customer-name"
                      type="text"
                      value={bookingCustomerName}
                      onChange={(e) => setBookingCustomerName(e.target.value)}
                      placeholder={currentUser?.name || "Enter your full name"}
                      className="w-full bg-[#F8F0EC] border border-rose-100 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/30 font-sans block"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="booking-customer-phone" className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Phone / WhatsApp:</label>
                    <input
                      id="booking-customer-phone"
                      type="tel"
                      value={bookingCustomerPhone}
                      onChange={(e) => setBookingCustomerPhone(e.target.value)}
                      placeholder={currentUser?.phone || "+94..."}
                      className="w-full bg-[#F8F0EC] border border-rose-100 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/30 font-sans block"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="booking-customer-email" className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Email:</label>
                    <input
                      id="booking-customer-email"
                      type="email"
                      value={bookingCustomerEmail}
                      onChange={(e) => setBookingCustomerEmail(e.target.value)}
                      placeholder={currentUser?.email || "you@example.com"}
                      className="w-full bg-[#F8F0EC] border border-rose-100 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/30 font-sans block"
                      required
                    />
                  </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-rose-100 bg-[#FFFDFD] p-4 sm:p-5 space-y-4">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-[#AF2B2D]">Visit Preference</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="booking-customer-gender" className="block text-[10px] font-extrabold text-[#2C2C2A] uppercase tracking-widest">Customer Option:</label>
                    <select
                      id="booking-customer-gender"
                      value={bookingCustomerGender}
                      onChange={(e) => setBookingCustomerGender(e.target.value as "Male" | "Female" | "Prefer not to say")}
                      className="w-full bg-[#F8F0EC] border border-rose-100 rounded-lg p-2.5 text-xs font-sans text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/30"
                      required
                    >
                      <option value="Prefer not to say">Prefer not to say</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="booking-branch" className="block text-[10px] font-extrabold text-[#2C2C2A] uppercase tracking-widest">Branch:</label>
                    <select
                      id="booking-branch"
                      value={bookingBranch}
                      onChange={(e) => setBookingBranch(e.target.value)}
                      className="w-full bg-[#F8F0EC] border border-rose-100 rounded-lg p-2.5 text-xs font-sans text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/30"
                    >
                      {branchLocations.map(branch => (
                        <option key={branch.name} value={branch.name}>{branch.name}</option>
                      ))}
                    </select>
                  </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-rose-100 bg-[#FFFDFD] p-4 sm:p-5 space-y-4">
                  <span className="block text-[10px] font-black uppercase tracking-widest text-[#AF2B2D]">Schedule & Specialist</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="booking-date" className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Date:</label>
                    <input
                      id="booking-date"
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={todayDate}
                      className="w-full bg-[#F8F0EC] border border-rose-100 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/30 font-sans block"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="booking-time" className="block text-[10px] font-extrabold text-[#2C2C2A] uppercase tracking-widest">Time Slot:</label>
                    <select
                      id="booking-time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-[#F8F0EC] border border-rose-100 rounded-lg p-2.5 text-xs font-sans text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/30"
                      required
                    >
                      <option value="09:00">09:00 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="16:30">04:30 PM</option>
                      <option value="18:00">06:00 PM</option>
                    </select>
                  </div>

                <div className="space-y-1.5">
                  <label htmlFor="booking-staff" className="block text-[10px] font-extrabold text-[#2C2C2A] uppercase tracking-widest">Preferred Beautician:</label>
                  <select
                    id="booking-staff"
                    value={bookingStaff}
                    onChange={(e) => setBookingStaff(e.target.value)}
                    className="w-full bg-[#F8F0EC] border border-rose-100 rounded-lg p-2.5 text-xs font-sans text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/30"
                  >
                    <option value="unassigned">Any Specialist Stylist (Priyanthi's Choice)</option>
                    {workers.map(w => (
                      <option key={w.id} value={w.id}>{w.name} ({w.specialty.slice(0, 2).join(", ")})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="booking-payment" className="block text-[10px] font-extrabold text-[#2C2C2A] uppercase tracking-widest">Payment Preference:</label>
                  <select
                    id="booking-payment"
                    value={bookingPaymentMethod}
                    onChange={(e) => setBookingPaymentMethod(e.target.value)}
                    className="w-full bg-[#F8F0EC] border border-rose-100 rounded-lg p-2.5 text-xs font-sans text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/30"
                  >
                    <option value="Pay at salon">Pay at salon</option>
                    <option value="LankaQR">LankaQR</option>
                    <option value="Card">Card</option>
                    <option value="Bank transfer">Bank transfer</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-rose-100 bg-[#FFFDFD] p-4 sm:p-5 space-y-3">
                  <label htmlFor="booking-notes" className="block text-[10px] font-extrabold text-gray-400 tracking-widest uppercase">Special Notes / Allergies / Hair specifications:</label>
                  <textarea
                    id="booking-notes"
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    rows={2.5}
                    placeholder="E.g. sandalwood allergy, requests organic strawberry wax..."
                    className="w-full bg-[#F8F0EC] border border-rose-100 rounded-lg p-2.5 text-xs font-sans text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#AF2B2D]/30 resize-none"
                  />
                  <span className="block text-[10px] text-gray-400 font-sans leading-none mt-0.5">Note values are added carefully to specialists tablets under the Smart CRM standard.</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-2 max-w-2xl mx-auto">
                  <button
                    type="button"
                    onClick={() => setBookingStep(1)}
                    className="py-2.5 px-5 bg-[#F8F0EC] text-gray-500 font-bold text-xs rounded-lg border border-gray-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#AF2B2D] hover:bg-[#8F2023] text-white text-xs font-bold rounded-lg transition-transform hover:scale-[1.01] shadow"
                  >
                    Confirm Booking Details
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: LankaQR invoice mockup confirmation */}
            {bookingStep === 3 && (
              <div className="text-center space-y-5 animate-fadeIn">
                <div className="h-10 w-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle className="h-6 w-6 stroke-[3]" />
                </div>

                <div className="space-y-1">
                  <h2 className="text-md font-bold text-gray-800">Booking Successfully Logged!</h2>
                  <p className="text-xs text-gray-500 px-4 leading-relaxed font-sans">
                    Your appointment has been recorded in the register and assigned. LankaQR checkout is available below for fast discount processing.
                  </p>
                </div>

                {/* LankaQR Mockup Card */}
                <div className="bg-[#F8F0EC] border border-rose-200/50 p-4 rounded-2xl mx-auto max-w-sm space-y-4">
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-extrabold border border-emerald-200">
                    SAMPATH / BOC / CENTRAL BANK LANKAQR
                  </span>
                  
                  {/* QR graphic mockup */}
                  <div className="h-32 w-32 bg-white border border-gray-100 p-2 mx-auto flex flex-col justify-between relative">
                    {/* Visual QR simulation lines */}
                    <div className="border-4 border-gray-900 h-10 w-10 absolute top-2 left-2"></div>
                    <div className="border-4 border-gray-900 h-10 w-10 absolute top-2 right-2"></div>
                    <div className="border-4 border-gray-900 h-10 w-10 absolute bottom-2 left-2"></div>
                    <div className="absolute inset-0 m-auto h-20 w-20 flex flex-wrap gap-1 opacity-70 p-2 justify-center items-center">
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(v => (
                        <span key={v} className="bg-gray-800 h-3.5 w-3.5 rounded-sm inline-block"></span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="block text-[10px] text-gray-400 font-extrabold tracking-widest">MERCHANT: LUMINAE PARLOUR Colombo</span>
                    <span className="block text-xs font-bold text-gray-700">Amount: LKR {bookingPreviewPrice.toLocaleString()} /=</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setBookingStep(1);
                      onNavigate("customer-dashboard");
                    }}
                    className="px-6 py-2 bg-[#AF2B2D] hover:bg-[#8F2023] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    View My Customer Portal
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ----------------- SECTION G: SIGNED CUSTOMER PORTAL & LOYALTY ----------------- */}
      {activeSection === "customer-dashboard" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10" id="section-customer-dashboard">
          
          {/* Header row with customer status card */}
          <div className="bg-white border border-rose-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-block relative h-10 w-10 rounded-full bg-gradient-to-tr from-[#AF2B2D] to-rose-200 text-white flex items-center justify-center font-bold">
                  S
                </span>
                <div>
                  <h1 className="text-xl font-black text-[#2C2C2A]">{currentUser?.name || "Loyal Member"}</h1>
                  <span className="text-xs text-gray-400 font-mono">Member ID: LUMIN-84959 | Joined Mar 2025</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 font-sans max-w-lg leading-relaxed">
                Welcome to your Luminae Portal Dashboard. Schedule and cancel appointments, check recent treatment summaries, and view and redeem loyalty tiers.
              </p>
            </div>

            {/* Loyalty points card with dynamic progress bar */}
            <div className="w-full md:w-80 bg-gradient-to-br from-[#F8F0EC] to-rose-50/20 p-5 rounded-2xl border border-rose-100 shadow-inner space-y-3">
              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-[#AF2B2D] uppercase block tracking-wider">Premium Tier</span>
                  <span className={`text-[11px] font-black uppercase px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded`}>{getTier()} status</span>
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-black text-[#AF2B2D]">{loyaltyPoints}</span>
                  <span className="text-[9px] font-bold text-gray-400 block uppercase">Beauty points</span>
                </div>
              </div>

              {/* Progress bar to next reward (Silver / Gold status) */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                  <span>Bronze Tier</span>
                  <span>Goal: 500 Gold (LKR 1,500 Cash Back)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden border border-gray-200">
                  <div 
                    className="bg-[#AF2B2D] h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, (loyaltyPoints / 500) * 100)}%` }}
                  />
                </div>
              </div>

              <span className="block text-[9px] text-[#AF2B2D] font-sans font-medium text-center bg-[#F8F0EC] border border-[#AF2B2D]/10 rounded py-1">
                Spent LKR {totalSpent.toLocaleString()} so far • Earn 10 points per LKR 1,500 spent!
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Scheduled Appointments */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-white border border-rose-50 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-rose-50 pb-4">
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                    <Calendar className="h-4.5 w-4.5 text-[#AF2B2D]" />
                    <span>My Upcoming Appointments ({upcomingBookings.length})</span>
                  </h3>
                  <button 
                    onClick={() => onNavigate("book")}
                    className="text-xs font-bold text-[#AF2B2D] hover:text-[#8F2023]"
                  >
                    + Book New Appointment
                  </button>
                </div>

                {upcomingBookings.length === 0 ? (
                  <div className="text-center py-10 space-y-2">
                    <AlertCircle className="h-8 w-8 text-rose-300 mx-auto" />
                    <p className="text-xs text-gray-500">No appointments scheduled for this week.</p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {upcomingBookings.map((apt) => (
                      <div key={apt.id} className="p-4 rounded-xl border border-rose-100 bg-[#F8F0EC] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-800">{apt.serviceName}</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                              apt.status === "confirmed" ? "bg-emerald-50 text-emerald-800 border-emerald-200" :
                              apt.status === "started" ? "bg-amber-100 text-amber-800 border-amber-200 animate-pulse" :
                              "bg-[#F8F0EC] text-rose-800 border-rose-200"
                            }`}>
                              {apt.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-[11px] text-gray-400 font-mono">
                            <span>📅 {apt.date} • 🕒 {apt.time}</span>
                            <span>👤 Stylist: {apt.workerName}</span>
                            <span>💰 LKR {apt.price.toLocaleString()}</span>
                          </div>
                          {apt.notes && (
                            <p className="text-[11px] text-gray-500 italic bg-white p-1.5 rounded border border-rose-100/50">
                              Notes: {apt.notes}
                            </p>
                          )}
                        </div>

                        <div className="flex sm:flex-col gap-2 items-end">
                          {apt.status === "pending" && (
                            <button
                              onClick={() => {
                                if (confirm("Are you sure you want to cancel this pending appointment?")) {
                                  updateAppointmentStatus(apt.id, "cancelled");
                                }
                              }}
                              className="text-xs font-bold text-[#AF2B2D] hover:text-[#8F2023] px-3 py-1 bg-[#F8F0EC] hover:bg-[#F0E2DC] rounded-lg transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Past Visits & Reviews */}
              <div className="bg-white border border-rose-50 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-gray-800 border-b border-rose-50 pb-4 flex items-center gap-1.5">
                  <History className="h-4.5 w-4.5 text-[#AF2B2D]" />
                  <span>Historic Visits — Write Review ({pastBookings.length})</span>
                </h3>

                {pastBookings.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-6 font-sans">No completed treatments available to review yet.</p>
                ) : (
                  <div className="space-y-4">
                    {pastBookings.map((apt) => (
                      <div key={apt.id} className="p-4 rounded-xl border border-gray-100 space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <span className="block text-xs font-extrabold text-gray-800">{apt.serviceName}</span>
                            <span className="block text-[11px] text-gray-400 font-mono">📅 Completed on {apt.date} • Anusha Perera</span>
                          </div>
                          <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">Paid LKR {apt.price.toLocaleString()}</span>
                        </div>

                        {/* Customer Feedback section */}
                        {apt.feedback ? (
                          <div className="bg-yellow-50/40 p-3 rounded-lg border border-yellow-100 space-y-1.5">
                            <div className="flex gap-1">
                              {Array.from({ length: apt.rating || 5 }).map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-amber-500 fill-amber-500" />
                              ))}
                            </div>
                            <p className="text-xs text-gray-700 italic font-sans">" {apt.feedback} "</p>
                          </div>
                        ) : (
                          <div>
                            {reviewAptId === apt.id ? (
                              <form onSubmit={submitClientReview} className="bg-[#F8F0EC]/20 p-3 border border-rose-100 rounded-lg space-y-2.5">
                                <div className="flex items-center gap-3">
                                  <label className="text-[11px] font-bold text-gray-500 uppercase">Rating Stars (1-5):</label>
                                  <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <button
                                        key={star}
                                        type="button"
                                        onClick={() => setReviewRating(star)}
                                        className="focus:outline-none"
                                      >
                                        <Star className={`h-4 w-4 ${reviewRating >= star ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div className="space-y-1.5">
                                  <textarea
                                    value={reviewComment}
                                    onChange={(e) => setReviewComment(e.target.value)}
                                    placeholder="Thank the beautician! E.g. outstanding threading result..."
                                    className="w-full bg-white p-2 text-xs border border-rose-100 rounded focus:outline-none text-gray-800 font-sans resize-none"
                                    rows={2}
                                    required
                                  />
                                  <div className="flex justify-end gap-2">
                                    <button 
                                      type="button" 
                                      onClick={() => setReviewAptId(null)}
                                      className="text-[10px] text-gray-400 px-2 py-1 hover:underline"
                                    >
                                      Maybe Later
                                    </button>
                                    <button 
                                      type="submit" 
                                      className="text-[10px] font-bold text-white bg-[#AF2B2D] px-3.5 py-1 rounded"
                                    >
                                      Submit Review
                                    </button>
                                  </div>
                                </div>
                              </form>
                            ) : (
                              <button
                                onClick={() => setReviewAptId(apt.id)}
                                className="text-xs text-[#AF2B2D] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <Star className="h-3.5 w-3.5" />
                                <span>Leave treatment feedback</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Dynamic Loyalty Guide */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white border border-rose-50 rounded-3xl p-5 shadow-sm space-y-4">
                <span className="text-[10px] font-extrabold text-[#AF2B2D] uppercase block tracking-widest">Rewards Club</span>
                <h3 className="text-sm font-bold text-gray-800">Benefits & Membership tiers</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">
                  Treat yourself to loyalty points for every service and claim cashback perks.
                </p>

                <ul className="text-xs space-y-3 font-sans">
                  <li className="flex gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <span className="text-amber-800 block text-xs tracking-tight font-black uppercase font-mono">1. BRONZE (Join):</span>
                    <span className="text-gray-500 block text-[11px]">Receive 5% off student packages, standard email support.</span>
                  </li>
                  <li className="flex gap-2 p-2 rounded-lg bg-[#F8F0EC] border border-[#AF2B2D]/10">
                    <span className="text-[#AF2B2D] block text-xs tracking-tight font-black uppercase font-mono">2. SILVER (200 pts):</span>
                    <span className="text-gray-500 block text-[11px]">Free eyebrow threading on birthdays, priority weekend bookings.</span>
                  </li>
                  <li className="flex gap-2 p-2 rounded-lg bg-yellow-50/50 border border-yellow-105">
                    <span className="text-amber-700 block text-xs tracking-tight font-black uppercase font-mono">3. GOLD (500 pts):</span>
                    <span className="text-gray-500 block text-[11px]">Redeem flat LKR 1,500 cashback, free aromatherapy, zero-deposit reservation.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
