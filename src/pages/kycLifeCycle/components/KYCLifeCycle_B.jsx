import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Search } from "lucide-react";
import apiClient from "../../../api/axios";

function KYCLifeCycle_B() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchVendorApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiClient.get("/api/admin/v1/vendors-applay", {
          params: {
            page,
            limit: pagination.limit,
            search: search.trim() || undefined,
          },
          signal: controller.signal,
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
          setError(err.message || "Failed to fetch vendor applications");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVendorApplications();

    return () => controller.abort();
  }, [page, search, pagination.limit]);

  const filteredVendors = useMemo(
    () =>
      vendors.filter((vendor) => {
        const status = String(vendor.status || "").toLowerCase();
        return status !== "accepted" && status !== "approved";
      }),
    [vendors]
  );

  const statusClass = (status = "") => {
    const value = status.toUpperCase();
    if (value === "PENDING_VERIFICATION") {
      return "bg-amber-50 text-amber-700 border-amber-200";
    }
    if (value === "REJECTED") {
      return "bg-red-50 text-red-700 border-red-200";
    }
    if (value === "SUSPENDED") {
      return "bg-slate-100 text-slate-700 border-slate-200";
    }
    return "bg-blue-50 text-blue-700 border-blue-200";
  };

  const formatDate = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="px-6 pb-6">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Vendor applications
            </h2>
            <p className="text-sm text-slate-500">
              Display all vendor KYC applications except accepted vendors.
            </p>
          </div>

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
              placeholder="Search vendor, email, mobile, GSTIN..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100"
            />
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
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Vendor
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Business
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  GSTIN
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Applied
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                <tr>
                  <td className="px-4 py-8 text-center text-sm text-slate-500" colSpan={6}>
                    Loading vendor applications...
                  </td>
                </tr>
              ) : filteredVendors.length ? (
                filteredVendors.map((vendor) => (
                  <tr key={vendor.vendorId} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <p className="font-medium text-slate-900">{vendor.name || "-"}</p>
                      <p className="text-xs text-slate-500">
                        {vendor.email || "-"} · {vendor.mobile || "-"}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-slate-800">
                        {vendor.businessName || vendor.tradeName || "-"}
                      </p>
                      <p className="text-xs text-slate-500">{vendor.tradeName || "-"}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {vendor.gstin || "-"}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(
                          vendor.status
                        )}`}
                      >
                        {vendor.status || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {formatDate(vendor.createdAt)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/kyc-full-details/${vendor.vendorId}`)
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-8 text-center text-sm text-slate-500" colSpan={6}>
                    No pending vendor applications found.
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
    </div>
  );
}

export default KYCLifeCycle_B;
