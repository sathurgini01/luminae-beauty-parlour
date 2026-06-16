import { ImageResponse } from "next/og";
import { seoConfig } from "./seo";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#fff4f5",
          color: "#251617",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 28,
              background: "#af2b2d",
              color: "#fff7f8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 58,
              fontWeight: 700,
            }}
          >
            L
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 54, fontWeight: 700 }}>{seoConfig.siteName}</div>
            <div style={{ fontSize: 24, color: "#af2b2d", letterSpacing: 5 }}>SRI LANKAN BEAUTY SALON</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, fontWeight: 700, maxWidth: 900 }}>
            Hair, Bridal, Facial, Nails & Grooming
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: "#5d4a4c", maxWidth: 920 }}>
            Colombo 07 flagship with islandwide salon branches for modern beauty care, event styling, and wellness treatments.
          </div>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 25, color: "#af2b2d", fontWeight: 700 }}>
          <span>{seoConfig.phone}</span>
          <span>appointments@luminae.lk</span>
        </div>
      </div>
    ),
    size,
  );
}
