import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StepVehicle } from './StepVehicle';
import { StepService } from './StepService';
import { StepDateTime } from './StepDateTime';
import { StepReview } from './StepReview';

export const BookingWizard: React.FC = () => {
    const [step, setStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        vehicleType: null as 'sedan' | 'suv' | 'truck' | null,
        serviceId: null as string | null,
        date: '',
        time: '',
        contact: null as any
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handleFinalSubmit = async (contactData: any) => {
        setBookingData(prev => ({ ...prev, contact: contactData }));
        setIsSubmitted(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Here you would redirect or show success
    };

    if (isSubmitted) {
        return (
            <div className="text-center py-20">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <ChevronRight size={40} className="text-white" />
                </motion.div>
                <h2 className="text-3xl font-serif font-bold text-white mb-4">Booking Confirmed!</h2>
                <p className="text-slate-400">We've sent a confirmation email to {bookingData.contact?.email}.</p>
                <p className="text-slate-400">See you on {bookingData.date} at {bookingData.time}!</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex justify-between mb-2">
                    {['Vehicle', 'Service', 'Time', 'Review'].map((label, i) => (
                        <span
                            key={i}
                            className={`text-sm font-mono uppercase tracking-wider ${step > i ? 'text-brand-gold' : step === i + 1 ? 'text-white' : 'text-slate-600'
                                }`}
                        >
                            {label}
                        </span>
                    ))}
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-brand-gold"
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-brand-darker/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {step === 1 && (
                            <StepVehicle
                                selected={bookingData.vehicleType}
                                onSelect={(type) => {
                                    setBookingData(prev => ({ ...prev, vehicleType: type }));
                                    nextStep();
                                }}
                            />
                        )}
                        {step === 2 && (
                            <StepService
                                selected={bookingData.serviceId}
                                onSelect={(id) => {
                                    setBookingData(prev => ({ ...prev, serviceId: id }));
                                    nextStep();
                                }}
                            />
                        )}
                        {step === 3 && (
                            <StepDateTime
                                date={bookingData.date}
                                time={bookingData.time}
                                onDateChange={(d) => setBookingData(prev => ({ ...prev, date: d }))}
                                onTimeChange={(t) => {
                                    setBookingData(prev => ({ ...prev, time: t }));
                                    nextStep();
                                }}
                            />
                        )}
                        {step === 4 && (
                            <StepReview
                                data={bookingData}
                                onSubmit={handleFinalSubmit}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
                <button
                    onClick={prevStep}
                    disabled={step === 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    <ChevronLeft size={20} /> Back
                </button>

                {step < 4 && (
                    <button
                        onClick={nextStep}
                        disabled={
                            (step === 1 && !bookingData.vehicleType) ||
                            (step === 2 && !bookingData.serviceId) ||
                            (step === 3 && (!bookingData.date || !bookingData.time))
                        }
                        className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next <ChevronRight size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};
