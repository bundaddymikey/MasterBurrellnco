import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Shield, Clock } from 'lucide-react';
import { Button } from './Button';

const PLANS = [
    {
        name: "Maintenance",
        price: "150",
        frequency: "Monthly",
        description: "Perfect for keeping your daily driver in showroom condition.",
        features: [
            "1 Full Detail per month",
            "Exterior Hand Wash & Wax",
            "Interior Vacuum & Wipe Down",
            "Tire Dressing & Rim Cleaning",
            "Priority Scheduling"
        ],
        popular: false
    },
    {
        name: "Executive",
        price: "250",
        frequency: "Bi-Weekly",
        description: "The ultimate care package for those who demand perfection.",
        features: [
            "2 Full Details per month",
            "Everything in Maintenance Plan",
            "Leather Conditioning",
            "Engine Bay Rinse",
            "10% Off Additional Services"
        ],
        popular: true
    },
    {
        name: "Fleet / Family",
        price: "Custom",
        frequency: "Flexible",
        description: "Tailored solutions for multiple vehicles or business fleets.",
        features: [
            "Custom Schedule",
            "Multi-Vehicle Discount",
            "Dedicated Account Manager",
            "On-Site Service",
            "Monthly Billing"
        ],
        popular: false
    }
];

export const Subscriptions: React.FC = () => {
    return (
        <div className="min-h-screen bg-brand-darker pt-24 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif font-bold text-white mb-4"
                    >
                        Monthly Maintenance Plans
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        Keep your vehicle pristine year-round with our hassle-free subscription packages.
                        Consistent care means better protection and higher resale value.
                    </motion.p>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {PLANS.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className={`relative rounded-2xl p-8 border ${plan.popular ? 'bg-white/5 border-brand-gold shadow-[0_0_30px_rgba(255,195,0,0.1)]' : 'bg-white/5 border-white/10'} flex flex-col`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-darker text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-serif font-bold text-white mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-bold text-brand-gold">{plan.price === "Custom" ? "" : "$"}{plan.price}</span>
                                    <span className="text-slate-400 font-mono text-sm">/{plan.frequency}</span>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                                        <Check size={16} className="text-brand-gold shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                to="/contact"
                                variant={plan.popular ? 'primary' : 'outline'}
                                className="w-full justify-center"
                            >
                                {plan.price === "Custom" ? "Contact for Quote" : "Subscribe Now"}
                            </Button>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits Section */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="p-6"
                    >
                        <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold mx-auto mb-4">
                            <Shield size={24} />
                        </div>
                        <h3 className="text-white font-bold mb-2">Always Protected</h3>
                        <p className="text-slate-400 text-sm">Regular waxing and sealing protects your paint from UV rays and contaminants.</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-6"
                    >
                        <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold mx-auto mb-4">
                            <Star size={24} />
                        </div>
                        <h3 className="text-white font-bold mb-2">Showroom Shine</h3>
                        <p className="text-slate-400 text-sm">Never drive a dirty car again. We keep your vehicle looking brand new.</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-6"
                    >
                        <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold mx-auto mb-4">
                            <Clock size={24} />
                        </div>
                        <h3 className="text-white font-bold mb-2">Set & Forget</h3>
                        <p className="text-slate-400 text-sm">We handle the scheduling. You just enjoy a clean car.</p>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};
