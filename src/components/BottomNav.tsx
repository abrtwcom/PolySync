'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { LayoutDashboard, Trophy, LogOut } from 'lucide-react';

export default function BottomNav() {
    const { currentUser, logout } = useApp();
    const pathname = usePathname();

    if (!currentUser) return null;

    const isAdmin = currentUser.role === 'admin';
    const dashboardPath = isAdmin ? '/admin' : '/student';

    const navItems = [
        { label: 'Home', href: dashboardPath, icon: LayoutDashboard },
        { label: 'Ranks', href: '/leaderboard', icon: Trophy },
        { label: 'Logout', href: '/', icon: LogOut, isLogout: true },
    ];

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
            <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200/60 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
                <div className="flex items-center justify-around max-w-md mx-auto">
                    {navItems.map((item) => {
                        const isActive = !item.isLogout && pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={item.isLogout ? logout : undefined}
                                className={`flex flex-col items-center justify-center gap-0.5 py-3 px-5 min-w-[72px] transition-all duration-200 ${isActive
                                    ? 'text-primary'
                                    : item.isLogout
                                        ? 'text-gray-400 active:text-red-500'
                                        : 'text-gray-400 active:text-gray-600'
                                    }`}
                            >
                                <div className="relative p-1">
                                    <item.icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                                    {isActive && (
                                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary" />
                                    )}
                                </div>
                                <span className={`text-[10px] font-semibold ${isActive ? 'text-primary' : ''}`}>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
                {/* Safe area bottom padding for notched phones */}
                <div className="h-[env(safe-area-inset-bottom,0px)]" />
            </div>
        </nav>
    );
}
