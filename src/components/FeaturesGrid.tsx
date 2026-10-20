import React from 'react';
import { BatteryCharging, Mic, Laptop, HandMetal, Feather, Music2, CheckCircle2 } from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  return (
    <section id="engineering" className="relative py-28 px-6 md:px-12 bg-void border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-block px-3.5 py-1 rounded-full bg-sony-cyan/10 border border-sony-cyan/30 text-sony-cyan text-xs font-mono tracking-wider uppercase mb-4">
            Master Craftsmanship & Intelligence
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Designed for focus. <br />
            <span className="gradient-text">Engineered for endurance.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed font-normal">
            Every millimeter of the WH-1000XM6 has been refined to eliminate friction between you and your sound.
          </p>
        </div>

        {/* Apple-style Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: 40h Battery & 3min Fast Charge (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 glass-card p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-sony-blue/10 rounded-full blur-3xl pointer-events-none group-hover:bg-sony-blue/20 transition-all duration-700" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-sony-blue/20 border border-sony-blue/40 flex items-center justify-center text-sony-cyan mb-6">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-sony-cyan block mb-2">
                Endurance Power System
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                40 Hours of Pure Silence. <br />
                <span className="text-white/60">3-Minute Turbo Charge = 3 Hours Playback.</span>
              </h3>
              <p className="text-sm text-white/60 max-w-xl leading-relaxed">
                Travel from Tokyo to New York and back on a single charge. When you're in a hurry, USB-C Power Delivery injects 180 minutes of playback in the time it takes to brew an espresso.
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-4">
              <div>
                <span className="text-3xl font-bold text-white block">40 hrs</span>
                <span className="text-xs text-white/50 uppercase">With ANC Enabled</span>
              </div>
              <div>
                <span className="text-3xl font-bold text-sony-cyan block">55 hrs</span>
                <span className="text-xs text-white/50 uppercase">With ANC Off</span>
              </div>
              <div>
                <span className="text-3xl font-bold text-white block">3 min</span>
                <span className="text-xs text-white/50 uppercase">Turbo Quick Boost</span>
              </div>
            </div>
          </div>

          {/* Card 2: 248g Featherweight & Soft-Fit Synthetic Leather */}
          <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                <Feather className="w-6 h-6 text-sony-cyan" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-2">
                Ergonomic Architecture
              </span>
              <h3 className="text-2xl font-bold text-white mb-3">248g Featherweight</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Continuous stepless headband with silent joints and zero cranium pressure. The redesigned fit hugs your head without clamping fatigue.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-xs font-mono text-sony-cyan flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Stepless Silent Adjustment
              </span>
            </div>
          </div>

          {/* Card 3: Speak-to-Chat & Wear Detection */}
          <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                <Mic className="w-6 h-6 text-sony-cyan" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-2">
                Contextual Intelligence
              </span>
              <h3 className="text-2xl font-bold text-white mb-3">Speak-to-Chat</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                As soon as you speak to a flight attendant or colleague, bone-conduction voice sensors automatically pause your music and pass through ambient sound.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-xs font-mono text-sony-cyan flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Bone-Conduction Sensor
              </span>
            </div>
          </div>

          {/* Card 4: Bluetooth 5.4 Multipoint */}
          <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                <Laptop className="w-6 h-6 text-sony-cyan" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-2">
                Universal Connectivity
              </span>
              <h3 className="text-2xl font-bold text-white mb-3">Multipoint Bluetooth 5.4</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Seamlessly pair with two devices at once. Receive a call on your iPhone while streaming a film on your MacBook—the XM6 switches instantly.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-xs font-mono text-sony-cyan flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fast Pair + Swift Pair
              </span>
            </div>
          </div>

          {/* Card 5: Capacitive Touch Controls */}
          <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                <HandMetal className="w-6 h-6 text-sony-cyan" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-2">
                Tactile Command
              </span>
              <h3 className="text-2xl font-bold text-white mb-3">Quick Attention Touch</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Place your hand over the right ear cup to instantly turn down music and let ambient sound in. Swipe up/down for volume, forward/back for tracks.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-xs font-mono text-sony-cyan flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Capacitive Glass Sensor
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
