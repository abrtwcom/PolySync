'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, Notice, Category, mockUsers, mockNotices } from '@/lib/data';

interface AppState {
    currentUser: User | null;
    users: User[];
    notices: Notice[];
    login: (role: 'student' | 'admin') => void;
    logout: () => void;
    addNotice: (notice: Omit<Notice, 'id' | 'date' | 'rsvpUsers'>) => void;
    deleteNotice: (id: string) => void;
    claimPoints: (noticeId: string) => boolean;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [notices, setNotices] = useState<Notice[]>(mockNotices);

    const login = useCallback((role: 'student' | 'admin') => {
        const user = role === 'admin'
            ? users.find(u => u.role === 'admin')!
            : users.find(u => u.id === 'student-1')!;
        setCurrentUser(user);
    }, [users]);

    const logout = useCallback(() => {
        setCurrentUser(null);
    }, []);

    const addNotice = useCallback((noticeData: Omit<Notice, 'id' | 'date' | 'rsvpUsers'>) => {
        const newNotice: Notice = {
            ...noticeData,
            id: `notice-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            rsvpUsers: [],
        };
        setNotices(prev => [newNotice, ...prev]);
    }, []);

    const deleteNotice = useCallback((id: string) => {
        setNotices(prev => prev.filter(n => n.id !== id));
    }, []);

    const claimPoints = useCallback((noticeId: string): boolean => {
        if (!currentUser || currentUser.role !== 'student') return false;

        const notice = notices.find(n => n.id === noticeId);
        if (!notice || !notice.isEvent) return false;
        if (notice.rsvpUsers.includes(currentUser.id)) return false;

        // Update notice RSVP list
        setNotices(prev =>
            prev.map(n =>
                n.id === noticeId
                    ? { ...n, rsvpUsers: [...n.rsvpUsers, currentUser.id] }
                    : n
            )
        );

        // Update user points
        const pointsToAdd = notice.pointsReward;
        setUsers(prev =>
            prev.map(u =>
                u.id === currentUser.id
                    ? { ...u, points: u.points + pointsToAdd }
                    : u
            )
        );

        setCurrentUser(prev =>
            prev ? { ...prev, points: prev.points + pointsToAdd } : null
        );

        return true;
    }, [currentUser, notices]);

    return (
        <AppContext.Provider
            value={{ currentUser, users, notices, login, logout, addNotice, deleteNotice, claimPoints }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
}
