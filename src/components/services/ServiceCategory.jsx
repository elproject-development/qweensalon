import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ServiceCategory({ category, isOpen, onToggle }) {
  return (
    <motion.div
      className="border border-border/50 rounded-3xl overflow-hidden bg-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 md:p-6 text-left"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden shrink-0">
          <img
            src={category.img}
            alt={category.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold text-foreground" style={{ fontFamily: "'Lobster', cursive" }}>
            {category.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {category.items.length} layanan · Mulai {category.startPrice}
          </p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} className="text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5 md:px-6 md:pb-6">
              <div className="border-t border-border/50 pt-4 space-y-3">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-sm font-medium text-foreground">
                        {item.name}
                        {item.note && (
                          <span className="text-primary text-xs ml-1">*</span>
                        )}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-primary whitespace-nowrap" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>
              {category.items.some(i => i.note) && (
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  * Harga dapat berubah sesuai ketentuan
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}