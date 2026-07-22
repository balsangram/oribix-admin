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
  Trash2,
} from "lucide-react";
import { B_CARD } from "../../components/basicComponents/Card";
import { H1 } from "../../components/basicComponents/Heading";
import { P } from "../../components/basicComponents/Paragraph";
import { toast } from "../../components/basicComponents/TostMessage";

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

const defaultTitle = "Monsoon offer · 12% off";
const defaultBody =
  "Monsoon special: 12% off on cement & steel orders > ₹25k. Use code MONSOON12. Today only.";

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
  const [title, setTitle] = useState(defaultTitle);
  const [body, setBody] = useState(defaultBody);

  const toggleChannel = (id) =>
    setChannels((prev) =>
      prev.map((c) => (c.id === id ? { ...c, on: !c.on } : c))
    );

  const activeChannels = channels.filter((c) => c.on);
  const activeChannelLabels = activeChannels.map((c) => c.label);
  const primaryPreviewChannel = activeChannels[0];
  const PreviewChannelIcon = primaryPreviewChannel?.icon;

  const handleDiscard = () => {
    if (
      !window.confirm(
        "Discard this broadcast draft? Title, message, audience and channels will reset."
      )
    ) {
      return;
    }

    setSelectedAudience("customers");
    setChannels(initialChannels.map((c) => ({ ...c })));
    setTitle(defaultTitle);
    setBody(defaultBody);
    toast.success("Broadcast draft discarded");
  };

  return (
    <B_CARD>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <H1 className="mb-1 text-xl">Notifications &amp; Comms</H1>
          <P className="mb-0 text-sm">
            Targeted broadcasts across push, WhatsApp and email.
          </P>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
        >
          <FileText size={14} /> Templates
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_320px]">
        {/* Composer */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          {/* Audience */}
          <SectionLabel>Audience</SectionLabel>
          <div className="flex flex-col gap-2 sm:flex-row">
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
          <div className="mt-4">
            <SectionLabel>Channels</SectionLabel>
            <div className="flex flex-col gap-2 sm:flex-row">
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
          <div className="mt-4">
            <SectionLabel>Message</SectionLabel>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-slate-800 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
              placeholder="Write your broadcast message…"
              className="mt-2 w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-slate-700 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
              >
                <CalendarClock size={14} /> Schedule
              </button>
              <button
                type="button"
                onClick={handleDiscard}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                <Trash2 size={14} /> Discard
              </button>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-sky-600"
            >
              <Send size={14} /> Send now
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm">
          <SectionLabel>Preview</SectionLabel>
          <div className="rounded-xl border border-gray-100 bg-slate-50 p-3">
            <div className="rounded-lg bg-white p-2.5 shadow-sm">
              {title.trim() ? (
                <p className="mb-1 text-xs font-semibold text-slate-900">
                  {title}
                </p>
              ) : null}
              <p className="text-xs text-slate-700">
                {body.trim() || "Message preview will appear here."}
              </p>
            </div>
            {primaryPreviewChannel && PreviewChannelIcon ? (
              <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
                <PreviewChannelIcon size={12} />
                {primaryPreviewChannel.label} preview
              </p>
            ) : (
              <p className="mt-2 text-[11px] font-medium text-slate-400">
                Turn on a channel to preview delivery
              </p>
            )}
          </div>

          <div className="mt-3 rounded-lg border border-gray-100 bg-gray-50 p-3 text-[11px] text-slate-500">
            <p className="font-semibold text-slate-700">Sending via</p>
            <p className="mt-1">
              {activeChannelLabels.length
                ? activeChannelLabels.join(" · ")
                : "No channels selected"}
            </p>
          </div>
        </div>
      </div>
    </B_CARD>
  );
}

export default BroadcastsView;
