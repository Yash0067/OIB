import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Cpu,
  Radio,
  Disc,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Mouse,
  CheckCircle2,
} from 'lucide-react';

interface ScrollyCanvasProps {
  onOpenPreorder: () => void;
}

interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  xPercent: number;
  yPercent: number;
  visibleSteps: number[];
  icon: any;
}

interface StepData {
  step: number;
  id: string;
  shortLabel: string;
  phaseLabel: string;
  targetFrame: number;
}

const TOTAL_FRAMES = 240;

const STEPS: StepData[] = [
  {
    step: 1,
    id: 'hero',
    shortLabel: 'Overview',
    phaseLabel: '01 // ICONIC SILHOUETTE',
    targetFrame: 240, // Assembled beauty angle
  },
  {
    step: 2,
    id: 'separation',
    shortLabel: 'Disassembly',
    phaseLabel: '02 // ACOUSTIC DISASSEMBLY',
    targetFrame: 170, // Headband lifts, earcups separate, cushions detach
  },
  {
    step: 3,
    id: 'intelligence',
    shortLabel: 'Processor V3',
    phaseLabel: '03 // ADAPTIVE SENSORS & SOC',
    targetFrame: 90, // PCB exposed, dual DSP chips, 8-mic array
  },
  {
    step: 4,
    id: 'acoustics',
    shortLabel: 'Carbon Driver',
    phaseLabel: '04 // STUDIO REFERENCE CHAMBER',
    targetFrame: 1, // Peak exploded technical diagram: driver, chamber, copper chassis
  },
  {
    step: 5,
    id: 'reassembly',
    shortLabel: 'Reassembly',
    phaseLabel: '05 // HERO REASSEMBLY & CTA',
    targetFrame: 240, // Reassembled final locked hero position
  },
];

const HOTSPOTS: Hotspot[] = [
  {
    id: 'chip',
    title: 'Sony Integrated Processor V3 + QN3',
    subtitle: 'Dual-Engine Realtime DSP',
    description: 'Samples environmental audio at 700,000 times/sec with dedicated neural-net audio reconstruction.',
    xPercent: 51,
    yPercent: 49,
    visibleSteps: [3, 4],
    icon: Cpu,
  },
  {
    id: 'driver',
    title: '30mm Carbon-Fiber Composite Driver',
    subtitle: 'Studio Reference Acoustic Chamber',
    description: 'Ultra-rigid carbon dome with polyurethane edge delivers deep punchy bass and crystal highs up to 40kHz.',
    xPercent: 23,
    yPercent: 57,
    visibleSteps: [4],
    icon: Disc,
  },
  {
    id: 'cushion',
    title: 'Ergonomic Soft-Fit Synthetic Leather',
    subtitle: 'Passive Acoustic Isolation Seal',
    description: 'Zero-pressure memory foam redistributes weight evenly across the cranium for fatigue-free all-day wear.',
    xPercent: 9,
    yPercent: 56,
    visibleSteps: [2, 4],
    icon: ShieldCheck,
  },
  {
    id: 'mic',
    title: '8-Microphone Beamforming Array',
    subtitle: 'Omnidirectional Noise Sensor Array',
    description: '4 precision mics per ear cup actively track and isolate ambient city hum, air pressure, and speech frequencies.',
    xPercent: 78,
    yPercent: 48,
    visibleSteps: [3, 4],
    icon: Radio,
  },
];

export const ScrollyCanvas: React.FC<ScrollyCanvasProps> = ({ onOpenPreorder }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentFrame, setCurrentFrame] = useState(240);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  // Animation refs
  const currentFrameFloatRef = useRef<number>(240);
  const targetFrameRef = useRef<number>(240);
  const isTransitioningRef = useRef<boolean>(false);
  const lastWheelTimeRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);

  // Preload all 240 frames into memory
  useEffect(() => {
    let mounted = true;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const pad = String(i).padStart(3, '0');
      const img = new Image();
      img.src = `/frames/ezgif-frame-${pad}.jpg`;
      img.onload = () => {
        if (!mounted) return;
        loaded++;
        const pct = Math.round((loaded / TOTAL_FRAMES) * 100);
        setLoadProgress(pct);
        if (loaded >= TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        if (!mounted) return;
        loaded++;
        if (loaded >= TOTAL_FRAMES) setIsLoaded(true);
      };
      images[i - 1] = img;
    }

    imagesRef.current = images;

    return () => {
      mounted = false;
    };
  }, []);

  // Smooth frame easing animation to target frame when step changes
  const animateToFrame = useCallback((target: number, duration: number = 850) => {
    isTransitioningRef.current = true;
    const startFrame = currentFrameFloatRef.current;
    const startTime = performance.now();

    const stepEase = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Smooth cubic ease-in-out
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const newFrame = startFrame + (target - startFrame) * ease;
      currentFrameFloatRef.current = newFrame;
      targetFrameRef.current = target;
      setCurrentFrame(Math.max(1, Math.min(240, Math.round(newFrame))));

      if (progress < 1) {
        requestAnimationFrame(stepEase);
      } else {
        currentFrameFloatRef.current = target;
        setCurrentFrame(target);
        isTransitioningRef.current = false;
      }
    };

    requestAnimationFrame(stepEase);
  }, []);

  // Change to a specific step
  const goToStep = useCallback(
    (stepNum: number) => {
      const clamped = Math.max(1, Math.min(5, stepNum));
      setCurrentStep(clamped);
      const target = STEPS[clamped - 1].targetFrame;
      animateToFrame(target);
    },
    [animateToFrame]
  );

  // Next / Previous step helpers
  const nextStep = useCallback(() => {
    if (currentStep < 5) {
      goToStep(currentStep + 1);
    } else {
      // At step 5, scroll down to the next section
      const nextElem = document.getElementById('anc');
      if (nextElem) nextElem.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStep, goToStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  // SCROLL WHEEL EVENT INTERCEPTION (Step-by-Step Wheel Effect)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const rect = container.getBoundingClientRect();

      // Only hijack wheel when the showcase section is actively in view
      const inView = rect.top <= 20 && rect.bottom >= window.innerHeight - 20;

      if (!inView) return;

      const delta = e.deltaY;

      // Filter tiny trackpad drift
      if (Math.abs(delta) < 22) return;

      // Wheel Down (scroll forwards)
      if (delta > 0) {
        if (currentStep < 5) {
          e.preventDefault();
          e.stopPropagation();

          // Cooldown to prevent runaway wheel skipping
          if (now - lastWheelTimeRef.current > 550) {
            lastWheelTimeRef.current = now;
            goToStep(currentStep + 1);
          }
        } else {
          // At Step 5: allow natural page scroll to proceed downward to next sections
          // Do not prevent default!
        }
      }
      // Wheel Up (scroll backwards)
      else if (delta < 0) {
        if (currentStep > 1) {
          // If we are at the top of the showcase or within it, step back
          if (rect.top >= -50) {
            e.preventDefault();
            e.stopPropagation();

            if (now - lastWheelTimeRef.current > 550) {
              lastWheelTimeRef.current = now;
              goToStep(currentStep - 1);
            }
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentStep, goToStep]);

  // Keyboard navigation (ArrowDown, ArrowUp, Space, PageDown, PageUp)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const inView = rect.top <= 100 && rect.bottom >= 200;
        if (!inView) return;

        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
          if (currentStep < 5) {
            e.preventDefault();
            nextStep();
          }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          if (currentStep > 1) {
            e.preventDefault();
            prevStep();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, nextStep, prevStep]);

  // Mobile Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartYRef.current - touchEndY;

    if (Math.abs(diff) > 40) {
      if (diff > 0 && currentStep < 5) {
        nextStep();
      } else if (diff < 0 && currentStep > 1) {
        prevStep();
      }
    }
  };

  // Canvas Drawing Render Loop (Contain scale + Void black fill + High Clarity)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Enable ultra-high quality bicubic filtering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    let isRunning = true;
    let animId: number;

    const render = () => {
      if (!isRunning) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      if (canvas.width !== Math.floor(displayWidth * dpr) || canvas.height !== Math.floor(displayHeight * dpr)) {
        canvas.width = Math.floor(displayWidth * dpr);
        canvas.height = Math.floor(displayHeight * dpr);
        // Re-apply smoothing settings after resize
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }

      // 1. Fill background with exact matching void black #020202
      ctx.fillStyle = '#020202';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const frameIdx = Math.max(1, Math.min(240, Math.round(currentFrameFloatRef.current)));
      const img = imagesRef.current[frameIdx - 1];

      if (img && img.complete && img.naturalWidth > 0) {
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = canvas.width / canvas.height;

        let drawW = canvas.width;
        let drawH = canvas.height;

        if (canvasAspect > imgAspect) {
          drawH = canvas.height;
          drawW = drawH * imgAspect;
        } else {
          drawW = canvas.width;
          drawH = drawW / imgAspect;
        }

        // Apply a gentle 1.12x scale for maximum clarity and screen presence
        const scale = 1.12;
        drawW *= scale;
        drawH *= scale;

        const drawX = (canvas.width - drawW) / 2;
        const drawY = (canvas.height - drawH) / 2;

        ctx.drawImage(img, drawX, drawY, drawW, drawH);

        // Safety mask over watermark region in case of cache:
        // Fill star area (X: 1150..1240, Y: 595..668) & Veo (X: 1195..1280, Y: 672..720)
        const scaleX = drawW / 1280;
        const scaleY = drawH / 720;
        ctx.fillStyle = '#020202';
        // Star mask
        ctx.fillRect(drawX + 1150 * scaleX, drawY + 595 * scaleY, 90 * scaleX, 73 * scaleY);
        // Veo text mask
        ctx.fillRect(drawX + 1195 * scaleX, drawY + 672 * scaleY, 85 * scaleX, 48 * scaleY);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
    };
  }, []);

  const currentStepData = STEPS[currentStep - 1];

  return (
    <div
      ref={containerRef}
      id="overview"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen bg-void overflow-hidden select-none"
    >
      {/* HTML5 Canvas Viewport with High-Clarity Optimization */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-contain pointer-events-none transition-all duration-300"
        style={{
          filter: 'contrast(1.08) brightness(1.04) saturate(1.06)',
          imageRendering: '-webkit-optimize-contrast',
        }}
      />

      {/* Ambient Sony Deep Blue Glow behind headphone center */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,80,255,0.08)_0%,_rgba(5,8,21,0.03)_50%,_transparent_75%)] z-10" />

      {/* Initial Asset Preloader */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 bg-[#030303] flex flex-col items-center justify-center px-6 transition-opacity duration-700">
          <div className="flex flex-col items-center max-w-sm w-full">
            <span className="text-2xl font-bold tracking-[0.3em] text-white mb-2">SONY</span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 mb-8">
              WH-1000XM6 · 8K Master Assets
            </span>

            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-4">
              <div
                className="h-full bg-gradient-to-r from-sony-blue to-sony-cyan transition-all duration-150"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            <div className="flex justify-between w-full text-[11px] font-mono text-white/40">
              <span>INITIALIZING SEQUENCE</span>
              <span className="text-sony-cyan">{loadProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Interactive Technical Hotspots (Steps 2, 3, 4) */}
      {isLoaded && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {HOTSPOTS.filter((s) => s.visibleSteps.includes(currentStep)).map((spot) => {
            const Icon = spot.icon;
            const isSelected = activeHotspot?.id === spot.id;
            return (
              <div
                key={spot.id}
                className="absolute pointer-events-auto transition-transform duration-300"
                style={{
                  left: `${spot.xPercent}%`,
                  top: `${spot.yPercent}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <button
                  onClick={() => setActiveHotspot(isSelected ? null : spot)}
                  className={`group relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                    isSelected
                      ? 'bg-sony-cyan text-black border-white shadow-[0_0_20px_#00D6FF]'
                      : 'bg-black/60 backdrop-blur-md text-white border-sony-cyan/50 hover:border-sony-cyan hover:scale-110 shadow-[0_0_15px_rgba(0,80,255,0.4)]'
                  }`}
                  title={spot.title}
                >
                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span className="absolute -inset-1 rounded-full border border-sony-cyan/40 animate-ping opacity-75 pointer-events-none" />
                </button>

                {isSelected && (
                  <div className="absolute left-10 top-0 w-72 p-4 rounded-xl glass-card border border-sony-cyan/40 text-left z-40 shadow-[0_10px_40px_rgba(0,0,0,0.9)] animate-fade-in pointer-events-auto">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono uppercase text-sony-cyan tracking-wider">
                        {spot.subtitle}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspot(null);
                        }}
                        className="text-white/40 hover:text-white text-xs"
                      >
                        ✕
                      </button>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1.5">{spot.title}</h4>
                    <p className="text-xs text-white/70 leading-relaxed">{spot.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* RIGHT SIDEBAR: Apple-style Vertical Step Indicators */}
      <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-5 items-end">
        {STEPS.map((s) => {
          const isActive = s.step === currentStep;
          return (
            <button
              key={s.step}
              onClick={() => goToStep(s.step)}
              className="group flex items-center gap-3 text-right focus:outline-none"
              title={`Step ${s.step}: ${s.shortLabel}`}
            >
              {/* Step Label (Reveals on hover or when active) */}
              <span
                className={`text-[11px] font-mono tracking-wider uppercase transition-all duration-300 hidden md:inline-block ${
                  isActive
                    ? 'text-sony-cyan font-semibold opacity-100 translate-x-0'
                    : 'text-white/40 opacity-0 group-hover:opacity-100 group-hover:text-white translate-x-2 group-hover:translate-x-0'
                }`}
              >
                0{s.step} {s.shortLabel}
              </span>

              {/* Dot / Pill Indicator */}
              <div
                className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'w-3 h-8 bg-gradient-to-b from-sony-blue to-sony-cyan shadow-[0_0_12px_#00D6FF]'
                    : 'w-2.5 h-2.5 bg-white/20 group-hover:bg-white/60 group-hover:scale-125'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* NARRATIVE STEP OVERLAYS (One Step At A Time) */}
      <div className="absolute inset-0 pointer-events-none z-20 flex items-center">
        {/* STEP 1: HERO / INTRO */}
        <div
          className={`transition-all duration-700 ease-out absolute inset-0 flex flex-col items-center justify-center text-center px-6 ${
            currentStep === 1
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-sony-cyan animate-pulse"></span>
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/70">
                Global Flagship Reveal · Step 01
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white mb-4 leading-none select-none">
              <span className="gradient-text">Sony WH-1000XM6</span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-white/90 mb-4 max-w-2xl">
              Silence, perfected. <span className="text-white/50">Hear only what matters.</span>
            </p>

            <p className="text-sm sm:text-base font-normal text-white/60 max-w-xl mb-8 leading-relaxed">
              Flagship wireless noise cancelling, re-engineered for a world that never stops.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              <span className="text-xs px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-white/80">
                Processor V3 · QN3 DSP
              </span>
              <span className="text-xs px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-white/80">
                40-Hour Battery
              </span>
              <span className="text-xs px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-white/80">
                LDAC™ Hi-Res Audio
              </span>
              <span className="text-xs px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-white/80">
                248g Featherlight
              </span>
            </div>

            {/* Scroll Wheel Prompt */}
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-sony-cyan/30 text-sony-cyan hover:bg-sony-cyan/10 transition-all text-xs font-mono tracking-wider uppercase animate-pulse-slow"
            >
              <Mouse className="w-3.5 h-3.5" />
              <span>Scroll Wheel or Click to Disassemble</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* STEP 2: ACOUSTIC DISASSEMBLY */}
        <div
          className={`transition-all duration-700 ease-out absolute inset-0 flex items-center px-6 md:px-16 lg:px-24 ${
            currentStep === 2
              ? 'opacity-100 translate-x-0 pointer-events-auto'
              : 'opacity-0 -translate-x-12 pointer-events-none'
          }`}
        >
          <div className="max-w-md lg:max-w-lg glass-card p-8 md:p-10 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            <div className="inline-block px-3 py-1 rounded-full bg-sony-blue/20 border border-sony-blue/40 text-[11px] font-mono text-sony-cyan tracking-wider uppercase mb-4">
              Step 02 // Acoustic Separation
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              Precision-engineered <br />
              <span className="gradient-text">for silence.</span>
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              <p>
                Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.
              </p>
              <p>
                Every component is tuned for balance, power, and comfort—hour after hour.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-left">
              <div>
                <span className="text-2xl font-bold text-white block">30mm</span>
                <span className="text-xs text-white/50 uppercase tracking-wider">Carbon Driver Dome</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-sony-cyan block">0.02%</span>
                <span className="text-xs text-white/50 uppercase tracking-wider">Ultra-Low THD</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={nextStep}
                className="text-xs font-mono text-sony-cyan hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Next: Processor & Sensors</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* STEP 3: ADAPTIVE NOISE SENSORS & PROCESSOR V3 */}
        <div
          className={`transition-all duration-700 ease-out absolute inset-0 flex items-center justify-end px-6 md:px-16 lg:px-24 ${
            currentStep === 3
              ? 'opacity-100 translate-x-0 pointer-events-auto'
              : 'opacity-0 translate-x-12 pointer-events-none'
          }`}
        >
          <div className="max-w-md lg:max-w-lg glass-card p-8 md:p-10 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            <div className="inline-block px-3 py-1 rounded-full bg-sony-cyan/20 border border-sony-cyan/40 text-[11px] font-mono text-sony-cyan tracking-wider uppercase mb-4">
              Step 03 // Adaptive Shielding
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              Adaptive noise cancelling, <br />
              <span className="gradient-text">redefined.</span>
            </h2>

            <ul className="space-y-4 text-sm sm:text-base text-white/70 mt-6">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sony-blue/30 border border-sony-cyan/60 flex items-center justify-center shrink-0 mt-0.5 text-sony-cyan text-xs">
                  ✓
                </div>
                <span>Multi-microphone array listens in every direction.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sony-blue/30 border border-sony-cyan/60 flex items-center justify-center shrink-0 mt-0.5 text-sony-cyan text-xs">
                  ✓
                </div>
                <span>Real-time noise analysis adjusts to your environment at 700,000 times per second.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sony-blue/30 border border-sony-cyan/60 flex items-center justify-center shrink-0 mt-0.5 text-sony-cyan text-xs">
                  ✓
                </div>
                <span>Your music stays pure—planes, trains, and crowds fade away.</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">Active Anti-Phase</span>
                <span className="text-xs font-semibold text-sony-cyan">Auto NC Optimizer · ON</span>
              </div>
              <div className="flex items-center gap-1 h-6">
                {[40, 75, 30, 95, 60, 85, 45, 90, 35, 70].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-gradient-to-t from-sony-blue to-sony-cyan rounded-full animate-pulse"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 120}ms`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={nextStep}
                className="text-xs font-mono text-sony-cyan hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Next: Peak Exploded View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* STEP 4: PEAK EXPLODED VIEW & ACOUSTIC DRIVER */}
        <div
          className={`transition-all duration-700 ease-out absolute inset-0 flex items-center px-6 md:px-16 lg:px-24 ${
            currentStep === 4
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-12 pointer-events-none'
          }`}
        >
          <div className="max-w-md lg:max-w-lg glass-card p-8 md:p-10 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-mono text-white/80 tracking-wider uppercase mb-4">
              Step 04 // Peak Exploded Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              Immersive, <br />
              <span className="gradient-text">lifelike sound.</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              <p>
                High-performance drivers unlock detail, depth, and texture in every track.
              </p>
              <p>
                AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/90">
                LDAC™ 990kbps
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/90">
                DSEE Ultimate™ AI
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/90">
                360 Reality Audio
              </span>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={nextStep}
                className="text-xs font-mono text-sony-cyan hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>Next: Reassembly into Hero</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* STEP 5: REASSEMBLY & HERO CTA */}
        <div
          className={`transition-all duration-700 ease-out absolute inset-0 flex flex-col items-center justify-center text-center px-6 ${
            currentStep === 5
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sony-cyan/10 border border-sony-cyan/30 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-sony-cyan" />
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-sony-cyan">
                Final Step 05 // Reassembled & Ready
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Hear everything. <br />
              <span className="gradient-text">Feel nothing else.</span>
            </h2>

            <p className="text-lg sm:text-2xl font-light text-white/80 mb-2 max-w-xl">
              WH-1000XM6. Designed for focus, crafted for comfort.
            </p>
            <p className="text-xs sm:text-sm font-mono text-white/50 mb-8 uppercase tracking-widest">
              Engineered for airports, offices, and everything in between.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <button
                onClick={onOpenPreorder}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-sony-blue via-sony-cyan to-sony-blue text-white font-semibold text-sm tracking-wider uppercase shadow-[0_0_40px_rgba(0,80,255,0.5)] hover:shadow-[0_0_60px_rgba(0,214,255,0.7)] transition-all transform hover:scale-105 active:scale-95"
              >
                Experience WH-1000XM6 · $449.99
              </button>
              <button
                onClick={() => {
                  const specsElem = document.getElementById('specs');
                  if (specsElem) specsElem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-4 rounded-full glass-card hover:bg-white/10 text-white/80 hover:text-white font-medium text-sm tracking-wider uppercase transition-colors border border-white/10"
              >
                See Full Specs
              </button>
            </div>

            {/* Scroll down continuation hint */}
            <button
              onClick={() => {
                const nextElem = document.getElementById('anc');
                if (nextElem) nextElem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 text-xs font-mono text-white/50 hover:text-sony-cyan transition-colors"
            >
              <span>Scroll down to continue to Interactive Sound Lab</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM CONTROL HUD: Step Navigator + Progress Bar + Navigation Buttons */}
      <div className="absolute bottom-6 left-6 right-6 z-30 pointer-events-auto max-w-4xl mx-auto glass-card px-6 py-3.5 rounded-2xl border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Step Badge */}
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-sony-cyan shadow-[0_0_8px_#00D6FF] animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-white/90 uppercase font-semibold">
            {currentStepData.phaseLabel}
          </span>
        </div>

        {/* Step Progress Segmented Bar */}
        <div className="flex items-center gap-2 w-full sm:w-60">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              onClick={() => goToStep(s)}
              className="h-1.5 flex-1 rounded-full cursor-pointer transition-all duration-300 relative overflow-hidden bg-white/10 hover:bg-white/30"
              title={`Jump to Step 0${s}`}
            >
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  s <= currentStep
                    ? 'bg-gradient-to-r from-sony-blue to-sony-cyan'
                    : 'w-0'
                }`}
                style={{ width: s <= currentStep ? '100%' : '0%' }}
              />
            </div>
          ))}
        </div>

        {/* Navigation Step Arrows & Wheel Indicator */}
        <div className="flex items-center gap-3">
          <span className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-white/40 mr-2">
            <Mouse className="w-3 h-3 text-sony-cyan" />
            <span>WHEEL TO STEP</span>
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                currentStep === 1
                  ? 'text-white/20 bg-white/[0.02] cursor-not-allowed'
                  : 'text-white hover:text-sony-cyan bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
              title="Previous Step (Up Arrow)"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-white/80 px-2 font-medium">
              0{currentStep} / 05
            </span>

            <button
              onClick={nextStep}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:text-sony-cyan bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              title={currentStep === 5 ? 'Continue Down to Sound Lab' : 'Next Step (Down Arrow)'}
            >
              {currentStep === 5 ? (
                <ChevronDown className="w-4 h-4 text-sony-cyan" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
