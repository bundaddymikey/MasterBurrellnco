import React, { useRef } from 'react';
import { SERVICES } from '../constants';
import { ServiceCard } from './ServiceCard';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Services: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3 font-mono">Our Expertise</h2>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Detailing Packages</h2>
          <p className="text-slate-400 font-sans text-lg max-w-2xl mx-auto">
            We offer a range of professional detailing packages tailored to your needs. Whether you need a quick maintenance wash to keep your car looking sharp or a full detail to restore its showroom glory, we have you covered.
          </p>
        </div>

        {/* Mobile: Horizontal Scroll Snap | Desktop: Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-6 px-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:pb-0 md:mx-0 md:px-0 md:overflow-visible">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="flex-shrink-0 w-[85vw] sm:w-[400px] snap-center md:w-auto md:snap-align-none"
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};