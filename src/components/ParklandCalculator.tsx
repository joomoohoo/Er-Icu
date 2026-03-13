import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { Droplets, Calculator } from 'lucide-react';

const ParklandCalculator: React.FC = () => {
  const { t } = useAppContext();
  const [weight, setWeight] = useState<string>('');
  const [tbsa, setTbsa] = useState<string>('');

  const calculate = () => {
    const w = parseFloat(weight);
    const tVal = parseFloat(tbsa);
    if (isNaN(w) || isNaN(tVal)) return null;

    const total = 4 * w * tVal;
    return {
      total,
      first8h: total / 2,
      next16h: total / 2,
    };
  };

  const results = calculate();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-500 px-1">{t.weight}</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 70"
            className="w-full p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 focus:ring-2 focus:ring-red-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-500 px-1">{t.tbsa}</label>
          <input
            type="number"
            value={tbsa}
            onChange={(e) => setTbsa(e.target.value)}
            placeholder="e.g. 30"
            className="w-full p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 focus:ring-2 focus:ring-red-500 outline-none transition-all"
          />
        </div>
      </div>

      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 dark:bg-red-900/20 p-6 rounded-3xl border border-red-100 dark:border-red-900/30 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-zinc-600 dark:text-zinc-400 font-medium">{t.totalFluids}</span>
              <span className="text-2xl font-black text-red-600">{results.total.toLocaleString()} mL</span>
            </div>
            <div className="h-px bg-red-200 dark:bg-red-800/50" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{t.first8h}</span>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">{results.first8h.toLocaleString()} mL</p>
                <p className="text-[10px] text-zinc-400">({(results.first8h / 8).toFixed(1)} mL/hr)</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{t.next16h}</span>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">{results.next16h.toLocaleString()} mL</p>
                <p className="text-[10px] text-zinc-400">({(results.next16h / 16).toFixed(1)} mL/hr)</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-2xl text-xs text-zinc-500 leading-relaxed">
        <p className="font-bold mb-1">Formula: 4mL × Weight(kg) × %TBSA</p>
        <p>Lactated Ringer's is the fluid of choice. Half given in first 8 hours from time of injury.</p>
      </div>
    </div>
  );
};

import { AnimatePresence } from 'motion/react';
export default ParklandCalculator;
