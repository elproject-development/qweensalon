import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { useSettings } from '@/lib/SettingsContext';

export default function PromoSection() {
  const { discount } = useSettings();
  return (
    <section className="px-6 py-8">
      <motion.div
        className="max-w-3xl mx-auto relative overflow-hidden rounded-3xl bg-primary p-8 md:p-12"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/5" />

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full mb-4">
            <span className="text-xs font-medium text-primary-foreground tracking-wide uppercase">
              Promo Spesial
            </span>
          </div>

          <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-3">
            Diskon {discount.percent}%
          </h2>
          <p className="text-primary-foreground/80 font-body text-sm md:text-base mb-6">
            {discount.description}
          </p>

          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-2xl mb-6">
            <Tag size={14} className="text-primary-foreground" />
            <span className="text-primary-foreground font-medium text-sm tracking-wider">
              {discount.code}
            </span>
          </div>

          <div>
            <Link
              to="/booking?promo=true"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-white text-primary font-medium px-7 py-3 rounded-full text-sm hover:bg-white/90 transition-colors"
            >
              Gunakan Promo
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}