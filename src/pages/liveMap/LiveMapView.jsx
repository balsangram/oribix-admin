import React, { useMemo, useState } from "react";
import { Download, Satellite } from "lucide-react";
import { B_CARD } from "../../components/basicComponents/Card";
import { H1 } from "../../components/basicComponents/Heading";
import { P } from "../../components/basicComponents/Paragraph";
import LiveMapCanvas from "./components/LiveMapCanvas";
import LiveMapFleetPanel from "./components/LiveMapFleetPanel";
import {
  drivers as allDrivers,
  mapLayers,
  summaryStats,
} from "./liveMapData";

function LiveMapView() {
  const [selectedId, setSelectedId] = useState(allDrivers[0].id);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [layers, setLayers] = useState(
    Object.fromEntries(mapLayers.map((l) => [l.id, l.defaultOn]))
  );

  const filteredDrivers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allDrivers.filter((d) => {
      const statusOk = filter === "all" || d.status === filter;
      if (!statusOk) return false;
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        d.vehicleId.toLowerCase().includes(q) ||
        d.plate.toLowerCase().includes(q) ||
        d.hub.toLowerCase().includes(q)
      );
    });
  }, [search, filter]);

  const toggleLayer = (key) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <B_CARD>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Satellite size={22} className="text-slate-700" />
            <H1 className="mb-0">Live Map + Replay</H1>
          </div>
          <P className="mb-0 text-sm text-slate-500">
            Real-time fleet, route playback, layer control & driver telemetry.
          </P>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {summaryStats.map((stat) => (
            <span
              key={stat.key}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${stat.className}`}
            >
              <span className="tabular-nums">{stat.count}</span>
              {stat.label}
            </span>
          ))}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      <div className="flex min-h-[560px] flex-col gap-4 xl:flex-row">
        <div className="min-w-0 flex-1">
          <LiveMapCanvas
            drivers={filteredDrivers}
            selectedId={selectedId}
            onSelect={setSelectedId}
            layers={layers}
            onToggleLayer={toggleLayer}
          />
        </div>

        <LiveMapFleetPanel
          drivers={filteredDrivers}
          selectedId={selectedId}
          onSelect={setSelectedId}
          search={search}
          onSearch={setSearch}
          filter={filter}
          onFilter={setFilter}
        />
      </div>
    </B_CARD>
  );
}

export default LiveMapView;
