import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HERO_IMG = 'https://media.base44.com/images/public/69f2d968a4c3b226c15dcefd/84a883394_generated_51d7da58.png';

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Luxurious salon interior with golden hour lighting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center md:justify-end px-6 pb-24 md:pb-32 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4 md:ml-2">
            <span className="text-white/70 text-xs font-body tracking-widest uppercase">
              Khusus Wanita · Sejak 2015
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.95] mb-3 text-center md:text-left" style={{ fontFamily: "'Lobster', cursive" }}>
            Qween<span className="text-accent">Salon</span>
          </h1>

          <p className="text-white/80 font-body md:ml-2 text-base md:text-lg max-w-md leading-relaxed mb-4 text-center md:text-left mx-auto md:mx-0">
            Tempatnya perawatan kecantikan
          </p>

          

          <div className="flex flex-col sm:flex-row gap-3 mt-6 md:mt-0">
            <Link
              to="/booking"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium px-7 py-3.5 rounded-full text-sm hover:opacity-90 active:scale-95 active:shadow-none transition-all duration-150 animate-glow"
            >
              Reservasi Sekarang
            </Link>
            <Link
              to="/services"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-medium px-7 py-3.5 rounded-full text-sm border border-white/20 hover:bg-white/20 transition-colors"
            >
              Lihat Layanan
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating booking button - mobile thumb zone */}
      <Link
        to="/booking"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-4 z-40 md:hidden bg-primary text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 animate-float"
      >
        <img src="/icons/calendar.png" alt="" className="w-5 h-5" />
      </Link>
    </section>
  );
}