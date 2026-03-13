import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, ChevronRight, CheckCircle2 } from 'lucide-react';
import { medicalData } from '../data/medicalData';

const EmergencyScenarios: React.FC = () => {
  const { lang } = useAppContext();
  const [selected, setSelected] = useState<number | null>(null);
  const scenarios = medicalData[lang].scenarios;

  return (
    <div className="space-y-4">
      {scenarios.map((scenario, idx) => (
        <div 
          key={idx}
          className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 overflow-hidden"
        >
          <button
            onClick={() => setSelected(selected === idx ? null : idx)}
            className="w-full p-5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-xl">
                <ShieldAlert className="w-5 h-5 text-red-600" />
              </div>
              <span className="font-bold text-zinc-900 dark:text-white">{scenario.title}</span>
            </div>
            <ChevronRight className={`w-5 h-5 text-zinc-300 transition-transform ${selected === idx ? 'rotate-90' : ''}`} />
          </button>
          
          <AnimatePresence>
            {selected === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-5 pb-5"
              >
                <div className="space-y-3 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl">
                  {scenario.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default EmergencyScenarios;
