import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, User, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { SERVICES } from '../../constants';

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
    const [isLocating, setIsLocating] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(contact);
    };

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setIsLocating(true);

        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
                const data = await response.json();

                if (data && data.address) {
                    const addr = data.address;
                    const zip = addr.postcode || '';
                    const city = addr.city || addr.town || addr.village || addr.hamlet || '';
                    const state = "CA"; // We generally expect CA based on business area

                    // Construct clean address string
                    const parts = [
                        `${addr.house_number || ''} ${addr.road || ''}`.trim(),
                        city,
                        `${state} ${zip}`.trim()
                    ].filter(part => part.length > 0);

                    const formattedAddress = parts.join(', ');

                    setContact(prev => ({
                        ...prev,
                        address: formattedAddress
                    }));
                }
            } catch (error) {
                console.error("Error getting location:", error);
                alert("Unable to retrieve address from location.");
            } finally {
                setIsLocating(false);
            }
        }, (error) => {
            console.error("Geolocation error:", error);
            alert("Unable to retrieve your location. Please ensure you have granted permission.");
            setIsLocating(false);
        });
    };

    // Calculate Total
    const selectedService = SERVICES.find(s => s.id === data.serviceId);
    const basePrice = selectedService
        ? (data.vehicleType === 'large' ? selectedService.priceLarge : selectedService.priceSedan)
        : 0;

    const addons = SERVICES.filter(s => data.addonIds?.includes(s.id));
    const addonsTotal = addons.reduce((sum, addon) => sum + addon.price, 0);
    const total = basePrice + addonsTotal;

    return (
        <div className="space-y-8">
            <div className="text-center">
                <div>
                    <h3 className="text-white font-bold mb-1">Location</h3>
                    <p className="text-slate-400 text-sm">We come to you (Southern California)</p>
                </div>
            </div>     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Summary Card */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-fit">
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Booking Summary</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Vehicle</span>
                            <span className="text-white capitalize">{data.vehicleType}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Package</span>
                            <span className="text-white capitalize">{data.serviceId}</span>
                        </div>

                        {addons.length > 0 && (
                            <div className="border-t border-white/5 pt-2 mt-2">
                                <span className="text-slate-400 block mb-1">Add-ons:</span>
                                {addons.map(addon => (
                                    <div key={addon.id} className="flex justify-between pl-2">
                                        <span className="text-slate-300 text-xs">{addon.title}</span>
                                        <span className="text-brand-gold text-xs">+${addon.price}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-between border-t border-white/5 pt-2 mt-2">
                            <span className="text-slate-400">Date</span>
                            <span className="text-white">
                                {(() => {
                                    if (!data.date) return '';
                                    const [year, month, day] = data.date.split('-');
                                    return `${parseInt(month)}/${parseInt(day)}/${year}`;
                                })()}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Time</span>
                            <span className="text-white">{data.time}</span>
                        </div>
                        <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-lg">
                            <span className="text-brand-gold">Total (Est.)</span>
                            <span className="text-white">${total}.00</span>
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
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-slate-400">Service Address</label>
                            <button
                                type="button"
                                onClick={handleUseCurrentLocation}
                                disabled={isLocating}
                                className="text-xs text-brand-gold bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/20 px-3 py-1 rounded-full flex items-center gap-2 transition-all disabled:opacity-50 uppercase tracking-wider font-bold"
                            >
                                {isLocating ? <Loader2 size={12} className="animate-spin" /> : <MapPin size={12} />}
                                {isLocating ? 'Locating...' : 'Use Current Location'}
                            </button>
                        </div>
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
