import React, { useState } from 'react';
import { SlidersHorizontal, Check, Minus } from 'lucide-react';

interface SpecRow {
  category: string;
  name: string;
  xm6: string;
  xm5: string;
  competitor: string;
  highlight?: boolean;
}

const SPECS_COMPARISON: SpecRow[] = [
  {
    category: 'Audio Architecture',
    name: 'Processor Chipset',
    xm6: 'Dual Integrated V3 + QN3 HD DSP',
    xm5: 'Integrated V1 + QN1 DSP',
    competitor: 'Dual H1 Chips',
    highlight: true,
  },
  {
    category: 'Audio Architecture',
    name: 'Driver Unit',
    xm6: '30mm Carbon-Fiber Composite Dome',
    xm5: '30mm Carbon Composite Dome',
    competitor: '40mm Dynamic Driver',
  },
  {
    category: 'Audio Architecture',
    name: 'Frequency Response',
    xm6: '4 Hz – 40,000 Hz (JEITA Hi-Res)',
    xm5: '4 Hz – 40,000 Hz',
    competitor: '20 Hz – 20,000 Hz',
    highlight: true,
  },
  {
    category: 'Noise Cancellation',
    name: 'ANC Microphones',
    xm6: '8 Precision Beamforming Mics (4 per cup)',
    xm5: '8 Microphones',
    competitor: '8 ANC Microphones',
  },
  {
    category: 'Noise Cancellation',
    name: 'Atmospheric Pressure Optimizer',
    xm6: 'Real-time Barometric Sensor AI',
    xm5: 'Auto NC Optimizer',
    competitor: 'Static Equalizer',
    highlight: true,
  },
  {
    category: 'Battery & Charging',
    name: 'Battery Life (ANC ON)',
    xm6: '40 Hours Continuous Playback',
    xm5: '30 Hours',
    competitor: '20 Hours',
    highlight: true,
  },
  {
    category: 'Battery & Charging',
    name: 'Quick Turbo Charge',
    xm6: '3 min charge = 3 hours playback',
    xm5: '3 min charge = 1 hour playback',
    competitor: '5 min charge = 1.5 hours',
    highlight: true,
  },
  {
    category: 'Connectivity',
    name: 'Bluetooth Version & Codecs',
    xm6: 'Bluetooth 5.4 · LDAC, LC3, AAC, SBC',
    xm5: 'Bluetooth 5.2 · LDAC, AAC, SBC',
    competitor: 'Bluetooth 5.0 · AAC, SBC',
    highlight: true,
  },
  {
    category: 'Connectivity',
    name: 'Multipoint Connection',
    xm6: 'Simultaneous 2 Devices (Instant LE Switch)',
    xm5: 'Supported',
    competitor: 'Apple Ecosystem Only',
  },
  {
    category: 'Ergonomics',
    name: 'Headphone Weight',
    xm6: '248 grams',
    xm5: '250 grams',
    competitor: '384.8 grams',
    highlight: true,
  },
];

export const SpecsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'table' | 'cards'>('table');

  return (
    <section id="specs" className="relative py-28 px-6 md:px-12 bg-void border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sony-blue/15 border border-sony-blue/30 text-sony-cyan text-xs font-mono tracking-wider uppercase mb-4">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Flagship Engineering Matrix
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Class-defining <br />
            <span className="gradient-text">specifications.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed font-normal">
            Directly benchmarked against previous generation Sony flagships and industry standards.
          </p>
        </div>

        {/* Specs Table */}
        <div id="compare" className="glass-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="py-6 px-8 text-xs font-mono uppercase tracking-widest text-white/40 w-1/3">
                    Acoustic & System Specs
                  </th>
                  <th className="py-6 px-6 text-sm font-bold text-sony-cyan bg-sony-blue/10 border-x border-sony-blue/20 w-1/4">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sony-cyan animate-pulse"></span>
                      Sony WH-1000XM6
                    </span>
                    <span className="text-[10px] font-mono font-normal text-white/60 block mt-0.5">2026 Next-Gen</span>
                  </th>
                  <th className="py-6 px-6 text-sm font-medium text-white/70 w-1/5">
                    Sony WH-1000XM5
                    <span className="text-[10px] font-mono text-white/40 block mt-0.5">Previous Gen</span>
                  </th>
                  <th className="py-6 px-6 text-sm font-medium text-white/50 w-1/5">
                    AirPods Max
                    <span className="text-[10px] font-mono text-white/40 block mt-0.5">Industry Ref</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {SPECS_COMPARISON.map((row, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-white/[0.02] transition-colors ${
                      row.highlight ? 'bg-white/[0.01]' : ''
                    }`}
                  >
                    <td className="py-4 px-8 text-white/80 font-normal">
                      <span className="block text-[11px] font-mono uppercase text-white/40 mb-0.5">
                        {row.category}
                      </span>
                      <span className="font-semibold text-white">{row.name}</span>
                    </td>
                    <td className="py-4 px-6 text-white font-medium bg-sony-blue/5 border-x border-sony-blue/20 text-sony-cyan">
                      {row.xm6}
                    </td>
                    <td className="py-4 px-6 text-white/60">{row.xm5}</td>
                    <td className="py-4 px-6 text-white/40">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer note */}
          <div className="p-6 bg-white/[0.01] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 font-mono gap-4">
            <span>CERTIFIED HI-RES AUDIO WIRELESS & 360 REALITY AUDIO</span>
            <span>TESTED UNDER JEITA COMPLIANCE STANDARDS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
