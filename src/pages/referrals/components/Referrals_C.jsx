import React, { useCallback, useEffect, useState } from "react";
import {
  Eye,
  Users,
  ShoppingBag,
  CheckCircle2,
  Clock,
  Loader2,
  Trash2,
  X,
} from "lucide-react";
import {
  getCustomerReferrals,
  getCustomerReferralDetails,
  deleteCustomer,
} from "../../../api/admin";
import { toast } from "../../../components/basicComponents/TostMessage";
import { SEARCH } from "../../../components/basicComponents/Search";

function StatBox({ icon: Icon, label, value, tone }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${tone}`}
      >
        <Icon size={18} />
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="text-xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function ReferralDetailModal({ open, loading, detail, onClose }) {
  if (!open) return null;

  const customer = detail?.customer;
  const referredUsers = detail?.referredUsers || [];
  const usedCount =
    customer?.usersUsedReferralCount ??
    detail?.pagination?.totalReferred ??
    referredUsers.length;
  const orderedCount = referredUsers.filter((r) => r.hasPlacedFirstOrder)
    .length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 size={24} className="animate-spin" />
          </div>
        ) : !customer ? (
          <p className="py-16 text-center text-sm text-slate-400">
            Could not load referral details.
          </p>
        ) : (
          <>
            <div className="pr-8">
              <h2 className="text-lg font-semibold text-slate-900">
                {customer.name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {customer.mobile || customer.email || "—"}
                {" · "}
                Referral code ·{" "}
                <span className="rounded-md bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">
                  {customer.myReferralCode || "—"}
                </span>
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <StatBox
                icon={Users}
                label="Used this referral"
                value={usedCount}
                tone="bg-sky-50 text-sky-600"
              />
              <StatBox
                icon={ShoppingBag}
                label="Already ordered"
                value={orderedCount}
                tone="bg-emerald-50 text-emerald-600"
              />
              <StatBox
                icon={CheckCircle2}
                label="Total earned"
                value={`₹${customer.referralStats?.totalEarned ?? 0}`}
                tone="bg-violet-50 text-violet-600"
              />
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-gray-100">
              <div className="max-h-[360px] overflow-y-auto">
                <table className="w-full text-left text-sm">
                  <thead className="sticky top-0 bg-gray-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Referred user</th>
                      <th className="px-4 py-3">Used referral</th>
                      <th className="px-4 py-3">Ordered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {referredUsers.length === 0 ? (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-4 py-10 text-center text-slate-400"
                        >
                          No one has used this referral yet.
                        </td>
                      </tr>
                    ) : (
                      referredUsers.map((r) => (
                        <tr key={r.customerId} className="text-slate-700">
                          <td className="px-4 py-3">
                            <p className="font-semibold text-slate-800">
                              {r.name}
                            </p>
                            <p className="text-xs text-slate-400">
                              {r.mobile || r.email || "—"}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600">
                              <CheckCircle2 size={13} /> Yes
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {r.hasPlacedFirstOrder ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                                <CheckCircle2 size={13} /> Ordered
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
                                <Clock size={13} /> Not yet
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Referrals_C() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  const loadCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCustomerReferrals({
        page,
        limit: 20,
        search: debouncedQuery || undefined,
      });
      const data = res?.data?.data;
      setCustomers(data?.customers || []);
      setPagination(data?.pagination || null);
    } catch (err) {
      toast.error(err.message || "Failed to load customer referrals");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedQuery]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const openDetail = async (customerId) => {
    setModalOpen(true);
    setDetail(null);
    setDetailLoading(true);
    try {
      const res = await getCustomerReferralDetails(customerId, {
        page: 1,
        limit: 100,
      });
      setDetail(res?.data?.data || null);
    } catch (err) {
      toast.error(err.message || "Failed to load referral details");
      setModalOpen(false);
    } finally {
      setDetailLoading(false);
    }
  };

  const closeDetail = () => {
    setModalOpen(false);
    setDetail(null);
  };

  const handleDelete = async (customer) => {
    const label = customer.name || customer.mobile || "this customer";
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
        await loadCustomers();
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete customer");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">All customers</h2>
          <p className="text-sm text-slate-500">
            View who used each customer&apos;s referral and how many have
            ordered.
          </p>
        </div>
        <div className="w-full max-w-xs">
          <SEARCH
            value={query}
            onChange={setQuery}
            placeholder="Search name, mobile or code…"
          />
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-gray-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Referral code</th>
              <th className="px-4 py-3">Referrals</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-400">
                  <Loader2 size={20} className="mx-auto animate-spin" />
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-400">
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr key={c.customerId} className="text-slate-700">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-800">{c.name}</p>
                    <p className="text-xs text-slate-400">
                      {c.mobile || c.email || "—"}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                      {c.myReferralCode || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-800">
                    {c.usersUsedReferralCount ?? 0}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openDetail(c.customerId)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                      >
                        <Eye size={14} /> View
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(c)}
                        disabled={deletingId === c.customerId}
                        title="Delete customer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                      >
                        {deletingId === c.customerId ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-500">
          <span>
            Page {pagination.page} of {pagination.totalPages} · {pagination.total}{" "}
            customers
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-gray-200 px-3 py-1.5 font-medium hover:bg-slate-50 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-gray-200 px-3 py-1.5 font-medium hover:bg-slate-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <ReferralDetailModal
        open={modalOpen}
        loading={detailLoading}
        detail={detail}
        onClose={closeDetail}
      />
    </div>
  );
}

export default Referrals_C;
