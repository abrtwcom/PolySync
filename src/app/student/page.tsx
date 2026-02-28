'use client';

import DashboardLayout from '@/components/DashboardLayout';
import NoticeCard from '@/components/NoticeCard';
import PointsBadge from '@/components/PointsBadge';
import { useApp } from '@/context/AppContext';
import { Bell, Filter, Sparkles, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { Category } from '@/lib/data';

export default function StudentDashboard() {
    const { currentUser, notices } = useApp();
    const [activeFilter, setActiveFilter] = useState<Category | 'All'>('All');

    if (!currentUser) return null;

    const filteredNotices = activeFilter === 'All'
        ? notices
        : notices.filter(n => n.category === activeFilter);

    const filters: (Category | 'All')[] = ['All', 'General', 'Exam', 'Placement', 'Event'];

    const filterColors: Record<string, string> = {
        All: 'bg-primary text-white shadow-md shadow-primary/20',
        General: 'bg-gray-600 text-white shadow-md shadow-gray-600/20',
        Exam: 'bg-purple-600 text-white shadow-md shadow-purple-600/20',
        Placement: 'bg-blue-600 text-white shadow-md shadow-blue-600/20',
        Event: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20',
    };

    return (
        <DashboardLayout>
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
                {/* Header Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-light to-primary p-5 sm:p-6 mb-6 shadow-xl shadow-primary/15">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-36 h-36 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/3" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-2xl sm:text-3xl border border-white/20 shadow-lg flex-shrink-0">
                                {currentUser.avatar}
                            </div>
                            <div className="min-w-0">
                                <p className="text-blue-200/70 text-xs sm:text-sm font-medium">Welcome back,</p>
                                <h1 className="text-xl sm:text-2xl font-bold text-white truncate">{currentUser.name}</h1>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <GraduationCap className="w-3 h-3 text-blue-300/60" />
                                    <span className="text-[11px] text-blue-200/50">{currentUser.department}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 sm:mt-5 flex items-center gap-3 sm:gap-4">
                            <PointsBadge points={currentUser.points} />
                            <div className="flex-1 min-w-0">
                                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light transition-all duration-1000 ease-out"
                                        style={{ width: `${Math.min((currentUser.points / 500) * 100, 100)}%` }}
                                    />
                                </div>
                                <p className="text-[10px] text-blue-200/50 mt-1 text-right">
                                    {500 - currentUser.points > 0 ? `${500 - currentUser.points} to Gold` : '🏆 Gold!'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
                    <Filter className="w-4 h-4 text-muted flex-shrink-0" />
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${activeFilter === filter
                                ? filterColors[filter]
                                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Section Header */}
                <div className="flex items-center gap-2 mb-4">
                    <Bell className="w-4 h-4 text-primary" />
                    <h2 className="text-base font-bold text-gray-800">Latest Notices</h2>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                        {filteredNotices.length}
                    </span>
                </div>

                {/* Notice Feed */}
                <div className="space-y-3">
                    {filteredNotices.length === 0 ? (
                        <div className="text-center py-16">
                            <Sparkles className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-400 font-medium text-sm">No notices in this category</p>
                        </div>
                    ) : (
                        filteredNotices.map((notice, i) => (
                            <NoticeCard
                                key={notice.id}
                                notice={notice}
                                showRSVP={true}
                                animationDelay={i * 60}
                            />
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
