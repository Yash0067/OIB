import React, { useState, useEffect, useRef } from 'react';
import { Shield, Radio, Compass, Wind, Play, Pause, Activity } from 'lucide-react';

interface SoundMode {
  id: string;
  name: string;
  title: string;
  badge: string;
  dbReduction: string;
  description: string;
  frequencies: string;
  icon: any;
}

const MODES: SoundMode[] = [
  {
    id: 'anc',
    name: 'Active Noise Cancelling',
    title: 'Silent Studio Void',
    badge: 'Dual Processor V3 + QN3',
    dbReduction: '-38 dB Ambient Attenuation',
    description: 'Inverts incoming sound waves at 700,000 times per second. Airplane cabin drone, subway rumble, and office chatter vanish instantly.',
    frequencies: '20Hz – 1,000Hz Low Frequency Erasure',
    icon: Shield,
  },
  {
    id: 'ambient',
    name: 'Ambient Sound 20-Level',
    title: 'Natural Acoustic Transparency',
    badge: 'Voice Passthrough Focus',
    dbReduction: '+6 dB Voice Amplification',
    description: 'Brings in the world around you with pristine clarity. Hear platform announcements and coffee shop conversations without taking off your headphones.',
    frequencies: '300Hz – 4,000Hz Vocal Clarity Range',
    icon: Radio,
  },
  {
    id: 'spatial',
    name: '360 Reality Audio',
    title: 'Dynamic Spatial Soundstage',
    badge: 'HRTF Head-Tracking',
    dbReduction: '360° Spherical Field',
    description: 'Simulates a multi-speaker studio array inside your head. Instruments and vocals remain physically anchored in space as you turn your head.',
    frequencies: 'Full Spectrum 4Hz – 40,000Hz High-Res',
    icon: Compass,
  },
  {
    id: 'wind',
    name: 'Wind Noise Reduction',
    title: 'Aerodynamic Acoustic Baffle',
    badge: 'Micro-Mesh Wind Deflection',
    dbReduction: '-26 dB Gust Suppression',
    description: 'Physical micro-mesh baffles and algorithmic turbulent-flow sensors eliminate the rushing sound of wind when walking outdoors or cycling.',
    frequencies: 'Sub-bass Aerodynamic Turbulence',
    icon: Wind,
  },
];

export const SoundDemoSection: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<string>('anc');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentMode = MODES.find((m) => m.id === selectedMode) || MODES[0];

  // Animated Waveform Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      step += 0.04;

      if (!isPlaying) {
        // Flatline
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      if (selectedMode === 'anc') {
        // Red incoming ambient noise wave
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 70, 70, 0.4)';
        ctx.lineWidth = 1.5;
        for (let x = 0; x < width; x++) {
          const y = centerY + Math.sin(x * 0.03 + step) * 28 + Math.cos(x * 0.015 - step * 0.8) * 15;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Blue inverted anti-phase wave
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 214, 255, 0.5)';
        ctx.lineWidth = 1.5;
        for (let x = 0; x < width; x++) {
          const y = centerY - (Math.sin(x * 0.03 + step) * 28 + Math.cos(x * 0.015 - step * 0.8) * 15);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Resulting cancelled wave (almost flat, ultra-smooth green/cyan laser line)
        ctx.beginPath();
        ctx.strokeStyle = '#00D6FF';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#00D6FF';
        ctx.shadowBlur = 12;
        for (let x = 0; x < width; x++) {
          const residual = (Math.sin(x * 0.08 + step * 2) * 2.5) * Math.sin(x * 0.01);
          const y = centerY + residual;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else if (selectedMode === 'ambient') {
        // Ambient Mode: Organic voice frequencies passing through
        ctx.beginPath();
        ctx.strokeStyle = '#00D6FF';
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(0, 214, 255, 0.5)';
        ctx.shadowBlur = 8;
        for (let x = 0; x < width; x++) {
          const y =
            centerY +
            Math.sin(x * 0.04 + step * 1.5) * 20 * Math.sin(step * 0.5) +
            Math.cos(x * 0.09 - step) * 15;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else if (selectedMode === 'spatial') {
        // Spatial 360 Mode: 3 overlapping phased orbital rings
        for (let ring = 0; ring < 3; ring++) {
          ctx.beginPath();
          ctx.strokeStyle = ring === 0 ? '#0050FF' : ring === 1 ? '#00D6FF' : 'rgba(255,255,255,0.7)';
          ctx.lineWidth = 1.5;
          for (let x = 0; x < width; x++) {
            const phase = ring * 1.2;
            const y =
              centerY +
              Math.sin(x * 0.02 + step + phase) * 32 * Math.cos(x * 0.005);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } else {
        // Wind Noise Reduction: Filtered low frequencies
        ctx.beginPath();
        ctx.strokeStyle = '#00D6FF';
        ctx.lineWidth = 2;
        for (let x = 0; x < width; x++) {
          const y = centerY + Math.sin(x * 0.05 + step * 2) * 8 * Math.sin(x * 0.02);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedMode, isPlaying]);

  return (
    <section id="anc" className="relative py-28 px-6 md:px-12 bg-[#050507] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sony-blue/15 border border-sony-blue/30 text-sony-cyan text-xs font-mono tracking-wider uppercase mb-4">
            <Activity className="w-3.5 h-3.5" />
            Interactive Acoustic Lab
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Hear the science of <br />
            <span className="gradient-text">absolute silence.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed font-normal">
            Select an acoustic mode below to simulate the real-time DSP wave cancellation algorithm in the XM6.
          </p>
        </div>

        {/* Interactive Lab Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Mode Selector Cards */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {MODES.map((mode) => {
              const Icon = mode.icon;
              const isSelected = selectedMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`text-left p-5 rounded-2xl transition-all duration-300 relative border ${
                    isSelected
                      ? 'glass-card border-sony-cyan/60 bg-[#0e0e18] shadow-[0_0_30px_rgba(0,80,255,0.25)]'
                      : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-sony-blue text-white shadow-[0_0_15px_#0050FF]'
                            : 'bg-white/5 text-white/60'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{mode.name}</h4>
                        <span className="text-[11px] font-mono text-sony-cyan">{mode.badge}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sony-cyan/15 text-sony-cyan border border-sony-cyan/30 uppercase">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed mt-2 pl-12">{mode.description}</p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Waveform Simulator HUD */}
          <div className="lg:col-span-7 flex flex-col glass-card p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden justify-between">
            {/* Top Bar of the Simulator */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                  Acoustic Spectrum Simulation
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white mt-0.5">{currentMode.title}</h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-mono text-sony-cyan font-semibold block">{currentMode.dbReduction}</span>
                  <span className="text-[10px] font-mono text-white/40">{currentMode.frequencies}</span>
                </div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
              </div>
            </div>

            {/* Canvas Waveform Display */}
            <div className="relative w-full h-64 bg-[#020204] rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden mb-6">
              {/* Background Graph Grid */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              <canvas
                ref={canvasRef}
                width={800}
                height={260}
                className="w-full h-full object-cover relative z-10"
              />

              {/* Legend overlay for ANC Mode */}
              {selectedMode === 'anc' && (
                <div className="absolute top-3 left-4 z-20 flex flex-wrap gap-4 text-[10px] font-mono">
                  <span className="flex items-center gap-1.5 text-red-400">
                    <span className="w-2.5 h-0.5 bg-red-400 inline-block"></span> Ambient Noise (85 dB)
                  </span>
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <span className="w-2.5 h-0.5 bg-cyan-400 inline-block"></span> Inverted Anti-Phase Wave
                  </span>
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    <span className="w-3 h-1 bg-sony-cyan inline-block rounded"></span> Result: Pure Silence
                  </span>
                </div>
              )}
            </div>

            {/* Realtime DSP Telemetry Data Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] font-mono uppercase text-white/40 block mb-0.5">Sampling Rate</span>
                <span className="text-sm font-semibold text-white font-mono">768 kHz</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] font-mono uppercase text-white/40 block mb-0.5">Latency</span>
                <span className="text-sm font-semibold text-sony-cyan font-mono">&lt; 0.4 ms</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] font-mono uppercase text-white/40 block mb-0.5">Mics Online</span>
                <span className="text-sm font-semibold text-white font-mono">8 / 8 Active</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] font-mono uppercase text-white/40 block mb-0.5">Atmospheric Sens.</span>
                <span className="text-sm font-semibold text-sony-cyan font-mono">1,013 hPa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
