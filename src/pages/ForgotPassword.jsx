import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { M_CARD } from "../components/basicComponents/Card";
import { H1 } from "../components/basicComponents/Heading";
import { P, SMALL_P } from "../components/basicComponents/Paragraph";
import { BUTTON } from "../components/basicComponents/Button";
import { L } from "../components/basicComponents/Link";
import { INPUT, LABEL } from "../components/basicComponents/Form";
import { IMG } from "../components/basicComponents/Image";
import { toast } from "../components/basicComponents/TostMessage";
import { forgotPassword } from "../api/auth";

function ForgotPassword() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (loading) return;
    if (!identifier.trim()) {
      toast.error("Please enter your email or username.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await forgotPassword({
        identifier: identifier.trim(),
      });
      toast.success(
        data?.message || "OTP sent to your registered email / mobile."
      );
      sessionStorage.setItem("resetIdentifier", identifier.trim());
      navigate("/reset-password", {
        state: { identifier: identifier.trim() },
      });
    } catch (err) {
      toast.error(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#041C3C] via-[#5C6C82] to-[#F8FAFC] px-4">
      <M_CARD className="w-[480px] rounded-[30px] border border-white/10 bg-[#0B1220]/95 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.45)] p-10">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors outline-none focus:outline-none"
          >
            <ArrowLeft size={16} />
            Back to sign in
          </button>

          <IMG
            src="/oribrix-logo.png"
            alt="Oribrix"
            className="h-14 w-14 object-contain drop-shadow-[0_0_30px_rgba(47,155,243,0.9)]"
          />
        </div>

        <div className="mb-8">
          <H1 color="white" className="text-3xl font-bold tracking-tight mb-2">
            Forgot password
          </H1>
          <P color="gray" className="leading-6">
            Enter your admin email or username. We&apos;ll send a one-time code
            to reset your password.
          </P>
        </div>

        <div className="space-y-2 mb-8">
          <LABEL color="white">Email or username</LABEL>
          <INPUT
            color="white"
            placeholder="Enter your email or username"
            className="h-12 rounded-xl outline-none focus:outline-none"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <BUTTON
          onClick={handleSendOtp}
          className="w-full h-12 rounded-xl font-semibold shadow-[0_0_30px_rgba(47,155,243,0.45)]"
        >
          {loading ? "Sending..." : "Send reset code"}
        </BUTTON>

        <div className="mt-8 text-center">
          <SMALL_P color="gray">
            Remembered it?{" "}
            <L href="/login" color="white" target="_self" className="text-sm">
              Sign in
            </L>
          </SMALL_P>
        </div>
      </M_CARD>
    </div>
  );
}

export default ForgotPassword;
