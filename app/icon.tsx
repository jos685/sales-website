import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#0a1f44",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "7px",
        fontSize: "11px",
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
