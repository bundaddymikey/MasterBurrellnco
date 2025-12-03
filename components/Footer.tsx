import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { SERVICES } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="block mb-6 group w-fit">
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl text-white tracking-tight leading-none">
                  Burrell <span className="text-brand-gold font-serif italic">&</span> Co.
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-slate-400 font-sans pl-1">Mobile Detailing</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
              Elevating car care to an art form. We bring the detail shop to your driveway with premium products and unmatched expertise.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/burrellnco/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-brand-gold transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.yelp.com/biz/burrellnco-etiwanda?osq=Burrellnco"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-brand-gold transition-all duration-300 hover:scale-110"
                aria-label="Yelp"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.0001 0.600098C5.7001 0.600098 0.600098 5.7001 0.600098 12.0001C0.600098 18.3001 5.7001 23.4001 12.0001 23.4001C18.3001 23.4001 23.4001 18.3001 23.4001 12.0001C23.4001 5.7001 18.3001 0.600098 12.0001 0.600098ZM16.6801 17.5201C16.5601 17.8801 16.2001 18.2401 15.7201 18.2401C15.2401 18.2401 14.8801 18.0001 14.6401 17.5201L13.2001 14.5201L11.7601 17.5201C11.5201 18.0001 11.1601 18.2401 10.6801 18.2401C10.2001 18.2401 9.8401 17.8801 9.7201 17.5201L8.7601 12.9601L4.2001 12.0001C3.8401 11.8801 3.4801 11.5201 3.4801 11.0401C3.4801 10.5601 3.7201 10.2001 4.2001 9.9601L8.7601 9.0001L9.7201 4.4401C9.8401 4.0801 10.2001 3.7201 10.6801 3.7201C11.1601 3.7201 11.5201 3.9601 11.7601 4.4401L13.2001 7.4401L14.6401 4.4401C14.8801 3.9601 15.2401 3.7201 15.7201 3.7201C16.2001 3.7201 16.5601 4.0801 16.6801 4.4401L17.6401 9.0001L22.2001 9.9601C22.5601 10.0801 22.9201 10.4401 22.9201 10.9201C22.9201 11.4001 22.6801 11.7601 22.2001 12.0001L17.6401 12.9601L16.6801 17.5201Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-serif">Services</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-sans">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link to={`/services/${service.id}`} className="hover:text-brand-gold transition-colors">{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-serif">Company</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-sans">
              <li><Link to="/" className="hover:text-brand-gold transition-colors">About Us</Link></li>
              <li><Link to="/#services" className="hover:text-brand-gold transition-colors">Our Process</Link></li>
              <li><Link to="/" className="hover:text-brand-gold transition-colors">Service Area</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-serif">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-sans">
              <li>
                <a href="mailto:Shawn@Burrellnco.com?subject=Detailing%20Inquiry" className="hover:text-brand-gold transition-colors">
                  Shawn@Burrellnco.com
                </a>
              </li>
              <li>
                <a href="tel:9517514278" className="hover:text-brand-gold transition-colors">
                  951-751-4278
                </a>
              </li>
              <li>
                <a href="tel:3109124666" className="hover:text-brand-gold transition-colors">
                  310-912-4666
                </a>
              </li>
              <li>
                <span className="block text-brand-gold mt-2 font-medium">Operating Hours:</span>
                24 hours 7 days a week
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs font-mono">© {new Date().getFullYear()} Burrell & Co. Mobile Detailing. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-slate-500 font-mono">
            {/* Privacy and Terms links removed as pages do not exist yet */}
          </div>
        </div>
      </div>
    </footer>
  );
};