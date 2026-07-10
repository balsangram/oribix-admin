import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { M_CARD } from "../components/basicComponents/Card";
import { H1 } from "../components/basicComponents/Heading";
import { P } from "../components/basicComponents/Paragraph";
import { BUTTON } from "../components/basicComponents/Button";
import { L } from "../components/basicComponents/Link";
import { INPUT, LABEL } from "../components/basicComponents/Form";
import { IMG } from "../components/basicComponents/Image";

function VerifyOTP() {
  const navigate = useNavigate();

  const handleVerify = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#041C3C] via-[#5C6C82] to-[#F8FAFC] px-4">
      <M_CARD className="w-[480px] rounded-[30px] border border-white/10 bg-[#0B1220]/95 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.45)] p-10">

        {/* Logo */}
        <div className="flex justify-end mb-6">
          <IMG
            src="/oribrix-logo.png"
            alt="Oribrix"
            className="h-16 w-16 object-contain drop-shadow-[0_0_30px_rgba(47,155,243,0.9)]"
          />
        </div>

        {/* Heading */}
        <H1 color="white" className="mb-2">
          Verify your OTP
        </H1>

        <P color="gray" className="mb-8">
          Enter the 6-digit code sent to your registered device.
        </P>

        {/* OTP */}
        <div className="mb-8">
          <LABEL color="white">One-Time Password</LABEL>

          <INPUT
            color="white"
            type="text"
            placeholder="Enter 6-digit OTP"
            className="h-12 rounded-xl text-center tracking-[0.4em]"
            maxLength={6}
          />
        </div>

        {/* Verify Button */}
        <BUTTON
          onClick={handleVerify}
          className="w-full h-12 rounded-xl font-semibold shadow-[0_0_30px_rgba(47,155,243,0.45)]"
        >
          Verify & Enter Console
        </BUTTON>

        {/* Back */}
        <div className="mt-6 flex justify-center">
          <L
            href="/login"
            target="_self"
            color="white"
            className="inline-flex items-center gap-2 hover:text-[#2F9BF3]"
          >
            <ArrowLeft size={16} />
            Use a different account
          </L>
        </div>

      </M_CARD>
    </div>
  );
}

export default VerifyOTP;