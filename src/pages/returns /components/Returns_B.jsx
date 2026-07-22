import React, { useMemo, useState } from "react";
import {
  Clock,
  Paperclip,
  Phone,
  MessageCircle,
  Send,
  Package,
  ArrowUpRight,
  ShieldOff,
  FileCheck,
} from "lucide-react";
import { SEARCH } from "../../../components/basicComponents/Search";

const disputes = [
  {
    id: "DSP-2091",
    order: "HZ-88420",
    title: "5 bags damaged on delivery — wet during unload",
    tag: "Damage",
    tagColor: "bg-slate-900 text-white",
    priority: "HIGH priority",
    status: "Vendor response",
    sla: "06:42",
    slaTone: "bg-sky-500 text-white",
    held: 24500,
    refundPct: 50,
    evidence: ["Photo 1", "Photo 2", "Photo 3"],
    pod: "POD signed by site engineer · 11:42 AM",
    timeline: [
      { time: "2h ago", text: "Raised dispute · uploaded 3 photos", active: true },
      { time: "1h ago", text: "SLA clock started · 8h to first response", active: false },
    ],
    counter: "We can refund ₹12,250 or dispatch replacement bags within 2h…",
  },
  {
    id: "DSP-2088",
    order: "HZ-88012",
    title: "Wrong grade — OPC instead of PPC delivered",
    tag: "Wrong",
    tagColor: "bg-amber-100 text-amber-700",
    priority: "MEDIUM priority",
    status: "Awaiting vendor",
    sla: "12:08",
    slaTone: "bg-slate-200 text-slate-600",
    held: 86400,
    refundPct: 40,
    evidence: ["Photo 1", "Photo 2"],
    pod: "POD signed by store manager · 09:20 AM",
    timeline: [
      { time: "5h ago", text: "Raised dispute · grade mismatch reported", active: true },
      { time: "4h ago", text: "SLA clock started · 8h to first response", active: false },
    ],
    counter: "We can refund ₹34,560 or arrange a re-delivery of PPC…",
  },
  {
    id: "DSP-2085",
    order: "HZ-87765",
    title: "Short delivery · 12 bags missing",
    tag: "Short",
    tagColor: "bg-sky-100 text-sky-700",
    priority: "MEDIUM priority",
    status: "Vendor response",
    sla: "01:14",
    slaTone: "bg-sky-500 text-white",
    held: 4620,
    refundPct: 100,
    evidence: ["Photo 1"],
    pod: "POD signed by warehouse lead · 08:05 AM",
    timeline: [
      { time: "7h ago", text: "Raised dispute · quantity mismatch", active: true },
      { time: "6h ago", text: "SLA clock started · 8h to first response", active: false },
    ],
    counter: "We can refund ₹4,620 for the 12 missing bags…",
  },
  {
    id: "DSP-2081",
    order: "HZ-87540",
    title: "Late delivery · 8h beyond SLA",
    tag: "Late",
    tagColor: "bg-emerald-100 text-emerald-700",
    priority: "LOW priority",
    status: "Resolved",
    sla: "—",
    slaTone: "bg-slate-200 text-slate-500",
    held: 12800,
    refundPct: 20,
    evidence: ["Photo 1", "Photo 2"],
    pod: "POD signed by site supervisor · 07:15 AM",
    timeline: [
      { time: "1d ago", text: "Raised dispute · delivery delayed", active: true },
      { time: "1d ago", text: "SLA clock started · 8h to first response", active: false },
    ],
    counter: "We can offer ₹2,560 goodwill credit for the delay…",
  },
];

const money = (n) => `₹${n.toLocaleString("en-IN")}`;

function TagPill({ label, className }) {
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

function DisputeListItem({ dispute, active, onClick }) {
  const progress = dispute.refundPct;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border p-3 text-left transition-all ${
        active
          ? "border-sky-200 bg-sky-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-slate-500">
          {dispute.id}
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${dispute.slaTone}`}
        >
          <Clock size={10} />
          {dispute.sla}
        </span>
      </div>

      <p className="mt-1.5 text-xs font-medium leading-snug text-slate-800">
        {dispute.title}
      </p>

      <div className="mt-2 flex items-center justify-between">
        <TagPill label={dispute.tag} className={dispute.tagColor} />
        <span className="text-xs font-semibold text-slate-900">
          {money(dispute.held)}
        </span>
      </div>

      <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </button>
  );
}

function ActionButton({ children, icon: Icon, tone = "primary", onClick }) {
  const tones = {
    primary:
      "bg-emerald-600 hover:bg-emerald-700 text-white",
    dark: "bg-slate-900 hover:bg-slate-800 text-white",
    ghost:
      "bg-white border border-gray-200 text-slate-700 hover:bg-slate-50",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${tones[tone]}`}
    >
      {Icon && <Icon size={14} />}
      {children}
    </button>
  );
}

function Returns_B() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(disputes[0].id);
  const [refundPct, setRefundPct] = useState(disputes[0].refundPct);
  const [message, setMessage] = useState(disputes[0].counter);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return disputes;
    return disputes.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.order.toLowerCase().includes(q)
    );
  }, [query]);

  const active = disputes.find((d) => d.id === activeId) ?? disputes[0];
  const refundAmount = Math.round((active.held * refundPct) / 100);

  const selectDispute = (dispute) => {
    setActiveId(dispute.id);
    setRefundPct(dispute.refundPct);
    setMessage(dispute.counter);
  };

  return (
    <div className="mt-3">
      {/* Top bar */}
      <div className="mb-3 flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-2.5 shadow-sm">
        <SEARCH
          value={query}
          onChange={setQuery}
          placeholder="Search dispute, customer or order…"
          className="flex-1"
        />
        <span className="hidden shrink-0 items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-slate-500 sm:inline-flex">
          {filtered.length} disputes
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[280px_1fr]">
        {/* Left list */}
        <div className="flex flex-col gap-2">
          {filtered.map((dispute) => (
            <DisputeListItem
              key={dispute.id}
              dispute={dispute}
              active={dispute.id === activeId}
              onClick={() => selectDispute(dispute)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-gray-200 bg-white p-4 text-center text-xs text-slate-400">
              No disputes match your search.
            </div>
          )}
        </div>

        {/* Right detail */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold tracking-wide text-slate-500">
                {active.id} · HZ-{active.order.split("-")[1] ?? active.order}
              </p>
              <h2 className="mt-1 text-sm font-semibold text-slate-900">
                {active.title}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <TagPill label={active.tag} className="bg-sky-100 text-sky-700" />
                <TagPill
                  label={active.status}
                  className="bg-slate-900 text-white"
                />
                <TagPill
                  label={`⚠ ${active.priority}`}
                  className="bg-amber-50 text-amber-600"
                />
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Held value
              </p>
              <p className="text-xl font-bold leading-none text-slate-900">
                {money(active.held)}
              </p>
              <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-amber-600">
                <Clock size={11} />
                {active.sla} to SLA
              </p>
            </div>
          </div>

          {/* Refund calculator */}
          <div className="mt-4 rounded-xl bg-slate-50 p-3.5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Refund calculator
              </p>
              <p className="text-xs font-bold text-sky-600">
                {money(refundAmount)} ({refundPct}%)
              </p>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={refundPct}
              onChange={(e) => setRefundPct(Number(e.target.value))}
              className="mt-3 w-full accent-sky-500"
            />
            <div className="mt-1.5 flex justify-between text-[10px] font-medium text-slate-400">
              <span>₹0</span>
              <span>50%</span>
              <span>Full {money(active.held)}</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Evidence */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Evidence ({active.evidence.length})
              </p>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {active.evidence.map((photo) => (
                  <div
                    key={photo}
                    className="flex aspect-square items-center justify-center rounded-lg bg-slate-100 text-[10px] font-medium text-slate-400"
                  >
                    {photo}
                  </div>
                ))}
              </div>
              <p className="mt-2 inline-flex items-center gap-1 text-[11px] text-slate-500">
                <FileCheck size={12} className="text-emerald-500" />
                {active.pod}
              </p>
            </div>

            {/* Timeline */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Timeline
              </p>
              <ol className="mt-2 space-y-2.5">
                {active.timeline.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                        item.active ? "bg-sky-500" : "bg-slate-300"
                      }`}
                    />
                    <div>
                      <p className="text-[11px] font-semibold text-slate-700">
                        · {item.time}
                      </p>
                      <p className="text-[11px] text-slate-500">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Counter-offer */}
          <div className="mt-4">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Counter-offer · message to buyer
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              className="mt-2 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-xs text-slate-700 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
            <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] font-medium text-slate-500">
              <button
                type="button"
                className="inline-flex items-center gap-1 hover:text-slate-700"
              >
                <Paperclip size={12} /> Attach POD
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 hover:text-slate-700"
              >
                <MessageCircle size={12} /> Send via WhatsApp
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 hover:text-slate-700"
              >
                <Phone size={12} /> Call
              </button>
            </div>
          </div>

          {/* Footer actions */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3">
            <div className="flex flex-wrap gap-2">
              <ActionButton icon={Send} tone="primary">
                Send counter-offer
              </ActionButton>
              <ActionButton icon={Package} tone="dark">
                Send replacement
              </ActionButton>
              <ActionButton icon={ArrowUpRight} tone="ghost">
                Escalate
              </ActionButton>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-red-500"
            >
              <ShieldOff size={14} /> Reject dispute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Returns_B;
