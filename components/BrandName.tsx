export default function BrandName({ className = "" }: { className?: string }) {
  return (
    <span className={`font-black tracking-tight ${className}`} style={{ letterSpacing: "-0.03em" }}>
      <span style={{ color: "#f97316" }}>QASH</span><span style={{ color: "#06b6d4" }}>UP</span>
    </span>
  );
}
