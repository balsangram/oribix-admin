import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const TOAST_EVENT = "oribrix:toast";
const DEFAULT_DURATION = 4000;

/**
 * Imperative API — use from any page/API handler:
 *   toast.error("Invalid credentials")
 *   toast.success("OTP sent")
 *   toast.info("Please wait")
 */
export const toast = {
  show(message, type = "error", duration = DEFAULT_DURATION) {
    window.dispatchEvent(
      new CustomEvent(TOAST_EVENT, {
        detail: {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          message,
          type,
          duration,
        },
      })
    );
  },
  error(message, duration) {
    this.show(message, "error", duration);
  },
  success(message, duration) {
    this.show(message, "success", duration);
  },
  info(message, duration) {
    this.show(message, "info", duration);
  },
};

const typeStyles = {
  error: "border-red-500/40 bg-[#1A0F12] text-red-100",
  success: "border-emerald-500/40 bg-[#0F1A14] text-emerald-100",
  info: "border-[#2F9BF3]/40 bg-[#0B1220] text-slate-100",
};

const accentBar = {
  error: "bg-red-500",
  success: "bg-emerald-500",
  info: "bg-[#2F9BF3]",
};

function ToastItem({ toast: item, onClose }) {
  useEffect(() => {
    if (!item.duration) return undefined;
    const timer = setTimeout(() => onClose(item.id), item.duration);
    return () => clearTimeout(timer);
  }, [item, onClose]);

  return (
    <div
      role="alert"
      className={`
        pointer-events-auto relative flex w-[min(360px,calc(100vw-2rem))] items-start gap-3
        overflow-hidden rounded-xl border px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)]
        backdrop-blur-md animate-[toast-in_0.28s_ease-out]
        ${typeStyles[item.type] || typeStyles.info}
      `}
    >
      <span
        className={`absolute left-0 top-0 h-full w-1 ${accentBar[item.type] || accentBar.info}`}
      />
      <p className="flex-1 pl-1 text-sm leading-5">{item.message}</p>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => onClose(item.id)}
        className="shrink-0 rounded-md p-0.5 text-current/60 hover:text-current"
      >
        <X size={16} />
      </button>
    </div>
  );
}

/**
 * Mount once near the app root (e.g. in App.jsx).
 * Renders toasts in the top-right corner.
 */
function TostMessage() {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const onToast = (event) => {
      const next = event.detail;
      if (!next?.message) return;
      setToasts((prev) => [...prev, next]);
    };

    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="pointer-events-none fixed right-4 top-4 z-[9999] flex flex-col gap-3">
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      {toasts.map((item) => (
        <ToastItem key={item.id} toast={item} onClose={removeToast} />
      ))}
    </div>,
    document.body
  );
}

export default TostMessage;
