import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        background: "#0a1f44",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "40px",
        fontSize: "60px",
        fontWeight: 900,
        fontFamily: "system-ui",
        letterSpacing: "-0.03em",
      }}
    >
      <span style={{ color: "#f97316" }}>Q</span>
      <span style={{ color: "#06b6d4" }}>U</span>
    </div>,
    { ...size }
  );
}
