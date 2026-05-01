import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ContactFooter from '../components/home/ContactFooter';
import { useSettings } from '@/lib/SettingsContext';

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null);
  const { gallery } = useSettings();

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
              Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2" style={{ fontFamily: "'Lobster', cursive" }}>
              Galeri <span className="italic text-primary">Karya</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mt-3">
              Beberapa Hasil Karya dari QweenSalon
            </p>
          </motion.div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="px-4 md:px-6 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto columns-2 md:columns-3 gap-3 md:gap-4">
          {gallery.map((image, i) => (
            <motion.div
              key={i}
              className="break-inside-avoid mb-3 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setSelectedImg(image)}
                className="w-full rounded-2xl md:rounded-3xl overflow-hidden group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
            >
              <X size={24} />
            </button>
            <motion.img
              src={selectedImg.src}
              alt={selectedImg.alt}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ContactFooter />
    </div>
  );
}