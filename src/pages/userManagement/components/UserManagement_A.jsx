import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  X,
  ShieldCheck,
  Loader2,
  Users,
} from "lucide-react";
import { SEARCH } from "../../../components/basicComponents/Search";
import { toast } from "../../../components/basicComponents/TostMessage";
import {
  getSubAdmins,
  getPermissions,
  createSubAdmin,
  updateSubAdmin,
  deleteSubAdmin,
} from "../../../api/admin";

const EMPTY_FORM = {
  fullName: "",
  email: "",
  mobile: "",
  password: "",
  permissions: [],
};

function UserManagement_A() {
  const [subAdmins, setSubAdmins] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [revealed, setRevealed] = useState({});
  const [deletingId, setDeletingId] = useState(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);
  const [showFormPassword, setShowFormPassword] = useState(false);

  const permissionGroups = useMemo(() => {
    const groups = new Map();
    permissions.forEach((perm) => {
      const group = perm.group || "GENERAL";
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(perm);
    });
    return Array.from(groups.entries());
  }, [permissions]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [listRes, permRes] = await Promise.all([
        getSubAdmins({ limit: 100 }),
        getPermissions(),
      ]);

      setSubAdmins(listRes?.data?.data?.subAdmins || []);
      setPermissions(permRes?.data?.data || []);
    } catch (err) {
      toast.error(err.message || "Failed to load sub admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return subAdmins;
    return subAdmins.filter(
      (s) =>
        s.fullName?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.mobile?.toLowerCase().includes(q)
    );
  }, [query, subAdmins]);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowFormPassword(false);
    setModalOpen(true);
  };

  const openEdit = (subAdmin) => {
    setEditingId(subAdmin.subAdminId);
    setForm({
      fullName: subAdmin.fullName || "",
      email: subAdmin.email || "",
      mobile: subAdmin.mobile || "",
      password: subAdmin.password || "",
      permissions: subAdmin.permissions || [],
    });
    setShowFormPassword(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
  };

  const togglePermission = (permissionName) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionName)
        ? prev.permissions.filter((p) => p !== permissionName)
        : [...prev.permissions, permissionName],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Full name is required";
    if (!form.email.trim()) return "Email is required";
    if (!editingId && !form.password) return "Password is required";
    if (form.password && form.password.length < 6)
      return "Password must be at least 6 characters";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    const payload = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
      permissions: form.permissions,
    };
    if (form.password) payload.password = form.password;

    try {
      setSaving(true);
      if (editingId) {
        await updateSubAdmin(editingId, payload);
        toast.success("Sub admin updated successfully");
      } else {
        await createSubAdmin(payload);
        toast.success("Sub admin created successfully");
      }
      setModalOpen(false);
      await loadData();
    } catch (err) {
      toast.error(err.message || "Failed to save sub admin");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (subAdmin) => {
    if (!window.confirm(`Delete sub admin "${subAdmin.fullName}"?`)) return;
    try {
      setDeletingId(subAdmin.subAdminId);
      await deleteSubAdmin(subAdmin.subAdminId);
      toast.success("Sub admin deleted successfully");
      await loadData();
    } catch (err) {
      toast.error(err.message || "Failed to delete sub admin");
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (subAdmin, nextActive) => {
    if (Boolean(subAdmin.isActive) === nextActive) return;
    try {
      setStatusUpdatingId(subAdmin.subAdminId);
      await updateSubAdmin(subAdmin.subAdminId, { isActive: nextActive });
      setSubAdmins((prev) =>
        prev.map((s) =>
          s.subAdminId === subAdmin.subAdminId
            ? { ...s, isActive: nextActive }
            : s
        )
      );
      toast.success(
        nextActive ? "Sub admin activated" : "Sub admin deactivated"
      );
    } catch (err) {
      toast.error(err.message || "Failed to update status");
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const toggleReveal = (id) =>
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="mt-1">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
            <Users size={16} />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Sub admins</h2>
            <p className="text-xs text-slate-500">
              Manage accounts and their permissions.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-600"
        >
          <Plus size={14} /> Add sub admin
        </button>
      </div>

      <div className="mb-3 max-w-sm">
        <SEARCH
          value={query}
          onChange={setQuery}
          placeholder="Search by name, email or mobile…"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-xs">
            <thead className="bg-gray-50 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Mobile</th>
                <th className="px-4 py-3">Permissions</th>
                <th className="px-4 py-3">Password</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                    <Loader2 size={20} className="mx-auto animate-spin" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                    No sub admins found.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.subAdminId} className="text-slate-700">
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {s.fullName}
                    </td>
                    <td className="px-4 py-3">{s.email}</td>
                    <td className="px-4 py-3">{s.mobile || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex max-w-[220px] flex-wrap gap-1">
                        {(s.permissions || []).length ? (
                          s.permissions.slice(0, 3).map((p) => (
                            <span
                              key={p}
                              className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                            >
                              {p}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400">None</span>
                        )}
                        {(s.permissions || []).length > 3 && (
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                            +{s.permissions.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="min-w-[70px] font-mono text-xs text-slate-700">
                          {revealed[s.subAdminId]
                            ? s.password || "Not available"
                            : "••••••••"}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleReveal(s.subAdminId)}
                          title={revealed[s.subAdminId] ? "Hide password" : "View password"}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                        >
                          {revealed[s.subAdminId] ? (
                            <EyeOff size={14} />
                          ) : (
                            <Eye size={14} />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        disabled={statusUpdatingId === s.subAdminId}
                        onClick={() => handleStatusChange(s, !s.isActive)}
                        title={s.isActive ? "Click to set inactive" : "Click to set active"}
                        aria-label={`Toggle status for ${s.fullName}`}
                        className={`inline-flex w-[76px] items-center justify-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors disabled:cursor-wait disabled:opacity-60 ${
                          s.isActive
                            ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {statusUpdatingId === s.subAdminId ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : null}
                        {s.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(s)}
                          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                        >
                          <Pencil size={13} /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(s)}
                          disabled={deletingId === s.subAdminId}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                          {deletingId === s.subAdminId ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <Trash2 size={13} />
                          )}
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 sm:p-8">
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-xl"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                <ShieldCheck size={18} />
              </span>
              <h2 className="text-lg font-semibold text-slate-900">
                {editingId ? "Edit sub admin" : "Add sub admin"}
              </h2>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Full name
                </span>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Mobile
                </span>
                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="+91 …"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Password{" "}
                  {editingId && (
                    <span className="font-normal text-slate-400">
                      (leave blank to keep)
                    </span>
                  )}
                </span>
                <div className="relative">
                  <input
                    name="password"
                    type={showFormPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder={editingId ? "••••••" : "Set a password"}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-3.5 pr-10 text-sm outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowFormPassword((v) => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    tabIndex={-1}
                    title={showFormPassword ? "Hide password" : "View password"}
                  >
                    {showFormPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-slate-600">Permissions</p>
                <p className="text-[11px] text-slate-400">
                  {form.permissions.length} selected · loaded from API
                </p>
              </div>

              {permissions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 px-4 py-8 text-center text-sm text-slate-400">
                  No permissions configured yet.
                </div>
              ) : (
                <div className="max-h-[320px] space-y-4 overflow-y-auto rounded-xl border border-gray-200 p-3">
                  {permissionGroups.map(([group, items]) => (
                    <div key={group}>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {group}
                      </p>
                      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                        {items.map((perm) => (
                          <label
                            key={perm.permissionId || perm.key}
                            className="flex cursor-pointer items-start gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-50"
                            title={perm.description || perm.route || ""}
                          >
                            <input
                              type="checkbox"
                              checked={form.permissions.includes(perm.name)}
                              onChange={() => togglePermission(perm.name)}
                              className="mt-0.5 h-4 w-4 accent-sky-500"
                            />
                            <span>
                              <span className="block text-sm text-slate-700">
                                {perm.name}
                              </span>
                              {perm.description ? (
                                <span className="block text-[11px] text-slate-400">
                                  {perm.description}
                                </span>
                              ) : null}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-600 disabled:opacity-60"
              >
                {saving && <Loader2 size={16} className="animate-spin" />}
                {editingId ? "Save changes" : "Create sub admin"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserManagement_A;
