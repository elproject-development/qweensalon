import React from 'react';
import HeroSection from '../components/home/HeroSection';
import PhilosophySection from '../components/home/PhilosophySection';
import ServicesPreview from '../components/home/ServicesPreview';
import PromoSection from '../components/home/PromoSection';
import TeamSection from '../components/home/TeamSection';
import ContactFooter from '../components/home/ContactFooter';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PhilosophySection />
      <ServicesPreview />
      <PromoSection />
      <TeamSection />
      <ContactFooter />
    </div>
  );
}