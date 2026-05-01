import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ServiceCategory from '../components/services/ServiceCategory';
import ContactFooter from '../components/home/ContactFooter';
import { serviceCategories } from '../lib/servicesData';

export default function Services() {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <div>
      {/* Header */}
      <div className="pt-24 pb-8 md:pt-32 md:pb-12 px-6 bg-gradient-to-b from-accent/30 to-transparent">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs font-medium text-primary tracking-widest uppercase">
              Price List
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2" style={{ fontFamily: "'Lobster', cursive" }}>
              Layanan & <span className="italic text-primary">Harga</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mt-3 max-w-md mx-auto">
              Semua perawatan kecantikan yang Anda butuhkan, dengan harga terjangkau dan hasil terbaik.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="px-6 pb-16 md:pb-24">
        <div className="max-w-2xl mx-auto space-y-3">
          {serviceCategories.map((cat) => (
            <ServiceCategory
              key={cat.id}
              category={cat}
              isOpen={openCategory === cat.id}
              onToggle={() =>
                setOpenCategory(openCategory === cat.id ? null : cat.id)
              }
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            to="/booking"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-8 py-3.5 rounded-full text-sm hover:opacity-90 active:scale-95 active:shadow-none transition-all duration-150 animate-glow"
          >
            Reservasi Sekarang
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>

      <ContactFooter />
    </div>
  );
}