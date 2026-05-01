// @ts-nocheck
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import BookingSteps from '../components/booking/BookingSteps';
import ContactFooter from '../components/home/ContactFooter';
import { serviceCategories } from '../lib/servicesData';
import { useSearchParams } from 'react-router-dom';
import { useSettings } from '@/lib/SettingsContext';

const branches = [
  { id: 'sonopakis', name: 'QweenSalon Sonopakis', area: 'Jl. Sonopakis No.136, Kasihan ,Bantul' },
  { id: 'notoyudan', name: 'QweenSalon Notoyudan', area: 'Jl. Notoyudan No.979, Yogyakarta' },
];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const { discount } = useSettings();
  const isPromo = searchParams.get('promo') === 'true';
  const [step, setStep] = useState(0);
  const [branch, setBranch] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (serviceName) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const canNext = () => {
    if (step === 0) return branch !== '';
    if (step === 1) return selectedServices.length > 0;
    if (step === 2) return name.trim() !== '' && phone.trim() !== '' && date !== '' && time !== '';
    return false;
  };

  const handleSubmit = () => {
    const branchName = branches.find(b => b.id === branch)?.name || branch;
    const servicesText = selectedServices.join(', ');
    const formattedDate = date ? new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
    const promoText = isPromo ? `\n\n🎁 Promo: Diskon ${discount.percent}% - ${discount.description}\n🏷️ Kode: ${discount.code}` : '';
    const message = `Halo QweenSalon! \n\nSaya ingin reservasi :\nNama : ${name}\nNo. HP : ${phone}\nLayanan : ${servicesText}\nCabang : ${branchName}\nTanggal : ${formattedDate}\nJam : ${time}${notes ? `\nCatatan : ${notes}` : ''}${promoText}`;
    const whatsappUrl = `https://wa.me/6289656002552?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6">
          <motion.div
            className="text-center max-w-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
              <img src="/icons/check.png" alt="" className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Lobster', cursive" }}>
              Reservasi Terkirim!
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Pesan WhatsApp telah disiapkan. Tim kami akan segera menghubungi Anda untuk konfirmasi.
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setStep(0);
                setBranch('');
                setSelectedServices([]);
                setName('');
                setPhone('');
                setNotes('');
                setDate('');
                setTime('');
              }}
              variant="outline"
              className="rounded-full px-6"
            >
              Reservasi Lagi
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pt-24 pb-8 md:pt-32 px-6 bg-gradient-to-b from-accent/30 to-transparent">
        <div className="max-w-lg mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-medium text-primary tracking-widest uppercase">
              Reservasi
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-2" style={{ fontFamily: "'Lobster', cursive" }}>
              Layanan <span className="italic text-primary">Reservasi</span>
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="px-6 pb-16 md:pb-24">
        <div className="max-w-lg mx-auto">
          <BookingSteps currentStep={step} />

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Pilih cabang salon yang Anda inginkan
                </p>
                {branches.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBranch(b.id)}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                      branch === b.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                      <img src="/icons/google-maps.png" alt="" className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-sm text-foreground">{b.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{b.area}</p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Pilih layanan yang Anda inginkan
                </p>
                <div className="space-y-3">
                  {serviceCategories.map((cat) => (
                    <div key={cat.id}>
                      <p className="text-xs font-medium text-primary tracking-wide uppercase mb-2 mt-4 first:mt-0">
                        {cat.title}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((item) => {
                          const isSelected = selectedServices.includes(item.name);
                          return (
                            <button
                              key={item.name}
                              onClick={() => toggleService(item.name)}
                              className={`text-xs px-3 py-2 rounded-full border transition-all ${
                                isSelected
                                  ? 'bg-primary text-primary-foreground border-primary'
                                  : 'bg-card border-border text-foreground hover:border-primary/40'
                              }`}
                            >
                              {item.name} · {(item.price / 1000).toFixed(0)}rb
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                {selectedServices.length > 0 && (
                  <div className="mt-4 p-3 bg-primary/5 rounded-xl">
                    <p className="text-xs text-primary font-medium">
                      {selectedServices.length} layanan dipilih
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Lengkapi data diri Anda
                </p>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Nama Lengkap</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama Anda"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">No. WhatsApp</label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08xx-xxxx-xxxx"
                    className="rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block text-center">Tanggal</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="sr-only"
                      ref={(el) => { window._dateInput = el; }}
                    />
                    <button
                      type="button"
                      onClick={() => window._dateInput?.showPicker?.() || window._dateInput?.click()}
                      className="w-full h-9 border border-input bg-transparent rounded-xl text-sm text-center transition-colors hover:bg-accent"
                    >
                      {date ? new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Pilih Tanggal'}
                    </button>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block text-center">Jam</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="sr-only"
                      ref={(el) => { window._timeInput = el; }}
                    />
                    <button
                      type="button"
                      onClick={() => window._timeInput?.showPicker?.() || window._timeInput?.click()}
                      className="w-full h-9 border border-input bg-transparent rounded-xl text-sm text-center transition-colors hover:bg-accent"
                    >
                      {time || 'Pilih Jam'}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Catatan (opsional)</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Request khusus, dll."
                    className="rounded-xl min-h-[80px]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="rounded-full flex-1"
              >
                <ArrowLeft size={16} className="mr-1" />
                Kembali
              </Button>
            )}
            {step < 2 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canNext()}
                className="rounded-full flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Lanjut
                <ArrowRight size={16} className="ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canNext()}
                className="rounded-full flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send size={16} className="mr-1" />
                Kirim via WhatsApp
              </Button>
            )}
          </div>
        </div>
      </div>

      <ContactFooter />
    </div>
  );
}