import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Lock, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/Button';

const REWARDS = [
    { id: 1, title: '$25 Off First Booking', points: 0, description: 'Welcome gift for new members', unlocked: true },
    { id: 2, title: 'Free Wax Upgrade', points: 500, description: 'Add premium wax to any wash', unlocked: true },
    { id: 3, title: '$20 Off Service', points: 1000, description: 'Discount on your next detail', unlocked: true },
    { id: 4, title: 'Free Interior Detail', points: 2500, description: 'Full interior deep clean', unlocked: false },
    { id: 5, title: 'Platinum Status', points: 5000, description: '15% off all services forever', unlocked: false },
];

export const Rewards: React.FC = () => {
    const { user } = useAuth();
    const progress = Math.min(((user?.points || 0) / 5000) * 100, 100);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold text-white mb-2">Rewards & Points</h1>
                <p className="text-slate-400">Earn 1 point for every $1 spent. Redeem for exclusive perks.</p>
            </div>

            {/* Progress Card */}
            <div className="bg-gradient-to-r from-brand-dark to-brand-darker border border-brand-gold/20 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <p className="text-brand-gold font-mono uppercase tracking-wider text-sm mb-1">Current Balance</p>
                            <h2 className="text-5xl font-bold text-white">{user?.points} <span className="text-2xl text-slate-500 font-normal">pts</span></h2>
                        </div>
                        <div className="text-right">
                            <p className="text-white font-bold text-lg">{user?.tier} Member</p>
                            <p className="text-slate-400 text-sm">Next Tier: Platinum (5000 pts)</p>
                        </div>
                    </div>

                    <div className="h-4 bg-black/40 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-brand-gold"
                        />
                    </div>
                </div>
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {REWARDS.map((reward) => (
                    <div
                        key={reward.id}
                        className={`p-6 rounded-xl border ${reward.unlocked
                                ? 'bg-white/5 border-brand-gold/30'
                                : 'bg-white/5 border-white/5 opacity-60'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${reward.unlocked ? 'bg-brand-gold/10 text-brand-gold' : 'bg-slate-800 text-slate-500'}`}>
                                {reward.unlocked ? <Gift size={24} /> : <Lock size={24} />}
                            </div>
                            <span className="font-bold text-white">{reward.points > 0 ? `${reward.points} pts` : 'FREE'}</span>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2">{reward.title}</h3>
                        <p className="text-sm text-slate-400 mb-6">{reward.description}</p>

                        <Button
                            variant={reward.unlocked ? 'primary' : 'outline'}
                            className="w-full justify-center"
                            disabled={!reward.unlocked}
                        >
                            {reward.unlocked ? 'Redeem Reward' : 'Locked'}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};
