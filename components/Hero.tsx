import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { MapPin } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();

  // Dynamic effects based on scroll position
  const backgroundBlur = useTransform(scrollY, [0, 600], ["blur(0px)", "blur(12px)"]);
  const backgroundScale = useTransform(scrollY, [0, 600], [1, 1.1]);

  return (
    <section className="relative h-[100dvh] min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear" }}
          style={{ filter: backgroundBlur, scale: backgroundScale }}
          className="w-full h-full origin-center"
        >
          <img
            src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Luxury Car Detail"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/50 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-20 h-full flex flex-col justify-center items-center">

        {/* Main Centered Content */}
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gold/10 border border-brand-gold/20 rounded-full text-brand-gold text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-sm font-mono"
          >
            <MapPin size={12} />
            Serving the Greater Rancho Cucamonga Area
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden w-full">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-wide mb-4 leading-tight uppercase font-sans"
            >
              SHOWROOM LEVEL DETAILING.
            </motion.h1>
          </div>

          {/* Subtext Span */}
          <div className="overflow-hidden w-full">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="block text-brand-gold font-serif italic font-bold tracking-[1px] text-2xl md:text-4xl mt-2 uppercase"
            >
              EVERY TIME.
            </motion.span>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 w-20 bg-brand-gold mx-auto mt-6 mb-10"
          />

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <Button
              to="/booking"
              variant="primary"
              className="hover:scale-105 min-w-[200px]"
            >
              Schedule Service
            </Button>
          </motion.div>


          {/* Centered Marquee Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 max-w-2xl w-full px-4"
          >
            <div className="w-full border-2 border-dashed border-brand-gold/30 rounded-lg relative py-4 px-8 flex items-center justify-center backdrop-blur-md bg-brand-darker/40 overflow-hidden group hover:border-brand-gold/60 transition-colors duration-500">

              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-gold opacity-30 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-gold opacity-30 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-gold opacity-30 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-gold opacity-30 group-hover:opacity-100 transition-opacity"></div>

              <div className="overflow-hidden whitespace-nowrap w-full">
                <motion.div
                  animate={{ x: [0, -1000] }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20,
                  }}
                  className="inline-block"
                >
                  <span className="text-xl md:text-2xl text-brand-gold font-serif italic font-bold tracking-wide mx-8">
                    Satisfaction guaranteed, or we'll return your dirt!
                  </span>
                  <span className="text-xl md:text-2xl text-brand-gold font-serif italic font-bold tracking-wide mx-8">
                    Satisfaction guaranteed, or we'll return your dirt!
                  </span>
                  <span className="text-xl md:text-2xl text-brand-gold font-serif italic font-bold tracking-wide mx-8">
                    Satisfaction guaranteed, or we'll return your dirt!
                  </span>
                  <span className="text-xl md:text-2xl text-brand-gold font-serif italic font-bold tracking-wide mx-8">
                    Satisfaction guaranteed, or we'll return your dirt!
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>


      </div>
    </section >
  );
};