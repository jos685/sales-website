"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { day: "Mon", revenue: 34200 },
  { day: "Tue", revenue: 81500 },
  { day: "Wed", revenue: 54800 },
  { day: "Thu", revenue: 66300 },
  { day: "Fri", revenue: 91200 },
  { day: "Sat", revenue: 44700 },
  { day: "Sun", revenue: 29100 },
];

const peak = Math.max(...data.map((d) => d.revenue));

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-[#1c1c1e] px-3 py-2 text-xs shadow-xl">
      <p className="text-zinc-400">{label}</p>
      <p className="font-semibold text-white">KSh {payload[0].value.toLocaleString()}</p>
    </div>
  );
}

export default function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={90}>
      <BarChart data={data} barCategoryGap="30%" margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="peakGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#fb923c" stopOpacity={1} />
            <stop offset="100%" stopColor="#f97316" stopOpacity={0.85} />
          </linearGradient>
          <filter id="peakGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
        <XAxis
          dataKey="day"
          tick={{ fill: "#71717a", fontSize: 9 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis hide />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />

        <Bar
          dataKey="revenue"
          radius={[4, 4, 0, 0]}
          isAnimationActive
          animationDuration={900}
          animationEasing="ease-out"
        >
          {data.map((entry) => (
            <Cell
              key={entry.day}
              fill={entry.revenue === peak ? "url(#peakGradient)" : "#27272a"}
              filter={entry.revenue === peak ? "url(#peakGlow)" : undefined}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
