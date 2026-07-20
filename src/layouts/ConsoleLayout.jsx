import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { ChevronLeft, Search, Bell, User, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AdminProfileProvider,
    useAdminProfile,
} from '../context/AdminProfileContext';

function ConsoleShell() {
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const { fullName, email, initials, photo } = useAdminProfile();

    // Map paths to titles
    const pathToTitle = {
        '/dashboard': 'Mission Control',
        '/console': 'Mission Control',
        '/pipeline': 'Order Pipeline',
        '/livemap': 'Live Map',
        '/vendors': 'Vendors',
        '/kyc': 'KYC',
        '/catalog': 'Catalog',
        '/orders': 'Orders',
        '/eway': 'E-Way Bill',
        '/return': 'Returns & Disputes',
        '/logistics': 'Logistics',
        '/customers': 'Customers',
        '/drivers': 'Drivers & Fleet',
        '/support': 'Support',
        '/finance': 'Finance',
        '/broadcasts': 'Broadcasts',
        '/promos': 'Promos',
        '/users': 'User Management',
        '/settings': 'Settings',
        '/profile': 'Profile',
    };

    const currentTitle =
        pathToTitle[location.pathname] ||
        (location.pathname.startsWith("/kyc-full-details")
            ? "KYC Details"
            : "Dashboard");

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!menuOpen) return;
        const onPointerDown = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', onPointerDown);
        return () => document.removeEventListener('mousedown', onPointerDown);
    }, [menuOpen]);

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[#f3f5f8] font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 relative">
                {/* Global Top Toolbar */}
                <header className="sticky top-0 z-20 bg-slate-50/75 backdrop-blur-md shadow-sm px-6 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button className="w-7 h-7 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2 text-[13px]">
                            <span className="text-slate-400 font-medium">Admin</span>
                            <span className="text-slate-300">/</span>
                            <span className="text-[#0b1220] font-bold">{currentTitle}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input placeholder="Search..." className="pl-9 pr-4 py-2 rounded-full bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1aa3ff]/20 w-64 text-[13px] shadow-sm font-medium" />
                        </div>
                        <button className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center relative hover:bg-slate-50 shadow-sm">
                            <Bell className="w-4 h-4 text-[#0b1220]" />
                            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-[#1aa3ff]"></span>
                        </button>
                        <div className="relative" ref={menuRef}>
                            <button
                                type="button"
                                onClick={() => setMenuOpen((open) => !open)}
                                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors"
                            >
                                <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                                    {photo ? (
                                        <img src={photo} alt={fullName} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-[#0b1220] flex items-center justify-center text-white text-[10px] font-bold">
                                            {initials}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col -space-y-0.5 pr-1 text-left">
                                    <span className="text-[12px] font-bold text-[#0b1220]">{fullName}</span>
                                    <span className="text-[10px] text-slate-400 font-medium">
                                        {email || '—'}
                                    </span>
                                </div>
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden z-30">
                                    <div className="px-4 py-3 border-b border-slate-100">
                                        <div className="text-[13px] font-bold text-[#0b1220]">{fullName}</div>
                                        <div className="text-[11px] text-slate-400 font-medium">
                                            {email || '—'}
                                        </div>
                                    </div>
                                    <div className="py-1.5">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/profile')}
                                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <User className="w-4 h-4 text-slate-400" />
                                            My profile
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => navigate('/settings')}
                                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <Settings className="w-4 h-4 text-slate-400" />
                                            Settings
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => navigate('/login')}
                                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4 text-slate-400" />
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="w-full h-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}

export default function ConsoleLayout() {
    return (
        <AdminProfileProvider>
            <ConsoleShell />
        </AdminProfileProvider>
    );
}
