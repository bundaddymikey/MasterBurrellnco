import { ServicePackage, ServiceType, Testimonial } from './types';

export const SERVICES: ServicePackage[] = [
  {
    id: 'maintenance-wash',
    title: 'The Monthly Reset',
    type: ServiceType.MAINTENANCE,
    price: 65,
    priceSedan: 65,
    priceLarge: 95,
    pricingDetails: null, // Dynamic pricing handled by component
    duration: '1 - 1.5 Hours',
    description: 'The essential detox for your daily driver. We strip the grime without touching the clear coat.',
    features: [
      'Scratchless Hand Wash',
      'Deep Wheel Decontamination',
      'Crystal Clear Glass',
      'Complete Carpet Extraction',
      'Dash and Console Wipe Down'
    ],
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=800&auto=format&fit=crop',
    processDescription: "Using pH-neutral products and meticulous two-bucket methods, we focus on safe surface decontamination, tire/rim renewal, and light interior conditioning to maintain your vehicle's weekly shine."
  },
  {
    id: 'full-interior',
    title: 'The Interior Sanctuary',
    type: ServiceType.INTERIOR,
    price: 180,
    priceSedan: 180,
    priceLarge: 200,
    pricingDetails: null,
    duration: '2.5 - 3.5 Hours',
    description: 'You spend your life inside this car. We reset it to factory fresh condition using steam and extraction.',
    features: [
      'Deep Steam Sterilization',
      'Upholstery Extraction and Shampoo',
      'Leather Conditioning Treatment',
      'Vent and Crevice Purge',
      'Trunk and Cargo Refresh'
    ],
    image: '/gallery/mercedes-gle/2.png',
    popular: true
  },
  {
    id: 'full-exterior',
    title: 'Exterior Resurrection',
    type: ServiceType.EXTERIOR,
    price: 250,
    priceSedan: 250,
    priceLarge: 300,
    pricingDetails: null,
    duration: '3 - 4 Hours',
    description: 'We do not cover up defects. We remove them. This is the deep clean your paint is begging for.',
    features: [
      'Chemical Paint Decontamination',
      'Clay Bar Treatment',
      'Iron Fallout Removal',
      'Bug and Tar Elimination',
      '3 Month Ceramic Sealant'
    ],
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop',
    processDescription: "This process is focused on deep decontamination and protection. We execute a multi-step cleanse, including fallout removal and clay barring, to perfect the finish before locking in a 3-month protective sealant."
  },
  {
    id: 'engine-bay',
    title: 'Engine Bay Restoration',
    type: ServiceType.ENGINE,
    price: 125,
    priceSedan: 125,
    priceLarge: 125,
    pricingDetails: null,
    duration: '45 Mins',
    description: 'A dirty engine runs hot and hides leaks. We degrease, clean, and dress the heart of your vehicle.',
    features: [
      'Oil and Grime Elimination',
      'Safe Pressure Rinse',
      'Plastics and Hoses Dressed',
      'Protective Matte Finish'
    ],
    image: '/gallery/ford-ranger/4.png',
    processDescription: "We execute a water-safe degreasing and cleaning process, paying close attention to sensitive components, followed by a protective dressing for all plastic and rubber surfaces."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Marcus Chen',
    role: 'Tesla Model S Owner',
    content: 'Burrell & Co. transformed my car. The maintenance wash keeps it looking fresh, and the mobile service is so convenient.',
    rating: 5,
    avatar: 'https://picsum.photos/100/100?random=5'
  },
  {
    id: 't2',
    name: 'Sarah Jenkins',
    role: 'Range Rover Owner',
    content: 'With two kids and a dog, my interior was a disaster. The Full Interior Detail performed a miracle. It looks brand new again.',
    rating: 5,
    avatar: 'https://picsum.photos/100/100?random=6'
  },
  {
    id: 't3',
    name: 'David Thorne',
    role: 'Porsche 911 Enthusiast',
    content: 'Professional, punctual, and meticulous. They treated my 911 with the respect it deserves during the exterior detail.',
    rating: 5,
    avatar: 'https://picsum.photos/100/100?random=7'
  }
];