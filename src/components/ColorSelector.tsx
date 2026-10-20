import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';

interface Colorway {
  id: string;
  name: string;
  tagline: string;
  finish: string;
  hex: string;
  accentHex: string;
  description: string;
  bgGradient: string;
}

const COLORWAYS: Colorway[] = [
  {
    id: 'matte-black',
    name: 'Matte Black',
    tagline: 'Signature Stealth & Corporate Luxury',
    finish: 'Velvet-soft anti-fingerprint ceramic matte coating with rose-gold chamfered accents.',
    hex: '#111113',
    accentHex: '#C59A72',
    description: 'The definitive executive flagship look. Deep obsidian black with micro-textured matte finish and warm copper branding.',
    bgGradient: 'from-[#0e0e12] to-[#040405]',
  },
  {
    id: 'platinum-silver',
    name: 'Platinum Silver',
    tagline: 'Titanium Mist & Warm Champagne',
    finish: 'Warm pearlescent silver-grey composite with satin champagne-gold metal hardware.',
    hex: '#D1CDC7',
    accentHex: '#D4AF37',
    description: 'An airy, architectural aesthetic. Refined stone hues paired with brushed aerospace-grade aluminum hinges.',
    bgGradient: 'from-[#1a1917] to-[#050505]',
  },
  {
    id: 'midnight-navy',
    name: 'Midnight Navy',
    tagline: 'Deep Twilight & Electric Cyan',
    finish: 'Deep indigo matte polymer with an anodized electric-blue acoustic mesh ring.',
    hex: '#111827',
    accentHex: '#00D6FF',
    description: 'Rich, oceanic dark blue inspired by twilight cityscapes. Understated until illuminated by ambient rim light.',
    bgGradient: 'from-[#0b1329] to-[#03050b]',
  },
];

interface ColorSelectorProps {
  onSelectColor?: (color: string) => void;
  onOpenPreorder: () => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({ onSelectColor, onOpenPreorder }) => {
  const [selected, setSelected] = useState<Colorway>(COLORWAYS[0]);

  const handleSelect = (c: Colorway) => {
    setSelected(c);
    if (onSelectColor) onSelectColor(c.id);
  };

  return (
    <section id="acoustics" className="relative py-28 px-6 md:px-12 bg-[#040406] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono tracking-wider uppercase mb-4">
            Materials & Finishes
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">
            Curated finishes. <br />
            <span className="gradient-text">Tactile perfection.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed font-normal">
            Coated with an ultra-fine soft-touch polymer that repels oils, resists smudges, and feels weightless in the hand.
          </p>
        </div>

        {/* Color Display Card */}
        <div className={`glass-card rounded-3xl p-8 md:p-14 border border-white/10 transition-all duration-700 bg-gradient-to-br ${selected.bgGradient} relative overflow-hidden shadow-2xl`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Swatches and Details */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-mono uppercase tracking-widest text-sony-cyan mb-2">
                Colorway 0{COLORWAYS.findIndex((c) => c.id === selected.id) + 1}
              </span>
              <h3 className="text-3xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">
                {selected.name}
              </h3>
              <p className="text-sm sm:text-base text-white/80 font-medium mb-6">
                {selected.tagline}
              </p>
              <p className="text-sm text-white/60 leading-relaxed max-w-lg mb-8">
                {selected.description}
              </p>

              {/* Swatch Pickers */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest mr-2">Finish:</span>
                {COLORWAYS.map((c) => {
                  const isCur = c.id === selected.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleSelect(c)}
                      className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-transform duration-300 ${
                        isCur
                          ? 'scale-110 ring-2 ring-sony-cyan ring-offset-4 ring-offset-black'
                          : 'hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {isCur && <Check className="w-5 h-5 text-white drop-shadow" />}
                      <span
                        className="absolute bottom-0 right-0 w-3 h-3 rounded-full border border-black/80"
                        style={{ backgroundColor: c.accentHex }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Material Specs */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md max-w-lg mb-8">
                <span className="text-[11px] font-mono text-white/40 uppercase block mb-1">Coating Chemistry</span>
                <p className="text-xs text-white/80 font-normal leading-relaxed">{selected.finish}</p>
              </div>

              <div>
                <button
                  onClick={onOpenPreorder}
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors border border-white/20 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-sony-cyan" />
                  Pre-order in {selected.name}
                </button>
              </div>
            </div>

            {/* Right: Visual Aesthetic Preview Frame */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl p-8 flex flex-col items-center justify-center bg-black/50 border border-white/10 shadow-inner">
                {/* Visual Ring representation */}
                <div
                  className="w-48 h-48 sm:w-60 sm:h-60 rounded-full border-8 transition-all duration-700 flex items-center justify-center relative shadow-[0_0_60px_rgba(0,0,0,0.8)]"
                  style={{
                    borderColor: selected.hex,
                    boxShadow: `0 0 50px ${selected.accentHex}33`,
                  }}
                >
                  <div
                    className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-dashed flex flex-col items-center justify-center text-center p-4 transition-all duration-700"
                    style={{ borderColor: `${selected.accentHex}66` }}
                  >
                    <span className="text-xs font-mono uppercase tracking-widest text-white/50">SONY</span>
                    <span className="text-sm font-bold text-white tracking-wider my-1">WH-1000XM6</span>
                    <span className="text-[10px] font-mono" style={{ color: selected.accentHex }}>
                      {selected.name}
                    </span>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest block">
                    Includes Color-Matched Magnetic Travel Case
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
