import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { changePassword } from "../../api/auth";
import { toast } from "../../components/basicComponents/TostMessage";
import { B_CARD } from "../../components/basicComponents/Card";
import { H1 } from "../../components/basicComponents/Heading";
import { P } from "../../components/basicComponents/Paragraph";

const INITIAL_FORM = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  }),
};

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: "", color: "bg-slate-200" };

  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 10) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) return { score, label: "Weak", color: "bg-rose-400" };
  if (score <= 3) return { score, label: "Fair", color: "bg-amber-400" };
  if (score <= 4) return { score, label: "Good", color: "bg-sky-500" };
  return { score, label: "Strong", color: "bg-emerald-500" };
}

function PasswordField({
  label,
  name,
  value,
  onChange,
  show,
  onToggle,
  placeholder,
  hint,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Lock size={14} />
        </span>
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-10 text-sm text-slate-800 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          tabIndex={-1}
          title={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {hint ? <p className="mt-1.5 text-[11px] text-slate-400">{hint}</p> : null}
    </div>
  );
}

function SettingView() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [show, setShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);

  const strength = useMemo(
    () => getPasswordStrength(form.newPassword),
    [form.newPassword]
  );

  const checks = useMemo(
    () => [
      {
        ok: form.newPassword.length >= 6,
        label: "At least 6 characters",
      },
      {
        ok:
          form.newPassword.length > 0 &&
          form.newPassword !== form.currentPassword,
        label: "Different from current password",
      },
      {
        ok:
          form.confirmPassword.length > 0 &&
          form.newPassword === form.confirmPassword,
        label: "Passwords match",
      },
    ],
    [form]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShow = (field) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const validate = () => {
    if (!form.currentPassword) return "Enter your current password";
    if (!form.newPassword) return "Enter a new password";
    if (form.newPassword.length < 6)
      return "New password must be at least 6 characters";
    if (form.newPassword === form.currentPassword)
      return "New password must be different from current password";
    if (form.newPassword !== form.confirmPassword)
      return "New password and confirm password do not match";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setLoading(true);
      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      toast.success("Password changed successfully");
      setForm(INITIAL_FORM);
    } catch (err) {
      toast.error(err.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <B_CARD>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0}
      >
        <H1 className="mb-1 text-xl">Settings</H1>
        <P className="mb-5 text-sm">Manage your account security.</P>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="flex items-center gap-3 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-white px-5 py-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
              <KeyRound size={18} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Change password
              </h2>
              <p className="text-xs text-slate-500">
                Update your credentials. Your current session stays signed in.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
            <PasswordField
              label="Current password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              show={show.currentPassword}
              onToggle={() => toggleShow("currentPassword")}
              placeholder="Enter current password"
            />

            <div>
              <PasswordField
                label="New password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                show={show.newPassword}
                onToggle={() => toggleShow("newPassword")}
                placeholder="Enter new password"
              />

              {form.newPassword ? (
                <div className="mt-2.5">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-500">
                      Strength
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${
                        strength.label === "Weak"
                          ? "text-rose-500"
                          : strength.label === "Fair"
                            ? "text-amber-600"
                            : strength.label === "Good"
                              ? "text-sky-600"
                              : "text-emerald-600"
                      }`}
                    >
                      {strength.label}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <span
                        key={step}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          step <= strength.score
                            ? strength.color
                            : "bg-slate-100"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <PasswordField
              label="Confirm new password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              show={show.confirmPassword}
              onToggle={() => toggleShow("confirmPassword")}
              placeholder="Re-enter new password"
            />

            <div className="mt-1 flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() => setForm(INITIAL_FORM)}
                disabled={loading}
                className="inline-flex h-9 min-w-[110px] items-center justify-center rounded-xl border border-gray-200 px-4 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-9 min-w-[140px] items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update password"
                )}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.aside
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="flex flex-col gap-4"
        >
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <ShieldCheck size={17} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Password checklist
                </h3>
                <p className="text-[11px] text-slate-500">
                  Requirements update as you type
                </p>
              </div>
            </div>

            <ul className="space-y-2.5">
              {checks.map((item) => (
                <li key={item.label} className="flex items-start gap-2.5">
                  <span
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                      item.ok
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-100 text-transparent"
                    }`}
                  >
                    <Check size={10} strokeWidth={3} />
                  </span>
                  <span
                    className={`text-xs ${
                      item.ok
                        ? "font-medium text-slate-700"
                        : "text-slate-500"
                    }`}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-900 p-5 text-white shadow-sm">
            <h3 className="text-sm font-semibold">Security tips</h3>
            <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-slate-300">
              <li>Use a unique password you don’t reuse elsewhere.</li>
              <li>Mix letters, numbers, and a special character.</li>
              <li>Avoid names, birthdays, or easy phrases.</li>
              <li>You’ll stay signed in after updating.</li>
            </ul>
          </div>
        </motion.aside>
      </div>
    </B_CARD>
  );
}

export default SettingView;
