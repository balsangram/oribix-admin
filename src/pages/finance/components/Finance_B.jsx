import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  MoreHorizontal,
  Search,
} from "lucide-react";

const collectionsTrend = [
  { day: "Mon", value: 18.4 },
  { day: "Tue", value: 21.2 },
  { day: "Wed", value: 19.8 },
  { day: "Thu", value: 24.6 },
  { day: "Fri", value: 27.1 },
  { day: "Sat", value: 31.5 },
  { day: "Sun", value: 29.3 },
];

const categoryMix = [
  { name: "Cement", value: 88, color: "#2F9BF3" },
  { name: "Steel & TMT", value: 72, color: "#0F172A" },
  { name: "Aggregates", value: 61, color: "#EF6C4D" },
  { name: "Bricks & Blocks", value: 54, color: "#C084FC" },
  { name: "Tiles", value: 43, color: "#22D3EE" },
  { name: "Paints", value: 31, color: "#F59E0B" },
  { name: "Fittings", value: 22, color: "#CBB47A" },
];

const zoneRows = [
  { zone: "Central Zone", code: "CZ", tint: "#2F9BF3", gmv: "₹18.4L", orders: 342, aov: "₹5,380", delivery: "36h", sla: 98, up: true },
  { zone: "Northern Zone", code: "NZ", tint: "#8B5CF6", gmv: "₹14.2L", orders: 288, aov: "₹4,930", delivery: "41h", sla: 96, up: true },
  { zone: "West", code: "WZ", tint: "#EF6C4D", gmv: "₹11.9L", orders: 254, aov: "₹4,680", delivery: "44h", sla: 91, up: false },
  { zone: "South Corridor", code: "SC", tint: "#22C55E", gmv: "₹9.6L", orders: 211, aov: "₹4,540", delivery: "39h", sla: 94, up: true },
  { zone: "East", code: "EZ", tint: "#F59E0B", gmv: "₹7.1L", orders: 168, aov: "₹4,210", delivery: "52h", sla: 88, up: false },
];

const zoneFilters = ["All zones", "Top", "Watchlist"];

function slaTone(sla) {
  if (sla >= 95) return "bg-emerald-50 text-emerald-600 ring-emerald-100";
  if (sla >= 90) return "bg-amber-50 text-amber-600 ring-amber-100";
  return "bg-red-50 text-red-600 ring-red-100";
}

function slaBar(sla) {
  if (sla >= 95) return "#22C55E";
  if (sla >= 90) return "#F59E0B";
  return "#EF4444";
}

function FilterChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
        active
          ? "bg-slate-900 text-white"
          : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      {label}
    </button>
  );
}

function TrendChart() {
  return (
    <div className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_rgba(15,23,42,0.06)] flex flex-col transition-shadow hover:shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_44px_rgba(15,23,42,0.10)]">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-sky-50 text-sky-500">
              <TrendingUp size={16} />
            </span>
            <h2 className="text-sm font-semibold text-slate-800">
              Collections trend
            </h2>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              ₹1.72Cr
            </h1>
            <span className="mb-1 inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
              <ArrowUpRight size={13} /> 12.4%
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Last 7 days · ₹ Lakhs / day</p>
        </div>
      </div>

      <div className="mt-5 h-[200px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={collectionsTrend} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2F9BF3" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#2F9BF3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#EEF2F7" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ stroke: "#CBD5E1", strokeWidth: 1 }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E2E8F0",
                boxShadow: "0 8px 24px rgba(15,23,42,0.10)",
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2F9BF3"
              strokeWidth={3}
              fill="url(#trendFill)"
              dot={{ r: 3, fill: "#fff", stroke: "#2F9BF3", strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CategoryMix() {
  const max = Math.max(...categoryMix.map((c) => c.value));
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_rgba(15,23,42,0.06)] flex flex-col transition-shadow hover:shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_44px_rgba(15,23,42,0.10)]">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            Category mix by GMV
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">Share of revenue</p>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
          7 categories
        </span>
      </div>

      <div className="mt-5 flex flex-1 flex-col justify-center gap-4">
        {categoryMix.map((c) => (
          <div key={c.name} className="flex items-center gap-3">
            <span className="flex w-32 shrink-0 items-center gap-2 text-xs font-medium text-slate-600">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: c.color }}
              />
              {c.name}
            </span>
            <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                style={{
                  width: `${(c.value / max) * 100}%`,
                  backgroundColor: c.color,
                }}
              />
            </div>
            <span className="w-9 shrink-0 text-right text-xs font-semibold tabular-nums text-slate-700">
              {c.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ZoneTable() {
  const [filter, setFilter] = useState(zoneFilters[0]);
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return zoneRows.filter((r) => {
      const matchQ = !q || r.zone.toLowerCase().includes(q);
      const matchF =
        filter === "All zones" ||
        (filter === "Top" && r.sla >= 95) ||
        (filter === "Watchlist" && r.sla < 92);
      return matchQ && matchF;
    });
  }, [filter, query]);

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-slate-800">Zone performance</h2>
          <div className="flex items-center gap-1 rounded-full bg-slate-50 p-1">
            {zoneFilters.map((f) => (
              <FilterChip
                key={f}
                label={f}
                active={filter === f}
                onClick={() => setFilter(f)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search zone…"
              className="w-40 rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-3 text-xs text-slate-700 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
          </div>
          <button
            type="button"
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-sky-600 transition-colors hover:bg-sky-50"
          >
            View all →
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-gray-100 bg-slate-50/70 text-[11px] uppercase tracking-wide text-slate-400">
              <th className="px-6 py-3 text-left font-medium">Zone</th>
              <th className="px-6 py-3 text-left font-medium">GMV</th>
              <th className="px-6 py-3 text-left font-medium">Orders</th>
              <th className="px-6 py-3 text-left font-medium">AOV</th>
              <th className="px-6 py-3 text-left font-medium">Delivery time</th>
              <th className="px-6 py-3 text-left font-medium">SLA</th>
              <th className="px-6 py-3 text-right font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.zone}
                className="group border-t border-gray-50 transition-colors hover:bg-slate-50/70"
              >
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-[11px] font-bold text-white"
                      style={{ backgroundColor: row.tint }}
                    >
                      {row.code}
                    </span>
                    <span className="font-semibold text-slate-800">{row.zone}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 font-medium tabular-nums text-slate-700">{row.gmv}</td>
                <td className="px-6 py-3.5 tabular-nums text-slate-600">{row.orders}</td>
                <td className="px-6 py-3.5 tabular-nums text-slate-600">{row.aov}</td>
                <td className="px-6 py-3.5 tabular-nums text-slate-600">{row.delivery}</td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${row.sla}%`, backgroundColor: slaBar(row.sla) }}
                      />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${slaTone(row.sla)}`}
                    >
                      {row.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                      {row.sla}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-right">
                  <button
                    type="button"
                    className="rounded-lg p-1.5 text-slate-400 opacity-0 transition-all hover:bg-slate-100 hover:text-slate-600 group-hover:opacity-100"
                    aria-label="Row actions"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-sm text-slate-400">
                  No zones match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Finance_B() {
  return (
    <div className="mt-3">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <TrendChart />
        <CategoryMix />
      </div>

      <div className="mt-5">
        <ZoneTable />
      </div>
    </div>
  );
}

export default Finance_B;
