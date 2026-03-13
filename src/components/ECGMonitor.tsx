import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { Activity, AlertCircle } from 'lucide-react';
import { soundService } from '../services/soundService';

const rhythms = [
  { id: 'normal', name: 'Normal Sinus', color: '#00ff41', bpm: 75, spo2: 98, rr: 16, bp: '120/80', alarm: false },
  { id: 'vtach', name: 'V-Tach', color: '#ff3e3e', bpm: 165, spo2: 92, rr: 24, bp: '90/60', alarm: true },
  { id: 'vfib', name: 'V-Fib', color: '#ff3e3e', bpm: 0, spo2: 85, rr: 0, bp: '0/0', alarm: true },
  { id: 'afib', name: 'A-Fib', color: '#3e91ff', bpm: 115, spo2: 96, rr: 18, bp: '110/70', alarm: false },
  { id: 'asystole', name: 'Asystole', color: '#888888', bpm: 0, spo2: 0, rr: 0, bp: '0/0', alarm: true },
];

const ECGMonitor: React.FC = () => {
  const { t } = useAppContext();
  const [activeRhythm, setActiveRhythm] = useState(rhythms[0]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [vitals, setVitals] = useState({ bpm: 75, spo2: 98, rr: 16 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(null);
  const xRef = useRef(0);
  const lastBeatRef = useRef(0);

  // Fluctuating vitals effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeRhythm.bpm === 0) {
        setVitals({ bpm: 0, spo2: 0, rr: 0 });
        return;
      }
      setVitals(prev => ({
        bpm: Math.max(activeRhythm.bpm - 2, Math.min(activeRhythm.bpm + 2, prev.bpm + (Math.random() - 0.5) * 2)),
        spo2: Math.max(activeRhythm.spo2 - 1, Math.min(activeRhythm.spo2 + 1, prev.spo2 + (Math.random() - 0.5) * 0.5)),
        rr: Math.max(activeRhythm.rr - 1, Math.min(activeRhythm.rr + 1, prev.rr + (Math.random() - 0.5) * 0.5)),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [activeRhythm]);

  const playBeep = (type: 'normal' | 'alarm' = 'normal') => {
    if (!soundEnabled) return;
    if (type === 'alarm') {
      soundService.playMedicalAlarm(activeRhythm.id === 'vfib' || activeRhythm.id === 'asystole' ? 'high' : 'medium');
    } else {
      // Pitch varies with SpO2 (common in real monitors)
      // 98% -> ~980Hz, 85% -> ~850Hz
      const frequency = vitals.spo2 > 0 ? vitals.spo2 * 10 : 980;
      soundService.playMedicalBeep(frequency);
    }
  };

  // Flatline sound effect for Asystole
  useEffect(() => {
    if (soundEnabled && activeRhythm.id === 'asystole') {
      soundService.startFlatline(800);
    } else {
      soundService.stopFlatline();
    }
    return () => soundService.stopFlatline();
  }, [soundEnabled, activeRhythm.id]);

  // Alarm loop for critical rhythms
  useEffect(() => {
    let alarmInterval: number;
    // Don't play intermittent alarm for asystole if we have the continuous tone
    if (soundEnabled && activeRhythm.alarm && activeRhythm.id !== 'asystole') {
      const intervalTime = activeRhythm.id === 'vfib' ? 1500 : 3000;
      alarmInterval = window.setInterval(() => {
        playBeep('alarm');
      }, intervalTime);
    }
    return () => clearInterval(alarmInterval);
  }, [soundEnabled, activeRhythm]);

  const getWaveY = (x: number, rhythm: string, time: number) => {
    const centerY = 100;
    const bpm = activeRhythm.bpm || 60;
    const pixelsPerBeat = 6000 / bpm;
    const phase = (x % pixelsPerBeat) / pixelsPerBeat;

    // 1. Baseline Wander (Low frequency oscillation)
    const wander = Math.sin(time / 1000) * 5 + Math.sin(time / 3500) * 3;
    
    // 2. High Frequency Noise (EMG/Electronic interference)
    const noise = (Math.random() - 0.5) * 1.5;

    if (rhythm === 'asystole') return centerY + wander + noise;
    
    if (rhythm === 'vfib') {
      return centerY + wander + (Math.random() - 0.5) * 60;
    }

    if (rhythm === 'vtach') {
      const vtWave = phase < 0.4 ? -Math.sin(phase * Math.PI / 0.4) * 80 : 0;
      return centerY + wander + vtWave + noise;
    }

    // Normal / AFib Morphology
    let wave = 0;
    
    // P Wave
    if (rhythm === 'normal' && phase > 0.05 && phase < 0.15) {
      wave -= Math.sin((phase - 0.05) * Math.PI / 0.1) * 10;
    }
    
    // QRS Complex (Sharper)
    if (phase > 0.25 && phase < 0.27) wave += (phase - 0.25) * 400; // Q
    if (phase >= 0.27 && phase < 0.30) { // R up
      wave -= (phase - 0.27) * 3500;
      if (soundEnabled && phase < 0.28 && (x - lastBeatRef.current > pixelsPerBeat * 0.5 || x < lastBeatRef.current)) {
        playBeep();
        lastBeatRef.current = x;
      }
    }
    if (phase >= 0.30 && phase < 0.34) wave -= 105 - (phase - 0.30) * 3000; // R down
    if (phase >= 0.34 && phase < 0.37) wave += 15 - (phase - 0.34) * 500; // S
    
    // T Wave
    if (phase > 0.55 && phase < 0.75) {
      wave -= Math.sin((phase - 0.55) * Math.PI / 0.2) * 20;
    }

    // AFib baseline fibrillations
    if (rhythm === 'afib') {
      wave += (Math.random() - 0.5) * 10;
    }

    return centerY + wander + wave + noise;
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gridColor = 'rgba(255, 50, 50, 0.12)';
    const majorGridColor = 'rgba(255, 50, 50, 0.25)';
    
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = gridColor;

    for (let x = 0; x <= width; x += 10) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y <= height; y += 10) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = majorGridColor;
    for (let x = 0; x <= width; x += 50) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y <= height; y += 50) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }
  };

  const [isFrozen, setIsFrozen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // High DPI Support
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    const animate = (time: number) => {
      if (isFrozen) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }
      
      const sweepWidth = 30;
      const x = xRef.current;

      // 1. Phosphor Persistence Effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // 2. Clear the sweep area completely
      ctx.fillStyle = '#050505';
      ctx.fillRect(x, 0, sweepWidth, height);
      
      // Redraw grid in sweep area
      ctx.save();
      ctx.beginPath(); ctx.rect(x, 0, sweepWidth, height); ctx.clip();
      drawGrid(ctx, width, height);
      ctx.restore();

      // 3. Draw Wave
      ctx.strokeStyle = activeRhythm.color;
      ctx.lineWidth = 2.2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.shadowBlur = 8;
      ctx.shadowColor = activeRhythm.color;

      ctx.beginPath();
      const prevX = x === 0 ? width - 1 : x - 2;
      const prevY = getWaveY(prevX, activeRhythm.id, time);
      const currY = getWaveY(x, activeRhythm.id, time);
      
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, currY);
      ctx.stroke();

      // 4. Glowing Head
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(x, currY, 2.5, 0, Math.PI * 2);
      ctx.fill();

      xRef.current = (x + 2) % width;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [activeRhythm]);

  return (
    <div className="space-y-6">
      <div className="bg-[#050505] rounded-[32px] p-6 shadow-2xl border-[8px] border-zinc-800 relative overflow-hidden group">
        {/* CRT Scanline Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
        
        {/* Monitor Header */}
        <div className="flex justify-between items-start mb-4 relative z-20">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-green-500 font-mono text-[10px] tracking-tighter">
              <Activity className={`w-3 h-3 ${vitals.bpm > 0 ? 'animate-pulse' : ''}`} />
              <span>LEAD II 25mm/s 10mm/mV</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-1.5 py-0.5 bg-zinc-800 rounded text-[8px] font-black text-zinc-400 uppercase">Filter: On</span>
              <span className="px-1.5 py-0.5 bg-zinc-800 rounded text-[8px] font-black text-zinc-400 uppercase">60Hz Notch</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsFrozen(!isFrozen)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all border ${isFrozen ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'bg-zinc-900 border-zinc-700 text-zinc-500'}`}
            >
              {isFrozen ? 'UNFREEZE' : 'FREEZE'}
            </button>

            <button 
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                soundService.resume();
              }}
              className={`p-2 rounded-xl transition-all ${soundEnabled ? 'text-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'text-zinc-600 bg-zinc-900'}`}
            >
              <Activity className="w-4 h-4" />
            </button>
            
            <div className="flex gap-6">
              <div 
                className="text-right cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setVitals(v => ({ ...v, bpm: v.bpm > 100 ? 75 : 150 }))}
              >
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">HR</p>
                <p className={`text-4xl font-black font-mono leading-none transition-colors duration-500 ${activeRhythm.alarm ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
                  {Math.round(vitals.bpm) || '--'}
                </p>
              </div>
              <div 
                className="text-right cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setVitals(v => ({ ...v, spo2: v.spo2 < 90 ? 98 : 88 }))}
              >
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">SpO2</p>
                <p className="text-4xl font-black text-cyan-400 font-mono leading-none">
                  {Math.round(vitals.spo2) || '--'}<span className="text-xs ml-0.5">%</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <canvas 
          ref={canvasRef} 
          className="w-full h-56 cursor-crosshair relative z-0"
          style={{ width: '100%', height: '224px' }}
        />

        {/* Interactive Defibrillator Button */}
        {(activeRhythm.id === 'vfib' || activeRhythm.id === 'vtach') && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-24 right-10 z-30"
          >
            <button
              onClick={() => {
                soundService.playMedicalBeep(2000); // Charge sound
                setTimeout(() => {
                  setActiveRhythm(rhythms[0]); // Shock to normal
                  xRef.current = 0;
                }, 1000);
              }}
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.5)] animate-bounce"
            >
              Shock / Defib
            </button>
          </motion.div>
        )}

        {/* Monitor Footer Stats */}
        <div className="mt-6 grid grid-cols-4 gap-4 border-t border-zinc-800/50 pt-4 relative z-20">
          <div>
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Resp</p>
            <p className="text-2xl font-black text-amber-500 font-mono">{Math.round(vitals.rr) || '--'}</p>
          </div>
          <div>
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">NIBP</p>
            <p className="text-2xl font-black text-white font-mono">{activeRhythm.bp}</p>
          </div>
          <div>
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Temp</p>
            <p className="text-2xl font-black text-blue-400 font-mono">37.2<span className="text-xs">°C</span></p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">CO2</p>
            <p className="text-2xl font-black text-purple-400 font-mono">38<span className="text-xs">mmHg</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {rhythms.map((r) => (
          <button
            key={r.id}
            onClick={() => {
              setActiveRhythm(r);
              xRef.current = 0;
            }}
            className={`p-4 rounded-2xl font-bold transition-all text-sm border-2 ${
              activeRhythm.id === r.id
                ? 'bg-red-600 border-red-500 text-white shadow-lg scale-[1.02]'
                : 'bg-white dark:bg-zinc-800 border-transparent text-zinc-600 dark:text-zinc-300 hover:bg-red-50 dark:hover:bg-red-900/20'
            }`}
          >
            {t[r.id as keyof typeof t] || r.name}
          </button>
        ))}
      </div>

      <motion.div
        key={activeRhythm.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-800 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-700"
      >
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          {t.intervention}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
          {activeRhythm.id === 'normal' && "Monitor patient. Ensure leads are correctly placed. Baseline vitals stable."}
          {activeRhythm.id === 'vtach' && "Check pulse. If pulseless, start CPR and Defibrillate. If pulse present, consider Amiodarone/Lidocaine. Prepare for cardioversion."}
          {activeRhythm.id === 'vfib' && "Immediate Defibrillation. Start CPR. Epinephrine 1mg every 3-5 mins. Secure airway."}
          {activeRhythm.id === 'afib' && "Rate control (Beta blockers/Calcium channel blockers). Anticoagulation. Consider cardioversion if unstable."}
          {activeRhythm.id === 'asystole' && "Start CPR. Epinephrine 1mg every 3-5 mins. Check for reversible causes (H's & T's). Do NOT shock."}
        </p>
      </motion.div>
    </div>
  );
};

export default ECGMonitor;
