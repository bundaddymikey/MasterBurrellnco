import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/Button';

export const Overview: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-slate-400">Welcome back, {user?.name}</p>
                </div>
                <Button to="/booking" variant="primary" className="hidden md:flex">
                    Book New Service
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-brand-gold/10 rounded-lg text-brand-gold">
                            <Star size={24} />
                        </div>
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Points</span>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">{user?.points}</p>
                    <p className="text-sm text-slate-400">~${(user?.points || 0) / 20} redeemable value</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                            <Calendar size={24} />
                        </div>
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Next Service</span>
                    </div>
                    <p className="text-xl font-bold text-white mb-1">Dec 15, 2025</p>
                    <p className="text-sm text-slate-400">10:00 AM - Maintenance Detail</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
                            <Clock size={24} />
                        </div>
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Total Services</span>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">12</p>
                    <p className="text-sm text-slate-400">Lifetime cleanings</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                    <Button to="/dashboard/history" variant="outline" className="text-sm py-2">View All</Button>
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">Maintenance Detail</h4>
                                    <p className="text-sm text-slate-400">Nov {28 - i * 14}, 2025</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-white font-bold">$150.00</p>
                                <p className="text-xs text-green-400">Completed</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
