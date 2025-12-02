import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { SERVICES } from '../constants';
import { Button } from './Button';
import { CheckCircle, Calendar as CalendarIcon, MapPin, Loader2, Clock } from 'lucide-react';

import { VEHICLE_DATA } from './vehicleData';

// ... (imports remain the same, just adding VEHICLE_DATA)

export const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleType: 'sedan',
    serviceId: SERVICES[0].id,
    preferredDate: '',
    address: '',
    zipCode: ''
  });

  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);

  const location = useLocation();
  const [isLocating, setIsLocating] = useState(false);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
        const data = await response.json();

        if (data && data.address) {
          const addr = data.address;
          const zip = addr.postcode || '';
          const city = addr.city || addr.town || addr.village || addr.hamlet || '';
          const state = "CA"; // We generally expect CA based on business area

          // Construct clean address string
          const parts = [
            `${addr.house_number || ''} ${addr.road || ''}`.trim(),
            city,
            `${state} ${zip}`.trim()
          ].filter(part => part.length > 0);

          const formattedAddress = parts.join(', ');

          setFormData(prev => ({
            ...prev,
            zipCode: zip,
            address: formattedAddress
          }));
        }
      } catch (error) {
        console.error("Error getting location:", error);
        alert("Unable to retrieve address from location.");
      } finally {
        setIsLocating(false);
      }
    }, (error) => {
      console.error("Geolocation error:", error);
      alert("Unable to retrieve your location. Please ensure you have granted permission.");
      setIsLocating(false);
    });
  };

  useEffect(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i <= 13; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d);
    }
    setAvailableDates(dates);

    // Pre-select today if not already set
    if (!formData.preferredDate) {
      const todayStr = dates[0].toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, preferredDate: todayStr }));
    }

    // Pre-select service from URL
    const searchParams = new URLSearchParams(location.search);
    const serviceId = searchParams.get('service');
    if (serviceId) {
      setFormData(prev => ({ ...prev, serviceId }));
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'vehicleMake') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        vehicleModel: '' // Reset model when make changes
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateSelect = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, preferredDate: dateString }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // ... (handleSubmit logic remains the same)
    e.preventDefault();
    if (!formData.preferredDate) {
      alert("Please select a preferred date.");
      return;
    }

    // EmailJS Integration
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    try {
      console.log("EmailJS would send:", formData);

      if (SERVICE_ID === 'YOUR_SERVICE_ID') {
        const subject = `New Booking Request: ${formData.name} - ${SERVICES.find(s => s.id === formData.serviceId)?.title}`;
        const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Vehicle: ${formData.vehicleMake} ${formData.vehicleModel} (${formData.vehicleType})
Service: ${SERVICES.find(s => s.id === formData.serviceId)?.title}
Preferred Date: ${formData.preferredDate}
Location: ${formData.address}
Zip Code: ${formData.zipCode}

Sent from Burrell & Co. Website
         `;
        window.location.href = `mailto:Shawn@Burrellnco.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Something went wrong. Please try again or call us directly.");
    }
  };

  if (submitted) {
    // ... (submitted view remains the same)
    return (
      <div className="max-w-2xl mx-auto bg-brand-dark p-8 border border-brand-gold/30 text-center py-16 rounded-2xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-gold/10 text-brand-gold mb-6">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-3xl font-serif font-bold text-white mb-4">Request Received</h3>
        <p className="text-gray-300 mb-8 font-sans">
          Thank you, {formData.name}. We have received your booking request for the <span className="text-brand-gold">{SERVICES.find(s => s.id === formData.serviceId)?.title}</span> on {formData.preferredDate}.
          Our team will contact you at {formData.phone} shortly to confirm the details.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline">
          Book Another Vehicle
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-brand-dark p-8 md:p-12 border border-white/5 shadow-2xl rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-400 uppercase tracking-wide font-mono">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 text-white text-base px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-sans"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 uppercase tracking-wide font-mono">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 text-white text-base px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-sans"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-400 uppercase tracking-wide font-mono">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 text-white text-base px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-sans"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-400 uppercase tracking-wide flex items-center gap-2 font-mono">
            <CalendarIcon size={14} /> Preferred Date
          </label>
          <div className="hidden">
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Calendar UI */}
          <div className="bg-black border border-gray-700 rounded-xl p-4">
            {/* Show Month of first available date */}
            <div className="text-center mb-4 border-b border-gray-800 pb-2">
              <h4 className="text-brand-gold font-serif text-lg font-bold">
                {availableDates.length > 0 && availableDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h4>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-[10px] text-gray-500 font-mono uppercase">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {availableDates.map((date) => {
                const isSelected = formData.preferredDate === date.toISOString().split('T')[0];
                // Removed special weekend styling to prevent confusion

                return (
                  <button
                    key={date.toString()}
                    type="button"
                    onClick={() => handleDateSelect(date)}
                    className={`
                      aspect-square flex flex-col items-center justify-center rounded-lg transition-all duration-200 border relative
                      ${isSelected
                        ? 'bg-brand-gold text-black border-brand-gold shadow-[0_0_10px_rgba(255,195,0,0.4)] z-10'
                        : 'bg-white/5 text-gray-300 border-transparent hover:bg-white/10 hover:border-gray-500'
                      }
                    `}
                  >
                    <span className="text-xs font-bold font-mono">
                      {date.getDate()}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-center text-gray-500 mt-4 font-mono">*Showing availability for the next 2 weeks</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-2">
          <label htmlFor="vehicleMake" className="block text-sm font-medium text-gray-400 uppercase tracking-wide font-mono">Vehicle Make</label>
          <select
            id="vehicleMake"
            name="vehicleMake"
            required
            value={formData.vehicleMake}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 text-white text-base px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-sans appearance-none"
          >
            <option value="">Select Make</option>
            {Object.keys(VEHICLE_DATA).map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-400 uppercase tracking-wide font-mono">Vehicle Model</label>
          <select
            id="vehicleModel"
            name="vehicleModel"
            required
            value={formData.vehicleModel}
            onChange={handleChange}
            disabled={!formData.vehicleMake}
            className="w-full bg-black border border-gray-700 text-white text-base px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-sans appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select Model</option>
            {formData.vehicleMake && VEHICLE_DATA[formData.vehicleMake]?.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
            {formData.vehicleMake && <option value="Other">Other</option>}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-400 uppercase tracking-wide font-mono">Vehicle Type</label>
          <select
            id="vehicleType"
            name="vehicleType"
            required
            value={formData.vehicleType}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 text-white text-base px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-sans appearance-none"
          >
            <option value="sedan">Sedan / Coupe / Small</option>
            <option value="large">SUV / Truck / Van</option>
          </select>
        </div>
      </div>

      <div className="mb-8 space-y-2">
        <label htmlFor="serviceId" className="block text-sm font-medium text-gray-400 uppercase tracking-wide font-mono">Select Service Package</label>
        <div className="grid grid-cols-1 gap-4">
          {SERVICES.map((service) => {
            // Calculate dynamic price based on vehicle type
            const dynamicPrice = formData.vehicleType === 'large'
              ? (service.priceLarge || service.price)
              : (service.priceSedan || service.price);

            const isSelected = formData.serviceId === service.id;

            return (
              <div
                key={service.id}
                onClick={() => setFormData(prev => ({ ...prev, serviceId: service.id }))}
                className={`cursor-pointer border rounded-lg transition-all overflow-hidden ${isSelected ? 'bg-brand-gold/10 border-brand-gold shadow-[0_0_10px_rgba(255,195,0,0.1)]' : 'bg-black border-gray-700 hover:border-gray-500'}`}
              >
                <div className="p-4 flex justify-between items-center">
                  <span className={`font-bold font-serif ${isSelected ? 'text-brand-gold' : 'text-white'}`}>{service.title}</span>
                  <div className="text-right">
                    <span className="block text-brand-gold font-mono font-bold">${dynamicPrice}</span>
                    <span className="text-gray-500 text-[10px] font-mono uppercase">{formData.vehicleType === 'large' ? 'SUV/Truck' : 'Sedan'}</span>
                  </div>
                </div>

                {/* Accordion Content */}
                {isSelected && (
                  <div className="px-4 pb-4 border-t border-white/5 pt-4">
                    <p className="text-sm text-gray-300 mb-3 font-sans">{service.description}</p>
                    <div className="space-y-1 mb-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                          <CheckCircle size={12} className="text-brand-gold mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-brand-gold font-mono">
                      <Clock size={12} />
                      <span>Est. Duration: {service.duration}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Disclaimer */}
      <div className="mb-8 p-4 bg-brand-gold/5 border border-brand-gold/20 rounded-lg">
        <p className="text-sm text-gray-300 font-sans text-center">
          <span className="text-brand-gold font-bold">Note:</span> The price shown is an estimate based on your vehicle type.
          We will agree on the exact cost in person after a quick inspection of the vehicle's condition.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1 space-y-2">
          <div className="flex justify-between items-end">
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-400 uppercase tracking-wide font-mono">Zip Code</label>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              className="text-[10px] text-brand-gold flex items-center gap-1 hover:text-white transition-colors disabled:opacity-50"
            >
              {isLocating ? <Loader2 size={10} className="animate-spin" /> : <MapPin size={10} />}
              {isLocating ? 'Locating...' : 'Use Current Location'}
            </button>
          </div>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            required
            pattern="[0-9]{5}"
            maxLength={5}
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 text-white text-base px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-sans"
          />
        </div>

        <div className="md:col-span-2 space-y-2 relative">
          <label htmlFor="address" className="block text-sm font-medium text-gray-400 uppercase tracking-wide font-mono">Service Location Address</label>
          <div className="relative">
            <textarea
              id="address"
              name="address"
              required
              rows={1}
              value={formData.address}
              onChange={(e) => {
                handleChange(e);
                // Debounce logic for address search
                const query = e.target.value;
                if (query.length > 2) {
                  const timeoutId = setTimeout(async () => {
                    try {
                      // Construct a natural search query: "Address, Zip Code"
                      // This often works better than strict parameters for Nominatim
                      let searchQuery = query;
                      if (formData.zipCode && formData.zipCode.length === 5) {
                        searchQuery += `, ${formData.zipCode}`;
                      }

                      // Restrict search to Southern California
                      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=us&viewbox=-120.0,35.5,-114.0,32.5&bounded=1&limit=10&addressdetails=1`;

                      const response = await fetch(url);
                      const data = await response.json();

                      // Filter results to ensure they are actual addresses (have a house number and street)
                      const filteredData = data.filter((item: any) => {
                        // If user started typing a number, we expect a specific address with a house number
                        const hasNumber = /^\d/.test(query);
                        if (hasNumber) {
                          return item.address && item.address.house_number && item.address.road;
                        }
                        // Otherwise just ensure it has a road or is a city/town
                        return item.address && (item.address.road || item.address.city || item.address.town || item.address.village);
                      }).slice(0, 5); // Limit to top 5 relevant results

                      // Format the display address to be simpler: "123 Main St, City, CA 90210"
                      const formattedResults = filteredData.map((item: any) => {
                        const addr = item.address;
                        const city = addr.city || addr.town || addr.village || addr.hamlet || '';
                        const state = "CA"; // We know it's CA based on our bounds, or use addr.state_code or addr.state
                        const zip = addr.postcode || '';

                        // Construct clean string
                        const parts = [
                          `${addr.house_number || ''} ${addr.road || ''}`.trim(),
                          city,
                          `${state} ${zip}`.trim()
                        ].filter(part => part.length > 0);

                        return {
                          ...item,
                          display_name: parts.join(', ')
                        };
                      });

                      setAddressSuggestions(formattedResults);
                    } catch (error) {
                      console.error("Error fetching addresses:", error);
                    }
                  }, 300);
                  return () => clearTimeout(timeoutId);
                } else {
                  setAddressSuggestions([]);
                }
              }}
              className="w-full bg-black border border-gray-700 text-white text-base px-4 py-3 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-sans disabled:opacity-50 disabled:cursor-not-allowed resize-none"
              autoComplete="off"
              disabled={!formData.zipCode || formData.zipCode.length !== 5}
            />

            {/* Address Suggestions Dropdown */}
            {addressSuggestions.length > 0 && (
              <div className="absolute z-50 left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                {addressSuggestions.map((suggestion: any) => (
                  <button
                    key={suggestion.place_id}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, address: suggestion.display_name }));
                      setAddressSuggestions([]);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-brand-gold/10 hover:text-brand-gold transition-colors border-b border-gray-800 last:border-0"
                  >
                    {suggestion.display_name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <p className="text-[10px] text-gray-500 font-mono text-right">Powered by OpenStreetMap</p>
        </div>
      </div>

      <Button type="submit" fullWidth variant="primary" className="py-4 text-lg">
        Confirm Booking Request
      </Button>
    </form>
  );
};