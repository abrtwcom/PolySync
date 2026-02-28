'use client';

import { useEffect, useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';

interface PointsBadgeProps {
    points: number;
    size?: 'sm' | 'lg';
}

export default function PointsBadge({ points, size = 'lg' }: PointsBadgeProps) {
    const [displayPoints, setDisplayPoints] = useState(points);
    const [isAnimating, setIsAnimating] = useState(false);
    const prevPoints = useRef(points);

    useEffect(() => {
        if (points !== prevPoints.current) {
            setIsAnimating(true);
            // Animate counter
            const diff = points - prevPoints.current;
            const steps = 20;
            const stepValue = diff / steps;
            let current = prevPoints.current;
            let step = 0;

            const interval = setInterval(() => {
                step++;
                current += stepValue;
                setDisplayPoints(Math.round(current));
                if (step >= steps) {
                    clearInterval(interval);
                    setDisplayPoints(points);
                    setTimeout(() => setIsAnimating(false), 500);
                }
            }, 30);

            prevPoints.current = points;
            return () => clearInterval(interval);
        }
    }, [points]);

    if (size === 'sm') {
        return (
            <span className={`inline-flex items-center gap-1 text-sm font-bold text-accent-dark ${isAnimating ? 'animate-points-pop' : ''}`}>
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                {displayPoints}
            </span>
        );
    }

    return (
        <div className={`relative inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border border-accent/20 ${isAnimating ? 'animate-pulse-glow' : ''}`}>
            <Sparkles className={`w-5 h-5 text-accent ${isAnimating ? 'animate-spin' : ''}`} />
            <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-accent-dark/70">Activity Points</p>
                <p className={`text-2xl font-black text-accent-dark ${isAnimating ? 'animate-points-pop' : ''}`}>
                    {displayPoints}
                </p>
            </div>
            {isAnimating && (
                <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-accent text-white text-xs font-bold animate-bounce">
                    +{points - (prevPoints.current - (points - displayPoints))}
                </div>
            )}
        </div>
    );
}
