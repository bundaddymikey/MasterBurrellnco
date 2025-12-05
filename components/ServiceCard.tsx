import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Clock, ArrowRight } from 'lucide-react';
import { ServicePackage } from '../types';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceCardProps {
  service: ServicePackage;
  vehicleType: 'sedan' | 'large';
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, vehicleType }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  const currentPrice = vehicleType === 'sedan' ? service.priceSedan : service.priceLarge;

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/booking?service=${service.id}`)}
      className={`group relative bg-black/40 backdrop-blur-md border ${service.popular ? 'border-brand-gold' : 'border-white/10'} flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:z-10 overflow-hidden rounded-2xl cursor-pointer`}
    >
      {/* Spotlight Effect Overlay */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,195,0,0.05), transparent 40%)`
        }}
      />

      {service.popular && (
        <div className="absolute top-0 right-0 bg-brand-gold text-black text-xs font-bold px-4 py-1 uppercase tracking-wider z-20 rounded-bl-lg shadow-md font-mono">
          Most Popular
        </div>
      )}

      {/* Image with Ken Burns Effect */}
      <div className="h-56 overflow-hidden relative group/image rounded-t-2xl z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
        />

        <div className="absolute bottom-4 left-6 z-20">
          <div className="flex items-center gap-2 text-brand-gold text-xs font-mono uppercase tracking-wider bg-black/50 backdrop-blur-sm px-2 py-1 rounded mb-1 w-fit">
            <Clock size={12} />
            <span>{service.duration}</span>
          </div>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col z-10 relative">
        <div className="min-h-[4rem] mb-2">
          <h3 className="text-2xl font-sans font-bold text-white uppercase tracking-wide group-hover:text-brand-gold transition-colors line-clamp-2">
            {service.title}
          </h3>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans min-h-[2.5rem] line-clamp-2">
          {service.description}
        </p>

        {/* Dynamic Price */}
        <div className="mb-6 flex items-baseline gap-2">
          <span className="text-brand-gold text-lg font-bold">$</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentPrice}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-4xl font-bold text-white font-sans"
            >
              {currentPrice}
            </motion.span>
          </AnimatePresence>
          <span className="text-slate-500 text-sm font-mono uppercase">Starting At</span>
        </div>

        <div className="space-y-3 mb-8 flex-grow">
          {service.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 group/feature"
            >
              <div className="mt-1 flex-shrink-0 text-brand-gold">
                <div className="w-4 h-4 rounded-full bg-brand-gold flex items-center justify-center">
                  <Check size={10} className="text-black stroke-[4]" />
                </div>
              </div>
              <span className="text-sm text-gray-300 group-hover/feature:text-white transition-colors font-sans">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto w-full" onClick={(e) => e.stopPropagation()}>
          <Button
            to={`/booking?service=${service.id}`}
            variant="primary"
            className="w-full justify-center !bg-brand-gold !text-black !font-bold hover:!bg-white hover:!scale-[1.02] transition-all shadow-lg shadow-brand-gold/10 group/btn"
          >
            <span>Book Now</span>
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Button>

          <Link
            to={`/services/${service.id}`}
            className="block text-center mt-4 text-xs text-slate-500 hover:text-white uppercase tracking-widest transition-colors font-mono"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};