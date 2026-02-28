'use client';

import { Notice } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import {
    Calendar,
    Zap,
    CheckCircle2,
    Megaphone,
    BookOpen,
    Briefcase,
    PartyPopper,
    Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

const categoryConfig = {
    General: { color: 'bg-gray-100 text-gray-600 border-gray-200', icon: Megaphone },
    Exam: { color: 'bg-purple-50 text-purple-600 border-purple-200', icon: BookOpen },
    Placement: { color: 'bg-blue-50 text-blue-600 border-blue-200', icon: Briefcase },
    Event: { color: 'bg-emerald-50 text-emerald-600 border-emerald-200', icon: PartyPopper },
};

interface NoticeCardProps {
    notice: Notice;
    showRSVP?: boolean;
    showDelete?: boolean;
    animationDelay?: number;
}

export default function NoticeCard({ notice, showRSVP = false, showDelete = false, animationDelay = 0 }: NoticeCardProps) {
    const { currentUser, claimPoints, deleteNotice } = useApp();
    const config = categoryConfig[notice.category];
    const CategoryIcon = config.icon;

    const hasRSVPd = currentUser ? notice.rsvpUsers.includes(currentUser.id) : false;

    const handleRSVP = () => {
        const success = claimPoints(notice.id);
        if (success) {
            toast.success(`🎉 Checked in! +${notice.pointsReward} Activity Points earned!`, {
                duration: 3000,
                style: {
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    color: '#065f46',
                },
            });
        }
    };

    const handleDelete = () => {
        deleteNotice(notice.id);
        toast.success('Notice deleted successfully', {
            duration: 2000,
            style: {
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#991b1b',
            },
        });
    };

    const formattedDate = new Date(notice.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    return (
        <div
            className="glass-card p-4 sm:p-5 group animate-fade-in-up"
            style={{ animationDelay: `${animationDelay}ms` }}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${config.color}`}>
                        <CategoryIcon className="w-3 h-3" />
                        {notice.category}
                    </span>
                    {notice.isEvent && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 border border-amber-200">
                            <Zap className="w-3 h-3" />
                            +{notice.pointsReward} pts
                        </span>
                    )}
                </div>
                {showDelete && (
                    <button
                        onClick={handleDelete}
                        className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200 sm:opacity-0 sm:group-hover:opacity-100"
                        aria-label="Delete notice"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Title */}
            <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1.5 leading-snug">
                {notice.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-3">
                {notice.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {formattedDate}
                </div>

                {showRSVP && notice.isEvent && (
                    <button
                        onClick={handleRSVP}
                        disabled={hasRSVPd}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-300 ${hasRSVPd
                                ? 'bg-emerald-50 text-emerald-600 cursor-default border border-emerald-200'
                                : 'bg-gradient-to-r from-accent to-accent-light text-white shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 active:translate-y-0'
                            }`}
                    >
                        {hasRSVPd ? (
                            <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Checked In
                            </>
                        ) : (
                            <>
                                <Zap className="w-3.5 h-3.5" />
                                Check-in / RSVP
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
