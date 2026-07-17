import React from "react";
import { Check, FileText, RefreshCcw, StickyNote, Undo2, X } from "lucide-react";

function TimelineRow({ step, isLast }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full ${
            step.done ? "bg-green-500 text-white" : "border-2 border-slate-200 bg-white"
          }`}
        >
          {step.done ? <Check size={12} strokeWidth={3} /> : null}
        </span>
        {!isLast && (
          <span
            className={`mt-1 w-px flex-1 ${step.done ? "bg-green-200" : "bg-slate-200"}`}
          />
        )}
      </div>
      <div className="flex flex-1 items-center justify-between pb-4">
        <span
          className={`text-sm ${step.done ? "font-medium text-slate-800" : "text-slate-400"}`}
        >
          {step.label}
        </span>
        <span className="text-xs text-slate-400">{step.time}</span>
      </div>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-800">{value || "—"}</p>
    </div>
  );
}

function OrderDetailDrawer({ order, onClose }) {
  const open = Boolean(order);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-900/30 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {order && (
          <>
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 className="text-lg font-bold text-slate-900">{order.id}</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start justify-between">
                  <p className="text-base font-semibold text-slate-900">
                    {order.customer}
                  </p>
                  <p className="text-lg font-bold text-slate-900">{order.amount}</p>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    {order.gstin} · {order.pay === "Credit" ? "Credit" : "Prepaid"}
                  </p>
                  <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                    {order.pay}
                  </span>
                </div>
              </div>

              <section className="mt-6">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Timeline
                </h3>
                <div>
                  {order.timeline.map((step, index) => (
                    <TimelineRow
                      key={step.label}
                      step={step}
                      isLast={index === order.timeline.length - 1}
                    />
                  ))}
                </div>
              </section>

              <section className="mt-4">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Fulfilment
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <InfoBox label="Vendor" value={order.vendor} />
                  <InfoBox label="Warehouse" value={order.warehouse} />
                  <InfoBox label="Driver" value={order.driver} />
                  <InfoBox label="Vehicle" value={order.vehicle} />
                </div>
              </section>
            </div>

            <div className="border-t border-gray-100 px-5 py-4">
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2.5 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  <RefreshCcw size={14} />
                  Reassign
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Undo2 size={14} />
                  Refund
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <FileText size={14} />
                  Invoice
                </button>
              </div>
              <button
                type="button"
                className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <StickyNote size={14} />
                Add note
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default OrderDetailDrawer;
