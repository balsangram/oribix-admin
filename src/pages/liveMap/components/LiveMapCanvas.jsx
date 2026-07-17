import React from "react";
import { Building2, Truck } from "lucide-react";
import { hubs, statusMeta } from "../liveMapData";

function routePath(points) {
  if (!points?.length) return "";
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
}

function LiveMapCanvas({
  drivers,
  selectedId,
  onSelect,
  layers,
  onToggleLayer,
}) {
  const selected = drivers.find((d) => d.id === selectedId);

  return (
    <div className="relative h-full min-h-[520px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-[#E8EEF4] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
      {/* map texture */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px),
            radial-gradient(ellipse at 30% 40%, #d7e6d4 0%, transparent 45%),
            radial-gradient(ellipse at 70% 65%, #f0e6d8 0%, transparent 40%),
            linear-gradient(160deg, #dce6ef 0%, #eef2f6 45%, #e4ebe4 100%)
          `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%, 100% 100%",
        }}
      />

      {/* fake arterial roads */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M5 55 H95" stroke="#CBD5E1" strokeWidth="1.2" fill="none" />
        <path d="M35 5 V95" stroke="#CBD5E1" strokeWidth="1.2" fill="none" />
        <path d="M10 20 C35 25, 55 40, 90 35" stroke="#D6DEE8" strokeWidth="0.9" fill="none" />
        <path d="M15 85 C40 70, 60 75, 88 60" stroke="#D6DEE8" strokeWidth="0.9" fill="none" />
        <path d="M20 10 L55 90" stroke="#D6DEE8" strokeWidth="0.7" fill="none" />

        {layers.routes &&
          drivers
            .filter((d) => d.route?.length > 1)
            .map((d) => (
              <path
                key={`route-${d.id}`}
                d={routePath(d.route)}
                fill="none"
                stroke={d.id === selectedId ? "#0F766E" : "#5EEAD4"}
                strokeWidth={d.id === selectedId ? 1.4 : 0.9}
                strokeDasharray="2.5 1.8"
                strokeLinecap="round"
                opacity={d.id === selectedId ? 1 : 0.7}
              />
            ))}
      </svg>

      {/* legend */}
      <div className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-lg border border-white/70 bg-white/90 px-2.5 py-1.5 shadow-sm backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="h-2 w-2 rounded-full bg-sky-500" />
        <span className="h-2 w-2 rounded-full bg-amber-500" />
      </div>

      {/* hubs */}
      {layers.hubs &&
        hubs.map((hub) => (
          <div
            key={hub.id}
            className="absolute z-[5] -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
            title={hub.name}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-white shadow-md ring-2 ring-white">
              <Building2 size={14} />
            </div>
            <p className="mt-1 whitespace-nowrap text-center text-[9px] font-semibold text-slate-700 drop-shadow-sm">
              {hub.name}
            </p>
          </div>
        ))}

      {/* fleet markers */}
      {layers.fleet &&
        drivers.map((driver) => {
          const meta = statusMeta[driver.status];
          const active = driver.id === selectedId;
          return (
            <button
              key={driver.id}
              type="button"
              onClick={() => onSelect(driver.id)}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
              style={{ left: `${driver.x}%`, top: `${driver.y}%` }}
              title={`${driver.name} · ${meta.label}`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg ring-2 ${
                  active ? "ring-slate-900 scale-110" : "ring-white"
                }`}
                style={{ backgroundColor: meta.color }}
              >
                <Truck size={14} />
              </span>
            </button>
          );
        })}

      {/* selected callout */}
      {selected && (
        <div
          className="absolute z-20 -translate-x-1/2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg"
          style={{
            left: `${selected.x}%`,
            top: `calc(${selected.y}% + 22px)`,
          }}
        >
          <p className="text-xs font-semibold text-slate-900">{selected.name}</p>
          <p className="text-[10px] text-slate-500">
            {selected.vehicleId} · {selected.eta}
          </p>
        </div>
      )}

      {/* live pill */}
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        LIVE
      </div>

      {/* layer toggles */}
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur-sm">
        {Object.entries(layers).map(([key, on]) => (
          <div
            key={key}
            className="flex items-center justify-between gap-3 px-1 py-0.5"
          >
            <span className="text-[10px] font-medium capitalize text-slate-600">{key}</span>
            <button
              type="button"
              role="switch"
              aria-checked={on}
              onClick={() => onToggleLayer?.(key)}
              className={`relative h-4 w-7 rounded-full transition-colors ${
                on ? "bg-slate-900" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform ${
                  on ? "left-3.5" : "left-0.5"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-md bg-white/80 px-2 py-1 text-[10px] font-medium text-slate-500">
        Bengaluru metro · demo
      </div>
    </div>
  );
}

export default LiveMapCanvas;
