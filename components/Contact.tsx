import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from './Button';

export const Contact: React.FC = () => {
    const [formState, setFormState] = useState({
        name: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
        setFormState({ name: '', phone: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen bg-brand-darker pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif font-bold text-white mb-4"
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto"
                    >
                        Have a question about our services? Ready to schedule your detail?
                        Fill out the form below or give us a call.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <h3 className="text-2xl font-serif font-bold text-white mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                <a href="tel:9517514278" className="flex items-center gap-4 text-slate-300 hover:text-brand-gold transition-colors group">
                                    <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 font-mono uppercase tracking-wider">Call or Text</p>
                                        <p className="text-lg font-medium">951-751-4278</p>
                                    </div>
                                </a>

                                <a href="mailto:Shawn@Burrellnco.com" className="flex items-center gap-4 text-slate-300 hover:text-brand-gold transition-colors group">
                                    <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 font-mono uppercase tracking-wider">Email Us</p>
                                        <p className="text-lg font-medium">Shawn@Burrellnco.com</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 text-slate-300">
                                    <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 font-mono uppercase tracking-wider">Service Area</p>
                                        <p className="text-lg font-medium">Southern California</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-brand-gold/10 border border-brand-gold/20 rounded-2xl p-8 backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-brand-gold mb-2">Why Choose Us?</h3>
                            <ul className="space-y-2 text-slate-300 text-sm">
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-brand-gold" />
                                    <span>Fully mobile service - we come to you</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-brand-gold" />
                                    <span>Self-contained water and power</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-brand-gold" />
                                    <span>Premium products and techniques</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-brand-gold" />
                                    <span>Satisfaction guaranteed</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm"
                    >
                        <h3 className="text-2xl font-serif font-bold text-white mb-6">Send a Message</h3>

                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center"
                            >
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4">
                                    <CheckCircle size={32} />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                                <p className="text-slate-300">Thanks for reaching out. Shawn will get back to you shortly!</p>
                                <Button
                                    variant="outline"
                                    className="mt-6"
                                    onClick={() => setIsSuccess(false)}
                                >
                                    Send Another Message
                                </Button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2 font-mono uppercase tracking-wider">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formState.name}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-all"
                                        placeholder="Your Name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-400 mb-2 font-mono uppercase tracking-wider">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formState.phone}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-all"
                                        placeholder="(555) 555-5555"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2 font-mono uppercase tracking-wider">Message or Question</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        value={formState.message}
                                        onChange={handleChange}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-all resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full flex items-center justify-center gap-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="animate-pulse">Sending...</span>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send size={18} />
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
