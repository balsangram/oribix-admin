import React, { useState } from "react";
import { Users, TicketPercent, Sparkles } from "lucide-react";
import Referrals_C from "./Referrals_C";
import Referrals_D from "./Referrals_D";
import Referrals_E from "./Referrals_E";

const tabs = [
  { id: "customers", label: "Customer Referrals", icon: Users, Component: Referrals_C },
  { id: "coupons", label: "Coupon Approvals", icon: TicketPercent, Component: Referrals_D },
  { id: "generate", label: "Generate Code", icon: Sparkles, Component: Referrals_E },
];

function Referrals_B() {
  const [active, setActive] = useState(tabs[0].id);
  const ActiveComponent =
    tabs.find((t) => t.id === active)?.Component ?? tabs[0].Component;

  return (
    <div className="mt-3">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-gray-200 pb-2.5">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Icon size={14} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Active section */}
      <div className="pt-3">
        <ActiveComponent />
      </div>
    </div>
  );
}

export default Referrals_B;
