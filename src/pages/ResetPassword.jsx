import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Eye, EyeOff } from "lucide-react";

import { M_CARD } from "../components/basicComponents/Card";
import { H1 } from "../components/basicComponents/Heading";
import { P } from "../components/basicComponents/Paragraph";
import { BUTTON } from "../components/basicComponents/Button";
import { INPUT, LABEL } from "../components/basicComponents/Form";
import { IMG } from "../components/basicComponents/Image";
import { toast } from "../components/basicComponents/TostMessage";
import { forgotPassword, resetPassword } from "../api/auth";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier] = useState(
    () =>
      location.state?.identifier ||
      sessionStorage.getItem("resetIdentifier") ||
      ""
  );
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!identifier) {
      toast.error("Please request a reset code first.");
      navigate("/forgot-password", { replace: true });
    }
  }, [identifier, navigate]);

  const handleResendOtp = async () => {
    if (loading || !identifier) return;
    setLoading(true);
    try {
      const { data } = await forgotPassword({ identifier });
      toast.success(data?.message || "OTP resent successfully.");
    } catch (err) {
      toast.error(err.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (loading) return;

    if (!otp || otp.length !== 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await resetPassword({
        identifier,
        otp,
        newPassword,
      });
      toast.success(
        data?.message || "Password reset successfully. Please sign in."
      );
      sessionStorage.removeItem("resetIdentifier");
      setDone(true);
    } catch (err) {
      toast.error(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  if (!identifier) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#041C3C] via-[#5C6C82] to-[#F8FAFC] px-4">
      <M_CARD className="w-[480px] rounded-[30px] border border-white/10 bg-[#0B1220]/95 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.45)] p-10">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() =>
              navigate(done ? "/login" : "/forgot-password")
            }
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors outline-none focus:outline-none"
          >
            <ArrowLeft size={16} />
            {done ? "Back to sign in" : "Back"}
          </button>

          <IMG
            src="/oribrix-logo.png"
            alt="Oribrix"
            className="h-14 w-14 object-contain drop-shadow-[0_0_30px_rgba(47,155,243,0.9)]"
          />
        </div>

        {done ? (
          <div className="text-center py-4">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/20">
              <CheckCircle2 size={32} />
            </div>
            <H1 color="white" className="text-2xl font-bold tracking-tight mb-2">
              Password updated
            </H1>
            <P color="gray" className="mb-8 leading-6">
              Your password has been reset successfully. You can now sign in
              with your new credentials.
            </P>
            <BUTTON
              onClick={() => navigate("/login", { replace: true })}
              className="w-full h-12 rounded-xl font-semibold shadow-[0_0_30px_rgba(47,155,243,0.45)]"
            >
              Back to sign in
            </BUTTON>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <H1
                color="white"
                className="text-3xl font-bold tracking-tight mb-2"
              >
                Reset password
              </H1>
              <P color="gray" className="leading-6">
                Enter the 6-digit OTP sent for{" "}
                <span className="text-slate-200 font-medium">{identifier}</span>
                , then choose a new password.
              </P>
            </div>

            <div className="space-y-2 mb-5">
              <LABEL color="white">One-Time Password</LABEL>
              <INPUT
                color="white"
                type="text"
                placeholder="Enter 6-digit OTP"
                className="h-12 rounded-xl text-center tracking-[0.4em] outline-none focus:outline-none"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
              />
            </div>

            <div className="space-y-2 mb-5">
              <LABEL color="white">New password</LABEL>
              <div className="relative">
                <INPUT
                  color="white"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  className="h-12 rounded-xl pr-12 outline-none focus:outline-none"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white outline-none focus:outline-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <LABEL color="white">Confirm password</LABEL>
              <div className="relative">
                <INPUT
                  color="white"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter new password"
                  className="h-12 rounded-xl pr-12 outline-none focus:outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white outline-none focus:outline-none"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <BUTTON
              onClick={handleReset}
              className="w-full h-12 rounded-xl font-semibold shadow-[0_0_30px_rgba(47,155,243,0.45)]"
            >
              {loading ? "Resetting..." : "Reset password"}
            </BUTTON>

            <div className="mt-6 text-center">
              <button
                type="button"
                disabled={loading}
                onClick={handleResendOtp}
                className="text-sm text-slate-400 hover:text-white transition-colors outline-none focus:outline-none disabled:opacity-50"
              >
                Resend OTP
              </button>
            </div>
          </>
        )}
      </M_CARD>
    </div>
  );
}

export default ResetPassword;
