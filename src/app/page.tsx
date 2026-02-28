'use client';

import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  Bell,
  GraduationCap,
  Shield,
  Sparkles,
  ArrowRight,
  Trophy,
  Users,
  Megaphone,
} from 'lucide-react';

export default function AuthPage() {
  const { currentUser, login } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push(currentUser.role === 'admin' ? '/admin' : '/student');
    }
  }, [currentUser, router]);

  const handleLogin = (role: 'student' | 'admin') => {
    login(role);
    router.push(role === 'admin' ? '/admin' : '/student');
  };

  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Logo & Brand */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-2xl">
            <Bell className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">
            Poly-Sync
          </h1>
          <p className="text-lg md:text-xl text-blue-200/80 font-medium max-w-md mx-auto">
            Smart Campus & Digital Notice Dashboard
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-fade-in-up stagger-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/10">
            <Megaphone className="w-3.5 h-3.5" /> Digital Notices
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/10">
            <Trophy className="w-3.5 h-3.5" /> Activity Points
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/10">
            <Users className="w-3.5 h-3.5" /> Campus Community
          </span>
        </div>

        {/* Login Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-xl animate-fade-in-up stagger-3">
          {/* Student Login */}
          <button
            onClick={() => handleLogin('student')}
            className="group relative p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-left transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Login as Student
            </h3>
            <p className="text-sm text-blue-200/70 mb-4">
              View notices, check in to events, earn activity points
            </p>
            <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-light group-hover:gap-3 transition-all">
              Continue
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Admin Login */}
          <button
            onClick={() => handleLogin('admin')}
            className="group relative p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-left transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Login as Admin
            </h3>
            <p className="text-sm text-blue-200/70 mb-4">
              Publish notices, manage events, view campus activity
            </p>
            <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-light group-hover:gap-3 transition-all">
              Continue
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center animate-fade-in-up stagger-4">
          <p className="text-xs text-blue-300/50">
            Built for the Diploma Project Showcase 2026
          </p>
          <div className="flex items-center justify-center gap-1 mt-1 text-xs text-blue-300/40">
            <Sparkles className="w-3 h-3" />
            Powered by Poly-Sync
          </div>
        </div>
      </div>
    </div>
  );
}
