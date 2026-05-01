import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, X, MapPin } from 'lucide-react';

const branches = [
  {
    name: 'QweenSalon Sonopakis',
    address: 'Jl. Sonopakis No.136, Kasihan,Bantul',
    mapUrl: 'https://maps.app.goo.gl/yJDVJn122KhmfXAP9',
  },
  {
    name: 'QweenSalon Notoyudan',
    address: 'Jl. Notoyudan No.979, Yogyakarta',
    mapUrl: 'https://maps.app.goo.gl/EtR4etn1RuqbkoFJ6',
  },
];

export default function ContactFooter() {
  const [showMap, setShowMap] = useState(false);

  return (
    <footer className="bg-foreground text-background">
      {/* WiFi banner */}
      <div className="bg-primary/90 text-primary-foreground text-center py-3 px-6">
        <div className="flex items-center justify-center gap-2 text-sm">
          <Wifi size={14} />
          <span className="font-medium">Free Wi-fi Available</span>
        </div>
      </div>

      <div className="px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "'Lobster', cursive" }}>
              Hubungi <span className="text-primary">Kami</span>
            </h2>
            <p className="text-background/60 text-sm">Kami siap melayani...</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <a
              href="https://wa.me/6289656002552"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-background/5 rounded-2xl p-5 hover:bg-background/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <img src="/icons/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-background/50">WhatsApp</p>
                <p className="font-medium text-sm">0896-5600-2552</p>
              </div>
            </a>

            <a
              href="mailto:winieistipurnami@gmail.com?subject=Reservasi%20Salon"
              className="flex items-center gap-4 bg-background/5 rounded-2xl p-5 hover:bg-background/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <img src="/icons/gmail.png" alt="Email" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-background/50">Email</p>
                <p className="font-medium text-sm">hello@qweensalon.beauty</p>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-background/5 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <img src="/icons/on-time.png" alt="Jam Buka" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-background/50">Jam Buka</p>
                <p className="font-medium text-sm">Senin - Sabtu · 09:00 - 18:00</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-background/5 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <img src="/icons/google-maps.png" alt="Cabang" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-background/50">Cabang</p>
                <p className="font-medium text-sm">Sonopakis & Notoyudan, Yogyakarta</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-4 mb-6">
            <button
              onClick={() => setShowMap(true)}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium px-6 py-3 rounded-full text-sm hover:opacity-90 active:scale-95 active:shadow-none transition-all duration-150 animate-glow"
            >
              <MapPin size={16} />
              Cek Lokasi Salon
            </button>
          </div>

          {/* Location Popup */}
          <AnimatePresence>
            {showMap && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMap(false)}
              >
                <motion.div
                  className="bg-background text-foreground rounded-3xl p-6 w-full max-w-sm shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold" style={{ fontFamily: "'Lobster', cursive" }}>Pilih Cabang</h3>
                    <button
                      onClick={() => setShowMap(false)}
                      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {branches.map((branch) => (
                      <a
                        key={branch.name}
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 bg-accent/30 rounded-2xl p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                          <img src="/icons/google-maps.png" alt="" className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{branch.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{branch.address}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom */}
          <div className="border-t border-background/10 pt-6 text-center">
            <p className="text-lg font-bold mb-1" style={{ fontFamily: "'Lobster', cursive" }}>QweenSalon</p>
            <p className="text-xs text-background/40">
              © 2015 – {new Date().getFullYear()} QweenSalon. Semua Hak Dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}