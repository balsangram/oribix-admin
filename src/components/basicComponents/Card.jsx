import { ShoppingBag } from "lucide-react";

const cardSize = {
  big: "w-full min-h-full px-6 py-6",
  medium: "w-[550px] min-auto p-8",
  small: "w-[350px] min-h-[300px] p-6",
  verySmall: "w-full min-h-[112px] p-5",
};


export function CARD({ children , className = ''}) {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-10 ${className}`}>
      {children}
    </div>
  );
}

export function B_CARD({ children, className = "" }) {
  return (
    <div
      className={`
        w-full min-h-full
        px-6 py-6
        flex flex-col gap-4
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function M_CARD({ children, className = "" }) {
  return (
    <div
      className={`${cardSize.medium} bg-[#0B1220] rounded-[28px] border border-[#1E293B] shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${className}`}
    >
      {children}
    </div>
  );
}

export function S_CARD({
  children,
  className = "",
  accentColor = "#22C55E",
}) {
  return (
    <div
      className={`
        w-full min-h-[300px] p-5
        bg-white
        rounded-2xl
        border border-gray-100
        shadow-[0_8px_24px_rgba(15,23,42,0.06)]
        overflow-hidden
        flex flex-col gap-4
        ${className}
      `}
      style={{ borderTop: `5px solid ${accentColor}` }}
    >
      {children}
    </div>
  );
}

function hexToRgba(hex, alpha = 1) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function VS_CARD({ children, className = "", valueColor = "#0f172a" }) {
  return (
    <div
      className={`
        ${cardSize.verySmall}
        bg-white
        rounded-2xl
        border border-gray-200
        transition-all duration-300 ease-in-out
        hover:-translate-y-1
        ${className}
      `}
      style={{
        "--card-shadow": `0 1px 4px ${hexToRgba(valueColor, 0.06)}, 0 4px 12px ${hexToRgba(valueColor, 0.08)}`,
        "--card-shadow-hover": `0 4px 12px ${hexToRgba(valueColor, 0.10)}, 0 10px 24px ${hexToRgba(valueColor, 0.12)}`,
        boxShadow: "var(--card-shadow)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--card-shadow-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--card-shadow)";
      }}
    >
      {children}
    </div>
  );
}

export function D_CARD({
  title,
  value,
  change,
  icon = <ShoppingBag size={20} />,
  chart,
  className = "",
}) {
  return (
    <div
      className={`w-[280px] h-[130px] bg-white rounded-2xl border border-gray-200 shadow-md p-5 flex justify-between ${className}`}
    >
      <div className="flex flex-col justify-between">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2F9BF3]">
          {icon}
        </div>
        <div>
          <h2 className="text-4xl font-bold">{value}</h2>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <p className="text-sm uppercase text-gray-500 font-semibold">
          {title}
        </p>

        {chart}
      </div>
    </div>
  );
}

const HEAT_COLORS = [
  "#FDF0E6", // 0
  "#F5C4A8", // 1–2
  "#E8894A", // 3–6
  "#D4652A", // 7–14
  "#8B3A1F", // 15+
];

export function getHeatColor(orders = 0) {
  if (orders >= 15) return HEAT_COLORS[4];
  if (orders >= 7) return HEAT_COLORS[3];
  if (orders >= 3) return HEAT_COLORS[2];
  if (orders >= 1) return HEAT_COLORS[1];
  return HEAT_COLORS[0];
}

export function Demand_Heat_Card({
  warehouseName = "Warehouse",
  address = "",
  orders = 0,
  className = "",
}) {
  const bg = getHeatColor(orders);
  const isDark = orders >= 7;

  return (
    <div
      className={`
        relative w-full min-h-[88px] p-3
        rounded-xl border border-black/10
        flex flex-col justify-between gap-2
        shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]
        transition-all duration-150
        hover:shadow-md hover:scale-[1.02] hover:z-10
        ${className}
      `}
      style={{ backgroundColor: bg }}
      title={`${orders} orders`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3
          className={`text-[11px] font-semibold leading-snug line-clamp-2 pr-1 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {warehouseName}
        </h3>

        <span
          className={`
            shrink-0 min-w-[22px] px-1.5 py-0.5 rounded-md text-[10px] font-bold tabular-nums
            ${isDark ? "bg-black/25 text-white" : "bg-white/70 text-gray-800"}
          `}
        >
          {orders}
        </span>
      </div>

      {address ? (
        <p
          className={`text-[10px] leading-snug line-clamp-2 ${
            isDark ? "text-white/85" : "text-gray-600"
          }`}
        >
          {address}
        </p>
      ) : null}
    </div>
  );
}

export const demand_Heat_Card = Demand_Heat_Card;
