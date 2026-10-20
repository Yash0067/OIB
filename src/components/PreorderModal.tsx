import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, Sparkles, Box, CreditCard, ChevronRight } from 'lucide-react';

interface PreorderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialColor?: string;
}

export const PreorderModal: React.FC<PreorderModalProps> = ({
  isOpen,
  onClose,
  initialColor = 'matte-black',
}) => {
  const [selectedFinish, setSelectedFinish] = useState<string>(initialColor);
  const [includeProtection, setIncludeProtection] = useState<boolean>(true);
  const [customEngraving, setCustomEngraving] = useState<string>('');
  const [isOrdered, setIsOrdered] = useState<boolean>(false);

  if (!isOpen) return null;

  const basePrice = 449.99;
  const protectionPrice = includeProtection ? 39.0 : 0.0;
  const totalPrice = (basePrice + protectionPrice).toFixed(2);

  const finishes = [
    { id: 'matte-black', name: 'Matte Black', hex: '#111113' },
    { id: 'platinum-silver', name: 'Platinum Silver', hex: '#D1CDC7' },
    { id: 'midnight-navy', name: 'Midnight Navy', hex: '#111827' },
  ];

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-md transition-opacity duration-300">
      {/* Background backdrop dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over panel */}
      <div className="relative z-10 w-full max-w-xl h-full bg-[#07070a] border-l border-white/10 flex flex-col justify-between overflow-y-auto shadow-2xl p-6 sm:p-10 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-sony-cyan uppercase">
              Official Sony Direct
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">Pre-order WH-1000XM6</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isOrdered ? (
          <form onSubmit={handleOrder} className="my-auto py-6 space-y-6">
            {/* Color finish select */}
            <div>
              <label className="block text-xs font-mono uppercase text-white/50 tracking-wider mb-3">
                1. Select Master Finish
              </label>
              <div className="grid grid-cols-3 gap-3">
                {finishes.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFinish(f.id)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      selectedFinish === f.id
                        ? 'border-sony-cyan bg-sony-blue/10 shadow-[0_0_20px_rgba(0,214,255,0.2)]'
                        : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full inline-block mb-1.5 border border-white/20"
                      style={{ backgroundColor: f.hex }}
                    />
                    <span className="block text-xs font-medium text-white">{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Engraving */}
            <div className="p-4 rounded-2xl glass-card border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-white/70 tracking-wider">
                  2. Laser Engraving (Free)
                </span>
                <span className="text-[10px] font-mono text-sony-cyan">Complimentary</span>
              </div>
              <input
                type="text"
                maxLength={14}
                value={customEngraving}
                onChange={(e) => setCustomEngraving(e.target.value)}
                placeholder="YOUR INITIALS OR NAME"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-sony-cyan"
              />
              <span className="text-[10px] text-white/40 block mt-1.5">
                Precision diamond-cut engraving placed discreetly on the inner hinge.
              </span>
            </div>

            {/* Sony Care+ Protection */}
            <div
              onClick={() => setIncludeProtection(!includeProtection)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                includeProtection
                  ? 'border-sony-cyan/50 bg-sony-blue/10'
                  : 'border-white/5 bg-white/[0.02]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                  includeProtection
                    ? 'bg-sony-cyan border-sony-cyan text-black'
                    : 'border-white/20 bg-transparent'
                }`}
              >
                {includeProtection && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <div className="text-left flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Sony Care+ 2-Year Plan</span>
                  <span className="text-xs font-mono text-sony-cyan">+$39.00</span>
                </div>
                <p className="text-[11px] text-white/60 mt-1 leading-relaxed">
                  Unlimited accidental drops, spills, and rapid replacement express shipping.
                </p>
              </div>
            </div>

            {/* What's in the Box */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[11px] font-mono uppercase text-white/50 block mb-2 flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-sony-cyan" /> Included in Luxury Box
              </span>
              <ul className="text-[11px] text-white/70 space-y-1">
                <li>• Sony WH-1000XM6 Headphones</li>
                <li>• Magnetic Hard-Shell Case with Cable Management</li>
                <li>• Gold-Plated 3.5mm Braided Studio Cable (1.2m)</li>
                <li>• USB-C Fast-Charging Cable</li>
                <li>• Airline High-Fidelity Audio Adapter</li>
              </ul>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center gap-3 text-xs text-white/60">
              <Truck className="w-4 h-4 text-sony-cyan shrink-0" />
              <span>Complimentary 2-Day Insured Priority Express Shipping</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-sony-blue via-sony-cyan to-sony-blue text-white font-semibold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,80,255,0.4)] hover:shadow-[0_0_50px_rgba(0,214,255,0.6)] transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Confirm Pre-order · ${totalPrice}
            </button>
          </form>
        ) : (
          <div className="my-auto py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-sony-cyan/20 border border-sony-cyan flex items-center justify-center text-sony-cyan mb-6 animate-pulse">
              <Check className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono text-sony-cyan uppercase tracking-widest mb-2">
              Order Confirmed #SN-XM6-8942
            </span>
            <h4 className="text-2xl font-bold text-white mb-3">Welcome to Absolute Silence.</h4>
            <p className="text-xs text-white/60 max-w-sm mb-6 leading-relaxed">
              Your Sony WH-1000XM6 in{' '}
              <strong className="text-white capitalize">{selectedFinish.replace('-', ' ')}</strong>{' '}
              {customEngraving && (
                <>
                  with laser engraving <strong className="text-sony-cyan">"{customEngraving}"</strong>{' '}
                </>
              )}
              is reserved for priority dispatch. A confirmation receipt has been generated.
            </p>

            <button
              onClick={() => {
                setIsOrdered(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Return to Experience
            </button>
          </div>
        )}

        {/* Footer info */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40 font-mono">
          <span>30-DAY RISK-FREE STUDIO TRIAL</span>
          <span>SONY OFFICIAL WARRANTY</span>
        </div>
      </div>
    </div>
  );
};
