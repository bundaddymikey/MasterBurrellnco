import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { AboutUs } from './components/AboutUs';
import { Testimonials } from './components/Testimonials';
import { BookingForm } from './components/BookingForm';
import { ChatAssistant } from './components/ChatAssistant';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { ServiceDetail } from './components/ServiceDetail';
import { Contact } from './components/Contact';
import { Subscriptions } from './components/Subscriptions';
import { AnimatePresence, motion } from 'framer-motion';
import { SEO } from './components/SEO';
import { IntroSection, TrustSection, ProcessSection, CTASection } from './components/HomeContent';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const HomePage: React.FC = () => (
  <PageWrapper>
    <SEO
      title="Burrell & Co Mobile Detailing | Premium Mobile Car Wash"
      description="Burrell & Co brings premium mobile car wash and detailing service directly to your driveway in the Inland Empire. Book a professional hand wash and full interior detail at your home or office."
      canonical="https://burrellnco.com/"
    />
    <Hero />
    <IntroSection />
    <Services />
    <TrustSection />
    <ProcessSection />
    <CTASection />
    <AboutUs />
    <Testimonials />
  </PageWrapper>
);

const BookingPage: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageWrapper>
      <SEO
        title="Book Your Mobile Detail | Burrell & Co"
        description="Schedule your premium mobile detailing service online. We come to you in Rancho Cucamonga and surrounding areas."
        canonical="https://burrellnco.com/booking"
      />
      <div className="pt-24 pb-12 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto min-h-screen">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">Secure Your Appointment</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Select your package and preferred time. We come to your home or office fully equipped.
          </p>
        </div>
        <BookingForm />
      </div>
    </PageWrapper>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-brand-darker text-white">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <div key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
              <Route path="/subscriptions" element={<PageWrapper><Subscriptions /></PageWrapper>} />
              <Route path="/gallery" element={
                <PageWrapper>
                  <SEO
                    title="Detailing Gallery | Burrell & Co"
                    description="View our portfolio of detailed vehicles. From luxury cars to daily drivers, see the Burrell & Co difference."
                    canonical="https://burrellnco.com/gallery"
                  />
                  <Gallery />
                </PageWrapper>
              } />
              <Route path="/services/:id" element={<PageWrapper><ServiceDetail /></PageWrapper>} />
            </Routes>
          </div>
        </AnimatePresence>
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}