import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { TestTube, Beaker } from 'lucide-react';
import { medicalData } from '../data/medicalData';

const LabValues: React.FC = () => {
  const { t, lang } = useAppContext();
  const [activeTab, setActiveTab] = useState<'hematology' | 'chemistry'>('hematology');
  const labData = medicalData[lang].labValues;

  return (
    <div className="space-y-6">
      <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900 rounded-2xl">
        <button
          onClick={() => setActiveTab('hematology')}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'hematology' ? 'bg-white dark:bg-zinc-800 shadow-sm text-red-600' : 'text-zinc-500'}`}
        >
          {t.hematology}
        </button>
        <button
          onClick={() => setActiveTab('chemistry')}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'chemistry' ? 'bg-white dark:bg-zinc-800 shadow-sm text-red-600' : 'text-zinc-500'}`}
        >
          {t.chemistry}
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900/50">
              <th className="p-4 text-xs font-black text-zinc-400 uppercase tracking-widest">{t.test}</th>
              <th className="p-4 text-xs font-black text-zinc-400 uppercase tracking-widest text-right">{t.normalRange}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
            {activeTab === 'hematology' ? (
              labData.hematology.map((lab, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors">
                  <td className="p-4 font-bold text-zinc-900 dark:text-white text-sm">{lab.item}</td>
                  <td className="p-4 text-right text-sm text-zinc-600 dark:text-zinc-400">
                    {lab.range || (
                      <div className="flex flex-col">
                        <span>{t.male}: {lab.male}</span>
                        <span>{t.female}: {lab.female}</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              labData.chemistry.map((lab, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors">
                  <td className="p-4 font-bold text-zinc-900 dark:text-white text-sm">{lab.item}</td>
                  <td className="p-4 text-right text-sm text-zinc-600 dark:text-zinc-400 font-mono">{lab.range}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabValues;
