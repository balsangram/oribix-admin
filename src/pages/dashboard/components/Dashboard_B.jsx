import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ReferenceDot,
} from "recharts";
import {
  BarChart3,
  MoreHorizontal,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const GMV_SERIES = {
  "7d": {
    label: "Past 7 days",
    rangeLabel: "14 Jul – 20 Jul",
    total: 4200000,
    change: 24.2,
    updated: "Last updated today",
    data: [
      { day: "Mon", actual: 45, forecast: null, label: "14 Jul" },
      { day: "Tue", actual: 48, forecast: null, label: "15 Jul" },
      { day: "Wed", actual: 52, forecast: null, label: "16 Jul" },
      { day: "Thu", actual: 55, forecast: 55, label: "17 Jul" },
      { day: "Fri", actual: null, forecast: 58, label: "18 Jul" },
      { day: "Sat", actual: null, forecast: 61, label: "19 Jul" },
      { day: "Sun", actual: null, forecast: 64, label: "20 Jul" },
    ],
    yTicks: [0, 40, 75],
    estimate: 64,
  },
  "30d": {
    label: "Past 30 days",
    rangeLabel: "21 Jun – 20 Jul",
    total: 16800000,
    change: 11.4,
    updated: "Last updated today",
    data: [
      { day: "W1", actual: 38, forecast: null, label: "21 Jun" },
      { day: "W2", actual: 44, forecast: null, label: "28 Jun" },
      { day: "W3", actual: 51, forecast: null, label: "05 Jul" },
      { day: "W4", actual: 57, forecast: 57, label: "12 Jul" },
      { day: "W5", actual: null, forecast: 62, label: "19 Jul" },
      { day: "W6", actual: null, forecast: 68, label: "26 Jul" },
    ],
    yTicks: [0, 40, 80],
    estimate: 68,
  },
  "90d": {
    label: "Past 90 days",
    rangeLabel: "20 Apr – 20 Jul",
    total: 48600000,
    change: -3.8,
    updated: "Last updated today",
    data: [
      { day: "Apr", actual: 42, forecast: null, label: "20 Apr" },
      { day: "May", actual: 4800, forecast: null, label: "20 May" },
      { day: "Jun", actual: 5500, forecast: 55, label: "20 Jun" },
      { day: "Jul", actual: null, forecast: 61, label: "20 Jul" },
      { day: "Aug", actual: null, forecast: 66, label: "20 Aug" },
    ],
    yTicks: [0, 40, 80],
    estimate: 66,
  },
};

const PIPELINE_STAGES = [
  { name: "New", value: 42, color: "#38BDF8" },
  { name: "Accepted", value: 38, color: "#F97316" },
  { name: "Picking", value: 56, color: "#A78BFA" },
  { name: "Packed", value: 48, color: "#34D399" },
  { name: "Dispatched", value: 54, color: "#FBBF24" },
  { name: "Delivered", value: 46, color: "#94A3B8" },
];

const RANGE_OPTIONS = [
  { key: "7d", label: "7D" },
  { key: "30d", label: "30D" },
  { key: "90d", label: "90D" },
];

function formatCurrency(amount) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

function DarkTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;
  const value = row.actual ?? row.forecast;
  const isForecast = row.actual == null;

  return (
    <div className="rounded-xl border border-white/10 bg-[#1a1f2e] px-3 py-2 shadow-xl">
      <p className="text-[11px] font-medium text-slate-400">{row.label || label}</p>
      <p className="mt-0.5 text-sm font-bold text-white">
        ₹{value}L{isForecast ? " EST." : ""}
      </p>
    </div>
  );
}

function GlowDot({ cx, cy }) {
  if (cx == null || cy == null) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={7} fill="#38BDF8" fillOpacity={0.2} />
      <circle cx={cx} cy={cy} r={3.5} fill="#38BDF8" stroke="#0B1220" strokeWidth={1.5} />
    </g>
  );
}

export default function Dashboard_B() {
  return (
    <div className="mt-4 grid grid-cols-1 items-stretch gap-4 xl:grid-cols-[3fr_2fr] xl:h-[320px]">
      <Network_GMV />
      <Pipeline_By_Stage />
    </div>
  );
}

function Network_GMV() {
  const [range, setRange] = useState("7d");
  const series = GMV_SERIES[range];
  const isUp = series.change >= 0;

  const bridgeIndex = useMemo(
    () => series.data.findIndex((d) => d.actual != null && d.forecast != null),
    [series]
  );

  const startPoint = series.data[0];
  const bridgePoint =
    bridgeIndex >= 0 ? series.data[bridgeIndex] : series.data.find((d) => d.actual != null);

  return (
    <div
      className="relative flex h-[320px] xl:h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 p-4 text-white"
      style={{
        background:
          "linear-gradient(165deg, #1a2236 0%, #0f1524 45%, #0b1220 100%)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.06) inset, 0 16px 40px rgba(15,23,42,0.3)",
      }}
    >
      {/* soft glow */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-orange-500/5 blur-3xl" />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-orange-500/15 text-orange-400 ring-1 ring-orange-400/20">
            <BarChart3 size={14} />
          </span>
          <h2 className="text-sm font-semibold tracking-tight">Network GMV</h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-[10px] text-slate-400 sm:inline">
            {series.updated}
          </span>
          <div className="inline-flex rounded-full bg-white/5 p-0.5 ring-1 ring-white/10">
            {RANGE_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setRange(option.key)}
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors ${
                  range === option.key
                    ? "bg-white text-slate-900"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="grid h-7 w-7 place-items-center rounded-full text-slate-400 hover:bg-white/5 hover:text-white"
            aria-label="More options"
          >
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[28px] leading-none">
            {formatCurrency(series.total)}
          </h1>
          <div className="mt-1 flex items-center gap-1.5">
            <p className="text-xs text-slate-400">Network balance</p>
            <span
              className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                isUp
                  ? "bg-emerald-400/10 text-emerald-400"
                  : "bg-rose-400/10 text-rose-400"
              }`}
            >
              {isUp ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
              {Math.abs(series.change)}%
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs font-semibold text-white">{series.label}</p>
          <p className="mt-0.5 text-[10px] text-slate-400">{series.rangeLabel}</p>
        </div>
      </div>

      <div className="relative z-10 mt-2 min-h-0 flex-1 outline-none [&_.recharts-wrapper]:outline-none [&_svg]:outline-none [&_svg:focus]:outline-none [&_*]:outline-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={series.data}
            margin={{ top: 12, right: 8, left: 0, bottom: 0 }}
            style={{ outline: "none" }}
          >
            <defs>
              <linearGradient id="gmvGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.45} />
                <stop offset="55%" stopColor="#38BDF8" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity={0} />
              </linearGradient>
              <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <CartesianGrid
              strokeDasharray="4 8"
              stroke="rgba(148,163,184,0.12)"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 10 }}
              interval="preserveStartEnd"
              minTickGap={40}
            />

            <YAxis
              orientation="right"
              axisLine={false}
              tickLine={false}
              ticks={series.yTicks}
              tick={{ fill: "#64748B", fontSize: 10 }}
              width={40}
              tickFormatter={(v) =>
                v === series.estimate ? `₹${v}k EST.` : `₹${v}k`
              }
            />

            <Tooltip
              content={<DarkTooltip />}
              cursor={{
                stroke: "rgba(56,189,248,0.35)",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />

            {/* Actual trend */}
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#38BDF8"
              strokeWidth={2.5}
              fill="url(#gmvGlow)"
              connectNulls={false}
              filter="url(#lineGlow)"
              activeDot={false}
              dot={false}
              isAnimationActive
            />

            {/* Forecast / estimate */}
            <Area
              type="stepAfter"
              dataKey="forecast"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth={2}
              strokeDasharray="5 6"
              fill="transparent"
              connectNulls={false}
              activeDot={false}
              dot={false}
              isAnimationActive
            />

            {startPoint && (
              <ReferenceDot
                x={startPoint.label}
                y={startPoint.actual}
                r={5}
                shape={<GlowDot />}
              />
            )}
            {bridgePoint && (
              <ReferenceDot
                x={bridgePoint.label}
                y={bridgePoint.actual}
                r={5}
                shape={<GlowDot />}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Pipeline_By_Stage() {
  const [activeStage, setActiveStage] = useState(null);

  const total = useMemo(
    () => PIPELINE_STAGES.reduce((sum, stage) => sum + stage.value, 0),
    []
  );

  const focusTotal = activeStage
    ? PIPELINE_STAGES.find((s) => s.name === activeStage)?.value || 0
    : total;

  const focusLabel = activeStage || "In-flight";

  return (
    <div
      className="relative flex h-[320px] xl:h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 p-4 text-white"
      style={{
        background:
          "linear-gradient(165deg, #1a2236 0%, #0f1524 45%, #0b1220 100%)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.06) inset, 0 16px 40px rgba(15,23,42,0.3)",
      }}
    >
      <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative z-10 mb-2 flex shrink-0 items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/20">
            <Layers size={14} />
          </span>
          <div>
            <h2 className="text-sm font-semibold tracking-tight">
              Pipeline by Stage
            </h2>
            <p className="text-[10px] text-slate-400">
              {total} open orders · tap to focus
            </p>
          </div>
        </div>

        {activeStage && (
          <button
            type="button"
            onClick={() => setActiveStage(null)}
            className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-300 ring-1 ring-white/10 hover:bg-white/10"
          >
            Clear
          </button>
        )}
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 items-center gap-3">
        <div className="relative h-28 w-28 flex-shrink-0 outline-none [&_.recharts-wrapper]:outline-none [&_svg]:outline-none [&_svg:focus]:outline-none [&_*]:outline-none">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart style={{ outline: "none" }}>
              <Pie
                data={PIPELINE_STAGES}
                dataKey="value"
                nameKey="name"
                innerRadius={34}
                outerRadius={48}
                paddingAngle={3}
                stroke="none"
                onClick={(_, index) => {
                  const stage = PIPELINE_STAGES[index];
                  setActiveStage((prev) =>
                    prev === stage.name ? null : stage.name
                  );
                }}
                style={{ cursor: "pointer" }}
              >
                {PIPELINE_STAGES.map((item) => {
                  const dimmed =
                    activeStage !== null && activeStage !== item.name;
                  return (
                    <Cell
                      key={item.name}
                      fill={item.color}
                      fillOpacity={dimmed ? 0.2 : 1}
                      stroke="none"
                    />
                  );
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
              {focusLabel}
            </p>
            <h2 className="text-xl font-bold tracking-tight text-white leading-none">
              {focusTotal}
            </h2>
            {activeStage && (
              <p className="text-[10px] font-medium text-sky-300">
                {((focusTotal / total) * 100).toFixed(0)}% EST.
              </p>
            )}
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-0.5 overflow-y-auto">
          {PIPELINE_STAGES.map((item) => {
            const pct = (item.value / total) * 100;
            const selected = activeStage === item.name;
            const dimmed = activeStage !== null && !selected;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() =>
                  setActiveStage((prev) =>
                    prev === item.name ? null : item.name
                  )
                }
                className={`rounded-md px-1.5 py-1 text-left transition-all outline-none focus:outline-none focus-visible:outline-none focus:ring-0 ${
                  selected
                    ? "bg-white/10"
                    : dimmed
                      ? "opacity-35 hover:opacity-70"
                      : "hover:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: item.color }}
                    />
                    <span className="truncate text-xs font-medium text-slate-200">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-white">
                    {item.value}
                  </span>
                </div>

                <div className="mt-0.5 h-0.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${pct}%`,
                      background: item.color,
                      boxShadow: selected
                        ? `0 0 12px ${item.color}80`
                        : "none",
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
