import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Zap, Check } from 'lucide-react';

interface StepServiceProps {
    selected: string | null;
    onSelect: (id: string) => void;
}

export const StepService: React.FC<StepServiceProps> = ({ selected, onSelect }) => {
    const services = [
        {
            id: 'maintenance',
            title: 'Maintenance Detail',
            price: 150,
            icon: Sparkles,
            features: ['Exterior Hand Wash', 'Wheel & Tire Clean', 'Interior Vacuum', 'Wipe Down Surfaces'],
            popular: false,
        },
        {
            id: 'executive',
            title: 'Executive Detail',
            price: 250,
            icon: Shield,
            features: ['Everything in Maintenance', 'Leather Conditioning', 'Clay Bar Treatment', '6-Month Sealant'],
            popular: true,
        },
        {
            id: 'ceramic',
            title: 'Ceramic Coating',
            price: 800,
            icon: Zap,
            features: ['Paint Correction', '3-Year Ceramic Coating', 'Full Interior Detail', 'Engine Bay Detail'],
            popular: false,
        },
    ];

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-serif font-bold text-white mb-2">Choose Your Package</h2>
                <p className="text-slate-400">Select the level of care your vehicle needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service) => (
                    <motion.button
                        key={service.id}
                        whileHover={{ y: -5 }}
                        onClick={() => onSelect(service.id)}
                        className={`relative p-6 rounded-xl border-2 text-left transition-all ${selected === service.id
                                ? 'bg-brand-gold/10 border-brand-gold'
                                : 'bg-white/5 border-white/10 hover:border-brand-gold/30'
                            }`}
                    >
                        {service.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-darker text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Most Popular
                            </div>
                        )}

                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${selected === service.id ? 'bg-brand-gold text-brand-darker' : 'bg-white/10 text-slate-400'
                            }`}>
                            <service.icon size={24} />
                        </div>

                        <h3 className="font-bold text-xl text-white mb-1">{service.title}</h3>
                        <p className="text-brand-gold font-mono font-bold text-lg mb-4">From ${service.price}</p>

                        <ul className="space-y-2">
                            {service.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                    <Check size={14} className="text-brand-gold mt-1 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
