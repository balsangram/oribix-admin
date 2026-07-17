import React from "react";
import { Search } from "lucide-react";
import { filterChips, statusMeta } from "../liveMapData";

function LiveMapFleetPanel({
  drivers,
  selectedId,
  onSelect,
  search,
  onSearch,
  filter,
  onFilter,
}) {
  const selected = drivers.find((d) => d.id === selectedId) || drivers[0];
  const meta = selected ? statusMeta[selected.status] : null;

  return (
    <div className="flex h-full min-h-[520px] w-full flex-col gap-3 xl:w-[340px] xl:shrink-0">
      {/* list card */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="space-y-3 border-b border-slate-100 p-3">
          <div className="relative">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search driver, vehicle, order..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs text-slate-800 outline-none ring-slate-300 placeholder:text-slate-400 focus:bg-white focus:ring-2"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {filterChips.map((chip) => {
              const active = filter === chip.key;
              return (
                <button
                  key={chip.key}
                  type="button"
                  onClick={() => onFilter(chip.key)}
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                    active
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
          {drivers.length === 0 ? (
            <p className="py-8 text-center text-xs text-slate-400">No drivers match.</p>
          ) : (
            drivers.map((driver) => {
              const s = statusMeta[driver.status];
              const active = driver.id === selectedId;
              return (
                <button
                  key={driver.id}
                  type="button"
                  onClick={() => onSelect(driver.id)}
                  className={`flex w-full items-start gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all ${
                    active
                      ? "border-slate-900 bg-slate-50 shadow-sm"
                      : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/80"
                  }`}
                >
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {driver.name}
                      </p>
                      <span className="shrink-0 text-[10px] font-semibold text-slate-500">
                        {driver.eta}
                      </span>
                    </div>
                    <p className="truncate text-[11px] text-slate-500">
                      {driver.vehicleId} · {driver.plate}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">{driver.cargo}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* route detail */}
      {selected && meta && (
        <div className="rounded-2xl border border-slate-800 bg-[#0B1220] p-4 text-white shadow-[0_16px_40px_rgba(15,23,42,0.35)]">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.14em] text-slate-400">
                ROUTE DETAIL
              </p>
              <p className="mt-1 text-base font-semibold">{selected.name}</p>
              <p className="text-[11px] text-slate-400">
                {selected.vehicleId} · {selected.plate}
              </p>
            </div>
            <span
              className="rounded-full border px-2 py-0.5 text-[10px] font-semibold"
              style={{
                color: meta.color,
                borderColor: `${meta.color}55`,
                backgroundColor: `${meta.color}18`,
              }}
            >
              {meta.label}
            </span>
          </div>

          <div className="mb-4 grid grid-cols-3 gap-2">
            {[
              { label: "Speed", value: selected.speed },
              { label: "ETA", value: selected.eta },
              { label: "Hub", value: selected.hub },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-700/80 bg-slate-900/60 px-2.5 py-2"
              >
                <p className="text-[9px] uppercase tracking-wide text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-0.5 truncate text-sm font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="relative space-y-3 pl-3">
            <span className="absolute bottom-1 left-[7px] top-1 w-px bg-slate-700" />
            {selected.stops.map((stop, i) => (
              <div key={i} className="relative pl-4">
                <span
                  className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full border-2 border-[#0B1220]"
                  style={{ backgroundColor: i === 0 ? meta.color : "#64748B" }}
                />
                <p className="text-xs font-medium text-slate-100">{stop.title}</p>
                <p className="text-[10px] text-slate-500">{stop.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LiveMapFleetPanel;
