import React from 'react';
import { Button } from './Button';
import { CheckCircle, Clock, Shield, Star } from 'lucide-react';

export const IntroSection: React.FC = () => (
    <section className="py-20 bg-brand-darker text-slate-200">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="space-y-6 text-center">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                    Premium Mobile Car Wash Brought To Your Driveway
                </h2>
                <p className="text-lg leading-relaxed text-slate-400 max-w-3xl mx-auto">
                    Burrell & Co is a professional mobile detailing service that comes directly to your home or workplace, offering a level of convenience and quality that traditional car washes simply cannot match. We understand that your time is valuable, which is why we bring our fully equipped mobile unit to you, whether you are at home relaxing or busy at the office.
                </p>
                <p className="text-lg leading-relaxed text-slate-400 max-w-3xl mx-auto">
                    Our team specializes in careful hand washing and paint-safe methods designed to preserve your vehicle's finish. Unlike automated tunnels that can leave swirls and scratches, we use premium microfiber towels, pH-neutral shampoos, and professional-grade products to ensure a scratch-free, showroom-level result every time. From daily drivers to high-end luxury vehicles, we treat every car with the respect it deserves, ensuring it looks its absolute best.
                </p>
                <p className="text-lg leading-relaxed text-slate-400 max-w-3xl mx-auto">
                    Serving Southern California, we are dedicated to providing a superior customer experience. We handle everything from the water to the power, so all you have to do is hand us the keys. Whether you need a quick maintenance wash or a full paint correction and ceramic coating, Burrell & Co is your trusted partner for automotive care.
                </p>
            </div>
        </div>
    </section>
);

export const TrustSection: React.FC = () => (
    <section className="py-20 bg-brand-dark text-slate-200">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 space-y-12">
            <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                    Why Drivers Trust Burrell & Co
                </h2>
                <p className="text-lg leading-relaxed text-slate-400 max-w-2xl">
                    Choosing a detailer is about trust. You need someone who is reliable, skilled, and respectful of your property. At Burrell & Co, we have built our reputation on delivering consistent excellence and peace of mind to our clients across Southern California. We are not just washing cars; we are maintaining your investment.
                </p>
                <p className="text-lg leading-relaxed text-slate-400 max-w-2xl">
                    Our fully licensed and insured service means you never have to worry. We arrive on time, communicate clearly, and stand behind our work with a satisfaction guarantee. Join the hundreds of satisfied customers who trust us with their vehicles week after week.
                </p>
            </div>
            <ul className="grid gap-6 md:grid-cols-2">
                {[
                    { icon: Shield, text: "Fully Licensed & Insured for your peace of mind" },
                    { icon: Star, text: "Expert care for everything from Daily Drivers to Exotics" },
                    { icon: Clock, text: "Flexible scheduling in the Southern California corridor" },
                    { icon: CheckCircle, text: "100% Satisfaction Guarantee on every service" }
                ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold/30 transition-colors">
                        <item.icon className="w-6 h-6 text-brand-gold shrink-0 mt-1" />
                        <span className="text-slate-300 text-lg">{item.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export const ProcessSection: React.FC = () => (
    <section className="py-20 bg-brand-darker text-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 space-y-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white text-center">
                How Mobile Detailing Works
            </h2>
            <div className="grid gap-8 md:grid-cols-4">
                {[
                    { step: "01", title: "Seamless Booking", desc: "Select your service package online or call us directly. We'll confirm your appointment and handle the logistics." },
                    { step: "02", title: "We Come to You", desc: "Our fully equipped mobile unit arrives at your home or office with its own water and power—no hookups needed." },
                    { step: "03", title: "Precision Detail", desc: "We meticulously clean, correct, and protect every inch of your vehicle using premium products and safe techniques." },
                    { step: "04", title: "Final Inspection", desc: "We walk you through the results to ensure every detail meets our showroom standards before you pay." }
                ].map((item, idx) => (
                    <div key={idx} className="relative p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:-translate-y-2 transition-transform duration-300 group">
                        <span className="text-5xl font-black text-brand-gold/10 absolute top-4 right-4 font-mono group-hover:text-brand-gold/20 transition-colors">{item.step}</span>
                        <h3 className="text-xl font-bold text-white mb-3 font-serif relative z-10">{item.title}</h3>
                        <p className="text-slate-400 relative z-10 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export const CTASection: React.FC = () => (
    <section className="py-24 bg-brand-gold/5 border-y border-brand-gold/10">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                Book Your Detail
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Don't wait to give your car the care it deserves. Schedule your appointment today and experience the convenience of premium mobile detailing. Call, text, or book online to get started.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button to="/booking" variant="primary" className="min-w-[200px] text-lg py-4">
                    Book Now
                </Button>
                <Button to="/contact" variant="outline" className="min-w-[200px] text-lg py-4">
                    Contact Us
                </Button>
            </div>
        </div>
    </section>
);

export const HomeContent: React.FC = () => {
    return (
        <>
            <IntroSection />
            <TrustSection />
            <ProcessSection />
            <CTASection />
        </>
    );
};
