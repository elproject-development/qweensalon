import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Eyelash',
    desc: 'Natural hingga Russian Bold',
    price: 'Mulai 35rb',
    img: 'https://media.base44.com/images/public/69f2d968a4c3b226c15dcefd/8568f8644_generated_7a8cabb2.png',
  },
  {
    title: 'Nail Art',
    desc: 'Gel Polish, Cat Eye, Extension',
    price: 'Mulai 40rb',
    img: 'https://media.base44.com/images/public/69f2d968a4c3b226c15dcefd/488d09ea9_generated_37526058.png',
  },
  {
    title: 'Smoothing',
    desc: 'Keratin, Matrix, Makarizo',
    price: 'Mulai 150rb',
    img: 'https://media.base44.com/images/public/69f2d968a4c3b226c15dcefd/10b05083d_generated_533e272d.png',
  },
  {
    title: 'Hair Color',
    desc: 'Semir, Hi-Light, Ombre',
    price: 'Mulai 85rb',
    img: 'https://media.base44.com/images/public/69f2d968a4c3b226c15dcefd/9f3320d4c_generated_4b091124.png',
  },
  {
    title: 'Facial',
    desc: 'SariAyu, Setrika Wajah, Paket',
    price: 'Mulai 35rb',
    img: 'https://media.base44.com/images/public/69f2d968a4c3b226c15dcefd/7acd6b6e6_generated_4f354db7.png',
  },
  {
    title: 'Creambath',
    desc: 'Creambath, Hairmask, Hairspa',
    price: 'Mulai 35rb',
    img: 'https://media.base44.com/images/public/69f2d968a4c3b226c15dcefd/00a5646fd_generated_390ffd3f.png',
  },
];

export default function ServicesPreview() {
  const scrollRef = useRef(null);

  return (
    <section className="pb-16 md:pb-24">
      <div className="px-6 max-w-7xl mx-auto mb-8">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <span className="text-xs font-medium text-primary tracking-widest uppercase block">
              Layanan Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2" style={{ fontFamily: "'Lobster', cursive" }}>
              Perawatan <span className="italic text-primary">Terbaik</span>
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Mobile: 2-column grid, Desktop: 4-column grid */}
      <div
        ref={scrollRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-6 pb-4"
      >
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            className={`${i >= 4 ? 'md:hidden' : ''}`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to="/services" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group block">
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
                  <span className="text-white/60 text-[10px] md:text-xs font-medium">{service.price}</span>
                  <h3 className="text-sm md:text-xl font-bold text-white mt-0.5" style={{ fontFamily: "'Lobster', cursive" }}>
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-[10px] md:text-sm mt-1">{service.desc}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="px-6 mt-6 text-center">
        <Link
          to="/services"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center justify-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all"
        >
          Lihat Semua Layanan <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}