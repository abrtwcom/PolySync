'use client';

import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { Bell, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { currentUser } = useApp();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push('/');
        }
    }, [currentUser, router]);

    if (!currentUser) return null;

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />

            {/* Mobile Top Header */}
            <header className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
                <div className="flex items-center justify-between px-4 h-14">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <Bell className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-base font-bold text-primary-dark">Poly-Sync</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        {currentUser.role === 'student' && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                                <Sparkles className="w-3.5 h-3.5 text-accent" />
                                <span className="text-sm font-bold text-accent-dark">{currentUser.points}</span>
                            </div>
                        )}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center text-base">
                            {currentUser.avatar}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pb-24 lg:pb-8 min-h-screen" style={{ paddingLeft: 'var(--sidebar-width, 0px)' }}>
                <div className="w-full lg:px-10 lg:pt-4">
                    {children}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
