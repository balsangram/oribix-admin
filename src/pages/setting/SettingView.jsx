import React, { useState } from "react";
import { Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";
import { changePassword } from "../../api/auth";
import { toast } from "../../components/basicComponents/TostMessage";

const INITIAL_FORM = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function PasswordField({ label, name, value, onChange, show, onToggle, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-3 pr-10 text-sm outline-none transition focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          tabIndex={-1}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
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
    <div className="min-h-full bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">
          Manage your account security.
        </p>
      </div>

      <div className="max-w-lg rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-gray-100 p-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
            <KeyRound size={18} />
          </span>
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Change password
            </h2>
            <p className="text-xs text-slate-500">
              Use at least 6 characters. You'll keep your current session.
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
          <PasswordField
            label="New password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            show={show.newPassword}
            onToggle={() => toggleShow("newPassword")}
            placeholder="Enter new password"
          />
          <PasswordField
            label="Confirm new password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            show={show.confirmPassword}
            onToggle={() => toggleShow("confirmPassword")}
            placeholder="Re-enter new password"
          />

          <div className="mt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setForm(INITIAL_FORM)}
              disabled={loading}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Updating...
                </>
              ) : (
                "Update password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingView;
