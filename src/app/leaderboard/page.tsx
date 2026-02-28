'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useApp } from '@/context/AppContext';
import { Trophy, Medal, Crown, Star, TrendingUp, Sparkles } from 'lucide-react';

export default function LeaderboardPage() {
    const { currentUser, users } = useApp();

    const students = users
        .filter(u => u.role === 'student')
        .sort((a, b) => b.points - a.points);

    const top3 = students.slice(0, 3);

    return (
        <DashboardLayout>
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in-up">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 mb-4 shadow-lg shadow-yellow-400/25">
                        <Trophy className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">Campus Leaderboard</h1>
                    <p className="text-sm text-gray-400">Top students ranked by Activity Points</p>
                </div>

                {/* Podium - Top 3 */}
                {top3.length >= 3 && (
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8 items-end px-1">
                        {/* 2nd Place */}
                        <div className="animate-fade-in-up stagger-2">
                            <div className="glass-card p-3 sm:p-4 text-center relative" style={{ borderRadius: '16px' }}>
                                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10">
                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 text-white text-[10px] font-bold shadow-md">
                                        2
                                    </span>
                                </div>
                                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xl sm:text-2xl mb-1.5 mt-1.5 border-2 border-gray-300">
                                    {top3[1].avatar}
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{top3[1].name.split(' ')[0]}</p>
                                <p className="text-[10px] text-gray-400 truncate mb-1.5">{top3[1].department}</p>
                                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                                    <Star className="w-2.5 h-2.5" />
                                    <span className="text-[11px] font-bold">{top3[1].points}</span>
                                </div>
                            </div>
                            <div className="h-12 bg-gradient-to-t from-gray-200/80 to-gray-100/50 rounded-b-xl mx-1.5 -mt-0.5" />
                        </div>

                        {/* 1st Place */}
                        <div className="animate-fade-in-up stagger-1">
                            <div className="glass-card p-3 sm:p-4 text-center relative border-2 border-yellow-300/60" style={{ borderRadius: '16px' }}>
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                                    <Crown className="w-7 h-7 text-yellow-500 animate-float" />
                                </div>
                                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-100 to-amber-200 flex items-center justify-center text-2xl sm:text-3xl mb-1.5 mt-2.5 border-2 border-yellow-400 shadow-md shadow-yellow-400/15">
                                    {top3[0].avatar}
                                </div>
                                <p className="text-xs sm:text-sm font-extrabold text-gray-900 truncate">{top3[0].name.split(' ')[0]}</p>
                                <p className="text-[10px] text-gray-400 truncate mb-1.5">{top3[0].department}</p>
                                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-700 border border-yellow-300/60">
                                    <Trophy className="w-3 h-3" />
                                    <span className="text-xs sm:text-sm font-bold">{top3[0].points}</span>
                                </div>
                            </div>
                            <div className="h-20 bg-gradient-to-t from-yellow-200/60 to-yellow-100/30 rounded-b-xl mx-1.5 -mt-0.5" />
                        </div>

                        {/* 3rd Place */}
                        <div className="animate-fade-in-up stagger-3">
                            <div className="glass-card p-3 sm:p-4 text-center relative" style={{ borderRadius: '16px' }}>
                                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10">
                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-amber-600 to-orange-700 text-white text-[10px] font-bold shadow-md">
                                        3
                                    </span>
                                </div>
                                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center text-xl sm:text-2xl mb-1.5 mt-1.5 border-2 border-amber-600/60">
                                    {top3[2].avatar}
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{top3[2].name.split(' ')[0]}</p>
                                <p className="text-[10px] text-gray-400 truncate mb-1.5">{top3[2].department}</p>
                                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-700">
                                    <Medal className="w-2.5 h-2.5" />
                                    <span className="text-[11px] font-bold">{top3[2].points}</span>
                                </div>
                            </div>
                            <div className="h-8 bg-gradient-to-t from-amber-200/60 to-amber-100/30 rounded-b-xl mx-1.5 -mt-0.5" />
                        </div>
                    </div>
                )}

                {/* Full Rankings */}
                <div className="glass-card overflow-hidden" style={{ borderRadius: '16px' }}>
                    <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <h2 className="text-sm font-bold text-gray-800">Full Rankings</h2>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {students.map((student, index) => {
                            const isCurrentUser = currentUser?.id === student.id;
                            const rank = index + 1;

                            return (
                                <div
                                    key={student.id}
                                    className={`flex items-center gap-3 px-4 sm:px-5 py-3 transition-colors ${isCurrentUser ? 'bg-primary/5' : 'hover:bg-gray-50/80'
                                        } animate-fade-in-up`}
                                    style={{ animationDelay: `${index * 40}ms` }}
                                >
                                    {/* Rank */}
                                    <div className="w-7 text-center flex-shrink-0">
                                        {rank === 1 ? (
                                            <span className="text-lg">🥇</span>
                                        ) : rank === 2 ? (
                                            <span className="text-lg">🥈</span>
                                        ) : rank === 3 ? (
                                            <span className="text-lg">🥉</span>
                                        ) : (
                                            <span className="text-xs font-bold text-gray-400">#{rank}</span>
                                        )}
                                    </div>

                                    {/* Avatar */}
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${rank <= 3
                                        ? 'bg-gradient-to-br from-yellow-50 to-amber-100 border border-yellow-200'
                                        : 'bg-gray-100'
                                        }`}>
                                        {student.avatar}
                                    </div>

                                    {/* Name */}
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-semibold truncate ${isCurrentUser ? 'text-primary' : 'text-gray-800'}`}>
                                            {student.name}
                                            {isCurrentUser && (
                                                <span className="ml-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-primary text-white align-middle">
                                                    YOU
                                                </span>
                                            )}
                                        </p>
                                        <p className="text-[11px] text-gray-400 truncate">{student.department}</p>
                                    </div>

                                    {/* Points */}
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                        <Sparkles className="w-3 h-3 text-accent" />
                                        <span className={`text-sm font-bold ${rank <= 3 ? 'text-accent-dark' : 'text-gray-600'}`}>
                                            {student.points}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
