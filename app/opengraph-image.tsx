import { ImageResponse } from "next/og";

export const alt = "Epic Sales Tracker — Sales Management for Kenyan Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #0a1f44 0%, #0d1b35 60%, #071530 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "80px",
        position: "relative",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Brand row */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
        <div
          style={{
            background: "#f97316",
            width: "54px",
            height: "54px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            fontWeight: 900,
            color: "white",
          }}
        >
          S
        </div>
        <span style={{ color: "white", fontSize: "26px", fontWeight: 700 }}>
          Epic Sales Tracker
        </span>
      </div>

      {/* Headline — all children wrapped in spans inside a flex container */}
      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "820px", marginBottom: "28px" }}>
        <span
          style={{
            color: "white",
            fontSize: "62px",
            fontWeight: 900,
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
          }}
        >
          Your agents are&nbsp;
        </span>
        <span
          style={{
            color: "#f97316",
            fontSize: "62px",
            fontWeight: 900,
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
          }}
        >
          selling now.
        </span>
        <span
          style={{
            color: "white",
            fontSize: "62px",
            fontWeight: 900,
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
          }}
        >
          &nbsp;Are you watching?
        </span>
      </div>

      {/* Sub */}
      <div style={{ display: "flex" }}>
        <span style={{ color: "#94a3b8", fontSize: "22px", maxWidth: "700px", lineHeight: 1.55 }}>
          Real-time sales management for Kenyan businesses. Know every sale. Trust every number.
        </span>
      </div>

      {/* Bottom row */}
      <div
        style={{
          position: "absolute",
          bottom: "72px",
          left: "80px",
          right: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Live badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(249,115,22,0.12)",
            border: "1px solid rgba(249,115,22,0.3)",
            borderRadius: "100px",
            padding: "10px 22px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10b981",
              display: "flex",
            }}
          />
          <span style={{ color: "#f97316", fontSize: "17px", fontWeight: 600 }}>
            50+ businesses running live in Kenya
          </span>
        </div>

        {/* Portal chips */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["Owner Portal", "Shop Portal", "Agent Portal"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                padding: "8px 16px",
                color: "#cbd5e1",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>,
    { ...size }
  );
}
