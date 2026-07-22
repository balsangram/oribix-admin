import React, { useCallback, useEffect, useState } from "react";
import {
  ImageIcon,
  Check,
  X,
  Percent,
  BadgeCheck,
  Ban,
  Loader2,
  UserCheck,
} from "lucide-react";
import { getCoupons, updateCouponStatus } from "../../../api/admin";
import { toast } from "../../../components/basicComponents/TostMessage";

const STATUS_FILTERS = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "accept", label: "Approved" },
  { id: "reject", label: "Rejected" },
];

const statusMeta = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-600" },
  accept: { label: "Approved", className: "bg-emerald-50 text-emerald-600" },
  reject: { label: "Rejected", className: "bg-red-50 text-red-600" },
  alreadyUsed: {
    label: "Already used",
    className: "bg-slate-100 text-slate-600",
  },
  expired: { label: "Expired", className: "bg-orange-50 text-orange-600" },
};

function formatRelativeTime(dateValue) {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `Uploaded ${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Uploaded ${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `Uploaded ${days}d ago`;
}

function roleLabel(role) {
  if (role === "ADMIN" || role === "SUPER_ADMIN") return "Super Admin";
  if (role === "SUB_ADMIN") return "Sub Admin";
  return role || "Admin";
}

function Referrals_D() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [drafts, setDrafts] = useState({});
  const [savingId, setSavingId] = useState(null);

  const pageSize = 6;

  const loadCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCoupons({
        page,
        limit: pageSize,
        status: statusFilter === "all" ? undefined : statusFilter,
      });
      const data = res?.data?.data;
      const list = data?.coupons || [];
      setCoupons(list);
      setPagination(data?.pagination || null);
      setDrafts(
        Object.fromEntries(
          list.map((c) => [
            c.id,
            {
              percentage: c.percentage ?? 0,
              amount: c.amount ?? 0,
            },
          ])
        )
      );
    } catch (err) {
      toast.error(err.message || "Failed to load coupons");
      setCoupons([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, page]);

  useEffect(() => {
    loadCoupons();
  }, [loadCoupons]);

  const updateDraft = (id, patch) => {
    setDrafts((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...patch },
    }));
  };

  const handleStatusChange = async (coupon, status) => {
    const draft = drafts[coupon.id] || {};
    if (status === "accept") {
      if (draft.percentage == null || draft.percentage === "") {
        toast.error("Set discount % before approving");
        return;
      }
    }

    try {
      setSavingId(coupon.id);
      const res = await updateCouponStatus(coupon.id, {
        status,
        percentage: Number(draft.percentage) || 0,
        amount: Number(draft.amount) || 0,
      });
      const updated = res?.data?.data;
      toast.success(
        status === "accept"
          ? "Coupon approved"
          : status === "reject"
            ? "Coupon rejected"
            : "Coupon updated"
      );
      if (updated) {
        setCoupons((prev) =>
          prev.map((c) => (c.id === coupon.id ? updated : c))
        );
      } else {
        await loadCoupons();
      }
    } catch (err) {
      toast.error(err.message || "Failed to update coupon");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Coupon approvals
          </h2>
          <p className="text-sm text-slate-500">
            Review coupons uploaded by users. On approval, set the discount %
            and the maximum amount to deduct.
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-1.5 sm:items-end">
          <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="min-w-[160px] rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
          >
            {STATUS_FILTERS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <Loader2 size={24} className="animate-spin" />
        </div>
      ) : coupons.length === 0 ? (
        <p className="py-16 text-center text-sm text-slate-400">
          No coupons found for this filter.
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {coupons.map((c) => {
            const meta = statusMeta[c.status] || statusMeta.pending;
            const draft = drafts[c.id] || { percentage: 0, amount: 0 };
            const isPending = c.status === "pending";
            const isSaving = savingId === c.id;

            return (
              <div
                key={c.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                <div className="relative flex h-40 items-center justify-center overflow-hidden bg-slate-100 text-slate-400">
                  {c.img ? (
                    <img
                      src={c.img}
                      alt={c.uniqueId || "Coupon"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon size={28} />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {c.user?.name || "Customer"}
                    </p>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${meta.className}`}
                    >
                      {meta.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {c.user?.mobile || c.user?.email || "—"}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {formatRelativeTime(c.createdAt)}
                    {c.uniqueId ? ` · ${c.uniqueId}` : ""}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <label className="block">
                      <span className="mb-1 block text-[11px] font-semibold text-slate-500">
                        Discount %
                      </span>
                      <div className="relative">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={draft.percentage}
                          disabled={!isPending || isSaving}
                          onChange={(e) =>
                            updateDraft(c.id, {
                              percentage: Number(e.target.value),
                            })
                          }
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-2.5 pr-7 text-sm outline-none focus:border-sky-300 focus:bg-white disabled:opacity-60"
                        />
                        <Percent
                          size={13}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                      </div>
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-[11px] font-semibold text-slate-500">
                        Up to ₹
                      </span>
                      <input
                        type="number"
                        min={0}
                        value={draft.amount}
                        disabled={!isPending || isSaving}
                        onChange={(e) =>
                          updateDraft(c.id, {
                            amount: Number(e.target.value),
                          })
                        }
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-sm outline-none focus:border-sky-300 focus:bg-white disabled:opacity-60"
                      />
                    </label>
                  </div>

                  <p className="mt-2 text-[11px] text-slate-400">
                    Gives {draft.percentage}% off, up to ₹{draft.amount}{" "}
                    deducted.
                  </p>

                  {c.reviewedBy && (
                    <div className="mt-3 flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                      <UserCheck
                        size={14}
                        className="mt-0.5 shrink-0 text-slate-500"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold text-slate-700">
                          Reviewed by {c.reviewedBy.name || "Admin"}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {roleLabel(c.reviewedBy.role)}
                          {c.reviewedAt
                            ? ` · ${new Date(c.reviewedAt).toLocaleString()}`
                            : ""}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    {isPending ? (
                      <>
                        <button
                          type="button"
                          disabled={isSaving}
                          onClick={() => handleStatusChange(c, "accept")}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                        >
                          {isSaving ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Check size={14} />
                          )}
                          Approve
                        </button>
                        <button
                          type="button"
                          disabled={isSaving}
                          onClick={() => handleStatusChange(c, "reject")}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60"
                        >
                          <X size={14} /> Reject
                        </button>
                      </>
                    ) : (
                      <div className="flex w-full items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                            c.status === "accept"
                              ? "text-emerald-600"
                              : c.status === "reject"
                                ? "text-red-600"
                                : "text-slate-600"
                          }`}
                        >
                          {c.status === "accept" ? (
                            <>
                              <BadgeCheck size={15} /> {c.percentage ?? 0}% up
                              to ₹{c.amount ?? 0}
                            </>
                          ) : c.status === "reject" ? (
                            <>
                              <Ban size={15} /> Rejected
                            </>
                          ) : (
                            meta.label
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
          <span>
            Page {pagination.page} of {pagination.totalPages} ·{" "}
            {pagination.total} coupons
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-gray-200 px-3 py-1.5 font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= pagination.totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-gray-200 px-3 py-1.5 font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Referrals_D;
