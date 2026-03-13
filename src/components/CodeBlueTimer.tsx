import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Zap, RotateCcw, Play, Pause, AlertCircle } from 'lucide-react';

const CodeBlueTimer: React.FC = () => {
  const { t } = useAppContext();
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [cycleSeconds, setCycleSeconds] = useState(120); // 2 min cycle
  const [epiAlert, setEpiAlert] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
        setCycleSeconds(c => {
          if (c <= 1) {
            // Cycle finished
            new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play().catch(() => {});
            return 120;
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const reset = () => {
    setSeconds(0);
    setCycleSeconds(120);
    setIsActive(false);
    setEpiAlert(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 rounded-[40px] p-8 text-center shadow-2xl border-8 border-zinc-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-red-600">
          <motion.div 
            animate={{ width: `${(cycleSeconds / 120) * 100}%` }}
            className="h-full bg-white"
          />
        </div>
        
        <p className="text-zinc-500 font-mono text-sm mb-2 tracking-widest uppercase">Total Time</p>
        <h2 className="text-6xl font-black text-white font-mono mb-8">{formatTime(seconds)}</h2>
        
        <div className="flex flex-col items-center gap-2">
          <p className="text-red-500 font-bold text-xs uppercase tracking-widest">Next Pulse Check / Shock</p>
          <div className="text-4xl font-black text-red-600 font-mono">
            {formatTime(cycleSeconds)}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'}`}
          >
            {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </button>
          <button
            onClick={reset}
            className="w-16 h-16 rounded-full bg-zinc-700 text-white flex items-center justify-center"
          >
            <RotateCcw className="w-8 h-8" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setEpiAlert(true)}
          className="p-6 bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 flex flex-col items-center gap-2"
        >
          <Zap className="w-8 h-8 text-red-600" />
          <span className="font-bold text-sm">Epinephrine Given</span>
        </button>
        <button
          className="p-6 bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 flex flex-col items-center gap-2"
        >
          <Timer className="w-8 h-8 text-blue-600" />
          <span className="font-bold text-sm">Amiodarone Given</span>
        </button>
      </div>

      <AnimatePresence>
        {epiAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-red-600 text-white p-4 rounded-2xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6" />
              <span className="font-bold">Next Epinephrine in 3 mins</span>
            </div>
            <button onClick={() => setEpiAlert(false)} className="text-white/70 font-bold">Dismiss</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodeBlueTimer;
