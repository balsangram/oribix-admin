import React, { useEffect, useState } from "react";
import { Search, Eye, X, MapPin, Clock, Package } from "lucide-react";
import { getVendors, getVendorWarehouses } from "../../../api/admin";

const statusStyles = {
  Verified: "border-green-200 bg-green-50 text-green-700",
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  Resubmit: "border-orange-200 bg-orange-50 text-orange-700",
  Suspended: "border-red-200 bg-red-50 text-red-700",
  Rejected: "border-red-200 bg-red-50 text-red-700",
};

const initials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("") || "?";

const formatDate = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function WarehouseDrawer({ vendor, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!vendor) return;
    const controller = new AbortController();

    const fetchWarehouses = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getVendorWarehouses(vendor.vendorId);
        setData(response.data?.data || null);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(err.message || "Failed to fetch warehouses");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouses();
    return () => controller.abort();
  }, [vendor]);

  if (!vendor) return null;

  const warehouses = data?.warehouses || [];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-100 p-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Warehouses</h2>
            <p className="text-sm text-slate-500">
              {vendor.name || data?.vendorName || "Vendor"}
              {data?.businessName ? ` · ${data.businessName}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          ) : loading ? (
            <p className="py-10 text-center text-sm text-slate-500">
              Loading warehouses...
            </p>
          ) : warehouses.length ? (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-slate-500">
                {data?.total ?? warehouses.length} warehouse(s) found
              </p>
              {warehouses.map((wh) => (
                <div
                  key={wh.warehouseId}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-slate-900">
                      {wh.name || "Unnamed warehouse"}
                    </h3>
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                        wh.isActive
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-slate-200 bg-slate-100 text-slate-600"
                      }`}
                    >
                      {wh.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
                    <p className="flex items-start gap-2">
                      <MapPin size={15} className="mt-0.5 shrink-0 text-slate-400" />
                      <span>{wh.address || "-"}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Package size={15} className="shrink-0 text-slate-400" />
                      <span>Capacity: {wh.capacity || "-"}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock size={15} className="shrink-0 text-slate-400" />
                      <span>{wh.operatingHours || "-"}</span>
                    </p>
                    {wh.servicedPincodes?.length ? (
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {wh.servicedPincodes.map((pin) => (
                          <span
                            key={pin}
                            className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                          >
                            {pin}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-sm text-slate-500">
              No warehouses found for this vendor.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Vendors_B() {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchVendors = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getVendors({
          page,
          limit: pagination.limit,
          search: search.trim() || undefined,
          status: status || undefined,
        });

        const data = response.data?.data || {};
        setVendors(data.vendors || []);
        setPagination(
          data.pagination || {
            page,
            limit: pagination.limit,
            total: 0,
            totalPages: 0,
          }
        );
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(err.message || "Failed to fetch vendors");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
    return () => controller.abort();
  }, [page, search, status, pagination.limit]);

  return (
    <div className="mt-3">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">All vendors</h2>
            <p className="text-sm text-slate-500">
              Every registered vendor across the marketplace.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100"
            >
              <option value="">All statuses</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
              <option value="Rejected">Rejected</option>
            </select>

            <div className="relative w-full md:w-80">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search name, business, GSTIN..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100"
              />
            </div>
          </div>
        </div>

        {error ? (
          <div className="m-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Vendor",
                  "Business",
                  "GSTIN",
                  "Contact",
                  "Status",
                  "Joined",
                  "Warehouses",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                <tr>
                  <td
                    className="px-4 py-8 text-center text-sm text-slate-500"
                    colSpan={7}
                  >
                    Loading vendors...
                  </td>
                </tr>
              ) : vendors.length ? (
                vendors.map((vendor) => (
                  <tr key={vendor.vendorId} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                          {initials(vendor.name)}
                        </span>
                        <div>
                          <p className="font-medium text-slate-900">
                            {vendor.name || "-"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {vendor.email || "-"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-slate-800">
                        {vendor.businessName || "-"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {vendor.tradeName || "-"}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {vendor.gstin || "-"}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {vendor.mobile || "-"}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                          statusStyles[vendor.status] ||
                          "border-slate-200 bg-slate-100 text-slate-600"
                        }`}
                      >
                        {vendor.status || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {formatDate(vendor.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedVendor(vendor)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#0B1220] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#1a2336]"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-4 py-8 text-center text-sm text-slate-500"
                    colSpan={7}
                  >
                    No vendors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-3 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <span>
            Total: {pagination.total} · Page {pagination.page} of{" "}
            {pagination.totalPages || 1}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="rounded-lg border border-gray-200 px-3 py-1.5 font-medium disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>
            <button
              type="button"
              disabled={page >= (pagination.totalPages || 1) || loading}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-lg border border-gray-200 px-3 py-1.5 font-medium disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {selectedVendor ? (
        <WarehouseDrawer
          vendor={selectedVendor}
          onClose={() => setSelectedVendor(null)}
        />
      ) : null}
    </div>
  );
}

export default Vendors_B;
