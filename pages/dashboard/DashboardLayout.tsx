import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Calendar,
    Clock,
    Gift,
    Settings,
    LogOut,
    User as UserIcon
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const DashboardLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: Calendar, label: 'Appointments', path: '/dashboard/appointments' },
        { icon: Clock, label: 'History', path: '/dashboard/history' },
        { icon: Gift, label: 'Rewards', path: '/dashboard/rewards' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ];

    return (
        <div className="min-h-screen bg-brand-darker flex">
            {/* Sidebar */}
            <aside className="w-64 bg-black/20 border-r border-white/5 hidden md:flex flex-col fixed h-full">
                <div className="p-8">
                    <Link to="/" className="block">
                        <span className="font-display font-bold text-2xl text-white tracking-tight leading-none">
                            Burrell <span className="text-brand-gold font-serif italic">&</span> Co.
                        </span>
                    </Link>
                </div>

                <div className="px-6 mb-8">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                                <UserIcon size={20} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-white font-medium truncate">{user?.name}</p>
                                <p className="text-xs text-brand-gold font-mono uppercase">{user?.tier} Member</p>
                            </div>
                        </div>
                        <div className="text-xs text-slate-400 flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                            <span>Points Balance</span>
                            <span className="text-white font-bold">{user?.points} pts</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-brand-gold text-brand-darker font-bold'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all w-full"
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 pt-24 md:pt-8">
                <Outlet />
            </main>
        </div>
    );
};
