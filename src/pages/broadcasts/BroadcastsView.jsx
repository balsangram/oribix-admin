import React, { useState } from "react";
import {
  Bell,
  MessageCircle,
  Mail,
  Users,
  Store,
  CalendarClock,
  Send,
  FileText,
} from "lucide-react";

const audiences = [
  { id: "customers", label: "Customers", count: "16,420", icon: Users },
  { id: "vendors", label: "Vendors", count: "204", icon: Store },
];

// SMS intentionally excluded — only Push, WhatsApp and Email are shown.
const initialChannels = [
  { id: "push", label: "Push", icon: Bell, on: false },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, on: true },
  { id: "email", label: "Email", icon: Mail, on: true },
];

function SectionLabel({ children }) {
  return (
    <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
      {children}
    </p>
  );
}

function AudienceCard({ audience, selected, onClick }) {
  const Icon = audience.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
        selected
          ? "border-sky-300 bg-sky-50 ring-2 ring-sky-100"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            selected ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-500"
          }`}
        >
          <Icon size={17} />
        </span>
        <span className="text-sm font-semibold text-slate-800">
          {audience.label}
        </span>
      </span>
      <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-bold text-white">
        {audience.count}
      </span>
    </button>
  );
}

function ChannelCard({ channel, onToggle }) {
  const Icon = channel.icon;
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex flex-1 flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
        channel.on
          ? "border-emerald-200 bg-emerald-50"
          : "border-gray-200 bg-gray-50 hover:bg-gray-100"
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
          channel.on ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
        }`}
      >
        <Icon size={17} />
      </span>
      <span className="text-sm font-semibold text-slate-800">
        {channel.label}
      </span>
      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
          channel.on
            ? "bg-emerald-500 text-white"
            : "bg-slate-200 text-slate-500"
        }`}
      >
        {channel.on ? "ON" : "OFF"}
      </span>
    </button>
  );
}

function BroadcastsView() {
  const [selectedAudience, setSelectedAudience] = useState("customers");
  const [channels, setChannels] = useState(initialChannels);
  const [title, setTitle] = useState("Monsoon offer · 12% off");
  const [body, setBody] = useState(
    "Monsoon special: 12% off on cement & steel orders > ₹25k. Use code MONSOON12. Today only."
  );

  const toggleChannel = (id) =>
    setChannels((prev) =>
      prev.map((c) => (c.id === id ? { ...c, on: !c.on } : c))
    );

  const activeChannels = channels.filter((c) => c.on).map((c) => c.label);

  return (
    <div className="min-h-full bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Notifications &amp; Comms
          </h1>
          <p className="text-sm text-slate-500">
            Targeted broadcasts across push, WhatsApp, SMS and email.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <FileText size={16} /> Templates
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
        {/* Composer */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Audience */}
          <SectionLabel>Audience</SectionLabel>
          <div className="flex flex-col gap-3 sm:flex-row">
            {audiences.map((a) => (
              <AudienceCard
                key={a.id}
                audience={a}
                selected={selectedAudience === a.id}
                onClick={() => setSelectedAudience(a.id)}
              />
            ))}
          </div>

          {/* Channels (SMS excluded) */}
          <div className="mt-6">
            <SectionLabel>Channels</SectionLabel>
            <div className="flex flex-col gap-3 sm:flex-row">
              {channels.map((c) => (
                <ChannelCard
                  key={c.id}
                  channel={c}
                  onToggle={() => toggleChannel(c.id)}
                />
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="mt-6">
            <SectionLabel>Message</SectionLabel>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm font-medium text-slate-800 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder="Write your broadcast message…"
              className="mt-3 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-sm text-slate-700 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Actions */}
          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <CalendarClock size={16} /> Schedule
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-600"
            >
              <Send size={16} /> Send now
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <SectionLabel>Preview</SectionLabel>
          <div className="rounded-2xl border border-gray-100 bg-slate-50 p-4">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-sm text-slate-700">{body}</p>
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <MessageCircle size={13} />
              WhatsApp · template 'monsoon_offer_v2'
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-3.5 text-xs text-slate-500">
            <p className="font-semibold text-slate-700">Sending via</p>
            <p className="mt-1">
              {activeChannels.length
                ? activeChannels.join(" · ")
                : "No channels selected"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BroadcastsView;
