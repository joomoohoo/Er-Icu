import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Activity, Info, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { medicalData } from '../data/medicalData';

const RevisedTraumaScore: React.FC = () => {
  const { t, lang } = useAppContext();
  const data = (medicalData[lang] as any).calculators.rts;
  const [gcs, setGcs] = useState<number | null>(null);
  const [sbp, setSbp] = useState<number | null>(null);
  const [rr, setRr] = useState<number | null>(null);

  const gcsOptions = data.categories[0].options;
  const sbpOptions = data.categories[1].options;
  const rrOptions = data.categories[2].options;

  const rts = useMemo(() => {
    if (gcs === null || sbp === null || rr === null) return null;
    // RTS = 0.9368 GCS + 0.7326 SBP + 0.2908 RR
    return (0.9368 * gcs + 0.7326 * sbp + 0.2908 * rr).toFixed(4);
  }, [gcs, sbp, rr]);

  const survivalProbability = useMemo(() => {
    if (rts === null) return null;
    const score = parseFloat(rts);
    if (score >= 7.5) return "> 98%";
    if (score >= 7.0) return "97%";
    if (score >= 6.0) return "91%";
    if (score >= 5.0) return "80%";
    if (score >= 4.0) return "60%";
    if (score >= 3.0) return "36%";
    if (score >= 2.0) return "17%";
    if (score >= 1.0) return "7%";
    return "< 3%";
  }, [rts]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-zinc-400">
        <Info className="w-4 h-4" />
        <p className="text-[10px] font-black uppercase tracking-widest">{data.title}</p>
      </div>

      <div className="space-y-6">
        {/* GCS */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest px-1">{data.categories[0].name}</h4>
          <div className="grid grid-cols-5 gap-2">
            {gcsOptions.map((opt: any) => (
              <button
                key={opt.score}
                onClick={() => setGcs(opt.score)}
                className={`p-3 rounded-2xl text-center border transition-all ${
                  gcs === opt.score 
                  ? 'bg-primary border-primary text-white shadow-lg' 
                  : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <div className="text-xs font-black mb-1">{opt.score}</div>
                <div className="text-[10px] opacity-60">{opt.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* SBP */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest px-1">{data.categories[1].name}</h4>
          <div className="grid grid-cols-5 gap-2">
            {sbpOptions.map((opt: any) => (
              <button
                key={opt.score}
                onClick={() => setSbp(opt.score)}
                className={`p-3 rounded-2xl text-center border transition-all ${
                  sbp === opt.score 
                  ? 'bg-primary border-primary text-white shadow-lg' 
                  : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <div className="text-xs font-black mb-1">{opt.score}</div>
                <div className="text-[10px] opacity-60">{opt.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* RR */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest px-1">{data.categories[2].name}</h4>
          <div className="grid grid-cols-5 gap-2">
            {rrOptions.map((opt: any) => (
              <button
                key={opt.score}
                onClick={() => setRr(opt.score)}
                className={`p-3 rounded-2xl text-center border transition-all ${
                  rr === opt.score 
                  ? 'bg-primary border-primary text-white shadow-lg' 
                  : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                <div className="text-xs font-black mb-1">{opt.score}</div>
                <div className="text-[10px] opacity-60">{opt.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {rts !== null ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-8 bg-primary rounded-[40px] text-white text-center shadow-2xl shadow-primary/20"
        >
          <div className="flex justify-center mb-4">
            <Activity className="w-12 h-12" />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.3em] opacity-70 mb-2">{t.calculatedRts}</p>
          <h2 className="text-6xl font-black mb-4">{rts}</h2>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 space-y-2">
            <p className="text-xs font-black uppercase tracking-widest opacity-60">{data.survivalProb}</p>
            <p className="text-3xl font-black">{survivalProbability}</p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold opacity-70">
            <AlertCircle className="w-3 h-3" />
            {t.lowerScoresSeverity}
          </div>
        </motion.div>
      ) : (
        <div className="p-12 border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-[40px] text-center text-zinc-400">
          <p className="text-sm font-bold">{t.selectParams}</p>
        </div>
      )}
    </div>
  );
};

export default RevisedTraumaScore;
