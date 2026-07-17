import React, { useState } from "react";
import { Eye, ArrowLeft, Users, ShoppingBag, CheckCircle2, Clock } from "lucide-react";

const customers = [
  {
    id: "CUST-1001",
    name: "Rohan Desai",
    phone: "+91 98200 11223",
    code: "ROHAN-VIP",
    referred: [
      { name: "Amit Shah", phone: "+91 99100 22110", ordered: true },
      { name: "Neha Verma", phone: "+91 98111 55221", ordered: true },
      { name: "Karan Mehta", phone: "+91 90000 33445", ordered: false },
      { name: "Sana Khan", phone: "+91 91234 67890", ordered: false },
    ],
  },
  {
    id: "CUST-1002",
    name: "Priya Nair",
    phone: "+91 98765 43210",
    code: "PRIYA-10",
    referred: [
      { name: "Vikram Rao", phone: "+91 90909 12121", ordered: true },
      { name: "Divya Iyer", phone: "+91 93939 45454", ordered: false },
    ],
  },
  {
    id: "CUST-1003",
    name: "Arjun Kapoor",
    phone: "+91 90123 45678",
    code: "ARJUN-VIP",
    referred: [
      { name: "Rahul Jain", phone: "+91 98989 32323", ordered: true },
      { name: "Meera Pillai", phone: "+91 97777 21212", ordered: true },
      { name: "Sameer Ali", phone: "+91 96666 10101", ordered: true },
    ],
  },
];

function StatBox({ icon: Icon, label, value, tone }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${tone}`}>
        <Icon size={18} />
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="text-xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function Referrals_C() {
  const [selected, setSelected] = useState(null);

  const active = customers.find((c) => c.id === selected);

  if (active) {
    const usedCount = active.referred.length;
    const orderedCount = active.referred.filter((r) => r.ordered).length;

    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft size={16} /> Back to customers
        </button>

        <div className="mt-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {active.name}
          </h2>
          <p className="text-sm text-slate-500">
            Referral code · <span className="font-semibold text-slate-700">{active.code}</span>
          </p>
        </div>

        {/* Summary: used referral vs ordered */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatBox
            icon={Users}
            label="Used this referral"
            value={usedCount}
            tone="bg-sky-50 text-sky-600"
          />
          <StatBox
            icon={ShoppingBag}
            label="Already ordered"
            value={orderedCount}
            tone="bg-emerald-50 text-emerald-600"
          />
        </div>

        {/* Referred users table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Referred user</th>
                <th className="px-4 py-3">Used referral</th>
                <th className="px-4 py-3">Ordered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {active.referred.map((r, i) => (
                <tr key={i} className="text-slate-700">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{r.name}</p>
                    <p className="text-xs text-slate-400">{r.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600">
                      <CheckCircle2 size={13} /> Yes
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {r.ordered ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                        <CheckCircle2 size={13} /> Ordered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
                        <Clock size={13} /> Not yet
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // List of all customers
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">All customers</h2>
      <p className="text-sm text-slate-500">
        View who used each customer's referral and how many have ordered.
      </p>

      <div className="mt-5 overflow-hidden rounded-xl border border-gray-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Referral code</th>
              <th className="px-4 py-3">Referrals</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((c) => (
              <tr key={c.id} className="text-slate-700">
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-800">{c.name}</p>
                  <p className="text-xs text-slate-400">{c.phone}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                    {c.code}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-slate-800">
                  {c.referred.length}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => setSelected(c.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                  >
                    <Eye size={14} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Referrals_C;
