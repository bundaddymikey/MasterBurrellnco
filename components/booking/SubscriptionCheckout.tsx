import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, Lock, ArrowRight, ArrowLeft, Calendar, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '../Button';

// --- Constants ---

const PLANS_DATA: Record<string, any> = {
    "Bi-Weekly Maintenance": {
        name: "Bi-Weekly Maintenance",
        price: 115,
        frequency: "Monthly",
        features: ["2x Monthly Washes", "Exterior Hand Wash", "Interior Refresh"]
    },
    "Total Restoration": {
        name: "Total Restoration",
        price: 325,
        frequency: "Monthly",
        features: ["1x Complete Detail", "Clay Bar & Wax", "Full Interior Deep Clean"]
    },
    "Fleet / Family": {
        name: "Fleet / Family",
        price: "Custom",
        frequency: "Flexible",
        features: ["Multi-vehicle discount", "Priority scheduling"]
    }
};

const CAR_DATA: Record<string, string[]> = {
    "Acura": ["ILX", "Integra", "MDX", "RDX", "TLX", "ZDX"],
    "Alfa Romeo": ["Giulia", "Stelvio", "Tonale"],
    "Audi": ["A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q4 e-tron", "Q5", "Q7", "Q8", "e-tron GT", "R8"],
    "BMW": ["2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "8 Series", "X1", "X3", "X4", "X5", "X6", "X7", "i4", "iX", "XM"],
    "Cadillac": ["CT4", "CT5", "Escalade", "Lyriq", "XT4", "XT5", "XT6"],
    "Chevrolet": ["Blazer", "Camaro", "Colorado", "Corvette", "Equinox", "Malibu", "Silverado", "Suburban", "Tahoe", "Trailblazer", "Traverse", "Trax"],
    "Chrysler": ["300", "Pacifica"],
    "Dodge": ["Challenger", "Charger", "Durango", "Hornet"],
    "Ford": ["Bronco", "Edge", "Escape", "Expedition", "Explorer", "F-150", "Maverick", "Mustang", "Ranger"],
    "GMC": ["Acadia", "Canyon", "Hummer EV", "Sierra", "Terrain", "Yukon"],
    "Genesis": ["G70", "G80", "G90", "GV60", "GV70", "GV80"],
    "Honda": ["Accord", "Civic", "CR-V", "HR-V", "Odyssey", "Passport", "Pilot", "Ridgeline"],
    "Hyundai": ["Elantra", "Ioniq 5", "Ioniq 6", "Kona", "Palisade", "Santa Fe", "Sonata", "Tucson", "Venue"],
    "Infiniti": ["Q50", "QX50", "QX55", "QX60", "QX80"],
    "Jaguar": ["E-PACE", "F-PACE", "F-TYPE", "I-PACE", "XF"],
    "Jeep": ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Wagoneer", "Wrangler"],
    "Kia": ["Carnival", "EV6", "EV9", "Forte", "K5", "Niro", "Sorento", "Soul", "Sportage", "Telluride"],
    "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"],
    "Lexus": ["ES", "GX", "IS", "LC", "LS", "LX", "NX", "RC", "RX", "RZ", "TX", "UX"],
    "Lincoln": ["Aviator", "Corsair", "Nautilus", "Navigator"],
    "Lucid": ["Air", "Gravity"],
    "Mazda": ["CX-30", "CX-5", "CX-50", "CX-90", "Mazda3", "MX-5 Miata"],
    "Mercedes-Benz": ["C-Class", "CLA", "CLE", "E-Class", "EQE", "EQS", "G-Class", "GLA", "GLB", "GLC", "GLE", "GLS", "S-Class", "SL"],
    "Mini": ["Clubman", "Convertible", "Countryman", "Hardtop"],
    "Nissan": ["Altima", "Armada", "Frontier", "Kicks", "Maxima", "Murano", "Pathfinder", "Rogue", "Sentra", "Titan", "Versa", "Z"],
    "Polestar": ["1", "2", "3"],
    "Porsche": ["718 Boxster", "718 Cayman", "911", "Cayenne", "Macan", "Panamera", "Taycan"],
    "Ram": ["1500", "2500", "3500"],
    "Rivian": ["R1S", "R1T"],
    "Subaru": ["Ascent", "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "Solterra", "WRX"],
    "Tesla": ["Model 3", "Model S", "Model X", "Model Y", "Cybertruck"],
    "Toyota": ["4Runner", "Camry", "Corolla", "Crown", "Grand Highlander", "Highlander", "Prius", "RAV4", "Sequoia", "Sienna", "Tacoma", "Tundra", "Venza"],
    "Volkswagen": ["Atlas", "Golf GTI", "Golf R", "ID.4", "Jetta", "Taos", "Tiguan"],
    "Volvo": ["C40 Recharge", "S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"]
};

const TIME_SLOTS = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"
];

// --- Helper Functions ---

const getNextTwoWeeks = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date);
    }
    return dates;
};

// --- Component ---

export const SubscriptionCheckout: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const planName = searchParams.get('plan') || "Bi-Weekly Maintenance";
    const plan = PLANS_DATA[planName] || PLANS_DATA["Bi-Weekly Maintenance"];

    const [step, setStep] = useState<1 | 2>(1);
    const [loading, setLoading] = useState(false);

    // Calendar State
    const [availableDates] = useState(getNextTwoWeeks());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        vehicleMake: '',
        vehicleModel: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            if (name === 'vehicleMake') {
                return { ...prev, [name]: value, vehicleModel: '' };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        // Validation for date/time
        if (!selectedDate || !selectedTime) {
            alert("Please select a preferred start date and time.");
            return;
        }
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        alert("Subscription Successful! (Mock)");
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-4 md:px-8 font-sans">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Column: Forms */}
                <div className="lg:col-span-7 order-2 lg:order-1">
                    <div className="mb-8">
                        <div className="flex items-center gap-4 text-sm font-mono mb-4">
                            <span className={`flex items-center gap-2 ${step === 1 ? 'text-brand-gold' : 'text-slate-500'}`}>
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-brand-gold text-black' : 'bg-slate-800'}`}>1</span>
                                DETAILS & SCHEDULE
                            </span>
                            <div className="w-8 h-px bg-white/10" />
                            <span className={`flex items-center gap-2 ${step === 2 ? 'text-brand-gold' : 'text-slate-500'}`}>
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-brand-gold text-black' : 'bg-slate-800'}`}>2</span>
                                PAYMENT
                            </span>
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-white">
                            {step === 1 ? 'Your Details' : 'Secure Payment'}
                        </h1>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.form
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleNext}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">First Name</label>
                                        <input
                                            required
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">Last Name</label>
                                        <input
                                            required
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">Phone Number</label>
                                        <input
                                            required
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                            placeholder="(555) 555-5555"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400">Street Address</label>
                                    <input
                                        required
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                        placeholder="123 Example Blvd"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">City</label>
                                        <input
                                            required
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                            placeholder="Los Angeles"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-slate-400">Zip Code</label>
                                        <input
                                            required
                                            name="zip"
                                            value={formData.zip}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                            placeholder="90210"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <h3 className="text-white font-bold mb-4">Vehicle Details</h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm text-slate-400">Make</label>
                                            <div className="relative">
                                                <select
                                                    required
                                                    name="vehicleMake"
                                                    value={formData.vehicleMake}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none cursor-pointer"
                                                >
                                                    <option value="">Select Make</option>
                                                    {Object.keys(CAR_DATA).sort().map(make => (
                                                        <option key={make} value={make}>{make}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                                    <ArrowRight size={14} className="rotate-90" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-slate-400">Model</label>
                                            <div className="relative">
                                                <select
                                                    required
                                                    name="vehicleModel"
                                                    value={formData.vehicleModel}
                                                    onChange={handleInputChange}
                                                    disabled={!formData.vehicleMake}
                                                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <option value="">Select Model</option>
                                                    {formData.vehicleMake && CAR_DATA[formData.vehicleMake]?.map(model => (
                                                        <option key={model} value={model}>{model}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                                    <ArrowRight size={14} className="rotate-90" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <h3 className="text-white font-bold mb-4">First Wash Schedule</h3>

                                    {/* Date Scroller */}
                                    <div className="mb-6">
                                        <label className="text-sm text-slate-400 block mb-3">Preferred Start Date</label>
                                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                                            {availableDates.map((date, idx) => {
                                                const isSelected = selectedDate?.toDateString() === date.toDateString();
                                                return (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => setSelectedDate(date)}
                                                        className={`flex-shrink-0 w-24 p-4 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all snap-center ${isSelected
                                                                ? 'bg-brand-gold text-brand-darker border-brand-gold shadow-[0_0_20px_rgba(255,195,0,0.3)]'
                                                                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/30'
                                                            }`}
                                                    >
                                                        <span className="text-xs uppercase font-bold tracking-wider opacity-60">
                                                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                                        </span>
                                                        <span className={`text-2xl font-bold font-sans ${isSelected ? 'text-brand-darker' : 'text-white'}`}>
                                                            {date.getDate()}
                                                        </span>
                                                        <span className="text-xs opacity-60">
                                                            {date.toLocaleDateString('en-US', { month: 'short' })}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Time Grid */}
                                    <div>
                                        <label className="text-sm text-slate-400 block mb-3">Preferred Time</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            {TIME_SLOTS.map((time) => {
                                                const isSelected = selectedTime === time;
                                                return (
                                                    <button
                                                        key={time}
                                                        type="button"
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`py-3 px-2 rounded-lg text-sm font-bold border transition-all ${isSelected
                                                                ? 'bg-brand-gold text-brand-darker border-brand-gold'
                                                                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                                                            }`}
                                                    >
                                                        {time}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <Button type="submit" variant="primary" className="w-full justify-center !text-lg !py-4 font-bold rounded-xl">
                                        Review & Payment
                                        <ArrowRight size={18} />
                                    </Button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.form
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 mb-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-white font-bold flex items-center gap-2">
                                            <CreditCard size={20} className="text-brand-gold" />
                                            Card Details
                                        </h3>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-5 bg-white/10 rounded" />
                                            <div className="w-8 h-5 bg-white/10 rounded" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm text-slate-400">Name on Card</label>
                                            <input
                                                required
                                                name="cardName"
                                                value={formData.cardName}
                                                onChange={handleInputChange}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                                                placeholder="John A. Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-slate-400">Card Number</label>
                                            <input
                                                required
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors font-mono"
                                                placeholder="0000 0000 0000 0000"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm text-slate-400">Expiry</label>
                                                <input
                                                    required
                                                    name="expiry"
                                                    value={formData.expiry}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors font-mono"
                                                    placeholder="MM/YY"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm text-slate-400">CVC</label>
                                                <input
                                                    required
                                                    name="cvc"
                                                    value={formData.cvc}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors font-mono"
                                                    placeholder="123"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-sm text-slate-500 mb-6 bg-slate-900/50 p-4 rounded-lg">
                                    <Lock size={16} />
                                    <p>Payments are 256-bit encrypted and secure.</p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <Button
                                        disabled={loading}
                                        type="submit"
                                        variant="primary"
                                        className="w-full justify-center !text-lg !py-4 font-bold !bg-brand-gold !text-black hover:!bg-white rounded-xl"
                                    >
                                        {loading ? 'Processing...' : `Pay $${plan.price} & Subscribe`}
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-slate-500 hover:text-white text-sm transition-colors flex items-center justify-center gap-2 py-2"
                                    >
                                        <ArrowLeft size={14} />
                                        Back to Information
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-5 order-1 lg:order-2">
                    <div className="sticky top-32 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-6 font-serif">Order Summary</h2>

                        <div className="flex justify-between items-start mb-6 pb-6 border-b border-white/10">
                            <div>
                                <h3 className="text-brand-gold font-bold text-lg mb-1">{plan.name}</h3>
                                <p className="text-slate-400 text-sm">{plan.frequency} Subscription</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            {/* First Service Date Display */}
                            {(selectedDate && selectedTime) && (
                                <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4 animate-fade-in">
                                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">First Service</p>
                                    <div className="flex items-center gap-2 text-white font-bold">
                                        <Calendar size={16} className="text-brand-gold" />
                                        <span>{selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white font-bold mt-1">
                                        <Clock size={16} className="text-brand-gold" />
                                        <span>{selectedTime}</span>
                                    </div>
                                </div>
                            )}

                            {plan.features.map((feature: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                                    <Check size={14} className="text-brand-gold" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-6 border-t border-white/10">
                            <div className="flex justify-between text-slate-400">
                                <span>Subtotal</span>
                                <span>${plan.price}.00</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                                <span>Tax</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between text-white font-bold text-xl pt-4 border-t border-white/10">
                                <span>Total Due Today</span>
                                <span>${plan.price}.00</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-2 text-center">
                                Recurring monthly payment of ${plan.price}.00. Cancel anytime.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
