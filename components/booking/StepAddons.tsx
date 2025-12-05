import React from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, Info } from 'lucide-react';
import { SERVICES } from '../../constants';
import { ServiceType } from '../../types';

interface StepAddonsProps {
    selectedAddons: string[];
    onToggleAddon: (id: string) => void;
}

export const StepAddons: React.FC<StepAddonsProps> = ({ selectedAddons, onToggleAddon }) => {
    // Filter for add-on services (currently just Engine Bay)
    // You can add more types here later like 'ADDON' if you update the enum
    const addons = SERVICES.filter(s => s.type === ServiceType.ENGINE);

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-serif font-bold text-white mb-2">Enhance Your Service</h2>
                <p className="text-slate-400">Select any additional services you'd like to add.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {addons.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);

                    return (
                        <motion.div
                            key={addon.id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => onToggleAddon(addon.id)}
                            className={`cursor-pointer relative overflow-hidden rounded-xl border transition-all duration-300 ${isSelected
                                ? 'bg-brand-gold/10 border-brand-gold shadow-[0_0_20px_rgba(255,195,0,0.1)]'
                                : 'bg-black/40 border-white/10 hover:border-brand-gold/50 hover:bg-white/5'
                                }`}
                        >
                            <div className="flex flex-col md:flex-row h-full">
                                {/* Image Section */}
                                <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                                    <div className={`absolute inset-0 bg-brand-gold/10 mix-blend-overlay transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                                    <img
                                        src={addon.image}
                                        alt={addon.title}
                                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className={`text-xl font-bold font-serif ${isSelected ? 'text-brand-gold' : 'text-white'}`}>
                                                {addon.title}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-brand-gold font-bold font-mono text-lg">
                                                    +${addon.price}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-slate-400 text-sm mb-4 font-sans leading-relaxed">
                                            {addon.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {addon.features.slice(0, 3).map((feature, idx) => (
                                                <span key={idx} className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded border border-white/5 flex items-center gap-1">
                                                    <Check size={10} className="text-brand-gold" /> {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${isSelected
                                                ? 'bg-brand-gold text-black'
                                                : 'bg-white/10 text-white group-hover:bg-white/20'
                                            }`}>
                                            {isSelected ? (
                                                <>
                                                    <Check size={16} /> Added
                                                </>
                                            ) : (
                                                <>
                                                    <Plus size={16} /> Add to Booking
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
