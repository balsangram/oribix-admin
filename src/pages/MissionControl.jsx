import React from 'react';
import { motion, animate } from 'framer-motion';
import {
    ShoppingBag, Store, Truck, Bell, Search, ChevronDown, Activity, ArrowUpRight,
    ArrowDownRight, MoreHorizontal, Send, ChevronLeft, ShieldCheck, Calendar,
    Percent, RefreshCw, Star, Users, RefreshCcw, FileText, ActivitySquare, TrendingUp, Map,
    Package, IndianRupee
} from 'lucide-react';
import userAvatar from '../assets/logo1_cropped.png';

/* ── Sparkline component ──────────────────────────────── */
function Sparkline({ points, color, fillOpacity = "0.1", className = "w-full h-full" }) {
    return (
        <svg viewBox="0 0 100 35" className={className} preserveAspectRatio="none">
            <defs>
                <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={fillOpacity} />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon points={`0,35 ${points} 100,35`} fill={`url(#grad-${color.replace('#', '')})`} />
            <polyline fill="none" stroke={color} strokeWidth="2.5" points={points} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const ORDERS = [
    { id: 'HSZ-10421', time: '10:42 AM', customer: 'Rajesh Builders', cLoc: 'Mumbai West', vendor: 'Sharma Building Mart', pay: 'UPI', amount: '₹48,200', sla: '18 min', slaColor: 'text-[#0b1220]', status: 'Out for delivery' },
    { id: 'HSZ-10422', time: '10:51 AM', customer: 'Patel Constructions', cLoc: 'Mumbai East', vendor: 'Capital Steels', pay: 'Credit', amount: '₹1,24,500', sla: '42 min', slaColor: 'text-[#0b1220]', status: 'Packed' },
    { id: 'HSZ-10423', time: '11:02 AM', customer: 'Site B-12 Andheri', cLoc: 'Mumbai West', vendor: 'Brick Bazaar', pay: 'UPI', amount: '₹18,000', sla: '95 min', slaColor: 'text-amber-500 bg-amber-50 rounded px-1.5', status: 'Picking' },
    { id: 'HSZ-10424', time: '11:10 AM', customer: 'Shah Group', cLoc: 'Mumbai West', vendor: 'Color World', pay: 'Card', amount: '₹32,800', sla: '55 min', slaColor: 'text-[#0b1220]', status: 'Accepted' },
    { id: 'HSZ-10425', time: '11:18 AM', customer: 'Kapoor Infra', cLoc: 'Mumbai East', vendor: 'Spark Electricals', pay: 'Credit', amount: '₹67,200', sla: '70 min', slaColor: 'text-rose-500 bg-rose-50 rounded px-1.5', status: 'New' },
    { id: 'HSZ-10426', time: '11:22 AM', customer: 'L&T Realty', cLoc: 'Mumbai West', vendor: 'Sharma Building Mart', pay: 'Credit', amount: '₹2,18,400', sla: '3 min to accept', slaColor: 'text-[#1aa3ff] bg-blue-50 rounded px-1.5 text-center leading-tight', status: 'New' },
    { id: 'HSZ-10427', time: '11:42 AM', customer: 'KR Realty', cLoc: 'Mumbai East', vendor: 'KR Building Mart', pay: 'Credit', amount: '₹2,05,400', sla: '10 min to accept', slaColor: 'text-[#1aa3ff] bg-blue-50 rounded px-1.5 text-center leading-tight', status: 'New' }
];

const ALERTS = [
    { icon: Activity, bg: 'bg-blue-50', iconColor: 'text-blue-500', title: 'SLA risk · HSZ-10422', desc: 'Bhiwandi WH-2 picking delay...', time: '3m ago' },
    { icon: Truck, bg: 'bg-slate-100', iconColor: 'text-slate-500', title: 'Driver off-route', desc: 'Suresh K. by 1.2km · auto re-r...', time: '5m ago' },
    { icon: ShieldCheck, bg: 'bg-slate-100', iconColor: 'text-slate-500', title: 'New vendor KYC', desc: 'Konkan Steel submitted KYC f...', time: '9m ago' },
    { icon: Activity, bg: 'bg-rose-50', iconColor: 'text-rose-500', title: 'Payment exception', desc: 'ICICI gateway 502 x3 in 4 min', time: '12m ago' },
    { icon: FileText, bg: 'bg-slate-100', iconColor: 'text-slate-500', title: 'E-Invoice IRP timeout', desc: 'HZ-88419 · auto-retry queued', time: '14m ago' },
    { icon: Truck, bg: 'bg-slate-100', iconColor: 'text-slate-500', title: 'Vehicle breakdown', desc: 'MH-04-AC-7711 · Ghatkopar ...', time: '18m ago' }
];

const MICRO_STATS = [
    { icon: Percent, label: 'TAKE-RATE', val: '18.4%', delta: '↑ 0.6%', pts: '0,30 30,28 60,15 100,5', color: '#1aa3ff' },
    { icon: RefreshCw, label: 'RTO', val: '0.4%', delta: '↓ 0.1%', pts: '0,5 30,8 60,20 100,28', color: '#0b1220' },
    { icon: TrendingUp, label: 'ON-TIME', val: '96.4%', delta: '↑ +1.2%', pts: '0,25 30,20 60,10 100,2', color: '#0b1220' },
    { icon: Star, label: 'CSAT', val: '4.7', delta: '↑ +0.1', pts: '0,25 30,22 60,12 100,5', color: '#1aa3ff' },
    { icon: Users, label: 'ACTIVE BUYERS', val: '1,284', delta: '↑ +48', pts: '0,30 30,22 60,15 100,5', color: '#0b1220' },
    { icon: RefreshCcw, label: 'REPEAT RATE', val: '58%', delta: '↑ +3%', pts: '0,30 30,25 60,18 100,5', color: '#0b1220' },
    { icon: FileText, label: 'E-INVOICES', val: '892', delta: '↑ +62', pts: '0,28 30,24 60,15 100,5', color: '#0b1220' },
    { icon: ActivitySquare, label: 'SETTLEMENTS T+2', val: '₹38L', delta: '↑ 22%', pts: '0,28 30,22 60,18 100,8', color: '#1aa3ff' }
];

export default function MissionControl() {
    const [activeTab, setActiveTab] = React.useState('All');

    const tabs = [
        { id: 'All', count: 38 },
        { id: 'New', count: 6 },
        { id: 'In progress', count: 18 },
        { id: 'Dispatched', count: 14 }
    ];

    const NumberTicker = ({ value, prefix = '', suffix = '', format = 'default' }) => {
        const nodeRef = React.useRef(null);
        React.useEffect(() => {
            const controls = animate(0, value, {
                duration: 1.2,
                ease: "easeOut",
                onUpdate: (latest) => {
                    if (nodeRef.current) {
                        if (format === 'currency') {
                            nodeRef.current.textContent = prefix + Math.floor(latest).toLocaleString('en-IN') + suffix;
                        } else {
                            nodeRef.current.textContent = prefix + Math.floor(latest) + suffix;
                        }
                    }
                }
            });
            return controls.stop;
        }, [value, prefix, suffix, format]);
        return <span ref={nodeRef}>{prefix}0{suffix}</span>;
    };

    return (
        <div className="w-full">
            <div className="flex-1 px-5 py-6 space-y-6 max-w-[1720px] mx-auto w-full">

                {/* Headline Section (Added Bottom Border here) */}
                <div className="flex items-end justify-between border-b border-slate-200/80 pb-5 mb-5">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-2 h-2 rounded-full bg-[#1aa3ff]"></div>
                            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Mission Control · Mumbai HQ · 04:21:18 PM IST</span>
                        </div>
                        <h1 className="text-[32px] font-bold text-[#0b1220] tracking-tight leading-none pt-1">Network operations</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors bg-white font-medium shadow-sm">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span className="text-[12px]">All systems nominal</span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <span className="text-[12px]">Today</span>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                    </div>
                </div>

                {/* Top KPI row - Group hover icons & tighter layout */}
                <div className="grid grid-cols-5 gap-3">
                    {/* Live Orders */}
                    <div className="group bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between h-[132px] hover:-translate-y-0.5 hover:shadow transition-all duration-300 cursor-pointer">
                        <div className="flex justify-between items-start">
                            <div className="w-9 h-9 rounded-full bg-[#1aa3ff] group-hover:bg-[#0b1220] group-hover:border-transparent border border-blue-500/20 flex items-center justify-center shrink-0 transition-colors duration-300">
                                <Package className="w-4 h-4 text-white stroke-[1.5]" />
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide text-right mt-1 leading-[1.2]">Live<br />Orders</span>
                        </div>
                        <div className="flex flex-col mt-auto w-full gap-1.5">
                            <div className="text-[24px] font-bold text-[#0b1220] leading-none tracking-tight"><NumberTicker value={284} /></div>
                            <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-slate-400 whitespace-nowrap">
                                <span className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                                    <ArrowUpRight className="w-3 h-3 stroke-[2.5]" /> 12%
                                </span>
                                vs yesterday
                            </div>
                        </div>
                    </div>

                    {/* GMV Today */}
                    <div className="group bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between h-[132px] hover:-translate-y-0.5 hover:shadow transition-all duration-300 cursor-pointer">
                        <div className="flex justify-between items-start">
                            <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 group-hover:bg-[#0b1220] group-hover:border-transparent flex items-center justify-center shrink-0 transition-colors duration-300">
                                <IndianRupee className="w-4 h-4 text-[#0b1220] stroke-[1.5] group-hover:text-white transition-colors duration-300" />
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide text-right mt-1 leading-[1.2]">GMV<br />Today</span>
                        </div>
                        <div className="flex flex-col mt-auto w-full gap-1.5">
                            <div className="text-[24px] font-bold text-[#0b1220] leading-none tracking-tight"><NumberTicker value={1248000} prefix="₹" format="currency" /></div>
                            <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-slate-400 whitespace-nowrap">
                                <span className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                                    <ArrowUpRight className="w-3 h-3 stroke-[2.5]" /> 22%
                                </span>
                                vs yesterday
                            </div>
                        </div>
                    </div>

                    {/* SLA Risk */}
                    <div className="group bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between h-[132px] hover:-translate-y-0.5 hover:shadow transition-all duration-300 cursor-pointer">
                        <div className="flex justify-between items-start">
                            <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 group-hover:bg-[#0b1220] group-hover:border-transparent flex items-center justify-center shrink-0 transition-colors duration-300">
                                <Activity className="w-4 h-4 text-[#1aa3ff] stroke-[1.5]" />
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide text-right mt-1 leading-[1.2]">SLA<br />Risk</span>
                        </div>
                        <div className="flex flex-col mt-auto w-full gap-1.5">
                            <div className="text-[24px] font-bold text-[#0b1220] leading-none tracking-tight"><NumberTicker value={14} /></div>
                            <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-slate-400 whitespace-nowrap">
                                <span className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                                    <ArrowDownRight className="w-3 h-3 stroke-[2.5]" /> 3
                                </span>
                                vs yesterday
                            </div>
                        </div>
                    </div>

                    {/* Vendors Online */}
                    <div className="group bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between h-[132px] hover:-translate-y-0.5 hover:shadow transition-all duration-300 cursor-pointer">
                        <div className="flex justify-between items-start">
                            <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 group-hover:bg-[#0b1220] group-hover:border-transparent flex items-center justify-center shrink-0 transition-colors duration-300">
                                <Store className="w-4 h-4 text-[#0b1220] stroke-[1.5] group-hover:text-white transition-colors duration-300" />
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide text-right mt-1 leading-[1.2]">Vendors<br />Online</span>
                        </div>
                        <div className="flex flex-col mt-auto w-full gap-1.5">
                            <div className="text-[24px] font-bold text-[#0b1220] leading-none tracking-tight">
                                <NumberTicker value={187} />/<NumberTicker value={204} />
                            </div>
                            <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-slate-400 whitespace-nowrap">
                                <span className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                                    <ArrowUpRight className="w-3 h-3 stroke-[2.5]" /> 4
                                </span>
                                vs yesterday
                            </div>
                        </div>
                    </div>

                    {/* Avg Delivery */}
                    <div className="group bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between h-[132px] hover:-translate-y-0.5 hover:shadow transition-all duration-300 cursor-pointer">
                        <div className="flex justify-between items-start">
                            <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 group-hover:bg-[#0b1220] group-hover:border-transparent flex items-center justify-center shrink-0 transition-colors duration-300">
                                <Truck className="w-4 h-4 text-[#0b1220] stroke-[1.5] group-hover:text-white transition-colors duration-300" />
                            </div>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide text-right mt-1 leading-[1.2]">Avg<br />Delivery</span>
                        </div>
                        <div className="flex flex-col mt-auto w-full gap-1.5">
                            <div className="text-[24px] font-bold text-[#0b1220] leading-none tracking-tight"><NumberTicker value={52} suffix=" min" /></div>
                            <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-slate-400 whitespace-nowrap">
                                <span className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                                    <ArrowDownRight className="w-3 h-3 stroke-[2.5]" /> 8 min
                                </span>
                                vs yesterday
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Mid Row */}
                <div className="grid grid-cols-12 gap-3">
                    {/* GMV Bar Chart */}
                    <div className="col-span-5 bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 flex flex-col group">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-[15px] font-semibold text-[#0b1220]">Network GMV · 7 days</div>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] border border-slate-200 text-[12px] font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                                7 Days <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                            </button>
                        </div>
                        <div className="flex items-end gap-3 mb-6 pl-1">
                            <div className="text-[34px] font-semibold text-[#0b1220] tracking-tight leading-none">₹42,00,000</div>
                            <div className="flex items-center gap-1 text-[13px] text-slate-400 mb-1">
                                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] text-[#0b1220]" />
                                <span className="font-semibold text-[#0b1220] text-[13.5px]">24.2%</span>
                                <span className="font-medium text-[12px] ml-0.5">vs last 7 days</span>
                            </div>
                        </div>

                        {/* Bar Chart Area */}
                        <div className="mt-auto relative h-[140px] w-full">
                            {/* Y-Axis and Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between pb-8 z-0">
                                {['₹8.8L', '₹7.1L', '₹5.3L', '₹3.5L', '₹1.8L', '₹0.0L'].map((label, idx) => (
                                    <div key={idx} className="flex items-center gap-3 w-full h-[1px]">
                                        <span className="text-[10px] font-medium text-slate-400 w-8 text-right shrink-0">{label}</span>
                                        <div className="flex-1 border-b border-dashed border-slate-200/80"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Bars */}
                            <div className="absolute inset-0 pl-[44px] flex items-end justify-between pb-8 z-10 pr-2 pt-3">
                                {[
                                    { h: 42, v: '4.8' },
                                    { h: 48, v: '5.5' },
                                    { h: 56, v: '6.2' },
                                    { h: 63, v: '7.1' },
                                    { h: 59, v: '6.7' },
                                    { h: 72, v: '7.5' },
                                    { h: 78, v: '8.4' }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center justify-end h-full flex-1 group/bar cursor-pointer">
                                        <motion.div
                                            className="w-full max-w-[16px] rounded-full bg-[#152046] transition-colors shadow-sm relative"
                                            initial={{ height: 0 }}
                                            animate={{ height: `${item.h}%` }}
                                            transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                                        >
                                            {/* Tooltip & Triangle */}
                                            <div className="absolute -top-[30px] left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 group-hover/bar:opacity-100 group-hover/bar:-translate-y-1 transition-all duration-200 z-20 pointer-events-none">
                                                <div className="bg-[#0b1220] text-white text-[10px] font-bold py-1 px-2.5 rounded-[4px] shadow-lg whitespace-nowrap">
                                                    <span className="text-[#1aa3ff]">₹</span>{item.v}L
                                                </div>
                                                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-[#0b1220]"></div>
                                            </div>
                                            {/* Anchor Dot */}
                                            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full border-[1.5px] border-[#0b1220] bg-white opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 z-20 pointer-events-none"></div>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>

                            {/* X-Axis Labels */}
                            <div className="absolute bottom-0 left-0 right-0 pl-[44px] flex items-center justify-between pr-2 z-10 h-6 pt-1">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                    <span key={i} className="text-[11px] font-medium text-slate-400 flex-1 text-center">{day}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Pipeline Stage */}
                    <div className="col-span-4 bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 flex flex-col group">
                        <div className="text-[15px] font-bold text-[#0b1220] mb-6">Pipeline by stage</div>
                        <div className="flex-1 flex items-center justify-center gap-4 pl-4 pr-8">
                            {/* Donut Chart SVG */}
                            <div className="relative w-36 h-36 shrink-0 group-hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                                <motion.svg
                                    viewBox="0 0 120 120"
                                    className="w-full h-full transform -rotate-90"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f1f5f9" strokeWidth="22" />
                                    <motion.circle
                                        cx="60" cy="60" r="45" fill="none" stroke="#1aa3ff" strokeWidth="22"
                                        strokeDasharray="282.7"
                                        initial={{ strokeDashoffset: 282.7 }}
                                        animate={{ strokeDashoffset: 28 }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                        className="transition-colors hover:stroke-blue-400 cursor-pointer"
                                    />
                                    <motion.circle
                                        cx="60" cy="60" r="45" fill="none" stroke="#0b1220" strokeWidth="22"
                                        strokeDasharray="282.7"
                                        initial={{ strokeDashoffset: 282.7 }}
                                        animate={{ strokeDashoffset: 200 }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                                        className="transition-colors hover:stroke-slate-800 cursor-pointer"
                                    />
                                </motion.svg>
                                <motion.div
                                    className="absolute inset-0 flex flex-col items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                >
                                    <span className="text-[9px] font-bold text-slate-400 tracking-widest mt-1">IN-FLIGHT</span>
                                    <span className="text-[28px] font-bold text-[#0b1220] leading-tight">284</span>
                                </motion.div>
                            </div>

                            {/* Legend */}
                            <div className="flex flex-col gap-2.5 w-full">
                                {[
                                    { label: 'New', val: '42', pct: '(15%)', color: 'bg-[#1aa3ff]' },
                                    { label: 'Accepted', val: '38', pct: '(13%)', color: 'bg-[#0b1220]' },
                                    { label: 'Picking', val: '56', pct: '(20%)', color: 'bg-slate-400' },
                                    { label: 'Packed', val: '48', pct: '(17%)', color: 'bg-slate-500' },
                                    { label: 'Dispatched', val: '54', pct: '(19%)', color: 'bg-slate-300' },
                                    { label: 'Delivered', val: '46', pct: '(16%)', color: 'bg-slate-200' },
                                ].map(v => (
                                    <div key={v.label} className="flex items-center justify-between text-[11px] font-medium group-hover:opacity-90 cursor-pointer hover:bg-slate-50 rounded px-1 transition-colors">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <span className={`w-2 h-2 rounded-full ${v.color}`}></span>
                                            {v.label}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-bold text-[#0b1220] text-[12px]">{v.val}</span>
                                            <span className="text-slate-400 w-8 text-right">{v.pct}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Broadcast */}
                    <div className="col-span-3 bg-[#0b1220] rounded-[20px] p-6 shadow-lg border border-[#0b1220] relative overflow-hidden flex flex-col justify-between group hover:shadow-[0_8px_30px_rgba(11,18,32,0.3)] transition-all duration-300">
                        {/* decorative background shapes */}
                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-slate-800/50 rounded-full blur-3xl pointer-events-none group-hover:bg-slate-700/60 transition-colors duration-500"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/40 w-fit mb-6">
                                <Activity className="w-3 h-3 text-white" />
                                <span className="text-[9px] font-bold text-white tracking-widest">BROADCAST</span>
                            </div>
                            <h3 className="text-[24px] font-bold text-white leading-tight mb-3 tracking-tight">Send a network broadcast</h3>
                            <p className="text-[13px] text-slate-400 font-medium mb-auto leading-relaxed pr-4 flex-1">Notify vendors and customers in one tap.</p>

                            <button className="bg-white hover:bg-slate-200 text-[#0b1220] font-bold py-3.5 px-5 rounded-xl transition-all hover:scale-[1.02] flex items-center w-fit gap-2 text-[13px] active:scale-95 shadow-lg">
                                Compose <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Row - Orders & Map */}
                <div className="grid grid-cols-3 gap-3">
                    {/* Orders Table */}
                    <div className="col-span-2 bg-white rounded-[20px] shadow-sm border border-slate-100 flex flex-col h-full">
                        {/* Header Tabs */}
                        <div className="px-5 py-3 flex items-center justify-between border-b border-slate-100 shrink-0 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <div className="flex items-center gap-2">
                                <h3 className="text-[15px] font-bold text-[#0b1220] whitespace-nowrap pr-2">Network orders · live</h3>
                                <div className="flex items-center bg-slate-50/80 border border-slate-100 rounded-full p-0.5 shrink-0">
                                    {tabs.map(tab => (
                                        <div
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full cursor-pointer transition-all text-[12px] whitespace-nowrap ${activeTab === tab.id
                                                ? 'bg-white text-[#0b1220] shadow-sm font-semibold'
                                                : 'text-slate-500 hover:text-[#0b1220] font-medium'
                                                }`}
                                        >
                                            {tab.id}
                                            <span className={`px-1.5 py-0.5 rounded-full text-[9.5px] font-bold ${activeTab === tab.id
                                                ? 'bg-[#0b1220] text-white'
                                                : 'bg-slate-200 text-slate-600'
                                                }`}>
                                                {tab.count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className="text-[12.5px] font-bold text-[#0b1220] hover:text-[#1aa3ff] transition-colors flex items-center gap-1 whitespace-nowrap ml-2">
                                View all <span className="text-[14px]">→</span>
                            </button>
                        </div>
                        {/* Table */}
                        <div className="flex-1 overflow-y-auto overflow-x-auto rounded-b-[20px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <table className="w-full text-left font-medium border-collapse relative">
                                <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-slate-100">
                                    <tr className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
                                        <th className="py-3 px-6 whitespace-nowrap">Order ID</th>
                                        <th className="py-3 px-2 w-[18%]">Customer</th>
                                        <th className="py-3 px-2">Vendor</th>
                                        <th className="py-3 px-2">Amount</th>
                                        <th className="py-3 px-2">SLA</th>
                                        <th className="py-3 px-2">Status</th>
                                        <th className="py-3 px-6 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ORDERS.map((o, i) => (
                                        <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                                            <td className="py-3.5 px-6">
                                                <div className="text-[13px] font-semibold text-[#0b1220] group-hover:text-[#1aa3ff] transition-colors">{o.id}</div>
                                                <div className="text-[10.5px] text-slate-400 mt-0.5">{o.time}</div>
                                            </td>
                                            <td className="py-3.5 px-2">
                                                <div className="text-[12.5px] font-semibold text-slate-700">{o.customer}</div>
                                                <div className="text-[10.5px] text-slate-400 mt-0.5">{o.cLoc}</div>
                                            </td>
                                            <td className="py-3.5 px-2">
                                                <div className="text-[12.5px] text-slate-600 line-clamp-2 pr-2 leading-snug">{o.vendor}</div>
                                            </td>
                                            <td className="py-3.5 px-2">
                                                <div className="text-[13px] font-semibold text-[#0b1220]">{o.amount}</div>
                                            </td>
                                            <td className="py-3.5 px-2">
                                                <div className={`text-[12px] font-semibold ${o.slaColor}`}>{o.sla}</div>
                                            </td>
                                            <td className="py-3.5 px-2">
                                                <div className="flex items-center gap-2 text-[12px] font-medium text-slate-700">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${o.status === 'New' ? 'bg-[#1aa3ff]' : 'bg-[#0b1220]'}`}></span>
                                                    {o.status}
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-6">
                                                <div className="flex items-center gap-3 justify-end">
                                                    <button className="text-[12px] font-medium text-slate-500 hover:text-[#0b1220]">Reassign</button>
                                                    <button className="text-slate-400 hover:text-slate-700 bg-white shadow-sm border border-slate-200 rounded p-1 group-hover:border-slate-300 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Col: Map & Alerts */}
                    <div className="col-span-1 flex flex-col gap-4">
                        {/* Pseudo Map Widget */}
                        <div className="bg-white rounded-[20px] shadow-sm border border-slate-100 p-5 flex flex-col shrink-0 hover:shadow-md transition-shadow group cursor-pointer relative">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[14px] font-bold text-[#0b1220] flex items-center gap-2">
                                    <Map className="w-4 h-4 text-slate-700" /> Live fleet · MMR
                                </h3>
                                <span className="bg-[#0b1220] text-white px-2 py-1 rounded-full text-[10px] font-bold tracking-wide">142 active</span>
                            </div>
                            <div className="h-56 w-full border border-slate-100 rounded-xl bg-slate-50 relative overflow-hidden flex items-center justify-center">
                                {/* SVG Grid Background */}
                                <svg className="absolute inset-0 h-full w-full opacity-60">
                                    <defs>
                                        <pattern id="gmc" width="20" height="20" patternUnits="userSpaceOnUse">
                                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#cbd5e1" strokeWidth="0.5"></path>
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#gmc)"></rect>
                                </svg>

                                {/* Animated Map Dots */}
                                <motion.div
                                    className="absolute top-[20%] left-[20%] flex items-center justify-center cursor-pointer"
                                    animate={{ y: [0, -4, 0], x: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                >
                                    <div className="w-12 h-12 rounded-full border-[4.5px] border-slate-800/20 absolute pointer-events-none"></div>
                                    <div className="w-7 h-7 bg-slate-900 rounded-full border-[3px] border-white shadow-sm flex items-center justify-center z-10"><Truck className="w-3 h-3 text-white" /></div>
                                </motion.div>
                                <motion.div
                                    className="absolute top-[45%] left-[35%] flex items-center justify-center cursor-pointer"
                                    animate={{ y: [0, 5, 0], x: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                >
                                    <div className="w-12 h-12 rounded-full border-[4.5px] border-[#1aa3ff]/30 absolute pointer-events-none"></div>
                                    <div className="w-7 h-7 bg-[#1aa3ff] rounded-full border-[3px] border-white shadow-sm flex items-center justify-center z-10"><Truck className="w-3 h-3 text-white" /></div>
                                </motion.div>
                                <motion.div
                                    className="absolute top-[60%] left-[65%] flex items-center justify-center cursor-pointer"
                                    animate={{ y: [0, -3, 0], x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                                >
                                    <div className="w-12 h-12 rounded-full border-[4.5px] border-slate-400/40 absolute pointer-events-none"></div>
                                    <div className="w-7 h-7 bg-slate-400 rounded-full border-[3px] border-white shadow-sm flex items-center justify-center z-10"><Truck className="w-3 h-3 text-white" /></div>
                                </motion.div>
                                <motion.div
                                    className="absolute top-[30%] left-[60%] flex items-center justify-center cursor-pointer"
                                    animate={{ y: [0, 3, 0], x: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.5 }}
                                >
                                    <div className="w-12 h-12 rounded-full border-[4.5px] border-slate-800/20 absolute pointer-events-none"></div>
                                    <div className="w-7 h-7 bg-slate-900 rounded-full border-[3px] border-white shadow-sm flex items-center justify-center z-10"><span className="text-[10px] font-bold text-white">H</span></div>
                                </motion.div>
                                <motion.div
                                    className="absolute top-[75%] left-[40%] flex items-center justify-center cursor-pointer"
                                    animate={{ y: [0, -2, 0], x: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 2 }}
                                >
                                    <div className="w-12 h-12 rounded-full border-[4.5px] border-slate-800/20 absolute pointer-events-none"></div>
                                    <div className="w-7 h-7 bg-slate-900 rounded-full border-[3px] border-white shadow-sm flex items-center justify-center z-10"><Truck className="w-3 h-3 text-white" /></div>
                                </motion.div>

                                {/* Plus/Minus Zoom Buttons */}
                                <div className="absolute bottom-3 right-3 flex flex-col gap-1.5 z-10">
                                    <button className="w-7 h-7 bg-white border border-slate-200 shadow-sm rounded-[8px] flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600 font-medium text-[16px] leading-none">+</button>
                                    <button className="w-7 h-7 bg-white border border-slate-200 shadow-sm rounded-[8px] flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-600 font-medium text-[16px] leading-none">-</button>
                                </div>

                                {/* Mock Legend Overlay */}
                                <div className="absolute top-3 right-3 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[12px] p-3 text-[11.5px] font-semibold text-slate-600 space-y-2 z-10">
                                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#0b1220]"></span> On-route 118</div>
                                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-400"></span> Delayed 14</div>
                                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#1aa3ff]"></span> Stuck 10</div>
                                </div>
                                <div className="absolute bottom-3 left-3 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full px-2.5 py-1 text-[10.5px] font-bold text-[#1aa3ff] flex items-center gap-1.5 z-10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1aa3ff] animate-pulse"></span> LIVE · 0.8s
                                </div>
                            </div>
                            <button className="mt-4 text-[12.5px] font-bold text-[#0b1220] group-hover:text-[#1aa3ff] transition-colors self-center flex items-center gap-1">
                                Open live map + replay <span className="text-[14px]">→</span>
                            </button>
                        </div>

                        {/* Live Alerts snippet */}
                        <div className="bg-white rounded-[20px] shadow-sm border border-slate-100 p-5 flex flex-col flex-1 min-h-0 overflow-hidden">
                            <h3 className="text-[14px] font-bold text-[#0b1220] flex items-center gap-2 mb-4 shrink-0">
                                <Bell className="w-4 h-4 text-slate-700" /> Live alerts
                            </h3>
                            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                                {ALERTS.map((alert, i) => (
                                    <div key={i} className="flex gap-3 items-start group cursor-pointer border-l-[3px] border-transparent hover:border-[#1aa3ff] pl-2 -ml-2 transition-colors duration-200">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${alert.bg} group-hover:scale-110 transition-transform`}>
                                            <alert.icon className={`w-4 h-4 ${alert.iconColor}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="text-[12.5px] font-bold text-[#0b1220] truncate group-hover:text-[#1aa3ff] transition-colors">{alert.title}</div>
                                                <div className="text-[10px] text-slate-400 font-medium whitespace-nowrap pt-0.5">{alert.time}</div>
                                            </div>
                                            <div className="text-[11.5px] text-slate-500 font-medium truncate mt-0.5">{alert.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Micro Stats Grid Box */}
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                    <div className="grid grid-cols-4 gap-4">
                        {MICRO_STATS.map((ms, i) => (
                            <div key={i} className="group shadow-sm border border-slate-100 rounded-[24px] p-4 flex items-center gap-4 hover:border-slate-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden relative bg-white">
                                <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 z-10 group-hover:bg-slate-100 transition-colors">
                                    <ms.icon className="w-4 h-4 text-slate-500" />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-between h-full relative z-10">
                                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">{ms.label}</div>
                                    <div className="flex items-end justify-between">
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-[20px] font-semibold text-[#0b1220] leading-tight tracking-tight">{ms.val}</span>
                                            <span className="text-[10px] font-semibold text-[#0b1220]">{ms.delta}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Sparkline */}
                                <div className="absolute right-[-10px] bottom-[-2px] w-[65px] h-[30px] pointer-events-none">
                                    <Sparkline points={ms.pts} color={ms.color} fillOpacity="0.05" className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
