import React from 'react';

export const Appointments: React.FC = () => (
    <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-6">Upcoming Appointments</h1>
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            <p className="text-slate-400">You have no upcoming appointments scheduled.</p>
        </div>
    </div>
);

export const History: React.FC = () => (
    <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-6">Service History</h1>
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            <p className="text-slate-400">Your service history will appear here.</p>
        </div>
    </div>
);

export const Settings: React.FC = () => (
    <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-6">Account Settings</h1>
        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">Profile Information</h3>
            <p className="text-slate-400 mb-8">Manage your personal details and preferences.</p>

            <h3 className="text-xl font-bold text-white mb-4">Payment Methods</h3>
            <div className="p-4 border border-dashed border-white/20 rounded-lg text-center text-slate-400 hover:border-brand-gold/50 hover:text-brand-gold transition-colors cursor-pointer">
                + Add New Card
            </div>
        </div>
    </div>
);
