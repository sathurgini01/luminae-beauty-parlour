import type { Metadata } from "next";
import "../src/index.css";
import { buildLocalBusinessJsonLd, buildMetadata, seoConfig } from "./seo";

export const metadata: Metadata = {
  ...buildMetadata("/"),
  metadataBase: new URL(seoConfig.siteUrl),
  applicationName: "Luminae Beauty & Parlour",
  authors: [{ name: "Luminae Beauty & Parlour" }],
  creator: "Luminae Beauty & Parlour",
  publisher: "Luminae Beauty & Parlour",
  category: "Beauty Salon",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = buildLocalBusinessJsonLd();

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
