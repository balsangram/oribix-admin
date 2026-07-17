import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import Referrals_F from "./Referrals_F";

const initialPromos = [
  {
    id: 1,
    code: "DIWALI9M",
    discount: "5% off",
    audience: "All buyers",
    scope: "First order",
    validity: "Today → +30d",
    usageLimit: 1000,
    status: "Active",
  },
  {
    id: 2,
    code: "STEEL15",
    discount: "15% off",
    audience: "Returning buyers",
    scope: "All orders",
    validity: "01 Jul → 31 Jul",
    usageLimit: 500,
    status: "Paused",
  },
];

const statusTone = {
  Active: "bg-emerald-50 text-emerald-600",
  Paused: "bg-amber-50 text-amber-600",
  Expired: "bg-slate-100 text-slate-500",
};

function randomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function Referrals_E() {
  const [promos, setPromos] = useState(initialPromos);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = (data) => {
    const discount =
      data.discountType === "Percent off"
        ? `${data.discountValue}% off`
        : `₹${data.discountValue} off`;

    const validity =
      data.startDate && data.endDate
        ? `${data.startDate} → ${data.endDate}`
        : "No expiry";

    setPromos((prev) => [
      {
        id: Date.now(),
        code: randomCode(),
        discount,
        audience: data.audience,
        scope: data.scope,
        validity,
        usageLimit: data.usageLimit,
        status: "Active",
      },
      ...prev,
    ]);
    setShowForm(false);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Promo codes</h2>
          <p className="text-sm text-slate-500">
            All generated promo &amp; referral codes.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <Plus size={16} /> Create
        </button>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-gray-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Discount</th>
              <th className="px-4 py-3">Audience</th>
              <th className="px-4 py-3">Scope</th>
              <th className="px-4 py-3">Validity</th>
              <th className="px-4 py-3">Usage limit</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {promos.map((p) => (
              <tr key={p.id} className="text-slate-700">
                <td className="px-4 py-3">
                  <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs font-semibold text-slate-800">
                    {p.code}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-slate-800">
                  {p.discount}
                </td>
                <td className="px-4 py-3">{p.audience}</td>
                <td className="px-4 py-3">{p.scope}</td>
                <td className="px-4 py-3 text-xs">{p.validity}</td>
                <td className="px-4 py-3">{p.usageLimit}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      statusTone[p.status] ?? statusTone.Expired
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 sm:p-8">
          <div className="relative w-full max-w-2xl">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute -top-2 right-0 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500 shadow hover:text-slate-800 sm:-right-2"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <Referrals_F
              onCancel={() => setShowForm(false)}
              onCreate={handleCreate}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Referrals_E;
