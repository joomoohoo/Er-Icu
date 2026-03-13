import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle2, XCircle, Info, ChevronRight, RotateCcw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { medicalData } from '../data/medicalData';

type TriageCategory = 'MINOR' | 'DELAYED' | 'IMMEDIATE' | 'DECEASED' | null;

interface Step {
  id: string;
  question: string;
  options: {
    label: string;
    nextStep?: string;
    result?: TriageCategory;
  }[];
}

const STARTScale: React.FC = () => {
  const { lang } = useAppContext();
  const data = medicalData[lang].calculators.start;
  const [currentStepId, setCurrentStepId] = useState('walking');
  const [history, setHistory] = useState<string[]>([]);
  const [result, setResult] = useState<TriageCategory>(null);

  const steps: Record<string, Step> = data.steps;

  const handleOptionClick = (option: any) => {
    if (option.result) {
      setResult(option.result as TriageCategory);
    } else if (option.nextStep) {
      setHistory([...history, currentStepId]);
      setCurrentStepId(option.nextStep);
    }
  };

  const reset = () => {
    setCurrentStepId('walking');
    setHistory([]);
    setResult(null);
  };

  const currentStep = steps[currentStepId];

  const getCategoryColor = (cat: TriageCategory) => {
    switch (cat) {
      case 'MINOR': return 'bg-emerald-500';
      case 'DELAYED': return 'bg-amber-500';
      case 'IMMEDIATE': return 'bg-red-500';
      case 'DECEASED': return 'bg-zinc-900';
      default: return 'bg-zinc-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-zinc-400 mb-4">
        <Info className="w-4 h-4" />
        <p className="text-[10px] font-black uppercase tracking-widest">{data.title}</p>
      </div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key={currentStepId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white leading-tight">
              {currentStep.question}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {currentStep.options.map((opt: any, i: number) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(opt)}
                  className="group relative flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 rounded-3xl hover:border-primary transition-all active:scale-95"
                >
                  <span className="font-bold text-lg">{opt.label}</span>
                  <ChevronRight className="w-6 h-6 text-zinc-300 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>

            {history.length > 0 && (
              <button
                onClick={() => {
                  const prev = history[history.length - 1];
                  setHistory(history.slice(0, -1));
                  setCurrentStepId(prev);
                }}
                className="text-xs font-bold text-zinc-400 hover:text-primary transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                {data.back}
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`p-8 rounded-[40px] text-white text-center shadow-2xl ${getCategoryColor(result)}`}
          >
            <div className="mb-6 flex justify-center">
              {result === 'MINOR' && <CheckCircle2 className="w-20 h-20" />}
              {result === 'DELAYED' && <AlertTriangle className="w-20 h-20" />}
              {result === 'IMMEDIATE' && <AlertTriangle className="w-20 h-20 animate-pulse" />}
              {result === 'DECEASED' && <XCircle className="w-20 h-20" />}
            </div>
            
            <p className="text-xs font-black uppercase tracking-[0.3em] opacity-70 mb-2">{data.categoryLabel}</p>
            <h2 className="text-5xl font-black mb-4">{data.categories[result].label}</h2>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-sm font-medium">
              {data.categories[result].desc}
            </div>

            <button
              onClick={reset}
              className="mt-8 w-full py-4 bg-white text-zinc-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-zinc-100 transition-colors"
            >
              {data.startNew}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default STARTScale;
