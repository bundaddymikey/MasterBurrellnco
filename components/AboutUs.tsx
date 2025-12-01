import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { ChevronDown, ChevronUp, Loader2, History } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [isMissionExpanded, setIsMissionExpanded] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCTA(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0, rootMargin: "0px" }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const particles = useMemo(() => [...Array(25)].map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    sway: Math.random() * 30 - 15
  })), []);

  const goldDust = useMemo(() => [...Array(12)].map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 5 + 3,
    delay: Math.random() * 2
  })), []);

  return (
    <section id="about" className="py-24 bg-brand-dark relative overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            opacity: [0.03, 0.08, 0.03]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -right-20 -top-20 w-[600px] h-[600px] bg-brand-gold rounded-full blur-[100px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            opacity: [0.02, 0.06, 0.02]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -left-20 -bottom-20 w-[700px] h-[700px] bg-white rounded-full blur-[120px]"
        />

        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand-gold/40"
            initial={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              opacity: 0
            }}
            animate={{
              y: [0, -100],
              x: [0, p.sway],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut"
            }}
            style={{
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
              {goldDust.map((p, i) => (
                <motion.div
                  key={`text-${i}`}
                  className="absolute rounded-full bg-brand-gold blur-[1px]"
                  initial={{ opacity: 0 }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 0.4, 0],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: "easeInOut"
                  }}
                  style={{
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    width: p.size,
                    height: p.size,
                  }}
                />
              ))}
            </div>

            <h2 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-3 font-mono">Our Story</h2>
            <motion.h3
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.1 }}
              className="text-3xl md:text-5xl font-serif font-bold text-white mb-6"
            >
              Who We Are.
            </motion.h3>

            <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-sans max-w-3xl mx-auto">
              <p>
                At <span className="text-white font-semibold">Burrell & Co.</span>, we believe every car deserves showroom level care, inside and out. We specialize in high quality professional detailing that brings back that fresh off the lot feel.
              </p>
              <p>
                Our team is passionate about precision and treats every vehicle like it is our own. Customer satisfaction is not a goal for us, it is the standard we work by.
              </p>
              <p>
                Whether it is a quick wash or a full interior restoration, we are here to deliver results that make you look twice.
              </p>

              <div className="mt-8 mb-6 bg-black/40 rounded-xl border-l-4 border-brand-gold backdrop-blur-sm overflow-hidden transition-colors hover:bg-black/50 text-left">
                <button
                  onClick={() => setIsMissionExpanded(!isMissionExpanded)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                >
                  <h4 className="text-white font-serif font-bold text-xl group-hover:text-brand-gold transition-colors">Our Mission</h4>
                  {isMissionExpanded ? <ChevronUp className="text-brand-gold" /> : <ChevronDown className="text-brand-gold" />}
                </button>

                <AnimatePresence>
                  {isMissionExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-base text-slate-300">
                          To elevate the standard of mobile car care by combining convenience with uncompromising quality. We pledge to use premium, eco-conscious products and advanced techniques to protect your investment, ensuring every client feels the pride of driving a showroom-ready vehicle.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-4xl font-serif font-bold text-brand-gold mb-1">100%</div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-mono">Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-brand-gold mb-1">24/7</div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-mono">Availability</div>
              </div>
            </div>

            <div className="mt-10" ref={buttonRef}>
              <Button to="/booking" variant="primary" className="w-full sm:w-auto shadow-lg hover:shadow-brand-gold/20">
                Experience the Difference - Book Now
              </Button>
            </div>
          </motion.div>

        </div>
      </div>

      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-brand-darker/95 backdrop-blur-lg border-t border-brand-gold/20 z-50 flex justify-center md:justify-end md:pr-8 md:pb-6 md:bg-transparent md:border-none md:backdrop-blur-none pointer-events-none"
          >
            <div className="pointer-events-auto w-full md:w-auto shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <Button
                to="/booking"
                variant="primary"
                fullWidth
                className="shadow-[0_0_20px_rgba(255,195,0,0.4)] text-sm md:text-base py-4 md:py-3"
              >
                Book Your Detail Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};