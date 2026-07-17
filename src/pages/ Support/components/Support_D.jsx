import React from "react";
import {
  Building2,
  Star,
  ShoppingBag,
  IndianRupee,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const scorecard = {
  company: "Brigade Enterprises",
  since: "Customer since Mar 2022 · Last order 2h ago",
  badge: "Platinum buyer",
  csat: "9.1 / 10",
};

const stats = [
  { label: "Total orders", value: "312", icon: ShoppingBag, tone: "bg-sky-50 text-sky-600" },
  { label: "Lifetime GMV", value: "₹4.8 Cr", icon: IndianRupee, tone: "bg-emerald-50 text-emerald-600" },
  { label: "On-time %", value: "96%", icon: TrendingUp, tone: "bg-violet-50 text-violet-600" },
  { label: "Disputes", value: "3", icon: AlertTriangle, tone: "bg-amber-50 text-amber-600" },
];

const recentOrders = [
  { id: "HZ-88420", detail: "40 bags OPC · Site 4", status: "Out for delivery", tone: "text-sky-600" },
  { id: "HZ-88012", detail: "60 bags PPC · Site 2", status: "Delivered", tone: "text-emerald-600" },
  { id: "HZ-87765", detail: "25 bags OPC · Site 1", status: "Delivered", tone: "text-emerald-600" },
];

function StatCard({ label, value, icon: Icon, tone }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="flex items-center gap-2">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${tone}`}>
          <Icon size={16} />
        </span>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
      </div>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function OrderRow({ id, detail, status, tone }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div>
        <p className="text-sm font-semibold text-slate-800">{id}</p>
        <p className="text-xs text-slate-500">{detail}</p>
      </div>
      <span className={`text-xs font-semibold ${tone}`}>{status}</span>
    </div>
  );
}

function Support_D() {
  return (
    <div className="bg-gray-50 px-6 pb-6 pt-5">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Building2 size={20} />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Customer scorecard
              </p>
              <h3 className="text-base font-semibold text-slate-900">
                {scorecard.company}
              </h3>
              <p className="text-xs text-slate-500">{scorecard.since}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            {scorecard.badge}
          </span>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Recent orders */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Recent orders
            </p>
            <p className="text-xs font-semibold text-slate-500">
              CSAT {scorecard.csat}
            </p>
          </div>
          <div className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-100">
            {recentOrders.map((o) => (
              <OrderRow key={o.id} {...o} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support_D;
