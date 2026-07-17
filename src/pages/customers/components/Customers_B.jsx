import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import apiClient from "../../../api/axios";

function Customers_B() {
  const [customers, setCustomers] = useState([]);
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

    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiClient.get("/api/admin/v1/customers", {
          params: {
            page,
            limit: pagination.limit,
            search: search.trim() || undefined,
          },
          signal: controller.signal,
        });

        const data = response.data?.data || {};
        setCustomers(data.customers || []);
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
          setError(err.message || "Failed to fetch customers");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();

    return () => controller.abort();
  }, [page, search, pagination.limit]);

  const formatDate = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const initials = (name = "") =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() || "")
      .join("") || "?";

  return (
    <div className="px-6 pb-6">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              All customers
            </h2>
            <p className="text-sm text-slate-500">
              Every registered customer across the marketplace.
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
              placeholder="Search name, email, mobile, pincode..."
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
                {[
                  "Customer",
                  "Contact",
                  "Persona / Company",
                  "Pincode",
                  "Status",
                  "Joined",
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
                    colSpan={6}
                  >
                    Loading customers...
                  </td>
                </tr>
              ) : customers.length ? (
                customers.map((customer) => (
                  <tr key={customer.customerId} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {customer.photo ? (
                          <img
                            src={customer.photo}
                            alt={customer.name}
                            className="h-9 w-9 rounded-full object-cover"
                          />
                        ) : (
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                            {initials(customer.name)}
                          </span>
                        )}
                        <div>
                          <p className="font-medium text-slate-900">
                            {customer.name || "-"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {customer.email || "-"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {customer.mobile || "-"}
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-slate-800">
                        {customer.persona || "-"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {customer.companyName || "-"}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {customer.pincode || "-"}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                            customer.isActive
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-slate-200 bg-slate-100 text-slate-600"
                          }`}
                        >
                          {customer.isActive ? "Active" : "Inactive"}
                        </span>
                        {customer.isVerified ? (
                          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                            Verified
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      {formatDate(customer.createdAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-4 py-8 text-center text-sm text-slate-500"
                    colSpan={6}
                  >
                    No customers found.
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

export default Customers_B;
