import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SERVICES } from '../../constants';
import { ServiceType } from '../../types';

interface StepServiceProps {
    selected: string | null;
    onSelect: (id: string) => void;
}

export const StepService: React.FC<StepServiceProps> = ({ selected, onSelect }) => {
    // Filter out Engine Bay (and any other add-ons)
    const services = SERVICES.filter(s => s.type !== ServiceType.ENGINE);

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
                        className={`relative p-0 rounded-xl border text-left transition-all backdrop-blur-md overflow-hidden h-full flex flex-col ${selected === service.id
                            ? 'bg-brand-gold/10 border-brand-gold shadow-[0_0_20px_rgba(255,195,0,0.15)]'
                            : 'bg-black/40 border-white/10 hover:border-brand-gold/30 hover:bg-black/60'
                            }`}
                    >
                        {service.popular && (
                            <div className="absolute top-4 right-4 z-10 bg-brand-gold text-brand-darker text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                Most Popular
                            </div>
                        )}

                        {/* Image Header */}
                        <div className="h-40 w-full relative overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10`} />
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute bottom-4 left-4 z-20">
                                <h3 className="font-bold text-xl text-white leading-tight">{service.title}</h3>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <div className="mb-4">
                                <p className="text-brand-gold font-mono font-bold text-2xl">${service.price}</p>
                                <p className="text-slate-500 text-xs mt-1">{service.duration}</p>
                            </div>

                            <p className="text-slate-300 text-sm mb-6 leading-relaxed min-h-[60px]">
                                {service.description}
                            </p>

                            <ul className="space-y-3 mt-auto">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                        <Check size={14} className="text-brand-gold mt-1 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className={`mt-6 w-full py-3 rounded-lg text-center font-bold uppercase tracking-wider text-sm transition-colors ${selected === service.id
                                    ? 'bg-brand-gold text-black'
                                    : 'bg-white/10 text-white group-hover:bg-white/20'
                                }`}>
                                {selected === service.id ? 'Selected' : 'Select Package'}
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
