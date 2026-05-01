import React from 'react';
import { motion } from 'framer-motion';

const steps = ['Cabang', 'Layanan', 'Info'];

export default function BookingSteps({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i <= currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-[10px] mt-1.5 font-medium transition-colors ${
                i <= currentStep ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="w-12 md:w-20 h-px mx-2 mb-5">
              <motion.div
                className="h-full bg-primary rounded-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: i < currentStep ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ backgroundColor: i < currentStep ? undefined : 'hsl(var(--muted))' }}
              />
              {i >= currentStep && <div className="h-px bg-muted -mt-px" />}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}