'use client';

import DashboardLayout from '@/components/DashboardLayout';
import NoticeCard from '@/components/NoticeCard';
import { useApp } from '@/context/AppContext';
import { Category } from '@/lib/data';
import {
    Plus,
    FileText,
    Send,
    Shield,
    Megaphone,
    BookOpen,
    Briefcase,
    PartyPopper,
    Zap,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AdminDashboard() {
    const { currentUser, notices, addNotice } = useApp();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<Category>('General');
    const [pointsReward, setPointsReward] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!currentUser) return null;

    const isEvent = category === 'Event';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            addNotice({
                title: title.trim(),
                description: description.trim(),
                category,
                isEvent,
                pointsReward: isEvent ? pointsReward : 0,
            });

            toast.success('📢 Notice published successfully!', {
                duration: 3000,
                style: {
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    color: '#065f46',
                },
            });

            setTitle('');
            setDescription('');
            setCategory('General');
            setPointsReward(0);
            setIsSubmitting(false);
        }, 400);
    };

    const categoryOptions: { value: Category; label: string; icon: React.ReactNode }[] = [
        { value: 'General', label: 'General', icon: <Megaphone className="w-4 h-4" /> },
        { value: 'Exam', label: 'Exam', icon: <BookOpen className="w-4 h-4" /> },
        { value: 'Placement', label: 'Placement', icon: <Briefcase className="w-4 h-4" /> },
        { value: 'Event', label: 'Event', icon: <PartyPopper className="w-4 h-4" /> },
    ];

    const categoryColorMap: Record<Category, string> = {
        General: 'border-gray-300 bg-gray-50 text-gray-700',
        Exam: 'border-purple-300 bg-purple-50 text-purple-700',
        Placement: 'border-blue-300 bg-blue-50 text-blue-700',
        Event: 'border-emerald-300 bg-emerald-50 text-emerald-700',
    };

    return (
        <DashboardLayout>
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
                {/* Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-5 sm:p-6 mb-6 shadow-xl shadow-purple-500/15">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />

                    <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-2xl sm:text-3xl border border-white/20 shadow-lg flex-shrink-0">
                            {currentUser.avatar}
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-xl sm:text-2xl font-bold text-white truncate">{currentUser.name}</h1>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <Shield className="w-3 h-3 text-purple-300/70" />
                                <span className="text-xs sm:text-sm text-purple-200/70 font-medium truncate">Administrator • {currentUser.department}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Publish Form */}
                <div className="glass-card p-5 sm:p-6 mb-6">
                    <div className="flex items-center gap-2.5 mb-5">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Plus className="w-4 h-4 text-primary" />
                        </div>
                        <h2 className="text-base font-bold text-gray-800">Publish New Notice</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1.5">
                                Notice Title <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Annual Tech Fest Registration Open"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1.5">
                                Category
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {categoryOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setCategory(opt.value)}
                                        className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${category === opt.value
                                            ? categoryColorMap[opt.value]
                                            : 'border-transparent bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                                            }`}
                                    >
                                        {opt.icon}
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1.5">
                                Description <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Write the notice content here..."
                                rows={4}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-gray-400 resize-none"
                            />
                        </div>

                        {/* Points (Event only) */}
                        {isEvent && (
                            <div className="animate-fade-in-up">
                                <label className="block text-sm font-semibold text-gray-600 mb-1.5">
                                    <span className="flex items-center gap-1.5">
                                        <Zap className="w-4 h-4 text-accent" />
                                        Points Reward
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    value={pointsReward}
                                    onChange={(e) => setPointsReward(Number(e.target.value))}
                                    min={0}
                                    max={500}
                                    placeholder="e.g., 50"
                                    className="w-full px-4 py-2.5 rounded-xl border border-accent/30 bg-accent/5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 transition-all"
                                />
                                <p className="text-[11px] text-gray-400 mt-1.5">Students earn these points when they check in to this event.</p>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Publish Notice
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Posted Notices */}
                <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4 text-primary" />
                    <h2 className="text-base font-bold text-gray-800">Published Notices</h2>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                        {notices.length}
                    </span>
                </div>

                <div className="space-y-3">
                    {notices.map((notice, i) => (
                        <NoticeCard
                            key={notice.id}
                            notice={notice}
                            showDelete={true}
                            animationDelay={i * 60}
                        />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
