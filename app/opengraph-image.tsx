import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nordkom — Kostnadsöversyn för företag";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#132A31",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              backgroundColor: "#F3F2ED",
              color: "#132A31",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div style={{ color: "#F3F2ED", fontSize: 34, fontWeight: 600 }}>
            Nordkom
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: "#8FB3AA",
              fontSize: 24,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Second opinion, inte försäljning
          </div>
          <div
            style={{
              color: "#F3F2ED",
              fontSize: 62,
              fontWeight: 600,
              lineHeight: 1.08,
              maxWidth: 940,
            }}
          >
            Ni betalar förmodligen för mycket för er företagstelefoni.
          </div>
        </div>

        <div style={{ color: "#9FB0AD", fontSize: 24 }}>
          Mobilabonnemang · Växel · Hemsida · SEO — en ärlig genomgång.
        </div>
      </div>
    ),
    { ...size },
  );
}
