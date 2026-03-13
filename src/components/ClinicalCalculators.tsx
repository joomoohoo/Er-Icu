import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, ChevronRight, CheckCircle2, AlertCircle, Activity } from 'lucide-react';
import { medicalData } from '../data/medicalData';

import STARTScale from './STARTScale';
import RevisedTraumaScore from './RevisedTraumaScore';

const ClinicalCalculators: React.FC = () => {
  const { t, lang } = useAppContext();
  const [selected, setSelected] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});

  const calculatorList = [
    { id: 'start', name: t.startScale, icon: AlertCircle, color: 'bg-amber-500', range: 'Triage' },
    { id: 'rts', name: t.rts, icon: Activity, color: 'bg-rose-500', range: '0-7.8408' },
    { id: 'gcs', name: medicalData[lang].calculators.gcs.name, data: medicalData[lang].calculators.gcs },
    { id: 'rass', name: medicalData[lang].calculators.rass.name, data: medicalData[lang].calculators.rass },
    { id: 'ccf', name: medicalData[lang].calculators.ccf.name, data: medicalData[lang].calculators.ccf },
    { id: 'four', name: medicalData[lang].calculators.four.name, data: medicalData[lang].calculators.four, range: '0-16' },
    { id: 'cpot', name: medicalData[lang].calculators.cpot.name, data: medicalData[lang].calculators.cpot, range: '0-8' },
    { id: 'flacc', name: medicalData[lang].calculators.flacc.name, data: medicalData[lang].calculators.flacc, range: '0-10' },
    { id: 'apache', name: medicalData[lang].calculators.apache.name, data: medicalData[lang].calculators.apache, range: 'Complexity High' }
  ];

  const handleScoreSelect = (category: string, score: number) => {
    setScores(prev => ({ ...prev, [category]: score }));
  };

  const totalScore = Object.values(scores).reduce((a, b) => (a as number) + (b as number), 0) as number;

  const renderCalculatorContent = () => {
    if (selected === 'start') return <STARTScale />;
    if (selected === 'rts') return <RevisedTraumaScore />;

    const calc = calculatorList.find(c => c.id === selected);
    if (!calc || !calc.data) return <div className="p-8 text-center text-zinc-500">Calculator logic for {calc?.name} coming soon...</div>;

    const data = calc.data as any;

    if (calc.id === 'rass') {
      return (
        <div className="space-y-3">
          {data.options.map((opt: any, i: number) => (
            <button
              key={i}
              onClick={() => handleScoreSelect('rass', opt.score)}
              className={`w-full p-4 rounded-2xl text-left border transition-all ${
                scores['rass'] === opt.score 
                ? 'bg-red-600 border-red-600 text-white shadow-lg' 
                : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">{opt.label}</span>
                <span className="text-xs opacity-60">Score: {opt.score}</span>
              </div>
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {data.categories.map((cat: any, i: number) => (
          <div key={i} className="space-y-3">
            <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest px-1">{cat.name || cat.label}</h4>
            <div className="grid grid-cols-1 gap-2">
              {cat.options.map((opt: any, j: number) => (
                <button
                  key={j}
                  onClick={() => handleScoreSelect(cat.name || cat.label, opt.score)}
                  className={`p-4 rounded-2xl text-left border transition-all text-sm ${
                    scores[cat.name || cat.label] === opt.score 
                    ? 'bg-red-600 border-red-600 text-white shadow-lg' 
                    : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{opt.label}</span>
                    <span className="text-xs opacity-60">{opt.score}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
        
        <div className="p-8 bg-red-600 rounded-[32px] text-center text-white shadow-xl shadow-red-600/20">
          <p className="text-red-200 text-xs font-black uppercase tracking-widest mb-1">Total Score</p>
          <h3 className="text-5xl font-black">{totalScore}</h3>
          {selected === 'gcs' && (
            <p className="mt-2 text-red-100 font-bold">
              {(totalScore as number) <= 8 ? 'Severe (Coma)' : (totalScore as number) <= 12 ? 'Moderate' : 'Mild'}
            </p>
          )}
          {selected === 'four' && (
            <p className="mt-2 text-red-100 font-bold">
              {(totalScore as number) <= 4 ? 'Very Severe' : (totalScore as number) <= 8 ? 'Severe' : (totalScore as number) <= 12 ? 'Moderate' : 'Mild'}
            </p>
          )}
          {selected === 'apache' && (
            <p className="mt-2 text-red-100 font-bold">
              Estimated Mortality: {(totalScore as number) >= 35 ? '> 85%' : (totalScore as number) >= 25 ? '~ 55%' : (totalScore as number) >= 15 ? '~ 25%' : '< 10%'}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {calculatorList.map((calc) => (
        <motion.button
          key={calc.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setSelected(calc.id);
            setScores({});
          }}
          className="w-full p-5 bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 flex items-center justify-between group transition-all hover:border-primary dark:hover:border-primary/30 shadow-sm hover:shadow-xl hover:shadow-primary/5"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 ${calc.color || 'bg-primary/10'} rounded-2xl group-hover:rotate-12 transition-transform`}>
              {calc.icon ? <calc.icon className={`w-6 h-6 ${calc.color ? 'text-white' : 'text-primary'}`} /> : <Calculator className="w-6 h-6 text-primary" />}
            </div>
            <div className="text-left">
              <h3 className="font-bold text-zinc-900 dark:text-white">{calc.name}</h3>
              <p className="text-xs text-zinc-400">{calc.range || 'Click to calculate'}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-primary transition-colors" />
        </motion.button>
      ))}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[40px] p-8 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-white dark:bg-zinc-900 z-10 py-2">
                <h2 className="text-2xl font-black">{calculatorList.find(c => c.id === selected)?.name}</h2>
                <button 
                  onClick={() => setSelected(null)} 
                  className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-500 font-bold"
                >
                  Close
                </button>
              </div>
              
              {renderCalculatorContent()}
              
              <button 
                onClick={() => setSelected(null)}
                className="w-full py-4 mt-8 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold transition-all active:scale-95"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClinicalCalculators;
