import {
  MapPin,
  Star,
  TrendingUp,
  Phone,
  MessageCircle,
  Mail,
  Power,
  Check,
  X,
} from "lucide-react";

const statusStyles = {
  Verified: "bg-[#0B1220] text-white",
  Resubmit: "bg-[#F07167] text-white",
  Pending: "bg-transparent text-gray-400 font-medium px-0",
};

/* ── 1. Header: avatar + name + location + status ── */
export function VendorCardHeader({
  avatar,
  name,
  city,
  warehouses,
  status = "Verified",
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover shrink-0 bg-gray-100"
        />
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-slate-900 truncate">
            {name}
          </h3>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
            <MapPin size={12} className="shrink-0" />
            <span className="truncate">
              {city} · {warehouses} WH
            </span>
          </p>
        </div>
      </div>

      <span
        className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
          statusStyles[status] || statusStyles.Verified
        }`}
      >
        {status}
      </span>
    </div>
  );
}

/* ── 2. Metrics bar: rating · fulfillment · orders ── */
export function VendorCardMetrics({ rating, fulfillment, orders }) {
  return (
    <div className="grid grid-cols-3 rounded-2xl bg-[#8B93A7] px-3 py-3 text-center">
      <div className="flex flex-col items-center gap-0.5">
        <div className="flex items-center gap-1">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-white">{rating}</span>
        </div>
        <span className="text-[10px] text-white/70">Rating</span>
      </div>

      <div className="flex flex-col items-center gap-0.5 border-x border-white/20">
        <span className="text-sm font-semibold text-emerald-300">
          {fulfillment}%
        </span>
        <span className="text-[10px] text-white/70">Fulfillment</span>
      </div>

      <div className="flex flex-col items-center gap-0.5">
        <span className="text-sm font-semibold text-white">{orders}</span>
        <span className="text-[10px] text-white/70">Orders 30d</span>
      </div>
    </div>
  );
}

/* ── 3. GMV row + contact icons ── */
export function VendorCardGmv({ gmv, showContacts = true }) {
  return (
    <div className="flex items-end justify-between gap-2">
      <div>
        <p className="text-[11px] text-gray-400">GMV (30d)</p>
        <p className="mt-0.5 flex items-center gap-1 text-sm font-semibold text-slate-800">
          <TrendingUp size={14} className="text-emerald-500" />
          {gmv}
        </p>
      </div>

      {showContacts && (
        <div className="flex items-center gap-2 text-gray-300">
          <button type="button" className="hover:text-gray-500 transition-colors">
            <Phone size={15} />
          </button>
          <button type="button" className="hover:text-gray-500 transition-colors">
            <MessageCircle size={15} />
          </button>
          <button type="button" className="hover:text-gray-500 transition-colors">
            <Mail size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ── 4a. Standard actions: View profile + Suspend ── */
export function VendorCardActions({
  onViewProfile = () => {},
  onSuspend = () => {},
}) {
  return (
    <div className="mt-auto flex items-center gap-3">
      <button
        type="button"
        onClick={onViewProfile}
        className="flex-1 h-10 rounded-xl bg-[#0B1220] text-white text-sm font-medium hover:bg-[#1a2336] transition-colors"
      >
        View profile
      </button>
      <button
        type="button"
        onClick={onSuspend}
        className="flex items-center gap-1.5 text-sm font-medium text-sky-400 hover:text-sky-500 transition-colors shrink-0"
      >
        <Power size={14} />
        Suspend
      </button>
    </div>
  );
}

/* ── 4b. Approval actions: Approve + Reject ── */
export function VendorCardApprovalActions({
  onApprove = () => {},
  onReject = () => {},
}) {
  return (
    <div className="mt-auto flex items-center gap-2.5">
      <button
        type="button"
        onClick={onApprove}
        className="flex-1 h-10 rounded-xl bg-emerald-500 text-white text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-emerald-600 transition-colors"
      >
        <Check size={16} strokeWidth={2.5} />
        Approve
      </button>
      <button
        type="button"
        onClick={onReject}
        className="h-10 px-4 rounded-xl bg-[#0B1220] text-white text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-[#1a2336] transition-colors shrink-0"
      >
        <X size={15} strokeWidth={2.5} />
        Reject
      </button>
    </div>
  );
}
