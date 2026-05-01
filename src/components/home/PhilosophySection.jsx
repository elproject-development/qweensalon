import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function PhilosophySection() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-accent/30 px-4 py-1.5 rounded-full mb-6">
            <Heart size={12} className="text-primary" />
            <span className="text-xs font-medium text-primary tracking-wide uppercase">
              Cerita Kami
            </span>
            <Heart size={12} className="text-primary" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6" style={{ fontFamily: "'Lobster', cursive" }}>
            Filosofi <span className="text-primary">QweenSalon</span>
          </h2>

          <p className="text-muted-foreground font-body text-sm md:text-lg leading-[1.8] max-w-2xl mx-auto">
            Qweensalon berdiri pada bulan Oktober 2015,<br />lahir dari keyakinan bahwa kecantikan sejati 
            tumbuh dari rasa percaya diri serta perawatan itu sendiri.<br />Bukan sekedar tempat merias diri, <br />
            Qweensalon adalah <br /><span className="text-primary font-medium">ruang untuk memperkuat jati diri</span>.
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-12 h-px bg-primary/30" />
          <div className="w-2 h-2 rounded-full bg-primary/40" />
          <div className="w-12 h-px bg-primary/30" />
        </motion.div>
      </div>
    </section>
  );
}