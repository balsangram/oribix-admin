import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowUpRight, Activity, Users, Truck, Box, ArrowRight, Check, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Login.css';
import logo1 from '../assets/logo1_cropped.png';

/* ── Inline Toast Component ─────────────────────────── */
function Toast({ message, onDone }) {
    useEffect(() => {
        const t = setTimeout(onDone, 2800);
        return () => clearTimeout(t);
    }, [onDone]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0b1220]/95 backdrop-blur-md border border-slate-700/60 shadow-2xl overflow-hidden"
        >
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </span>
            <span className="text-[13px] font-semibold text-white tracking-tight">{message}</span>
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-emerald-500/70 rounded-b-2xl"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 2.8, ease: 'linear' }}
            />
        </motion.div>
    );
}
/* ─────────────────────────────────────────────────────── */

export default function Login() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [toast, setToast] = useState(null);

    const showToast = (msg) => setToast(msg);

    const handleContinue = (e) => {
        e.preventDefault();
        showToast('OTP Sent');
        setStep(2);
    };

    const handleVerify = (e) => {
        e.preventDefault();
        showToast('OTP Verified');
        setTimeout(() => navigate('/admin/console'), 1200);
    };

    return (
        <>
            {/* Toast Notification */}
            <AnimatePresence>
                {toast && <Toast key={toast} message={toast} onDone={() => setToast(null)} />}
            </AnimatePresence>

            <div className="flex bg-[#e2e8f0] h-screen w-screen overflow-hidden py-2 sm:py-3 lg:py-5 px-3 sm:px-5 lg:px-8 font-sans items-center justify-center box-border">
                {/* Main Container */}
                <div className="flex w-full h-full max-w-[1300px] bg-white rounded-[2rem] overflow-hidden shadow-2xl relative">

                    {/* LEFT PANEL - BRANDING */}
                    <div className="hidden lg:flex lg:w-1/2 bg-[#090d16] text-white flex-col relative overflow-hidden rounded-l-[2rem] login-glow px-8 lg:px-12 py-5 lg:py-6">
                        <div className="absolute inset-0 from-blue-900/10 via-transparent to-transparent pointer-events-none login-radial-overlay"></div>

                        <div className="relative z-10 flex flex-col h-full w-full max-w-[500px] justify-between">
                            {/* Header */}
                            <div className="flex justify-between items-center w-full pt-1">
                                <div className="flex items-center">
                                    <img src={logo1} alt="OriBrix Logo" className="h-9 lg:h-9 w-auto object-contain" />
                                </div>
                                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800/40 border border-slate-700/50 text-[10px] font-medium text-slate-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                                    All systems operational
                                </div>
                            </div>

                            {/* Center Content */}
                            <div className="flex flex-col justify-center w-full my-auto mt-2">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 text-[9px] font-bold tracking-widest uppercase w-fit mb-3">
                                    <Shield className="w-3 h-3 text-blue-400" /> ADMIN CONSOLE · V3
                                </div>

                                <h1 className="text-[30px] xl:text-[34px] font-bold tracking-tight leading-[1.05] mb-2 text-white">
                                    Mission control for <br />
                                    the <span className="text-[#38bdf8]">ORIBRIX</span> <br />
                                    <span className="text-[#38bdf8]">network.</span>
                                </h1>

                                <p className="text-slate-400 text-[13px] xl:text-[14px] leading-relaxed mb-4 max-w-[460px]">
                                    Orders, KYC, pricing, logistics and settlements — orchestrated from one premium operator console.
                                </p>

                                {/* Stat Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                    className="bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-[1.25rem] p-3.5 shadow-2xl relative overflow-hidden shrink-0 max-w-[440px]"
                                >
                                    <div className="flex justify-between items-start mb-2 z-10 relative">
                                        <div>
                                            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                                <Activity className="w-3.5 h-3.5 text-blue-400" /> LIVE · IN FLIGHT
                                            </div>
                                            <div className="text-[24px] font-bold text-white tracking-tight leading-none mb-1">
                                                1,224 orders
                                            </div>
                                            <div className="text-emerald-400 text-[10px] font-medium flex items-center gap-1.5 mt-1">
                                                <ArrowUpRight className="w-3.5 h-3.5" /> 98.4% SLA - 14 zones
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                                            <Activity className="w-4 h-4 text-blue-400" />
                                        </div>
                                    </div>

                                    {/* Graph Decoration */}
                                    <div className="relative h-8 w-full mb-2.5 z-10">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 1, delay: 0.8 }}
                                            className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent z-0"
                                        />
                                        <svg className="w-full h-full text-blue-500 drop-shadow-sm relative z-10" viewBox="0 0 200 40" preserveAspectRatio="none">
                                            <motion.polyline
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                points="200,2 160,16 120,12 80,26 40,30 0,38"
                                                initial={{ pathLength: 0, pathOffset: 1, opacity: 0 }}
                                                animate={{ pathLength: 1, pathOffset: 0, opacity: 1 }}
                                                transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                                            />
                                        </svg>
                                    </div>

                                    {/* Grid Footers */}
                                    <div className="grid grid-cols-3 gap-3 border-t border-slate-800 pt-2.5 z-10 relative">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1.5 text-slate-200 text-[12.5px] font-bold">
                                                <Users className="w-3.5 h-3.5 text-slate-500" /> 204
                                            </div>
                                            <div className="text-[9px] text-slate-500 uppercase mt-0.5 font-bold tracking-wider">VENDORS</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1.5 text-slate-200 text-[12.5px] font-bold">
                                                <Truck className="w-3.5 h-3.5 text-slate-500" /> 382
                                            </div>
                                            <div className="text-[9px] text-slate-500 uppercase mt-0.5 font-bold tracking-wider">FLEET</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-1.5 text-slate-200 text-[12.5px] font-bold">
                                                <Box className="w-3.5 h-3.5 text-slate-500" /> 18k
                                            </div>
                                            <div className="text-[9px] text-slate-500 uppercase mt-0.5 font-bold tracking-wider">SKUS</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between items-center text-[10px] font-medium text-slate-500 w-full mt-2 shrink-0 pb-1">
                                <div className="flex gap-2">
                                    <span className="px-2.5 py-0.5 border border-slate-800 rounded-full bg-slate-900/50">DPDP Act 2023</span>
                                    <span className="px-2.5 py-0.5 border border-slate-800 rounded-full bg-slate-900/50">PCI-DSS</span>
                                    <span className="px-2.5 py-0.5 border border-slate-800 rounded-full bg-slate-900/50">Audit logged</span>
                                </div>
                                <div className="tracking-wide">© 2026 ORIBRIX</div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL - LOGIN CONSOLE */}
                    <div className="flex-1 flex flex-col px-6 lg:px-10 py-5 lg:py-6 relative w-full lg:w-1/2 bg-white rounded-r-[2rem]">
                        <div className="flex flex-col h-full w-full max-w-[400px] mx-auto justify-center">

                            {/* Step Indicator */}
                            <div className="flex items-center justify-between relative w-[90%] mx-auto shrink-0 mb-4 mt-2">
                                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-100 -z-10 -translate-y-1/2"></div>

                                {/* Step 1 */}
                                <div className="flex items-center gap-1.5 bg-white px-2">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step > 1 ? 'bg-[#0b1220] text-white' : step === 1 ? 'bg-[#0b1220] text-white shadow-[0_0_0_2px_#fff,0_0_0_4px_#f1f5f9]' : 'bg-slate-100 text-slate-400'}`}>
                                        {step > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
                                    </div>
                                    <span className={`text-[11px] sm:text-[12px] font-bold ml-1 ${step === 1 ? 'text-[#0b1220]' : 'text-slate-400'}`}>Sign in</span>
                                </div>

                                {/* Step 2 */}
                                <div className="flex items-center gap-1.5 bg-white px-2">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 2 ? 'bg-[#0b1220] text-white shadow-[0_0_0_2px_#fff,0_0_0_4px_#f1f5f9]' : 'bg-slate-100 text-slate-400'}`}>
                                        2
                                    </div>
                                    <span className={`text-[11px] sm:text-[12px] font-semibold ml-1 ${step === 2 ? 'text-[#0b1220] font-bold' : 'text-slate-400'}`}>Verify OTP</span>
                                </div>

                                {/* Step 3 */}
                                <div className="flex items-center gap-1.5 bg-white px-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[11px] font-bold">
                                        3
                                    </div>
                                    <span className="text-[11px] sm:text-[12px] font-semibold text-slate-400 ml-1">Console</span>
                                </div>
                            </div>

                            {/* Step Content with animation */}
                            <div className="flex flex-col my-auto mt-2">
                                <AnimatePresence mode="wait">
                                    {step === 1 ? (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {/* Login Title */}
                                            <div className="mb-3">
                                                <h2 className="text-[24px] lg:text-[28px] font-bold text-[#0b1220] mb-1 tracking-tight">Admin sign in</h2>
                                                <p className="text-slate-500 font-medium text-[13px]">Enter your credentials to access mission control.</p>
                                            </div>

                                            {/* Form */}
                                            <form onSubmit={handleContinue} className="space-y-2">
                                                <div className="space-y-1">
                                                    <label className="text-[12px] font-bold text-[#0b1220] block">Username</label>
                                                    <input
                                                        type="text"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        placeholder="rohan.desai"
                                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-[#0b1220] focus:ring-2 focus:ring-[#0b1220]/20 focus:border-[#0b1220] outline-none transition-all placeholder:text-slate-400 font-medium text-[13px]"
                                                        required
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="flex justify-between items-end">
                                                        <label className="text-[12px] font-bold text-[#0b1220] block">Password</label>
                                                        <a href="#" className="text-[10px] font-bold text-slate-400 hover:text-[#0b1220] uppercase transition-colors">or use SSO</a>
                                                    </div>
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="••••••••"
                                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-[#0b1220] focus:ring-2 focus:ring-[#0b1220]/20 focus:border-[#0b1220] outline-none transition-all placeholder:text-slate-300 tracking-widest font-bold text-[13px]"
                                                        required
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between pt-1 mb-1.5">
                                                    <label className="flex items-center gap-2 cursor-pointer group">
                                                        <div className="relative flex items-center justify-center">
                                                            <input type="checkbox" defaultChecked className="peer appearance-none w-[14px] h-[14px] border-2 border-slate-300 rounded focus:ring-2 focus:ring-offset-1 focus:ring-[#0b1220] checked:bg-[#0b1220] checked:border-[#0b1220] transition-colors cursor-pointer" />
                                                            <div className="absolute pointer-events-none opacity-0 peer-checked:opacity-100 text-white">
                                                                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <span className="text-[12px] font-semibold text-slate-600 group-hover:text-[#0b1220] transition-colors">Trust this device</span>
                                                    </label>
                                                    <a href="#" className="text-[12px] font-bold text-[#0b1220] hover:text-slate-600 transition-colors">
                                                        Forgot password?
                                                    </a>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="w-full mt-1.5 bg-[#0b1220] hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-[10px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] text-[13px]"
                                                >
                                                    Continue
                                                    <ArrowRight className="w-[14px] h-[14px]" />
                                                </button>
                                            </form>

                                            <div className="mt-6 text-center text-[11px] text-slate-400 font-medium shrink-0">
                                                Audit logged · Role-based access · OTP login only
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {/* OTP Title */}
                                            <div className="mb-5">
                                                <h2 className="text-[24px] lg:text-[28px] font-bold text-[#0b1220] mb-1 tracking-tight">Verify your OTP</h2>
                                                <p className="text-slate-500 font-medium text-[13px]">Enter the 6-digit code sent to your registered device.</p>
                                            </div>

                                            {/* OTP Form */}
                                            <form onSubmit={handleVerify} className="space-y-3">
                                                <div className="space-y-1.5">
                                                    <div className="flex justify-between items-end">
                                                        <label className="text-[12px] font-bold text-[#0b1220] block">6-digit OTP</label>
                                                        <span className="text-[11px] text-slate-400 font-medium">Valid for 5 min</span>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={otp}
                                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                        placeholder=""
                                                        maxLength={6}
                                                        className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-[#0b1220] focus:ring-2 focus:ring-[#0b1220]/20 focus:border-[#0b1220] outline-none transition-all font-bold text-[18px] tracking-[0.5em] text-center"
                                                        required
                                                        autoFocus
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="w-full bg-[#0b1220] hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-[10px] flex items-center justify-center gap-2 transition-all active:scale-[0.98] text-[13px]"
                                                >
                                                    Verify &amp; enter console
                                                    <ArrowRight className="w-[14px] h-[14px]" />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => setStep(1)}
                                                    className="w-full text-center text-[12px] text-slate-400 hover:text-[#0b1220] transition-colors font-medium py-1 mt-1"
                                                >
                                                    ← Use a different account
                                                </button>
                                            </form>

                                            <div className="mt-6 text-center text-[11px] text-slate-400 font-medium shrink-0">
                                                Audit logged · Role-based access · OTP login only
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Bottom Help Links */}
                            <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium w-full border-t border-slate-100 pt-3 shrink-0 mt-3 pb-1">
                                <div>Need help? <a href="mailto:ops@oribrix.in" className="text-[#0b1220] font-bold">ops@oribrix.in</a></div>
                                <a href="#" className="hover:text-[#0b1220] transition-colors flex items-center gap-1">
                                    <span>←</span> Back to suite
                                </a>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
