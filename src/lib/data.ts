export type Category = 'General' | 'Exam' | 'Placement' | 'Event';

export interface User {
    id: string;
    name: string;
    role: 'student' | 'admin';
    points: number;
    avatar: string;
    department?: string;
}

export interface Notice {
    id: string;
    title: string;
    description: string;
    category: Category;
    date: string;
    isEvent: boolean;
    pointsReward: number;
    rsvpUsers: string[];
}

export const mockUsers: User[] = [
    { id: 'admin-1', name: 'Prof. Rajesh Kumar', role: 'admin', points: 0, avatar: '👨‍🏫', department: 'Computer Science' },
    { id: 'student-1', name: 'Arjun Mehta', role: 'student', points: 420, avatar: '🧑‍💻', department: 'Computer Science' },
    { id: 'student-2', name: 'Priya Sharma', role: 'student', points: 380, avatar: '👩‍💻', department: 'Information Technology' },
    { id: 'student-3', name: 'Rohan Patel', role: 'student', points: 350, avatar: '🎓', department: 'Electronics' },
    { id: 'student-4', name: 'Sneha Reddy', role: 'student', points: 310, avatar: '📚', department: 'Computer Science' },
    { id: 'student-5', name: 'Karthik Nair', role: 'student', points: 290, avatar: '💡', department: 'Mechanical' },
    { id: 'student-6', name: 'Ananya Gupta', role: 'student', points: 270, avatar: '🎯', department: 'Information Technology' },
    { id: 'student-7', name: 'Vikram Singh', role: 'student', points: 250, avatar: '🚀', department: 'Computer Science' },
    { id: 'student-8', name: 'Kavya Joshi', role: 'student', points: 230, avatar: '✨', department: 'Electronics' },
    { id: 'student-9', name: 'Aditya Rao', role: 'student', points: 210, avatar: '🔥', department: 'Computer Science' },
    { id: 'student-10', name: 'Meera Iyer', role: 'student', points: 190, avatar: '🌟', department: 'Information Technology' },
];

export const mockNotices: Notice[] = [
    {
        id: 'notice-1',
        title: 'Annual Skill Showcase 2026',
        description: 'Join us for the biggest tech event of the year! Present your projects, participate in hackathons, and win exciting prizes. Open to all departments.',
        category: 'Event',
        date: '2026-02-27',
        isEvent: true,
        pointsReward: 100,
        rsvpUsers: [],
    },
    {
        id: 'notice-2',
        title: 'Mid-Semester Exam Schedule Released',
        description: 'The mid-semester examination schedule for all departments has been published. Please check the exam portal for your individual timetable and seat allotments.',
        category: 'Exam',
        date: '2026-02-20',
        isEvent: false,
        pointsReward: 0,
        rsvpUsers: [],
    },
    {
        id: 'notice-3',
        title: 'TCS Campus Placement Drive',
        description: 'TCS will be conducting an on-campus recruitment drive on March 5th. Eligible students from CS and IT departments must register through the placement cell portal by Feb 28th.',
        category: 'Placement',
        date: '2026-02-19',
        isEvent: true,
        pointsReward: 50,
        rsvpUsers: [],
    },
    {
        id: 'notice-4',
        title: 'Library Extended Hours During Exams',
        description: 'The central library will remain open until 10 PM during the examination period (March 1 - March 15). Students are encouraged to utilize this facility.',
        category: 'General',
        date: '2026-02-18',
        isEvent: false,
        pointsReward: 0,
        rsvpUsers: [],
    },
    {
        id: 'notice-5',
        title: 'Inter-College Coding Championship',
        description: 'Register for the Inter-College Coding Championship hosted by our CS department. Teams of 3 can participate. Registration closes on Feb 25th.',
        category: 'Event',
        date: '2026-02-17',
        isEvent: true,
        pointsReward: 75,
        rsvpUsers: [],
    },
    {
        id: 'notice-6',
        title: 'Workshop: Introduction to AI & Machine Learning',
        description: 'A hands-on 2-day workshop on AI/ML fundamentals will be conducted in Lab 204. Limited seats available — register on the student portal now.',
        category: 'Event',
        date: '2026-02-16',
        isEvent: true,
        pointsReward: 60,
        rsvpUsers: [],
    },
    {
        id: 'notice-7',
        title: 'Infosys Placement Results Announced',
        description: 'Congratulations to all students who have been selected in the recent Infosys campus drive. Selected candidates will receive offer letters via email within 2 weeks.',
        category: 'Placement',
        date: '2026-02-15',
        isEvent: false,
        pointsReward: 0,
        rsvpUsers: [],
    },
];
