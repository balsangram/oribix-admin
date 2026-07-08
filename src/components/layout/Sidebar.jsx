import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, GitBranch, Map, Building2, ShieldCheck,
    Package, ShoppingCart, FileText, Sliders, Truck, Users,
    Car, HeadphonesIcon, BarChart3, Megaphone, Gift,
    UserCog, Settings, PanelLeftClose, PanelLeftOpen, LogOut, ArrowLeft
} from 'lucide-react';
import logo1 from '../../assets/logo1_cropped.png';

const NAV_GROUPS = [
    {
        label: 'MISSION CONTROL',
        items: [
            { label: 'Live Ops', icon: LayoutDashboard, to: '/admin/console' },
            { label: 'Order Pipeline', icon: GitBranch, to: '/admin/pipeline' },
            { label: 'Live Map + Replay', icon: Map, to: '/admin/livemap' },
        ],
    },
    {
        label: 'VENDORS & KYC',
        items: [
            { label: 'Warehouses & Vendors', icon: Building2, to: '/admin/vendors' },
            { label: 'KYC Lifecycle', icon: ShieldCheck, to: '/admin/kyc' },
        ],
    },
    {
        label: 'CATALOG',
        items: [
            { label: 'Catalog', icon: Package, to: '/admin/catalog' },
        ],
    },
    {
        label: 'ORDER LIFECYCLE & COMPLIANCE',
        items: [
            { label: 'Orders', icon: ShoppingCart, to: '/admin/orders' },
            { label: 'E-Way Bill Review', icon: FileText, to: '/admin/eway' },
            { label: 'Manual Override', icon: Sliders, to: '/admin/override' },
        ],
    },
    {
        label: 'LOGISTICS',
        items: [
            { label: 'Multi-3PL Routing', icon: Truck, to: '/admin/logistics' },
        ],
    },
    {
        label: 'CUSTOMERS, DRIVERS & SUPPORT',
        items: [
            { label: 'Customers', icon: Users, to: '/admin/customers' },
            { label: 'Drivers & Fleet', icon: Car, to: '/admin/drivers' },
            { label: 'Support · Tickets', icon: HeadphonesIcon, to: '/admin/support' },
        ],
    },
    {
        label: 'FINANCE & ANALYTICS',
        items: [
            { label: 'Revenue & Margin', icon: BarChart3, to: '/admin/finance' },
        ],
    },
    {
        label: 'BROADCAST & GROWTH',
        items: [
            { label: 'Broadcasts', icon: Megaphone, to: '/admin/broadcasts' },
            { label: 'Promos & Referrals', icon: Gift, to: '/admin/promos' },
        ],
    },
    {
        label: 'SETTINGS',
        items: [
            { label: 'User Management', icon: UserCog, to: '/admin/users' },
            { label: 'Platform Settings', icon: Settings, to: '/admin/settings' },
        ],
    },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="relative flex-shrink-0" style={{ width: collapsed ? '72px' : '256px', transition: 'width 300ms' }}>
            <aside
                className="flex flex-col h-screen"
                style={{
                    width: '100%',
                    background: 'linear-gradient(180deg, #0c1d40 0%, #0a1730 100%)',
                }}
            >
                {/* Logo + Collapse toggle in same row */}
                <div className={`flex items-center px-4 py-4 border-b border-white/10 shrink-0 ${collapsed ? 'justify-center' : 'justify-between'}`}>
                    {!collapsed && (
                        <div className="flex items-center">
                            <img src={logo1} alt="OriBrix" className="h-8 w-auto object-contain shrink-0" />
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(c => !c)}
                        className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shrink-0"
                        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {collapsed
                            ? <PanelLeftOpen className="w-4 h-4 text-slate-300" />
                            : <PanelLeftClose className="w-4 h-4 text-slate-300" />
                        }
                    </button>
                </div>

                {/* Nav Groups */}
                <nav
                    className="flex-1 overflow-y-auto overflow-x-hidden py-3"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {NAV_GROUPS.map((group) => (
                        <div key={group.label} className="mb-1">
                            {!collapsed && (
                                <div className="px-4 pt-3 pb-1 text-[9.5px] font-bold text-slate-500 tracking-widest uppercase whitespace-nowrap">
                                    {group.label}
                                </div>
                            )}
                            {group.items.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 mx-2 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors duration-150 cursor-pointer group relative
                                    ${isActive
                                            ? 'text-white'
                                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                        }`
                                    }
                                    title={collapsed ? item.label : undefined}
                                >
                                    {({ isActive }) => (
                                        <>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="sidebarActiveTabIndicator"
                                                    className="absolute inset-0 bg-white/10 rounded-xl shadow-[inset_2px_0_0_0_#1aa3ff]"
                                                    initial={false}
                                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                                />
                                            )}
                                            <div className="flex items-center gap-3 relative z-10 w-full overflow-hidden">
                                                <item.icon className="w-4 h-4 shrink-0 relative z-10" />
                                                {!collapsed && (
                                                    <span className="whitespace-nowrap overflow-hidden text-ellipsis relative z-10">{item.label}</span>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className="border-t border-white/10 p-3 shrink-0 space-y-1.5">
                    {/* Profile */}
                    <div className={`flex items-center gap-2.5 px-2 py-1.5 rounded-xl ${collapsed ? 'justify-center' : ''}`}>
                        <div className="w-7 h-7 rounded-full bg-[#1aa3ff]/20 border border-[#1aa3ff]/30 flex items-center justify-center shrink-0">
                            <span className="text-[11px] font-bold text-[#1aa3ff]">R</span>
                        </div>
                        {!collapsed && (
                            <div className="overflow-hidden">
                                <div className="text-[12px] font-semibold text-white truncate">Rohan Desai</div>
                                <div className="text-[10px] text-slate-500 truncate">Super Admin · Mumbai HQ</div>
                            </div>
                        )}
                    </div>

                    {/* Sign out */}
                    <button
                        onClick={() => navigate('/admin/login')}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors text-[12px] font-medium ${collapsed ? 'justify-center' : ''}`}
                        title={collapsed ? 'Sign out' : undefined}
                    >
                        <LogOut className="w-3.5 h-3.5 shrink-0" />
                        {!collapsed && <span>Sign out</span>}
                    </button>

                    {/* Back to landing */}
                    {!collapsed && (
                        <button
                            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-500 hover:bg-white/5 hover:text-slate-300 transition-colors text-[11px] font-medium border border-white/10"
                        >
                            <ArrowLeft className="w-3 h-3 shrink-0" />
                            <span>Back to landing</span>
                        </button>
                    )}
                </div>
            </aside>
        </div>
    );
}
