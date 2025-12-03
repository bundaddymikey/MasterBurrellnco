import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

interface StepDateTimeProps {
    date: string;
    time: string;
    onDateChange: (date: string) => void;
    onTimeChange: (time: string) => void;
}

export const StepDateTime: React.FC<StepDateTimeProps> = ({ date, time, onDateChange, onTimeChange }) => {
    // Generate next 7 days for demo
    const dates = Array.from({ length: 5 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return {
            value: d.toISOString().split('T')[0],
            label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        };
    });

    const times = [
        '09:00 AM', '10:00 AM', '11:00 AM',
        '01:00 PM', '02:00 PM', '03:00 PM'
    ];

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-serif font-bold text-white mb-2">Schedule Service</h2>
                <p className="text-slate-400">We come to you. Choose a convenient time.</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-3 font-mono uppercase tracking-wider">Select Date</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {dates.map((d) => (
                            <button
                                key={d.value}
                                onClick={() => onDateChange(d.value)}
                                className={`p-3 rounded-lg border text-center transition-all ${date === d.value
                                        ? 'bg-brand-gold text-brand-darker border-brand-gold font-bold'
                                        : 'bg-white/5 border-white/10 text-slate-300 hover:border-brand-gold/50'
                                    }`}
                            >
                                {d.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-3 font-mono uppercase tracking-wider">Select Time</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {times.map((t) => (
                            <button
                                key={t}
                                onClick={() => onTimeChange(t)}
                                className={`p-3 rounded-lg border text-center transition-all flex items-center justify-center gap-2 ${time === t
                                        ? 'bg-brand-gold text-brand-darker border-brand-gold font-bold'
                                        : 'bg-white/5 border-white/10 text-slate-300 hover:border-brand-gold/50'
                                    }`}
                            >
                                <Clock size={16} />
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
