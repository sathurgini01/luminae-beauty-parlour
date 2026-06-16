import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://luminae.lk";

export const seoConfig = {
  siteUrl,
  siteName: "Luminae Beauty & Parlour",
  defaultTitle: "Luminae Beauty & Parlour | Hair, Bridal, Facial & Grooming in Sri Lanka",
  defaultDescription:
    "Book Luminae Beauty & Parlour for haircuts, hair colour, facials, nails, waxing, bridal makeup, men's grooming, and wellness treatments across Sri Lanka.",
  phone: "+94 77 123 4567",
  email: "appointments@luminae.lk",
  primaryAddress: {
    streetAddress: "45, Wijerama Mawatha",
    addressLocality: "Colombo 07",
    addressRegion: "Western Province",
    postalCode: "00700",
    addressCountry: "LK",
  },
  keywords: [
    "Luminae Beauty",
    "beauty parlour Sri Lanka",
    "beauty parlour Colombo 07",
    "hair salon Colombo",
    "bridal makeup Sri Lanka",
    "facial treatment Colombo",
    "men's grooming Sri Lanka",
    "nail salon Sri Lanka",
    "Kandyan bridal makeup",
  ],
};

export const publicRoutes = [
  "/",
  "/services",
  "/packages",
  "/trends",
  "/about",
  "/booking",
];

export const routeMetadata: Record<string, Pick<Metadata, "title" | "description"> & { path: string }> = {
  "/": {
    path: "/",
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
  },
  "/services": {
    path: "/services",
    title: "Beauty Services | Luminae Hair, Skin, Nails, Bridal & Grooming",
    description:
      "Explore Luminae services for haircuts, hair colour, keratin, facials, threading, waxing, nails, bridal styling, groom care, and wellness.",
  },
  "/packages": {
    path: "/packages",
    title: "Salon Packages | Bridal, Student, Family & Grooming Offers",
    description:
      "Save with Luminae beauty packages for bridal prep, student care, men's grooming, couple glow days, family visits, facials, nails, and hair styling.",
  },
  "/trends": {
    path: "/trends",
    title: "Sri Lankan Beauty Trends | Hair, Bridal, Facial & Grooming Ideas",
    description:
      "See Sri Lankan salon trends in hair colour, Ayurvedic facial care, bridal styling, groom prep, nail art, and modern beauty bookings.",
  },
  "/about": {
    path: "/about",
    title: "About Luminae | Sri Lankan Beauty Parlour Built on Trust",
    description:
      "Learn about Luminae Beauty & Parlour, founded for hygienic modern hair, skin, bridal, grooming, and wellness care in Sri Lanka.",
  },
  "/booking": {
    path: "/booking",
    title: "Book an Appointment | Luminae Beauty & Parlour",
    description:
      "Book a Luminae appointment for hair, facial, nails, waxing, bridal makeup, men's grooming, or wellness at a Sri Lankan branch near you.",
  },
};

export function buildMetadata(path = "/"): Metadata {
  const page = routeMetadata[path] || routeMetadata["/"];
  const canonical = new URL(page.path, seoConfig.siteUrl).toString();

  return {
    title: page.title,
    description: page.description,
    keywords: seoConfig.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "en_LK",
      url: canonical,
      siteName: seoConfig.siteName,
      title: page.title as string,
      description: page.description as string,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title as string,
      description: page.description as string,
    },
  };
}

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${seoConfig.siteUrl}/#beautysalon`,
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    telephone: seoConfig.phone,
    email: seoConfig.email,
    priceRange: "LKR 350 - LKR 80,000",
    image: `${seoConfig.siteUrl}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      ...seoConfig.primaryAddress,
    },
    areaServed: [
      "Colombo",
      "Kandy",
      "Jaffna",
      "Galle",
      "Negombo",
      "Kurunegala",
      "Matara",
      "Batticaloa",
      "Sri Lanka",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "08:30",
        closes: "20:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/luminaebeauty",
      "https://www.facebook.com/luminaebeauty",
      "https://www.tiktok.com/@luminaebeauty",
    ],
    makesOffer: [
      "Designer Haircut & Styling",
      "Hair Colouring and Highlights",
      "Keratin Smooth Treatment",
      "Skin and Facial Treatments",
      "Eyebrow Threading",
      "Manicure and Pedicure",
      "Waxing",
      "Kandyan Bridal Makeover",
      "Men's Grooming",
      "Ayurvedic Wellness Treatments",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        provider: {
          "@id": `${seoConfig.siteUrl}/#beautysalon`,
        },
      },
    })),
  };
}
