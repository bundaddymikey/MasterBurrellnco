export enum ServiceType {
  MAINTENANCE = 'Maintenance Wash',
  INTERIOR = 'Full Interior Detail',
  EXTERIOR = 'Full Exterior Detail',
  ENGINE = 'Engine Bay Cleaning',
  COMPLETE = 'Complete Detail'
}

export interface ServicePackage {
  id: string;
  title: string;
  type: ServiceType;
  price: number;
  priceSedan?: number;
  priceLarge?: number; // SUV/Truck
  originalPrice?: number;
  savings?: string;
  pricingDetails?: string;
  duration: string;
  description: string;
  features: string[];
  image: string;
  popular?: boolean;
  processDescription?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}