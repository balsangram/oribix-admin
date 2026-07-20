import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Shield,
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
      <div className="flex min-h-full items-center justify-center bg-gray-50 p-6">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-full bg-gray-50 p-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-slate-500">Could not load profile details.</p>
          <button
            type="button"
            onClick={loadProfile}
            className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const displayName = profile.fullName || "Admin";
  const displayRole = roleLabel(profile.role);

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#0b1220] text-lg font-bold text-white">
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
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{displayName}</h1>
            <p className="mt-0.5 text-sm font-medium text-slate-500">
              {displayRole}
              {profile.role === "ADMIN" ? " · Head of Operations" : ""}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-slate-500">
              {profile.email && (
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {profile.email}
                </span>
              )}
              {profile.mobile && (
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {profile.mobile}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                ORIBRIX HQ, Mumbai
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Pencil className="h-4 w-4" />
              Edit profile
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1aa3ff] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0f93eb]"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Role", value: displayRole },
          {
            label: "Status",
            value: profile.isActive ? "Active" : "Inactive",
          },
          {
            label: "Verified",
            value: profile.isVerified ? "Yes" : "No",
          },
          {
            label: "Last login",
            value: profile.lastLogin
              ? new Date(profile.lastLogin).toLocaleString()
              : "—",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              {stat.label}
            </div>
            <div className="mt-1 truncate text-sm font-bold text-slate-900">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-3">
          <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-900">
            <Shield className="h-4 w-4 text-slate-500" />
            Profile
          </div>
        </div>

        <form onSubmit={handleSave} className="p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Full name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Enter full name"
            />
            <Field
              label="Designation"
              value={displayRole}
              disabled
              readOnly
            />
            <Field
              label="Work email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Enter work email"
            />
            <Field
              label="Phone"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Enter phone number"
            />
          </div>

          {Array.isArray(profile.permissions) && profile.permissions.length > 0 && (
            <div className="mt-5">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Permissions
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[12px] font-medium text-slate-600"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          )}

          {editing && (
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
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
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition ${
          disabled || readOnly
            ? "cursor-default bg-gray-50 text-slate-700"
            : "bg-white text-slate-900 focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
        }`}
      />
    </div>
  );
}

export default Profile;
