import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { Activity, Thermometer, Droplets } from 'lucide-react';

const ABGInterpreter: React.FC = () => {
  const { t } = useAppContext();
  const [ph, setPh] = useState('');
  const [pco2, setPco2] = useState('');
  const [hco3, setHco3] = useState('');

  const interpret = () => {
    const p = parseFloat(ph);
    const c = parseFloat(pco2);
    const h = parseFloat(hco3);

    if (isNaN(p) || isNaN(c) || isNaN(h)) return null;

    let result = '';
    let compensation = '';

    // Primary Disorder
    if (p < 7.35) {
      if (c > 45) result = 'Respiratory Acidosis';
      else if (h < 22) result = 'Metabolic Acidosis';
    } else if (p > 7.45) {
      if (c < 35) result = 'Respiratory Alkalosis';
      else if (h > 26) result = 'Metabolic Alkalosis';
    } else {
      result = 'Normal ABG';
    }

    // Compensation (Simplified)
    if (result !== 'Normal ABG') {
      if (p >= 7.35 && p <= 7.45) compensation = 'Fully Compensated';
      else compensation = 'Partially Compensated or Uncompensated';
    }

    return { result, compensation };
  };

  const interpretation = interpret();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-500 px-1">{t.ph} (7.35-7.45)</label>
          <input
            type="number"
            step="0.01"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            placeholder="7.40"
            className="w-full p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-500 px-1">{t.pco2} (35-45)</label>
          <input
            type="number"
            value={pco2}
            onChange={(e) => setPco2(e.target.value)}
            placeholder="40"
            className="w-full p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-500 px-1">{t.hco3} (22-26)</label>
          <input
            type="number"
            value={hco3}
            onChange={(e) => setHco3(e.target.value)}
            placeholder="24"
            className="w-full p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {interpretation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-600 text-white p-8 rounded-[32px] text-center shadow-xl shadow-red-600/20"
        >
          <p className="text-red-200 text-xs font-black uppercase tracking-widest mb-2">{t.interpretation}</p>
          <h3 className="text-2xl font-black mb-1">{interpretation.result}</h3>
          <p className="text-red-100 font-medium">{interpretation.compensation}</p>
        </motion.div>
      )}

      <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-3xl space-y-4">
        <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Normal Ranges:</h4>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <p className="text-zinc-400">pH</p>
            <p className="font-bold">7.35 - 7.45</p>
          </div>
          <div className="space-y-1">
            <p className="text-zinc-400">pCO2</p>
            <p className="font-bold">35 - 45 mmHg</p>
          </div>
          <div className="space-y-1">
            <p className="text-zinc-400">HCO3</p>
            <p className="font-bold">22 - 26 mEq/L</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ABGInterpreter;
