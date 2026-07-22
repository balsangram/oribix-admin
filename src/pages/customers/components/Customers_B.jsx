import React, { useCallback, useEffect, useState } from "react";
import { Loader2, Search, Trash2 } from "lucide-react";
import apiClient from "../../../api/axios";
import { deleteCustomer } from "../../../api/admin";
import { toast } from "../../../components/basicComponents/TostMessage";

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
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const fetchCustomers = useCallback(
    async (signal) => {
      try {
        setLoading(true);
        setError("");

        const response = await apiClient.get("/api/admin/v1/customers", {
          params: {
            page,
            limit: pagination.limit,
            search: search.trim() || undefined,
          },
          signal,
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
    },
    [page, search, pagination.limit]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchCustomers(controller.signal);
    return () => controller.abort();
  }, [fetchCustomers]);

  const handleDelete = async (customer) => {
    const label = customer.name || customer.email || "this customer";
    if (!window.confirm(`Delete customer "${label}"? This cannot be undone.`)) {
      return;
    }

    try {
      setDeletingId(customer.customerId);
      await deleteCustomer(customer.customerId);
      toast.success("Customer deleted successfully");

      if (customers.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        await fetchCustomers();
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete customer");
    } finally {
      setDeletingId(null);
    }
  };

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
    <div className="mt-3">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-gray-100 p-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              All customers
            </h2>
            <p className="text-xs text-slate-500">
              Every registered customer across the marketplace.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search
              size={14}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, email, mobile, pincode..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-2.5 text-xs outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100"
            />
          </div>
        </div>

        {error ? (
          <div className="m-3 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
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
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wide text-slate-500"
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
                    className="px-3 py-6 text-center text-xs text-slate-500"
                    colSpan={7}
                  >
                    Loading customers...
                  </td>
                </tr>
              ) : customers.length ? (
                customers.map((customer) => (
                  <tr key={customer.customerId} className="hover:bg-gray-50">
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        {customer.photo ? (
                          <img
                            src={customer.photo}
                            alt={customer.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600">
                            {initials(customer.name)}
                          </span>
                        )}
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {customer.name || "-"}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {customer.email || "-"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-600">
                      {customer.mobile || "-"}
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="text-sm font-medium text-slate-800">
                        {customer.persona || "-"}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {customer.companyName || "-"}
                      </p>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-600">
                      {customer.pincode || "-"}
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-wrap items-center gap-1">
                        <span
                          className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                            customer.isActive
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-slate-200 bg-slate-100 text-slate-600"
                          }`}
                        >
                          {customer.isActive ? "Active" : "Inactive"}
                        </span>
                        {customer.isVerified ? (
                          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                            Verified
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-600">
                      {formatDate(customer.createdAt)}
                    </td>
                    <td className="px-3 py-2.5">
                      <button
                        type="button"
                        onClick={() => handleDelete(customer)}
                        disabled={deletingId === customer.customerId}
                        title="Delete customer"
                        className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                      >
                        {deletingId === customer.customerId ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <Trash2 size={12} />
                        )}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-3 py-6 text-center text-xs text-slate-500"
                    colSpan={7}
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t border-gray-100 px-3 py-2.5 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">
          <span>
            Total: {pagination.total} · Page {pagination.page} of{" "}
            {pagination.totalPages || 1}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="rounded-md border border-gray-200 px-2.5 py-1 font-medium disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>
            <button
              type="button"
              disabled={page >= (pagination.totalPages || 1) || loading}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-md border border-gray-200 px-2.5 py-1 font-medium disabled:cursor-not-allowed disabled:opacity-50"
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
