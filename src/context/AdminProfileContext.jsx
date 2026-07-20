import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getAdminProfile } from "../api/admin";

const AdminProfileContext = createContext(null);

function readCachedUser() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const user = JSON.parse(raw);
    return {
      fullName: user.fullName || "",
      email: user.email || "",
      mobile: user.mobile || "",
      photo: user.photo || "",
      role: user.role || "",
    };
  } catch {
    return null;
  }
}

function persistUser(profile) {
  if (!profile) return;
  try {
    const existing = readCachedUser() || {};
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...existing,
        id: profile.userId || existing.id,
        fullName: profile.fullName,
        email: profile.email,
        mobile: profile.mobile,
        photo: profile.photo,
        role: profile.role,
      })
    );
  } catch {
    // ignore storage errors
  }
}

export function initialsFromName(name = "") {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "A"
  );
}

export function roleLabel(role) {
  if (!role) return "Admin";
  if (role === "ADMIN") return "Super Admin";
  if (role === "SUB_ADMIN") return "Sub Admin";
  return role;
}

export function AdminProfileProvider({ children }) {
  const [profile, setProfileState] = useState(() => readCachedUser());
  const [loading, setLoading] = useState(true);

  const setProfile = useCallback((next) => {
    setProfileState(next);
    persistUser(next);
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const res = await getAdminProfile();
      const data = res?.data?.data || null;
      if (data) setProfile(data);
      return data;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  }, [setProfile]);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const value = useMemo(
    () => ({
      profile,
      loading,
      setProfile,
      refreshProfile,
      fullName: profile?.fullName || "Admin",
      email: profile?.email || "",
      mobile: profile?.mobile || "",
      role: profile?.role || "",
      roleText: roleLabel(profile?.role),
      initials: initialsFromName(profile?.fullName || "Admin"),
      photo: profile?.photo || "",
    }),
    [profile, loading, setProfile, refreshProfile]
  );

  return (
    <AdminProfileContext.Provider value={value}>
      {children}
    </AdminProfileContext.Provider>
  );
}

export function useAdminProfile() {
  const ctx = useContext(AdminProfileContext);
  if (!ctx) {
    throw new Error("useAdminProfile must be used within AdminProfileProvider");
  }
  return ctx;
}
