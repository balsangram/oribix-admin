import React, { useMemo, useState } from "react";
import { Check, SlidersHorizontal, X } from "lucide-react";
import {
  EWAY_BILLS,
  EWB_TABS,
  RISK_BADGE,
  STATUS_BADGE,
} from "../data/ewayBillData";

function PartChip({ label, state }) {
  return (
    <span
      className={`flex h-5 w-5 items-center justify-center rounded text-[10px] font-semibold ${
        state === "warn"
          ? "bg-orange-100 text-orange-600"
          : "bg-green-100 text-green-600"
      }`}
    >
      {label}
    </span>
  );
}

function EwayBill_B() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const tabCounts = useMemo(() => {
    const counts = { All: EWAY_BILLS.length };
    EWB_TABS.slice(1).forEach((tab) => {
      counts[tab] = EWAY_BILLS.filter((b) => b.status === tab).length;
    });
    return counts;
  }, []);

  const filteredBills = useMemo(() => {
    const query = search.trim().toLowerCase();
    return EWAY_BILLS.filter((bill) => {
      const matchesTab = activeTab === "All" || bill.status === activeTab;
      const matchesSearch =
        !query ||
        [bill.id, bill.vendor, bill.route, bill.source]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  return (
    <div className="mt-3">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Header: tabs + search */}
        <div className="flex flex-col gap-2 border-b border-gray-100 p-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {EWB_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold transition ${
                  activeTab === tab
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-gray-100"
                }`}
              >
                {tab}
                {tabCounts[tab] ? (
                  <span
                    className={`text-[9px] ${
                      activeTab === tab ? "text-slate-300" : "text-slate-400"
                    }`}
                  >
                    {tabCounts[tab]}
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search EWB, order, vendor, vehicle..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100 lg:w-64"
            />
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-slate-900 px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-slate-800"
            >
              <SlidersHorizontal size={12} />
              More filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "EWB #",
                  "Order / Vendor",
                  "Route",
                  "Value",
                  "Part A/B",
                  "Validity",
                  "Risk",
                  "Status",
                  "",
                ].map((head) => (
                  <th
                    key={head || "action"}
                    className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredBills.length ? (
                filteredBills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2.5">
                      <p className="text-sm font-medium text-slate-800">
                        {bill.source}
                      </p>
                      <p className="text-[11px] text-slate-400">{bill.id}</p>
                    </td>
                    <td className="px-3 py-2.5 text-sm font-medium text-slate-800">
                      {bill.vendor}
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-600">
                      {bill.distance} · {bill.route}
                    </td>
                    <td className="px-3 py-2.5 text-sm text-slate-700">
                      {bill.value}
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1">
                        <PartChip label="A" state={bill.partA} />
                        <PartChip label="B" state={bill.partB} />
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={`text-[11px] font-medium ${
                          bill.expired ? "text-blue-600" : "text-slate-500"
                        }`}
                      >
                        {bill.validity}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                          RISK_BADGE[bill.risk] || "border-slate-200 text-slate-500"
                        }`}
                      >
                        {bill.risk}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                          STATUS_BADGE[bill.status] || "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {bill.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center justify-end gap-1">
                        {bill.status !== "Verified" && (
                          <button
                            type="button"
                            title="Approve"
                            className="rounded-md p-1 text-green-500 hover:bg-green-50"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        {bill.status !== "Rejected" &&
                          bill.status !== "Verified" && (
                            <button
                              type="button"
                              title="Reject"
                              className="rounded-md p-1 text-red-500 hover:bg-red-50"
                            >
                              <X size={14} />
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-3 py-8 text-center text-xs text-slate-500"
                  >
                    No e-way bills match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-3 py-2.5 text-xs text-slate-500">
          Showing {filteredBills.length} of {EWAY_BILLS.length} e-way bills
        </div>
      </div>
    </div>
  );
}

export default EwayBill_B;
