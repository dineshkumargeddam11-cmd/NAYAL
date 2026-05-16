import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Brands from './components/Brands';
import Testimonials from './components/Testimonials';
import BudgetCalculator from './components/BudgetCalculator';
import ServiceRequestForm from './components/ServiceRequestForm';
import FAQ from './components/FAQ';
import OurStory from './components/OurStory';
import Footer from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

function App() {
  return (
    <div className="text-brand-grey font-sans">
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <Process />
        <Services />
        <BudgetCalculator />
        <ServiceRequestForm />
        <Brands />
        <Testimonials />
        <FAQ />
        <OurStory />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;