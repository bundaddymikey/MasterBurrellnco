import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { AboutUs } from './components/AboutUs';
import { Testimonials } from './components/Testimonials';
import { BookingWizard } from './components/booking/BookingWizard';

import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { ServiceDetail } from './components/ServiceDetail';
import { Contact } from './components/Contact';
import { Subscriptions } from './components/Subscriptions';
import { SubscriptionCheckout } from './components/booking/SubscriptionCheckout';

import { AnimatePresence, motion } from 'framer-motion';
import { SEO } from './components/SEO';
import { IntroSection, TrustSection, ProcessSection, CTASection } from './components/HomeContent';
import { AuthProvider } from './contexts/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardLayout } from './pages/dashboard/DashboardLayout';
import { Overview } from './pages/dashboard/Overview';
import { Rewards } from './pages/dashboard/Rewards';
import { Appointments, History, Settings } from './pages/dashboard/Placeholders';

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
      description="Burrell & Co brings premium mobile car wash and detailing service directly to your driveway in Southern California. Book a professional hand wash and full interior detail at your home or office."
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
        description="Schedule your premium mobile detailing service online. We come to you in Southern California."
        canonical="https://burrellnco.com/booking"
      />
      <div className="pt-24 pb-12 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto min-h-screen">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">Secure Your Appointment</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Select your package and preferred time. We come to your home or office fully equipped.
          </p>
        </div>
        <BookingWizard />
      </div>
    </PageWrapper>
  );
};

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/subscriptions" element={<PageWrapper><Subscriptions /></PageWrapper>} />
          <Route path="/subscribe/checkout" element={<PageWrapper><SubscriptionCheckout /></PageWrapper>} />

          <Route path="/gallery" element={
            <PageWrapper>
              <SEO
                title="Gallery | Burrell & Co. Mobile Detailing"
                description="View our portfolio of detailed vehicles. From luxury cars to daily drivers, see the Burrell & Co. difference."
              />
              <Gallery />
            </PageWrapper>
          } />
          <Route path="/services/:id" element={<ServiceDetail />} />

          {/* Auth Routes */}
          <Route path="/login" element={<PageWrapper><LoginForm /></PageWrapper>} />
          <Route path="/signup" element={<PageWrapper><SignupForm /></PageWrapper>} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Overview />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="history" element={<History />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AnimatePresence>

      {/* Only show footer on non-dashboard pages */}
      {!location.pathname.includes('/dashboard') && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </HashRouter>
  );
}