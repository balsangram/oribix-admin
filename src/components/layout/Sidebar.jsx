import React, { useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, GitBranch, Map, Building2, ShieldCheck,
    Package, ShoppingCart, FileText, Sliders, Users,
    Car, HeadphonesIcon, BarChart3, Megaphone, Gift,
    UserCog, Settings, PanelLeftClose, PanelLeftOpen
} from 'lucide-react';
import logo1 from '../../assets/logo1_cropped.png';
import { useAdminProfile } from '../../context/AdminProfileContext';

/** `permission` must match Permission.name from the backend catalog */
const NAV_GROUPS = [
    {
        label: 'MISSION CONTROL',
        items: [
            { label: 'Live Ops', icon: LayoutDashboard, to: '/dashboard', permission: 'Live Ops' },
            { label: 'Demand Heat Map', icon: GitBranch, to: '/demand-heat-map', permission: 'Demand Heat Map' },
            { label: 'Live Map + Replay', icon: Map, to: '/livemap', permission: 'Live Map + Replay' },
        ],
    },
    {
        label: 'VENDORS & KYC',
        items: [
            { label: 'Warehouses & Vendors', icon: Building2, to: '/vendors', permission: 'Warehouses & Vendors' },
            { label: 'KYC Lifecycle', icon: ShieldCheck, to: '/kyc', permission: 'KYC Lifecycle' },
        ],
    },
    {
        label: 'CATALOG',
        items: [
            { label: 'Catalog', icon: Package, to: '/catalog', permission: 'Catalog' },
        ],
    },
    {
        label: 'ORDER LIFECYCLE & COMPLIANCE',
        items: [
            { label: 'Orders', icon: ShoppingCart, to: '/orders', permission: 'Orders' },
            { label: 'E-Way Bill Review', icon: FileText, to: '/eway', permission: 'E-Way Bill Review' },
            { label: 'Returns & Disputes', icon: Sliders, to: '/return', permission: 'Returns & Disputes' },
        ],
    },
    {
        label: 'CUSTOMERS, DRIVERS & SUPPORT',
        items: [
            { label: 'Customers', icon: Users, to: '/customers', permission: 'Customers' },
            { label: 'Drivers & Fleet', icon: Car, to: '/drivers', permission: 'Drivers & Fleet' },
            { label: 'Support · Tickets', icon: HeadphonesIcon, to: '/support', permission: 'Support Tickets' },
        ],
    },
    {
        label: 'FINANCE & ANALYTICS',
        items: [
            { label: 'Revenue & Margin', icon: BarChart3, to: '/finance', permission: 'Revenue & Margin' },
        ],
    },
    {
        label: 'BROADCAST & GROWTH',
        items: [
            { label: 'Broadcasts', icon: Megaphone, to: '/broadcasts', permission: 'Broadcasts' },
            { label: 'Promos & Referrals', icon: Gift, to: '/promos', permission: 'Promos & Referrals' },
        ],
    },
    {
        label: 'SETTINGS',
        items: [
            { label: 'User Management', icon: UserCog, to: '/users', permission: 'User Management' },
            { label: 'Platform Settings', icon: Settings, to: '/settings', permission: 'Platform Settings' },
        ],
    },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const { fullName, roleText, initials, photo, hasPermission, hasFullAccess } =
        useAdminProfile();

    const visibleGroups = useMemo(() => {
        return NAV_GROUPS
            .map((group) => ({
                ...group,
                items: group.items.filter(
                    (item) => hasFullAccess || hasPermission(item.permission)
                ),
            }))
            .filter((group) => group.items.length > 0);
    }, [hasFullAccess, hasPermission]);

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
                <div
                    className={`flex shrink-0 border-b border-white/10 px-4 py-4 ${
                        collapsed
                            ? 'flex-col items-center gap-3'
                            : 'items-center justify-between'
                    }`}
                >
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center rounded-lg transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1aa3ff]/50"
                        title="Go to Mission Control"
                        aria-label="Go to Mission Control"
                    >
                        <img
                            src={logo1}
                            alt="OriBrix"
                            className={`w-auto object-contain shrink-0 ${collapsed ? 'h-7' : 'h-8'}`}
                        />
                    </button>
                    <button
                        type="button"
                        onClick={() => setCollapsed((c) => !c)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 transition-colors hover:bg-white/20"
                        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {collapsed ? (
                            <PanelLeftOpen className="h-4 w-4 text-slate-300" />
                        ) : (
                            <PanelLeftClose className="h-4 w-4 text-slate-300" />
                        )}
                    </button>
                </div>

                {/* Nav Groups */}
                <nav
                    className="flex-1 overflow-y-auto overflow-x-hidden py-3"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {visibleGroups.length === 0 ? (
                        !collapsed && (
                            <p className="px-4 py-6 text-[12px] leading-5 text-slate-500">
                                No modules assigned. Ask an admin to grant permissions.
                            </p>
                        )
                    ) : (
                        visibleGroups.map((group) => (
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
                        ))
                    )}
                </nav>

                {/* Footer */}
                <div className="border-t border-white/10 p-3 shrink-0">
                    {/* Profile */}
                    <button
                        type="button"
                        onClick={() => navigate('/profile')}
                        className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-colors ${collapsed ? 'justify-center' : ''}`}
                        title={collapsed ? fullName : undefined}
                    >
                        <div className="w-7 h-7 rounded-full bg-[#1aa3ff]/20 border border-[#1aa3ff]/30 flex items-center justify-center shrink-0 overflow-hidden">
                            {photo ? (
                                <img src={photo} alt={fullName} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-[11px] font-bold text-[#1aa3ff]">{initials.charAt(0)}</span>
                            )}
                        </div>
                        {!collapsed && (
                            <div className="overflow-hidden text-left">
                                <div className="text-[12px] font-semibold text-white truncate">{fullName}</div>
                                <div className="text-[10px] text-slate-500 truncate">{roleText}</div>
                            </div>
                        )}
                    </button>
                </div>
            </aside>
        </div>
    );
}
