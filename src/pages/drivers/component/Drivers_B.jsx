import React, { useMemo, useState } from "react";
import { LayoutList, Star } from "lucide-react";
import {
  DRIVERS,
  DRIVER_SUMMARY,
  DRIVER_TABS,
  HOURLY_ACTIVITY,
  HUB_SPLIT,
  STATUS_BADGE,
} from "../data/driversData";

const HEAT_SHADES = [
  "bg-slate-100",
  "bg-slate-300",
  "bg-slate-500",
  "bg-slate-700",
  "bg-slate-900",
];

function Drivers_B() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filteredDrivers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return DRIVERS.filter((driver) => {
      const matchesTab = activeTab === "All" || driver.status === activeTab;
      const matchesSearch =
        !query ||
        [driver.id, driver.name, driver.hub, driver.vehicle]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  return (
    <div className="px-6 pb-6">
      {/* Top bar: search + tabs + view toggle */}
      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search driver, vehicle, ID..."
            className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100 sm:max-w-xs"
          />

          <div className="flex flex-wrap items-center gap-2">
            {DRIVER_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeTab === tab
                    ? tab === "All"
                      ? "bg-blue-500 text-white"
                      : "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 self-start rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 lg:self-auto"
        >
          <LayoutList size={14} />
          Table
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        {/* Drivers table */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm xl:col-span-3">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  {["Driver", "Vehicle", "Status", "Trips", "Rating", "Actions"].map(
                    (head) => (
                      <th
                        key={head}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredDrivers.length ? (
                  filteredDrivers.map((driver) => (
                    <tr key={driver.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            {driver.name
                              .split(" ")
                              .slice(0, 2)
                              .map((w) => w[0])
                              .join("")}
                          </span>
                          <span className="text-sm text-slate-700">
                            {driver.id} · {driver.hub}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">
                        {driver.vehicle}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            STATUS_BADGE[driver.status] ||
                            "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {driver.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">
                        {driver.trips}
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-white">
                          <Star size={11} className="fill-blue-400 text-blue-400" />
                          {driver.rating}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          className="rounded-lg p-1.5 text-blue-500 hover:bg-blue-50"
                          title="View details"
                        >
                          <LayoutList size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-sm text-slate-500"
                    >
                      No drivers match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-4">
          {/* Hourly activity heatmap */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Hourly activity
            </p>
            <div className="flex flex-wrap gap-1">
              {HOURLY_ACTIVITY.map((level, index) => (
                <span
                  key={index}
                  title={`${index}:00 — level ${level}`}
                  className={`h-5 w-5 rounded ${HEAT_SHADES[level] || HEAT_SHADES[0]}`}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-slate-400">
              <span>00h</span>
              <span>23h</span>
            </div>
          </div>

          {/* Hub split bars */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Drivers by hub
            </p>
            <div className="flex flex-col gap-2.5">
              {HUB_SPLIT.map((hub) => (
                <div key={hub.label} className="flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${hub.color}`}
                      style={{ width: `${hub.value}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-[11px] font-medium text-slate-500">
                    {hub.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary pills */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Fleet status
            </p>
            <div className="flex flex-col items-end gap-2">
              {DRIVER_SUMMARY.map((item) => (
                <div
                  key={item.label}
                  className="flex w-full items-center justify-between"
                >
                  <span className="text-xs text-slate-500">{item.label}</span>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-white">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drivers_B;
