import React from 'react';
import { Leaf, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020203] text-white/50 text-xs border-t border-white/5 pt-16 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Environmental sustainability statement */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white text-xs font-semibold block">Sony "Road to Zero" Environmental Plan</span>
              <span className="text-[11px] text-white/50">
                WH-1000XM6 packaging contains 0% virgin plastics and utilizes 100% bamboo, sugarcane fiber, and post-consumer recycled paper.
              </span>
            </div>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors shrink-0 font-mono text-[11px]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Legal Footnotes */}
        <div className="border-b border-white/5 pb-10 mb-10 space-y-2 text-[11px] leading-relaxed text-white/40">
          <p>
            1. As of October 2026. Measured using JEITA-compliant guidelines in the headband-style wireless noise cancelling headphones market.
          </p>
          <p>
            2. When using LDAC codec with maximum transmission speed of 990 kbps. Requires compatible playback device and high-resolution streaming source.
          </p>
          <p>
            3. Battery life claim of up to 40 hours based on internal testing with ANC enabled and DSEE Ultimate set to Auto under standard volume levels.
          </p>
          <p>
            4. Sony Headphones Connect companion app required for personal HRTF measurement, EQ adjustment, and firmware updates. Available on iOS and Android.
          </p>
          <p>
            5. "Sony", "WH-1000XM6", "DSEE Ultimate", and "360 Reality Audio" are registered trademarks of Sony Group Corporation. All other trademarks belong to their respective owners.
          </p>
        </div>

        {/* Links & Corporate Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-white text-xs font-mono uppercase tracking-widest mb-4">Acoustic Audio</h4>
            <ul className="space-y-2.5">
              <li><a href="#overview" className="hover:text-white transition-colors">WH-1000XM6 Flagship</a></li>
              <li><a href="#engineering" className="hover:text-white transition-colors">Acoustic Architecture</a></li>
              <li><a href="#anc" className="hover:text-white transition-colors">Adaptive Noise Cancelling</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Full Technical Matrix</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-mono uppercase tracking-widest mb-4">Innovation</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-white transition-colors">Processor V3 Architecture</a></li>
              <li><a href="#" className="hover:text-white transition-colors">360 Reality Audio Master</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LDAC™ High-Resolution</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Road to Zero 2050</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-mono uppercase tracking-widest mb-4">Support & Store</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-white transition-colors">Sony Direct Express</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Headphones Connect App</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty & Sony Care+</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Locate Authorized Retailer</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-mono uppercase tracking-widest mb-4">Sony Global</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-white transition-colors">PlayStation®</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Alpha™ Cameras</a></li>
              <li><a href="#" className="hover:text-white transition-colors">BRAVIA® XR TVs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sony Music Entertainment</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 pt-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-widest text-white">SONY</span>
            <span>© 2026 Sony Electronics Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
