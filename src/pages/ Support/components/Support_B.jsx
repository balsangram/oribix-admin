import React, { useState } from "react";
import { SEARCH } from "../../../components/basicComponents/Search";
import Support_C, {
  FilterChip,
  priorityFilters,
  channelFilters,
} from "./Support_C";

function Support_B() {
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("All pri");
  const [channel, setChannel] = useState("All channels");

  return (
    <div className="mt-3">
      {/* Page-level search + filters */}
      <div className="mb-3">
        <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-2.5 shadow-sm lg:flex-row lg:items-center">
          <SEARCH
            value={query}
            onChange={setQuery}
            placeholder="Search tickets…"
            className="lg:w-72"
          />
          <div className="flex flex-wrap items-center gap-1.5">
            {priorityFilters.map((f) => (
              <FilterChip
                key={f}
                label={f}
                active={priority === f}
                tone="bg-sky-500 text-white"
                onClick={() => setPriority(f)}
              />
            ))}
            <span className="mx-1 h-5 w-px bg-gray-200" />
            {channelFilters.map((f) => (
              <FilterChip
                key={f}
                label={f}
                active={channel === f}
                onClick={() => setChannel(f)}
              />
            ))}
          </div>
        </div>
      </div>

      <Support_C query={query} priority={priority} channel={channel} />
    </div>
  );
}

export default Support_B;
