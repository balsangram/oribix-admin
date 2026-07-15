import { Search as SearchIcon } from "lucide-react";

const defaultFilters = ["All", "Verified", "Pending", "Suspended"];

/* ── Search input ── */
export function SEARCH({
  value = "",
  onChange = () => {},
  placeholder = "Search vendor, owner, GSTIN...",
  className = "",
}) {
  return (
    <div
      className={`
        flex items-center gap-2.5
        w-full
        h-11
        px-3.5
        bg-white
        border border-gray-200
        rounded-xl
        shadow-sm
        focus-within:border-sky-300
        focus-within:ring-2
        focus-within:ring-sky-100
        transition-all
        ${className}
      `}
    >
      <SearchIcon size={16} className="shrink-0 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-800 placeholder:text-gray-400 outline-none"
      />
    </div>
  );
}

/* ── Filter tabs: All · Verified · Pending · Suspended ── */
export function SEARCH_FILTERS({
  filters = defaultFilters,
  active = "All",
  onChange = () => {},
  className = "",
}) {
  return (
    <div
      className={`
        flex items-center gap-1
        p-1
        bg-white
        border border-gray-200
        rounded-xl
        shadow-sm
        shrink-0
        ${className}
      `}
    >
      {filters.map((filter) => {
        const isActive = active === filter;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            className={`
              px-3.5 py-1.5
              text-sm font-medium rounded-lg
              transition-colors whitespace-nowrap
              ${
                isActive
                  ? "bg-slate-100 text-slate-900"
                  : "text-gray-500 hover:text-slate-700 hover:bg-gray-50"
              }
            `}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}

/* ── Combined bar: search + filters ── */
export function SEARCH_BAR({
  value = "",
  onSearch = () => {},
  activeFilter = "All",
  onFilterChange = () => {},
  filters = defaultFilters,
  placeholder = "Search vendor, owner, GSTIN...",
  className = "",
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ${className}`}
    >
      <SEARCH
        value={value}
        onChange={onSearch}
        placeholder={placeholder}
        className="flex-1 min-w-0"
      />
      <SEARCH_FILTERS
        filters={filters}
        active={activeFilter}
        onChange={onFilterChange}
      />
    </div>
  );
}

export default SEARCH;
