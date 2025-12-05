import React, { useRef, useState } from 'react';
import { SERVICES } from '../constants';
import { ServiceType } from '../types';
import { ServiceCard } from './ServiceCard';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Car, Truck } from 'lucide-react';

export const Services: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [vehicleType, setVehicleType] = useState<'sedan' | 'large'>('sedan');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-24 bg-brand-darker relative scroll-mt-24 overflow-hidden"
    >
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="relative w-full h-[120%] -top-[10%]"
        >
          <div className="absolute inset-0 bg-brand-darker/95 z-10" />
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80"
            alt="Background Texture"
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3 font-mono">Our Expertise</h2>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Detailing Packages</h2>
          <p className="text-slate-400 font-sans text-lg max-w-2xl mx-auto mb-8">
            We offer a range of professional detailing packages tailored to your needs. Whether you need a quick maintenance wash or a full restoration.
          </p>

          {/* Pricing Toggle */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-slate-400 text-xs font-mono uppercase tracking-widest">Pricing For</span>
            <div className="inline-flex bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 relative shadow-2xl">
              <motion.div
                className="absolute top-1.5 bottom-1.5 bg-brand-gold rounded-full z-0 shadow-[0_0_15px_rgba(255,195,0,0.3)]"
                initial={false}
                animate={{
                  left: vehicleType === 'sedan' ? '6px' : '50%',
                  width: 'calc(50% - 6px)'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              <button
                onClick={() => setVehicleType('sedan')}
                className={`relative z-10 px-8 py-3 rounded-full flex items-center gap-2 transition-colors duration-200 ${vehicleType === 'sedan' ? 'text-brand-darker' : 'text-slate-400 hover:text-white'
                  }`}
              >
                <Car size={18} className={vehicleType === 'sedan' ? 'stroke-[2.5]' : ''} />
                <span className="text-sm font-bold uppercase tracking-wider">Sedan</span>
              </button>
              <button
                onClick={() => setVehicleType('large')}
                className={`relative z-10 px-8 py-3 rounded-full flex items-center gap-2 transition-colors duration-200 ${vehicleType === 'large' ? 'text-brand-darker' : 'text-slate-400 hover:text-white'
                  }`}
              >
                <Truck size={18} className={vehicleType === 'large' ? 'stroke-[2.5]' : ''} />
                <span className="text-sm font-bold uppercase tracking-wider">SUV / Truck</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile: Horizontal Scroll Snap | Desktop: Grid */}
        import {ServiceType} from '../types';

        // ... inside component ...
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-6 px-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:pb-0 md:mx-0 md:px-0 md:overflow-visible justify-center">
          {SERVICES.filter(s => s.type !== ServiceType.ENGINE).map((service) => (
            <div
              key={service.id}
              className="flex-shrink-0 w-[85vw] sm:w-[400px] snap-center md:w-auto md:snap-align-none"
            >
              <ServiceCard service={service} vehicleType={vehicleType} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};