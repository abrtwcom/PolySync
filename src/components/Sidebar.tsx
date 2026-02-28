'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
    LayoutDashboard,
    Trophy,
    LogOut,
    Bell,
    Shield,
    GraduationCap,
    Sparkles,
} from 'lucide-react';

export default function Sidebar() {
    const { currentUser, logout } = useApp();
    const pathname = usePathname();

    if (!currentUser) return null;

    const isAdmin = currentUser.role === 'admin';
    const dashboardPath = isAdmin ? '/admin' : '/student';

    const navItems = [
        { label: 'Dashboard', href: dashboardPath, icon: LayoutDashboard },
        { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    ];

    return (
        <aside className="hidden lg:flex flex-col w-[280px] h-screen bg-white border-r border-gray-200/80 fixed left-0 top-0 z-50 shadow-sm">
            {/* Logo */}
            <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md shadow-primary/20">
                        <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-extrabold text-primary-dark tracking-tight">Poly-Sync</h1>
                        <p className="text-[11px] text-gray-400 font-medium">Smart Campus Hub</p>
                    </div>
                </div>
            </div>

            {/* User Card */}
            <div className="px-5 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-light/20 to-accent/20 flex items-center justify-center text-xl ring-2 ring-white shadow-sm">
                        {currentUser.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-800 truncate">{currentUser.name}</p>
                        <div className="mt-0.5">
                            {isAdmin ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 border border-purple-100">
                                    <Shield className="w-3 h-3" /> Admin
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                                    <GraduationCap className="w-3 h-3" /> Student
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                {!isAdmin && (
                    <div className="p-3 rounded-xl bg-gradient-to-r from-accent/8 to-transparent border border-accent/15">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-accent" />
                                <span className="text-[11px] uppercase tracking-wider font-bold text-accent-dark/60">Points</span>
                            </div>
                            <span className="text-xl font-black text-accent-dark">{currentUser.points}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-4 space-y-1">
                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 px-3 mb-2">Menu</p>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                                }`}
                        >
                            <item.icon className="w-[18px] h-[18px]" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="px-4 py-4 border-t border-gray-100">
                <Link
                    href="/"
                    onClick={logout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
                >
                    <LogOut className="w-[18px] h-[18px]" />
                    Sign Out
                </Link>
            </div>
        </aside>
    );
}
