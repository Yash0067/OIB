import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenPreorder: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPreorder, isMuted = false, onToggleMute }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'glass-nav py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Sony Logo + Model Title */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="font-bold tracking-widest text-lg md:text-xl text-white group-hover:text-sony-cyan transition-colors">
              SONY
            </span>
            <span className="h-3 w-px bg-white/20"></span>
            <span className="text-xs md:text-sm font-medium tracking-wider text-white/80 group-hover:text-white transition-colors">
              WH-1000XM6
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded border border-sony-cyan/30 text-sony-cyan bg-sony-cyan/10">
              Flagship
            </span>
          </div>

          {/* Center: Apple-style Minimal Links */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'engineering', label: 'Engineering' },
              { id: 'anc', label: 'Noise Cancelling' },
              { id: 'acoustics', label: 'Acoustics' },
              { id: 'specs', label: 'Specs' },
              { id: 'compare', label: 'Compare' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-xs uppercase tracking-widest transition-all duration-300 relative py-1 ${
                  activeSection === link.id
                    ? 'text-white font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sony-blue to-sony-cyan rounded-full animate-fade-in" />
                )}
              </button>
            ))}
          </div>

          {/* Right: Sound FX Toggle + Pre-Order CTA */}
          <div className="flex items-center gap-3">
            {onToggleMute && (
              <button
                onClick={onToggleMute}
                title={isMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound'}
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
                aria-label="Toggle Sound"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-sony-cyan" />}
              </button>
            )}

            <button
              onClick={onOpenPreorder}
              className="relative group overflow-hidden rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 active:scale-95"
            >
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-sony-blue via-sony-cyan to-sony-blue bg-[length:200%_auto] animate-pulse-slow opacity-80 group-hover:opacity-100 transition-opacity"></div>
              {/* Inner Dark Surface with High-Tech Border */}
              <div className="absolute inset-[1px] rounded-full bg-[#050508] transition-colors group-hover:bg-[#070710]"></div>
              {/* Glowing Content */}
              <span className="relative z-10 flex items-center gap-2 group-hover:text-sony-cyan transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-sony-cyan animate-spin-slow" />
                <span>Experience XM6</span>
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#030303]/95 backdrop-blur-2xl flex flex-col pt-24 px-8 pb-12 lg:hidden animate-fade-in">
          <div className="flex flex-col gap-6 my-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'engineering', label: 'Engineering Reveal' },
              { id: 'anc', label: 'Adaptive Noise Cancelling' },
              { id: 'acoustics', label: 'Acoustics & Sound' },
              { id: 'specs', label: 'Technical Specs' },
              { id: 'compare', label: 'Compare Flagships' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-2xl font-light tracking-wide text-white/80 hover:text-sony-cyan transition-colors py-2 border-b border-white/5"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-8">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPreorder();
              }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-sony-blue to-sony-cyan text-white font-medium tracking-wide flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,80,255,0.4)]"
            >
              <ShoppingBag className="w-5 h-5" />
              Pre-order WH-1000XM6 · $449
            </button>
          </div>
        </div>
      )}
    </>
  );
};
