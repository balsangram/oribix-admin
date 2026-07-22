import React, { useState } from "react";
import { Sparkles, Info, CalendarRange, ShoppingBag } from "lucide-react";

const discountTypes = ["Percent off", "Flat off"];
const audiences = ["All buyers", "First-time buyers", "Returning buyers"];

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100";

function Referrals_F({ onCancel = () => {}, onCreate = () => {} }) {
  const [discountType, setDiscountType] = useState(discountTypes[0]);
  const [discountValue, setDiscountValue] = useState(5);
  const [audience, setAudience] = useState(audiences[0]);
  const [firstOrderOnly, setFirstOrderOnly] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreate = () => {
    onCreate({
      discountType,
      discountValue,
      audience,
      scope: firstOrderOnly ? "First order" : "All orders",
      startDate,
      endDate,
    });
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
          <Sparkles size={18} />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Generate promo code
          </h2>
          <p className="text-sm text-slate-500">
            Create a one-off or recurring discount, or a referral pair.
          </p>
        </div>
      </div>

      {/* Auto-generated code note (backend generates the actual code) */}
      <div className="mt-5 flex items-center gap-2 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-3.5 py-3 text-sm text-slate-500">
        <Info size={16} className="shrink-0 text-slate-400" />
        The promo code is generated automatically when you create it.
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Discount type">
          <select
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
            className={inputClass}
          >
            {discountTypes.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Field>

        <Field label={discountType === "Percent off" ? "Value (%)" : "Value (₹)"}>
          <input
            type="number"
            min={0}
            value={discountValue}
            onChange={(e) => setDiscountValue(Number(e.target.value))}
            className={inputClass}
          />
        </Field>

        <Field label="Audience">
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className={inputClass}
          >
            {audiences.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Scope */}
      <div className="mt-6">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">
          Scope
        </p>

        {/* First order only */}
        <button
          type="button"
          onClick={() => setFirstOrderOnly((v) => !v)}
          className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
            firstOrderOnly
              ? "border-sky-300 bg-sky-50"
              : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <span className="flex items-center gap-2.5">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                firstOrderOnly ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              <ShoppingBag size={17} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-slate-800">
                First order only
              </span>
              <span className="block text-xs text-slate-500">
                Redeemable on the buyer's first order.
              </span>
            </span>
          </span>
          <span
            className={`relative h-6 w-11 rounded-full transition-colors ${
              firstOrderOnly ? "bg-sky-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                firstOrderOnly ? "left-[22px]" : "left-0.5"
              }`}
            />
          </span>
        </button>

        {/* Specific date range */}
        <div className="mt-3 rounded-xl border border-gray-200 p-3.5">
          <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <CalendarRange size={16} className="text-slate-500" />
            Specific date range
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="From">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="To">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-600"
        >
          <Sparkles size={16} /> Generate code
        </button>
      </div>
    </div>
  );
}

export default Referrals_F;