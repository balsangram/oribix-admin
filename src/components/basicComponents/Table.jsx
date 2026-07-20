import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  MoreHorizontal,
  Pencil,
  Printer,
  Trash2,
  X,
} from "lucide-react";

const STATUS_STYLES = {
  pending: "bg-orange-50 text-orange-600",
  incomplete: "bg-orange-50 text-orange-600",
  overdue: "bg-rose-50 text-rose-600",
  ongoing: "bg-sky-50 text-sky-600",
  "in progress": "bg-sky-50 text-sky-600",
  "out for delivery": "bg-sky-50 text-sky-600",
  picking: "bg-amber-50 text-amber-700",
  packed: "bg-violet-50 text-violet-600",
  accepted: "bg-blue-50 text-blue-600",
  new: "bg-blue-50 text-blue-600",
  completed: "bg-emerald-50 text-emerald-600",
  finished: "bg-emerald-50 text-emerald-600",
  delivered: "bg-emerald-50 text-emerald-600",
  dispatched: "bg-indigo-50 text-indigo-600",
  refunded: "bg-rose-50 text-rose-600",
};

function getRowId(row, index) {
  return row.id ?? row.orderId ?? row.orderNumber ?? index;
}

export function StatusBadge({ children }) {
  const key = String(children ?? "").trim().toLowerCase();
  const tone = STATUS_STYLES[key] || "bg-slate-100 text-slate-600";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}
    >
      {children}
    </span>
  );
}

function SortIcon({ direction }) {
  return (
    <span className="ml-1 inline-flex flex-col text-slate-300">
      <ChevronUp
        className={`h-3 w-3 -mb-1 ${direction === "asc" ? "text-slate-700" : ""}`}
      />
      <ChevronDown
        className={`h-3 w-3 ${direction === "desc" ? "text-slate-700" : ""}`}
      />
    </span>
  );
}

function Checkbox({ checked, indeterminate = false, onChange, ariaLabel }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      aria-label={ariaLabel}
      onClick={onChange}
      className={`flex h-4 w-4 items-center justify-center rounded border transition ${
        checked || indeterminate
          ? "border-slate-800 bg-slate-800 text-white"
          : "border-slate-300 bg-white hover:border-slate-400"
      }`}
    >
      {(checked || indeterminate) && (
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
          {indeterminate ? (
            <path
              d="M2.5 6h7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M2.5 6.2l2.3 2.3 4.7-4.8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      )}
    </button>
  );
}

function buildPageItems(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const items = [1];
  if (current > 3) items.push("…");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let p = start; p <= end; p += 1) items.push(p);

  if (current < total - 2) items.push("…");
  items.push(total);
  return items;
}

const DEFAULT_BULK_ACTIONS = [
  { key: "duplicate", label: "Duplicate", icon: Copy },
  { key: "print", label: "Print", icon: Printer },
  { key: "delete", label: "Delete", icon: Trash2, danger: true },
];

export default function CommonTable({
  title,
  tabs = [],
  columns = [],
  data = [],
  onViewAll,
  onTabChange,
  selectable = true,
  sortable = true,
  sortKey,
  sortDirection,
  onSort,
  rowActions = true,
  onEdit,
  onDelete,
  onMore,
  bulkActions = DEFAULT_BULK_ACTIONS,
  onBulkAction,
  pagination,
  emptyMessage = "No records found",
}) {
  const [selected, setSelected] = useState(() => new Set());
  const [internalSort, setInternalSort] = useState({
    key: null,
    direction: null,
  });

  const activeSortKey = sortKey ?? internalSort.key;
  const activeSortDirection = sortDirection ?? internalSort.direction;

  const rowIds = useMemo(
    () => data.map((row, index) => getRowId(row, index)),
    [data]
  );

  const allSelected =
    rowIds.length > 0 && rowIds.every((id) => selected.has(id));
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
      return;
    }
    setSelected(new Set(rowIds));
  };

  const toggleRow = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearSelection = () => setSelected(new Set());

  const handleSort = (key) => {
    if (!sortable) return;

    const nextDirection =
      activeSortKey === key && activeSortDirection === "asc" ? "desc" : "asc";

    if (onSort) {
      onSort(key, nextDirection);
      return;
    }

    setInternalSort({ key, direction: nextDirection });
  };

  const sortedData = useMemo(() => {
    if (onSort || !activeSortKey || !activeSortDirection) return data;

    return [...data].sort((a, b) => {
      const av = a[activeSortKey];
      const bv = b[activeSortKey];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;

      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv), undefined, {
              numeric: true,
              sensitivity: "base",
            });

      return activeSortDirection === "asc" ? cmp : -cmp;
    });
  }, [data, activeSortKey, activeSortDirection, onSort]);

  const selectedCount = selected.size;
  const showActions = Boolean(rowActions);

  const page = pagination?.page ?? 1;
  const totalPages = pagination?.totalPages ?? 1;
  const totalEntries = pagination?.total ?? data.length;
  const pageSize = pagination?.pageSize ?? (data.length || 1);
  const from = totalEntries === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalEntries);
  const pageItems = buildPageItems(page, Math.max(totalPages, 1));

  const renderCell = (column, row) => {
    if (column.render) return column.render(row);

    const value = row[column.key];

    if (column.type === "status" || column.key === "status") {
      return <StatusBadge>{value}</StatusBadge>;
    }

    if (column.type === "avatar" || column.key === "customerName") {
      const name = column.nameKey ? row[column.nameKey] : value;
      const avatar = column.avatarKey ? row[column.avatarKey] : row.avatar;
      const initials = String(name || "?")
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

      return (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">
            {avatar ? (
              <img src={avatar} alt="" className="h-full w-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <span className="font-medium text-slate-800">{name}</span>
        </div>
      );
    }

    return value;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Tabs + optional title / view all */}
      <div className="border-b border-slate-200">
        {(title || onViewAll) && (
          <div className="flex items-center justify-between gap-4 px-5 pt-4 sm:px-6">
            {title ? (
              <h2 className="text-base font-semibold text-slate-900">{title}</h2>
            ) : (
              <span />
            )}
            {onViewAll && (
              <button
                type="button"
                onClick={onViewAll}
                className="text-sm font-medium text-[#1aa3ff] transition hover:text-[#0f93eb]"
              >
                View all →
              </button>
            )}
          </div>
        )}

        {tabs.length > 0 && (
          <div
            className={`flex items-center gap-6 overflow-x-auto px-5 sm:px-6 ${
              title || onViewAll ? "pt-3" : "pt-1"
            }`}
          >
            {tabs.map((tab) => {
              const active = Boolean(tab.active);
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => onTabChange?.(tab)}
                  className={`relative shrink-0 pb-3 text-sm transition ${
                    active
                      ? "font-semibold text-slate-900"
                      : "font-medium text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {tab.label}
                    {tab.count != null && (
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                          active
                            ? "bg-slate-100 text-slate-600"
                            : "bg-slate-50 text-slate-400"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </span>
                  {active && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#1aa3ff]" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              {selectable && (
                <th className="w-12 px-5 py-3.5 text-left sm:px-6">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={toggleAll}
                    ariaLabel="Select all rows"
                  />
                </th>
              )}

              {columns.map((column) => {
                const canSort = sortable && column.sortable !== false;
                const isSorted = activeSortKey === column.key;

                return (
                  <th
                    key={column.key}
                    className={`px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400 sm:px-5 ${
                      column.align === "right" ? "text-right" : ""
                    }`}
                  >
                    {canSort ? (
                      <button
                        type="button"
                        onClick={() => handleSort(column.key)}
                        className="inline-flex items-center gap-0.5 transition hover:text-slate-600"
                      >
                        {column.label}
                        <SortIcon
                          direction={isSorted ? activeSortDirection : null}
                        />
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                );
              })}

              {showActions && (
                <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400 sm:px-5">
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    columns.length + (selectable ? 1 : 0) + (showActions ? 1 : 0)
                  }
                  className="px-6 py-16 text-center text-sm text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => {
                const id = getRowId(row, index);
                const isSelected = selected.has(id);

                return (
                  <tr
                    key={id}
                    className={`border-b border-slate-100 transition last:border-b-0 ${
                      isSelected
                        ? "bg-slate-50"
                        : index % 2 === 1
                          ? "bg-slate-50/40"
                          : "bg-white"
                    } hover:bg-slate-50`}
                  >
                    {selectable && (
                      <td className="px-5 py-4 sm:px-6">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleRow(id)}
                          ariaLabel={`Select row ${id}`}
                        />
                      </td>
                    )}

                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-4 py-4 text-sm text-slate-700 sm:px-5 ${
                          column.align === "right" ? "text-right" : ""
                        } ${
                          column.key === "orderId" ||
                          column.key === "orderNumber"
                            ? "font-medium text-slate-900"
                            : ""
                        }`}
                      >
                        {renderCell(column, row)}
                      </td>
                    ))}

                    {showActions && (
                      <td className="px-4 py-4 sm:px-5">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onEdit?.(row)}
                            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                            aria-label="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDelete?.(row)}
                            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onMore?.(row)}
                            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                            aria-label="More actions"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-medium text-slate-700">
            {from}-{to}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-700">{totalEntries}</span>{" "}
          entries
        </p>

        {pagination && (
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => pagination.onPageChange?.(page - 1)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {pageItems.map((item, i) =>
              item === "…" ? (
                <span
                  key={`ellipsis-${i}`}
                  className="px-1.5 text-sm text-slate-400"
                >
                  …
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => pagination.onPageChange?.(item)}
                  className={`min-w-8 rounded-lg px-2.5 py-1.5 text-sm font-medium transition ${
                    item === page
                      ? "bg-[#1aa3ff] text-white shadow-sm"
                      : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item}
                </button>
              )
            )}

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => pagination.onPageChange?.(page + 1)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Floating bulk actions */}
      {selectable && selectedCount > 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-16 z-10 flex justify-center px-4">
          <div className="pointer-events-auto flex items-center gap-1 rounded-2xl border border-slate-200 bg-white px-2 py-2 shadow-[0_12px_40px_rgba(15,23,42,0.14)]">
            <span className="px-3 text-sm font-semibold text-slate-800">
              {selectedCount} Selected
            </span>

            <span className="mx-1 h-5 w-px bg-slate-200" />

            {bulkActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.key || action.label}
                  type="button"
                  onClick={() =>
                    onBulkAction?.(
                      action.key || action.label,
                      Array.from(selected)
                    )
                  }
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium transition ${
                    action.danger
                      ? "text-rose-500 hover:bg-rose-50"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {action.label}
                </button>
              );
            })}

            <button
              type="button"
              onClick={clearSelection}
              className="ml-1 rounded-xl p-1.5 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
              aria-label="Clear selection"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
