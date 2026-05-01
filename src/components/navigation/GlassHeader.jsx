import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { useSettings } from '@/lib/SettingsContext';
import DiscountForm from '@/components/settings/DiscountForm';

const isNative = Capacitor.isNativePlatform();

const navLinks = [
  { label: 'Beranda', path: '/' },
  { label: 'Layanan', path: '/services' },
  { label: 'Galeri', path: '/gallery' },
  { label: 'Reservasi', path: '/booking' },
];

export default function GlassHeader() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState('profil');
  const [uploadingProfile, setUploadingProfile] = useState(null);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [deletingGallery, setDeletingGallery] = useState(null);
  const { profiles, discount, gallery, setProfileImage, setDiscountData, addGallery, removeGallery } = useSettings();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(window.scrollY / 120, 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-500"
        style={{
          backgroundColor: `hsl(var(--background) / ${menuOpen ? 0.95 : scrollProgress * 0.7})`,
          backdropFilter: `blur(${scrollProgress * 20}px)`,
          WebkitBackdropFilter: `blur(${scrollProgress * 20}px)`,
          boxShadow: scrollProgress > 0.1 ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.span
              className={`text-xl font-bold tracking-wide transition-colors duration-700 ${
                isHome && !menuOpen && scrollProgress <= 0.5 ? 'text-white' : 'text-primary'
              }`}
              style={{ fontFamily: "'Lobster', cursive" }}
              animate={{ scale: scrollProgress > 0.5 ? 0.9 : 1 }}
              transition={{ duration: 0.3 }}
            >
              QweenSalon
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`text-sm font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? isHome && !menuOpen && scrollProgress <= 0.5 ? 'text-white' : 'text-primary'
                    : isHome && !menuOpen && scrollProgress <= 0.5 ? 'text-white/70 hover:text-white' : 'text-primary/70 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/booking"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Book Now
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors duration-500 ${
              isHome && !menuOpen && scrollProgress <= 0.5 ? 'text-white' : 'text-primary'
            }`}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={`text-3xl transition-colors ${
                      location.pathname === link.path
                        ? 'text-primary'
                        : 'text-foreground/60 hover:text-primary'
                    }`}
                    style={{ fontFamily: "'Lobster', cursive" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {isNative && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <button
                  onClick={() => { setMenuOpen(false); setSettingsOpen(true); }}
                  className="text-3xl transition-colors text-foreground/60 hover:text-primary"
                  style={{ fontFamily: "'Lobster', cursive" }}
                >
                  Setting
                </button>
              </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/booking"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-primary text-primary-foreground font-medium px-8 py-3 rounded-full text-lg hover:opacity-90 active:scale-95 active:shadow-none transition-all duration-150 animate-glow"
                >
                  Reservasi Sekarang
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Popup - Android only */}
      <AnimatePresence>
        {isNative && settingsOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSettingsOpen(false)}
          >
            <motion.div
              className="bg-background text-foreground rounded-3xl p-5 w-full max-w-sm shadow-2xl max-h-[85vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ fontFamily: "'Lobster', cursive" }}>Setting</h3>
                <button
                  onClick={() => setSettingsOpen(false)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-muted rounded-xl p-1 mb-4">
                {[
                  { id: 'profil', label: 'Profil' },
                  { id: 'diskon', label: 'Diskon' },
                  { id: 'galeri', label: 'Galeri' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSettingsTab(tab.id)}
                    className={`flex-1 text-xs font-medium py-2 rounded-lg transition-colors ${
                      settingsTab === tab.id ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab: Profil */}
              {settingsTab === 'profil' && (
                <div className="space-y-3">
                  {profiles.map((p) => (
                    <div key={p.name} className="flex items-center gap-3 bg-accent/30 rounded-2xl p-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative">
                        <img src={p.image_url} alt={p.name} className={`w-full h-full object-cover transition-opacity ${uploadingProfile === p.name ? 'opacity-40' : ''}`} />
                        {uploadingProfile === p.name && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm" style={{ fontFamily: "'Lobster', cursive" }}>{p.name}</p>
                        <label className={`inline-flex items-center gap-1 text-xs text-primary font-medium mt-0.5 cursor-pointer hover:text-primary/80 transition-colors ${uploadingProfile === p.name ? 'pointer-events-none opacity-50' : ''}`}>
                          Ganti Foto
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setUploadingProfile(p.name);
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  setProfileImage(p.name, ev.target.result).finally(() => setUploadingProfile(null));
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Diskon */}
              {settingsTab === 'diskon' && (
                <DiscountForm discount={discount} setDiscountData={setDiscountData} />
              )}

              {/* Tab: Galeri */}
              {settingsTab === 'galeri' && (
                <div className="space-y-3">
                  <label className={`flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium px-4 py-2.5 rounded-xl text-sm cursor-pointer hover:opacity-90 transition-opacity ${uploadingGallery ? 'pointer-events-none opacity-50' : ''}`}>
                    {uploadingGallery ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        Mengupload...
                      </>
                    ) : (
                      '+ Tambah Foto'
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        if (files.length > 0) {
                          setUploadingGallery(true);
                          let loaded = 0;
                          files.forEach((file) => {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              addGallery({ src: ev.target.result, alt: file.name, isDefault: false }).finally(() => {
                                loaded++;
                                if (loaded === files.length) setUploadingGallery(false);
                              });
                            };
                            reader.readAsDataURL(file);
                          });
                        }
                      }}
                    />
                  </label>
                  <div className="grid grid-cols-3 gap-2 max-h-[40vh] overflow-y-auto">
                    {gallery.map((img) => (
                      <div key={img.id} className="relative group">
                        <img
                          src={img.src}
                          alt={img.alt}
                          className={`w-full aspect-square object-cover rounded-xl transition-opacity ${deletingGallery === img.id ? 'opacity-40' : ''}`}
                        />
                        {deletingGallery === img.id && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                        <button
                          onClick={() => {
                            setDeletingGallery(img.id);
                            removeGallery(img.id).finally(() => setDeletingGallery(null));
                          }}
                          className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  {gallery.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">Belum ada foto</p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}