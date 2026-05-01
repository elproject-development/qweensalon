import React from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '@/lib/SettingsContext';

const team = [
  { name: 'Winnie', role: 'Owner & Stylist' },
  { name: 'Dinda', role: 'Nail Artist' },
  { name: 'Arnita', role: 'Nail Artist' },
];

export default function TeamSection() {
  const { profiles } = useSettings();

  const getImage = (name) => {
    const p = profiles.find(prof => prof.name === name);
    return p?.image_url || null;
  };
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-medium text-primary tracking-widest uppercase">
            Tim Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2" style={{ fontFamily: "'Lobster', cursive" }}>
            Jumpa Kami <span className="text-primary">di Sini</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-xs md:max-w-md mx-auto">
          {team.slice(0, 2).map((member, i) => (
            <motion.div
              key={member.name}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-3">
                {/* Signal rings */}
                <span className="absolute inset-0 rounded-full border-2 border-primary" style={{ animation: 'signal-ring 2s ease-out infinite' }} />
                <span className="absolute inset-0 rounded-full border-2 border-primary" style={{ animation: 'signal-ring 2s ease-out infinite 0.6s' }} />
                <span className="absolute inset-0 rounded-full border-2 border-primary" style={{ animation: 'signal-ring 2s ease-out infinite 1.2s' }} />
                <div className="w-full h-full rounded-full overflow-hidden relative z-10">
                  {getImage(member.name) ? (
                    <img src={getImage(member.name)} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-accent/50 flex items-center justify-center">
                      <span className="font-heading text-3xl md:text-4xl font-bold text-primary">
                        {member.name[0]}
                      </span>
                    </div>
                  )}
                </div>
                <span className="absolute -bottom-1 -right-1 md:-bottom-1.5 md:-right-1.5 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full border-2 border-white z-20" />
              </div>
              <h3 className="font-semibold text-sm md:text-base text-foreground" style={{ fontFamily: "'Lobster', cursive" }}>
                {member.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}