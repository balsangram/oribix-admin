import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  CheckCircle2,
  Clock,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Settings,
  Shield,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import { getAdminProfile, updateAdminProfile } from "../../api/admin";
import { toast } from "../../components/basicComponents/TostMessage";
import {
  initialsFromName,
  roleLabel,
  useAdminProfile,
} from "../../context/AdminProfileContext";

const EMPTY_FORM = {
  fullName: "",
  email: "",
  mobile: "",
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Profile() {
  const navigate = useNavigate();
  const { setProfile: setSharedProfile } = useAdminProfile();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await getAdminProfile();
      const data = res?.data?.data || null;
      setProfile(data);
      if (data) setSharedProfile(data);
      setForm({
        fullName: data?.fullName || "",
        email: data?.email || "",
        mobile: data?.mobile || "",
      });
    } catch (err) {
      toast.error(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setForm({
      fullName: profile?.fullName || "",
      email: profile?.email || "",
      mobile: profile?.mobile || "",
    });
    setEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }
    if (!form.email.trim()) {
      toast.error("Work email is required");
      return;
    }

    try {
      setSaving(true);
      const res = await updateAdminProfile({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
      });
      const data = res?.data?.data || null;
      setProfile(data);
      if (data) setSharedProfile(data);
      setForm({
        fullName: data?.fullName || "",
        email: data?.email || "",
        mobile: data?.mobile || "",
      });
      setEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-slate-50 p-6">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-7 w-7 animate-spin text-[#1aa3ff]" />
          <p className="text-sm text-slate-500">Loading your profile…</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-full items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <UserRound className="h-6 w-6" />
          </div>
          <p className="text-base font-semibold text-slate-900">
            Could not load profile
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Check your connection and try again.
          </p>
          <button
            type="button"
            onClick={loadProfile}
            className="mt-5 rounded-xl bg-[#0b1220] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const displayName = profile.fullName || "Admin";
  const displayRole = roleLabel(profile.role);
  const isActive = Boolean(profile.isActive);
  const isVerified = Boolean(profile.isVerified);

  const stats = [
    {
      label: "Role",
      value: displayRole,
      icon: Shield,
      tone: "text-[#1aa3ff] bg-[#1aa3ff]/10",
    },
    {
      label: "Status",
      value: isActive ? "Active" : "Inactive",
      icon: isActive ? CheckCircle2 : XCircle,
      tone: isActive
        ? "text-emerald-600 bg-emerald-50"
        : "text-rose-500 bg-rose-50",
    },
    {
      label: "Verified",
      value: isVerified ? "Yes" : "No",
      icon: isVerified ? BadgeCheck : ShieldCheck,
      tone: isVerified
        ? "text-sky-600 bg-sky-50"
        : "text-slate-500 bg-slate-100",
    },
    {
      label: "Last login",
      value: profile.lastLogin
        ? new Date(profile.lastLogin).toLocaleString()
        : "—",
      icon: Clock,
      tone: "text-slate-600 bg-slate-100",
    },
  ];

  return (
    <div className="min-h-full bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Hero */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-[#0b1220] shadow-sm"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 10% 20%, rgba(26,163,255,0.28), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(26,163,255,0.12), transparent 50%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="relative shrink-0">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/10 text-xl font-bold text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-2 ring-[#1aa3ff]/40 sm:h-24 sm:w-24 sm:text-2xl">
                  {profile.photo ? (
                    <img
                      src={profile.photo}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initialsFromName(displayName)
                  )}
                </div>
                {isActive && (
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#0b1220] bg-emerald-400" />
                )}
              </div>

              <div className="min-w-0 pt-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-sky-200">
                    <Shield className="h-3 w-3" />
                    {displayRole}
                  </span>
                  {isVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                      <BadgeCheck className="h-3 w-3" />
                      Verified
                    </span>
                  )}
                </div>
                <h1 className="truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {displayName}
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  {profile.role === "ADMIN"
                    ? "Head of Operations · ORIBRIX"
                    : "ORIBRIX Admin Console"}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-slate-400">
                  {profile.email && (
                    <span className="inline-flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-[#1aa3ff]" />
                      {profile.email}
                    </span>
                  )}
                  {profile.mobile && (
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-[#1aa3ff]" />
                      {profile.mobile}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#1aa3ff]" />
                    ORIBRIX HQ, Mumbai
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {!editing && (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#0b1220] shadow-sm transition hover:bg-slate-100"
                >
                  <Pencil className="h-4 w-4" />
                  Edit profile
                </button>
              )}
              <button
                type="button"
                onClick={() => navigate("/settings")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1aa3ff] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(26,163,255,0.35)] transition hover:bg-[#0f93eb]"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </motion.section>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={i + 1}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      {stat.label}
                    </div>
                    <div className="mt-1.5 truncate text-sm font-bold text-slate-900">
                      {stat.value}
                    </div>
                  </div>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${stat.tone}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Details form */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b1220] text-white">
                <UserRound className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Account details
                </h2>
                <p className="text-xs text-slate-500">
                  {editing
                    ? "Update your name, email, or phone, then save."
                    : "Personal information linked to your admin account."}
                </p>
              </div>
            </div>
            {editing && (
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-200/80">
                Editing
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="p-5 sm:p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Full name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter full name"
                icon={UserRound}
              />
              <Field
                label="Designation"
                value={displayRole}
                disabled
                readOnly
                icon={Shield}
              />
              <Field
                label="Work email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter work email"
                icon={Mail}
              />
              <Field
                label="Phone"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter phone number"
                icon={Phone}
              />
            </div>

            {Array.isArray(profile.permissions) &&
              profile.permissions.length > 0 && (
                <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Permissions
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profile.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-medium text-slate-600 shadow-sm"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {editing && (
              <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0b1220] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save changes"
                  )}
                </button>
              </div>
            )}
          </form>
        </motion.section>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  disabled,
  readOnly,
  placeholder,
  type = "text",
  icon: Icon,
}) {
  const locked = disabled || readOnly;

  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
              locked ? "text-slate-300" : "text-slate-400"
            }`}
          />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition ${
            Icon ? "pl-10" : ""
          } ${
            locked
              ? "cursor-default border-slate-200 bg-slate-50 text-slate-700"
              : "border-slate-200 bg-white text-slate-900 focus:border-[#1aa3ff]/50 focus:ring-2 focus:ring-[#1aa3ff]/15"
          }`}
        />
      </div>
    </div>
  );
}

export default Profile;
