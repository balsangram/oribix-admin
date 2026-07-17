import React, { useMemo, useState } from "react";
import {
  Clock,
  MessageCircle,
  Mail,
  Smartphone,
  PhoneCall,
  UserPlus,
  Tag,
  ArrowUpDown,
  Link2,
  Send,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

export const channelMeta = {
  WhatsApp: { icon: MessageCircle, label: "WhatsApp", color: "text-emerald-600" },
  Email: { icon: Mail, label: "Email", color: "text-sky-600" },
  "App chat": { icon: Smartphone, label: "App chat", color: "text-violet-600" },
  "Call back": { icon: PhoneCall, label: "Call back", color: "text-amber-600" },
};

export const priorityTone = {
  P1: "bg-red-500 text-white",
  P2: "bg-slate-900 text-white",
  P3: "bg-slate-200 text-slate-600",
};

export const tickets = [
  {
    id: "TKT-1422",
    company: "Brigade Enterprises",
    channel: "WhatsApp",
    sla: "01:42",
    tag: "Delivery",
    priority: "P1",
    message:
      "Late delivery · HZ-88420. Please update urgently. The site engineer is waiting.",
    activity: [
      { time: "11:02", who: "Priya I.", text: "Acknowledged ticket" },
      { time: "11:05", who: "System", text: "Linked customer record · Brigade Enterprises" },
      { time: "11:08", who: "Priya I.", text: "Sent first response via WhatsApp" },
    ],
  },
  {
    id: "TKT-1419",
    company: "L&T BuildPro",
    channel: "Email",
    sla: "06:11",
    tag: "Finance",
    priority: "P2",
    message:
      "Invoice mismatch on order HZ-87990 — GST amount does not tally. Please reconcile.",
    activity: [
      { time: "10:20", who: "Rahul S.", text: "Acknowledged ticket" },
      { time: "10:24", who: "System", text: "Linked customer record · L&T BuildPro" },
    ],
  },
  {
    id: "TKT-1415",
    company: "Sharma Constructions",
    channel: "App chat",
    sla: "12:08",
    tag: "Quality",
    priority: "P2",
    message:
      "Cement grade seems off on last delivery. Requesting quality check and report.",
    activity: [{ time: "09:45", who: "Anita K.", text: "Acknowledged ticket" }],
  },
  {
    id: "TKT-1410",
    company: "Prestige Group",
    channel: "Call back",
    sla: "22:42",
    tag: "Returns",
    priority: "P3",
    message:
      "Requesting return pickup for 8 surplus bags from site 4. Please schedule.",
    activity: [{ time: "08:30", who: "System", text: "Callback requested" }],
  },
  {
    id: "TKT-1404",
    company: "Lodha Group",
    channel: "Email",
    sla: "31:00",
    tag: "Finance",
    priority: "P3",
    message:
      "Need updated ledger statement for Q2 across all active sites for audit.",
    activity: [{ time: "Yesterday", who: "System", text: "Ticket created via email" }],
  },
];

export const priorityFilters = ["All pri", "P1", "P2", "P3"];
export const channelFilters = ["All channels", "WhatsApp", "Email", "App chat", "Call back"];
const cannedResponses = ["Delay", "Damage", "Invoice", "Refund"];

export function FilterChip({ label, active, tone, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? tone || "bg-slate-900 text-white"
          : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

function TicketListItem({ ticket, active, onClick }) {
  const meta = channelMeta[ticket.channel];
  const ChannelIcon = meta.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full rounded-2xl border p-4 text-left transition-all ${
        active
          ? "border-sky-200 bg-sky-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <span
        className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold ${priorityTone[ticket.priority]}`}
      >
        {ticket.priority}
      </span>

      <p className="pr-8 text-sm font-semibold text-slate-800">
        {ticket.company}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
        <span className={`inline-flex items-center gap-1 font-medium ${meta.color}`}>
          <ChannelIcon size={13} />
          {meta.label}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock size={12} />
          {ticket.sla}
        </span>
        <span className="inline-flex items-center gap-1">
          <Tag size={12} />
          {ticket.tag}
        </span>
      </div>
    </button>
  );
}

function ActionChip({ icon: Icon, children }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
    >
      <Icon size={13} />
      {children}
    </button>
  );
}

function Support_C({
  query = "",
  priority = "All pri",
  channel = "All channels",
}) {
  const [activeId, setActiveId] = useState(tickets[0].id);
  const [reply, setReply] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tickets.filter((t) => {
      const matchQ =
        !q ||
        t.company.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.tag.toLowerCase().includes(q);
      const matchP = priority === "All pri" || t.priority === priority;
      const matchC = channel === "All channels" || t.channel === channel;
      return matchQ && matchP && matchC;
    });
  }, [query, priority, channel]);

  const active = tickets.find((t) => t.id === activeId) ?? tickets[0];
  const meta = channelMeta[active.channel];
  const ChannelIcon = meta.icon;

  return (
    <div className="bg-gray-50 px-6 pt-6">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[300px_1fr]">
        {/* Left: ticket list */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold text-slate-500">
            {filtered.length} tickets
          </p>
          {filtered.map((t) => (
            <TicketListItem
              key={t.id}
              ticket={t}
              active={t.id === activeId}
              onClick={() => setActiveId(t.id)}
            />
          ))}
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-slate-400">
              No tickets match your filters.
            </div>
          )}
        </div>

        {/* Right: conversation */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span className="font-semibold text-slate-800">{active.id}</span>
              <span className={`inline-flex items-center gap-1 font-medium ${meta.color}`}>
                <ChannelIcon size={14} />
                {meta.label}
              </span>
              <span className="inline-flex items-center gap-1">
                <Tag size={13} />
                {active.tag}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-500 px-2.5 py-1 text-xs font-semibold text-white">
                <Clock size={12} />
                {active.sla}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${priorityTone[active.priority]}`}
              >
                {active.priority}
              </span>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            From <span className="font-semibold text-slate-900">{active.company}</span>
          </p>

          {/* Actions */}
          <div className="mt-3 flex flex-wrap gap-2">
            <ActionChip icon={UserPlus}>Assign</ActionChip>
            <ActionChip icon={Tag}>Add tag</ActionChip>
            <ActionChip icon={ArrowUpDown}>Change priority</ActionChip>
            <ActionChip icon={Link2}>Link order</ActionChip>
          </div>

          {/* Message */}
          <div className="mt-4 rounded-xl bg-slate-100 p-4 text-sm text-slate-700">
            “{active.message}”
          </div>

          {/* Canned responses */}
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Canned responses
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {cannedResponses.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setReply((r) => (r ? `${r} ${c}` : `${c}: `))}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Reply */}
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={3}
            placeholder="Type a reply or pick a canned response…"
            className="mt-4 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-slate-700 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
            >
              <Send size={15} /> Send reply via WhatsApp
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Escalate to P1 <ArrowUpRight size={15} />
            </button>
            <span className="inline-flex items-center gap-1 text-xs text-slate-400">
              <CheckCircle2 size={14} className="text-emerald-500" /> Auto-saved
            </span>
          </div>

          {/* Activity */}
          <div className="mt-6 rounded-xl bg-slate-100 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Activity
            </p>
            <ul className="mt-3 space-y-2">
              {active.activity.map((a, i) => (
                <li key={i} className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-500">{a.time}</span>{" "}
                  <span className="font-semibold text-slate-800">{a.who}</span> ·{" "}
                  {a.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support_C;
