import React, { useState } from "react";
import { ImageIcon, Check, X, Percent, BadgeCheck, Ban } from "lucide-react";

const initialCoupons = [
  {
    id: "CPN-501",
    user: "Rohan Desai",
    uploaded: "Uploaded 2h ago",
    label: "Cement combo offer",
    status: "pending",
    percent: 5,
    cap: 100,
  },
  {
    id: "CPN-502",
    user: "Priya Nair",
    uploaded: "Uploaded 5h ago",
    label: "Festive steel discount",
    status: "pending",
    percent: 10,
    cap: 250,
  },
  {
    id: "CPN-503",
    user: "Arjun Kapoor",
    uploaded: "Uploaded 1d ago",
    label: "First order coupon",
    status: "pending",
    percent: 8,
    cap: 150,
  },
];

const statusMeta = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-600" },
  approved: { label: "Approved", className: "bg-emerald-50 text-emerald-600" },
  rejected: { label: "Rejected", className: "bg-red-50 text-red-600" },
};

function Referrals_D() {
  const [coupons, setCoupons] = useState(initialCoupons);

  const update = (id, patch) =>
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Coupon approvals</h2>
      <p className="text-sm text-slate-500">
        Review coupons uploaded by users. On approval, set the discount % and the
        maximum amount to deduct.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {coupons.map((c) => {
          const meta = statusMeta[c.status];
          return (
            <div
              key={c.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              {/* Coupon photo */}
              <div className="flex h-36 items-center justify-center bg-slate-100 text-slate-400">
                <ImageIcon size={28} />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">
                    {c.user}
                  </p>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${meta.className}`}
                  >
                    {meta.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{c.label}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{c.uploaded}</p>

                {/* Discount config */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="mb-1 block text-[11px] font-semibold text-slate-500">
                      Discount %
                    </span>
                    <div className="relative">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={c.percent}
                        disabled={c.status !== "pending"}
                        onChange={(e) =>
                          update(c.id, { percent: Number(e.target.value) })
                        }
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-2.5 pr-7 text-sm outline-none focus:border-sky-300 focus:bg-white disabled:opacity-60"
                      />
                      <Percent
                        size={13}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[11px] font-semibold text-slate-500">
                      Up to ₹
                    </span>
                    <input
                      type="number"
                      min={0}
                      value={c.cap}
                      disabled={c.status !== "pending"}
                      onChange={(e) =>
                        update(c.id, { cap: Number(e.target.value) })
                      }
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-sm outline-none focus:border-sky-300 focus:bg-white disabled:opacity-60"
                    />
                  </label>
                </div>

                <p className="mt-2 text-[11px] text-slate-400">
                  Gives {c.percent}% off, up to ₹{c.cap} deducted.
                </p>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  {c.status === "pending" ? (
                    <>
                      <button
                        type="button"
                        onClick={() => update(c.id, { status: "approved" })}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                      >
                        <Check size={14} /> Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => update(c.id, { status: "rejected" })}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        <X size={14} /> Reject
                      </button>
                    </>
                  ) : (
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                          c.status === "approved"
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {c.status === "approved" ? (
                          <>
                            <BadgeCheck size={15} /> {c.percent}% up to ₹{c.cap}
                          </>
                        ) : (
                          <>
                            <Ban size={15} /> Rejected
                          </>
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={() => update(c.id, { status: "pending" })}
                        className="text-xs font-semibold text-slate-400 hover:text-slate-600"
                      >
                        Undo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Referrals_D;
