import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { Wind, AlertTriangle, Settings } from 'lucide-react';

const ventilatorAlarms = [
  { 
    type: 'High Pressure', 
    causes: ['Secretions/Mucus plug', 'Kinked tubing', 'Patient biting ETT', 'Coughing', 'Pneumothorax', 'Decreased compliance'],
    actions: ['Suction patient', 'Check for kinks', 'Insert bite block', 'Assess breath sounds', 'Consider sedation']
  },
  { 
    type: 'Low Pressure / Disconnect', 
    causes: ['Tubing disconnect', 'Cuff leak', 'Extubation'],
    actions: ['Check all connections', 'Check cuff pressure', 'Assess patient breathing', 'Manually ventilate if needed']
  },
  { 
    type: 'High Minute Volume', 
    causes: ['Pain/Anxiety', 'Hypoxia', 'Metabolic acidosis', 'Fever'],
    actions: ['Assess patient comfort', 'Check ABGs', 'Treat underlying cause']
  },
  { 
    type: 'Low Minute Volume / Apnea', 
    causes: ['Sedation/Narcotics', 'Neuromuscular block', 'Disconnection'],
    actions: ['Assess level of consciousness', 'Check for disconnection', 'Stimulate patient']
  }
];

const VentilatorGuide: React.FC = () => {
  const { t } = useAppContext();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {ventilatorAlarms.map((alarm, idx) => (
        <div 
          key={idx}
          className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 overflow-hidden"
        >
          <button
            onClick={() => setSelected(selected === idx ? null : idx)}
            className="w-full p-5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${alarm.type.includes('High') ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span className="font-bold text-zinc-900 dark:text-white">{alarm.type}</span>
            </div>
            <Settings className={`w-5 h-5 text-zinc-400 transition-transform ${selected === idx ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {selected === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-5 pb-5 space-y-4"
              >
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest">Common Causes</h4>
                  <ul className="grid grid-cols-1 gap-1">
                    {alarm.causes.map((c, i) => (
                      <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest">Nursing Interventions</h4>
                  <ul className="grid grid-cols-1 gap-1">
                    {alarm.actions.map((a, i) => (
                      <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

import { AnimatePresence } from 'motion/react';
export default VentilatorGuide;
