import React from 'react';
import { motion } from 'framer-motion';
import { Check, User, Mail, Phone, MapPin } from 'lucide-react';

interface StepReviewProps {
    data: any;
    onSubmit: (contact: any) => void;
}

export const StepReview: React.FC<StepReviewProps> = ({ data, onSubmit }) => {
    const [contact, setContact] = React.useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(contact);
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-serif font-bold text-white mb-2">Final Details</h2>
                <p className="text-slate-400">Where should we send the confirmation?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Summary Card */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-fit">
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Booking Summary</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Vehicle</span>
                            <span className="text-white capitalize">{data.vehicleType}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Service</span>
                            <span className="text-white capitalize">{data.serviceId}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Date</span>
                            <span className="text-white">{data.date}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Time</span>
                            <span className="text-white">{data.time}</span>
                        </div>
                        <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-lg">
                            <span className="text-brand-gold">Total (Est.)</span>
                            <span className="text-white">$150.00</span>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                required
                                value={contact.name}
                                onChange={e => setContact({ ...contact, name: e.target.value })}
                                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="email"
                                required
                                value={contact.email}
                                onChange={e => setContact({ ...contact, email: e.target.value })}
                                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Phone</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="tel"
                                required
                                value={contact.phone}
                                onChange={e => setContact({ ...contact, phone: e.target.value })}
                                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none"
                                placeholder="(555) 555-5555"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Service Address</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="text"
                                required
                                value={contact.address}
                                onChange={e => setContact({ ...contact, address: e.target.value })}
                                className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none"
                                placeholder="123 Main St, Rancho Cucamonga"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brand-gold text-brand-darker font-bold py-4 rounded-lg hover:bg-white transition-colors mt-4"
                    >
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};
