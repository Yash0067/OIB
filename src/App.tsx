import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowRight, Menu, X } from 'lucide-react';

const processSteps = [
  { number: '01', title: 'Pure sound', text: 'Custom-tuned drivers reveal detail, depth and texture in every track.' },
  { number: '02', title: 'Quiet room', text: 'Adaptive noise cancelling keeps conversations, engines and crowds outside.' },
  { number: '03', title: 'All-day fit', text: 'Soft memory-foam cushions and a balanced headband disappear while you listen.' },
  { number: '04', title: 'Stay connected', text: 'Clear voice pickup, multipoint pairing and intuitive controls keep life moving.' },
];

const productFrames = [
  { image: '/headphones/hero-angle.png', label: 'SIGNATURE SOUND / 001' },
  { image: '/headphones/front.png', label: 'ALL-DAY COMFORT / 002' },
  { image: '/headphones/inside.png', label: 'PRECISION INSIDE / 003' },
];

const ScrollProduct: React.FC = () => {
  const [activeFrame, setActiveFrame] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let touchStartY = 0;
    let lastInput = 0;
    let wheelDelta = 0;

    const isStageActive = () => {
      const stage = stageRef.current;
      if (!stage) return false;
      const bounds = stage.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      return bounds.top <= viewportCenter && bounds.bottom >= viewportCenter;
    };

    const changeFrame = (direction: number) => {
      const nextFrame = Math.max(0, Math.min(productFrames.length - 1, frame + direction));
      if (nextFrame !== frame) {
        frame = nextFrame;
        setActiveFrame(nextFrame);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isStageActive() || event.deltaY === 0) return;
      const direction = event.deltaY > 0 ? 1 : -1;
      const atBoundary = direction > 0 ? frame === productFrames.length - 1 : frame === 0;
      if (atBoundary) return;
      event.preventDefault();
      wheelDelta += event.deltaY;
      if (Math.abs(wheelDelta) < 12) return;
      wheelDelta = 0;
      const now = Date.now();
      if (now - lastInput >= 350) {
        lastInput = now;
        changeFrame(direction);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (isStageActive()) touchStartY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isStageActive()) return;
      const distance = touchStartY - event.touches[0].clientY;
      if (Math.abs(distance) < 35) {
        if (frame > 0 && frame < productFrames.length - 1) event.preventDefault();
        return;
      }
      const direction = distance > 0 ? 1 : -1;
      const atBoundary = direction > 0 ? frame === productFrames.length - 1 : frame === 0;
      if (atBoundary) return;
      event.preventDefault();
      const now = Date.now();
      if (now - lastInput >= 350) {
        lastInput = now;
        changeFrame(direction);
        touchStartY = event.touches[0].clientY;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isStageActive()) return;
      const direction = event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ' ? 1
        : event.key === 'ArrowUp' || event.key === 'PageUp' ? -1
        : 0;
      if (!direction) return;
      const atBoundary = direction > 0 ? frame === productFrames.length - 1 : frame === 0;
      if (atBoundary) return;
      event.preventDefault();
      const now = Date.now();
      if (now - lastInput >= 350) {
        lastInput = now;
        changeFrame(direction);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('wheel', handleWheel, true);
      window.removeEventListener('touchstart', handleTouchStart, true);
      window.removeEventListener('touchmove', handleTouchMove, true);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);

  return (
    <div className="scroll-product" id="product-scroll" aria-label="Headphone product story">
      <div className="scroll-product-stage" ref={stageRef} tabIndex={0} aria-label="Scroll to view the AURA ONE headphone">
        {productFrames.map((frame, index) => (
          <img
            key={frame.image}
            className={`scroll-product-image ${activeFrame === index ? 'is-active' : ''}`}
            src={frame.image}
            alt={`Headphone product view ${index + 1}`}
          />
        ))}
        <span className="scroll-product-label">{productFrames[activeFrame].label}</span>
        <span className="scroll-product-count" aria-live="polite">0{activeFrame + 1} / 03</span>
        <div className="scroll-product-dots" aria-hidden="true">
          {productFrames.map((frame, index) => (
            <span className={activeFrame === index ? 'is-active' : ''} key={frame.image} />
          ))}
        </div>
        <span className="scroll-product-hint">SCROLL TO HEAR MORE ↓</span>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="crox-page">
      <header className="crox-header">
        <button className="crox-logo" onClick={() => scrollTo('top')} aria-label="Back to top">CROX</button>
        <nav className={`crox-nav ${menuOpen ? 'is-open' : ''}`}>
          <button onClick={() => scrollTo('work')}>Overview</button>
          <button onClick={() => scrollTo('process')}>Features</button>
          <button onClick={() => scrollTo('about')}>Technology</button>
          <button onClick={() => scrollTo('contact')}>Buy now</button>
        </nav>
        <button className="crox-menu" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <main id="top">
        <section className="crox-hero">
          <div className="hero-copy">
            <p className="eyebrow">AURA ONE / WIRELESS HEADPHONES <span>— 01</span></p>
            <h1>HEAR<br /><em>MORE.</em></h1>
            <p className="hero-intro">Premium wireless headphones engineered for rich, detailed sound and a quieter way to move through the world.</p>
            <button className="solid-button" onClick={() => scrollTo('work')}>Explore the sound <ArrowRight size={17} /></button>
          </div>
          <ScrollProduct />
        </section>

        <section className="crox-statement" id="work">
          <p className="eyebrow">A quieter way to listen <span>— 02</span></p>
          <h2>YOUR MUSIC<br /><span>IN FULL</span>,<br />ANYWHERE.</h2>
          <p className="statement-body">From the first note to the final detail, AURA ONE creates a private listening space wherever the day takes you.</p>
          <div className="statement-mark"><ArrowDownRight size={30} /></div>
        </section>

        <section className="crox-process" id="process">
          <div className="section-heading">
            <p className="eyebrow">Made for the way you listen <span>— 03</span></p>
            <h2>LISTEN.<br />FOCUS.<br /><em>REPEAT.</em></h2>
          </div>
          <div className="process-grid">
            {processSteps.map((step) => (
              <article className="process-card" key={step.number}>
                <span className="process-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <ArrowDownRight size={20} />
              </article>
            ))}
          </div>
        </section>

        <section className="crox-feature" id="about">
          <div className="feature-graphic"><div className="feature-line" /><div className="feature-disc" /><div className="feature-square" /><span>PRECISION / 0.01MM</span></div>
          <div className="feature-copy">
            <p className="eyebrow">Precision in every layer <span>— 04</span></p>
            <h2>NOTHING<br />BETWEEN<br /><em>YOU &amp; SOUND.</em></h2>
            <p>From the acoustic chamber to the adaptive microphones, every component is tuned to make music feel closer and the outside world feel further away.</p>
            <button className="text-button" onClick={() => scrollTo('contact')}>See the specifications <ArrowRight size={17} /></button>
          </div>
        </section>

        <section className="crox-contact" id="contact">
          <p className="eyebrow">Your sound starts here <span>— 05</span></p>
          <h2>MAKE ROOM<br /><em>FOR MUSIC.</em></h2>
          <a className="solid-button" href="mailto:hello@aura.audio">Pre-order AURA ONE <ArrowRight size={17} /></a>
        </section>
      </main>

      <footer className="crox-footer">
        <span>AURA ONE © 2026</span><span>Sound, refined.</span>
        <button onClick={() => scrollTo('top')}>Back to top ↑</button>
      </footer>
    </div>
  );
};

export default App;
