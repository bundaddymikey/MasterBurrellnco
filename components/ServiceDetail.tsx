import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import { Button } from './Button';
import { Check, ArrowLeft, Clock, DollarSign, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from './SEO';

export const ServiceDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const service = SERVICES.find(s => s.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) {
        return (
            <div className="min-h-screen bg-brand-darker flex flex-col items-center justify-center text-white">
                <SEO
                    title="Service Not Found | Burrell & Co"
                    description="The requested service could not be found."
                />
                <h2 className="text-2xl font-serif mb-4">Service Not Found</h2>
                <Button onClick={() => navigate('/#services')} variant="outline">Back to Services</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-darker pt-20">
            <SEO
                title={`${service.title} | Burrell & Co Mobile Detailing`}
                description={`Professional ${service.title} service by Burrell & Co. Mobile detailing in Rancho Cucamonga. ${service.description}`}
                canonical={`https://burrellnco.com/services/${service.id}`}
            />
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px]">
                <div className="absolute inset-0">
                    <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/60 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
                    <Link to="/#services" className="inline-flex items-center text-brand-gold hover:text-white mb-4 transition-colors font-mono text-sm uppercase tracking-wider">
                        <ArrowLeft size={16} className="mr-2" /> Back to Services
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif font-bold text-white mb-4"
                    >
                        {service.title}
                    </motion.h1>
                    <div className="flex flex-wrap gap-6 text-slate-300 font-mono text-sm md:text-base">
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-brand-gold" />
                            {service.duration}
                        </div>
                        <div className="flex items-center gap-2">
                            <DollarSign size={18} className="text-brand-gold" />
                            Starting at ${service.price}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-white mb-6">Service Overview</h2>
                            <p className="text-slate-300 leading-relaxed text-lg font-sans">
                                {service.description}
                                <br /><br />
                                Our {service.title} package is designed to provide the ultimate care for your vehicle.
                                We use only premium, pH-neutral products and professional-grade equipment to ensure
                                a finish that not only looks spectacular but also protects your investment.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-serif font-bold text-white mb-6">What's Included</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/5 hover:border-brand-gold/30 transition-colors">
                                        <Check size={20} className="text-brand-gold flex-shrink-0 mt-0.5" />
                                        <span className="text-slate-300 font-sans">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Process Section (Generic for now) */}
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-white mb-6">Our Process</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold text-black flex items-center justify-center font-bold font-mono">1</div>
                                    <div>
                                        <h3 className="text-white font-bold mb-2">Inspection & Prep</h3>
                                        <p className="text-slate-400 text-sm">We start with a thorough inspection of your vehicle to identify specific needs and areas of concern.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold text-black flex items-center justify-center font-bold font-mono">2</div>
                                    <div>
                                        <h3 className="text-white font-bold mb-2">Execution</h3>
                                        <p className="text-slate-400 text-sm">Using our premium tools and products, we meticulously perform the service, paying attention to every detail.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold text-black flex items-center justify-center font-bold font-mono">3</div>
                                    <div>
                                        <h3 className="text-white font-bold mb-2">Final Review</h3>
                                        <p className="text-slate-400 text-sm">A final walk-around with you to ensure the results meet our high standards and your expectations.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-brand-dark border border-white/10 rounded-2xl p-6 md:p-8 sticky top-24">
                            <h3 className="text-xl font-serif font-bold text-white mb-2">Ready to Book?</h3>
                            <p className="text-slate-400 text-sm mb-6">Secure your appointment today. We come to you!</p>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-300">Service Cost</span>
                                    <span className="text-white font-bold">${service.price}+</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-300">Duration</span>
                                    <span className="text-white font-bold">{service.duration}</span>
                                </div>
                                <div className="h-px bg-white/10" />
                                <div className="flex items-center gap-2 text-xs text-brand-gold bg-brand-gold/10 p-3 rounded-lg">
                                    <Shield size={14} />
                                    Satisfaction Guaranteed
                                </div>
                            </div>

                            <Button to={`/booking?service=${service.id}`} variant="primary" fullWidth>
                                Book This Service
                            </Button>

                            <p className="text-center text-xs text-slate-500 mt-4">
                                Questions? <a href="tel:9517514278" className="text-brand-gold hover:underline">Call us</a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
