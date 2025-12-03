import React from 'react';
import { motion } from 'framer-motion';
import { Car, Truck, Bus } from 'lucide-react';

interface StepVehicleProps {
    selected: 'sedan' | 'suv' | 'truck' | null;
    onSelect: (type: 'sedan' | 'suv' | 'truck') => void;
}

export const StepVehicle: React.FC<StepVehicleProps> = ({ selected, onSelect }) => {
    const vehicles = [
        { id: 'sedan', label: 'Sedan / Coupe', icon: Car, desc: '2-4 Door Cars' },
        { id: 'suv', label: 'SUV / Crossover', icon: Bus, desc: 'Small to Mid-size SUVs' },
        { id: 'truck', label: 'Truck / Van', icon: Truck, desc: 'Large SUVs, Trucks, Minivans' },
    ] as const;

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-serif font-bold text-white mb-2">Select Your Vehicle</h2>
                <p className="text-slate-400">Pricing varies by vehicle size.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vehicles.map((vehicle) => (
                    <motion.button
                        key={vehicle.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(vehicle.id)}
                        className={`p-6 rounded-xl border-2 transition-all text-left group ${selected === vehicle.id
                                ? 'bg-brand-gold/10 border-brand-gold'
                                : 'bg-white/5 border-white/10 hover:border-brand-gold/50'
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${selected === vehicle.id ? 'bg-brand-gold text-brand-darker' : 'bg-white/10 text-slate-400 group-hover:text-brand-gold'
                            }`}>
                            <vehicle.icon size={24} />
                        </div>
                        <h3 className={`font-bold text-lg mb-1 ${selected === vehicle.id ? 'text-brand-gold' : 'text-white'}`}>
                            {vehicle.label}
                        </h3>
                        <p className="text-sm text-slate-400">{vehicle.desc}</p>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
