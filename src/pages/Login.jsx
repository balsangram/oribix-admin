import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { M_CARD } from "../components/basicComponents/Card";
import { H1 } from "../components/basicComponents/Heading";
import { P, SMALL_P } from "../components/basicComponents/Paragraph";
import { BUTTON } from "../components/basicComponents/Button";
import { L } from "../components/basicComponents/Link";
import { INPUT, LABEL } from "../components/basicComponents/Form";
import { IMG } from "../components/basicComponents/Image";
import { toast } from "../components/basicComponents/TostMessage";
import { login } from "../api/auth";

function Login() {
  const navigate = useNavigate();
  const [trustDevice, setTrustDevice] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;

    if (!identifier.trim() || !password) {
      toast.error("Please enter username and password.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await login({
        identifier: identifier.trim(),
        password,
      });

      if (trustDevice) {
        localStorage.setItem("trustDevice", "true");
      } else {
        localStorage.removeItem("trustDevice");
      }

      sessionStorage.setItem("loginIdentifier", identifier.trim());

      navigate("/verify-otp", {
        state: {
          identifier: identifier.trim(),
          message: data?.message || data?.data?.message,
        },
      });
    } catch (err) {
      toast.error(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#041C3C] via-[#5C6C82] to-[#F8FAFC] px-4">

      <M_CARD className="w-[480px] rounded-[30px] border border-white/10 bg-[#0B1220]/95 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.45)] p-10">

        {/* Logo */}
        <div className="flex justify-end">
          <IMG
            src="/oribrix-logo.png"
            alt="Oribrix"
            className="h-16 w-16 object-contain drop-shadow-[0_0_30px_rgba(47,155,243,0.9)]"
          />
        </div>

        {/* Heading */}
        <div className="mt-2 mb-8">
          <H1 color="white" className="text-3xl font-bold tracking-tight mb-2">
            Admin sign in
          </H1>

          <P color="gray" className="leading-6">
           Enter your credentials to access mission control.
          </P>
        </div>

        {/* Username */}
        <div className="space-y-2 mb-6">
          <LABEL color="white">Username</LABEL>

          <INPUT
            color="white"
            placeholder="Enter your username"
            className="h-12 rounded-xl"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="space-y-2 mb-3">
          <div className="flex justify-between items-center">
            <LABEL color="white">Password</LABEL>

            <SMALL_P color="gray" className="mb-0">
              or use SSO
            </SMALL_P>
          </div>

          <div className="relative">
            <INPUT
              type={showPassword ? "text" : "password"}
              color="white"
              placeholder="Enter your password"
              className="h-12 rounded-xl pr-11"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="flex justify-between items-center mb-8">

          <label className="flex items-center gap-3 cursor-pointer select-none">

            <input
              type="checkbox"
              checked={trustDevice}
              onChange={(e) => setTrustDevice(e.target.checked)}
              className="h-4 w-4 accent-[#2F9BF3]"
            />

            <span className="text-sm text-gray-300">
              Trust this device
            </span>

          </label>

          <L
            href="/forgot-password"
            color="white"
            target="_self"
            className="text-sm"
          >
            Forgot password?
          </L>

        </div>

        {/* Button */}
        <BUTTON
          onClick={handleLogin}
          className="w-full h-12 rounded-xl font-semibold shadow-[0_0_30px_rgba(47,155,243,0.45)]"
        >
          {loading ? "Please wait..." : "Continue"}
        </BUTTON>

        {/* Footer */}
        <div className="mt-8 text-center">
          <SMALL_P color="gray">
            Secure login protected by OTP verification.
          </SMALL_P>
        </div>

      </M_CARD>

    </div>
  );
}

export default Login;
