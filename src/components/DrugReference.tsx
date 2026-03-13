import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { Beaker, Search, Pill } from 'lucide-react';
import { medicalData } from '../data/medicalData';

const DrugReference: React.FC = () => {
  const { t, lang } = useAppContext();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'drugs' | 'antidotes'>('drugs');

  const filteredDrugs = medicalData[lang].drugs.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase()) || 
    d.indications.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAntidotes = medicalData[lang].antidotes.filter(a => 
    a.poison.toLowerCase().includes(query.toLowerCase()) || 
    a.antidote.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-red-500 transition-all"
        />
      </div>

      <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900 rounded-2xl">
        <button
          onClick={() => setActiveTab('drugs')}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'drugs' ? 'bg-white dark:bg-zinc-800 shadow-sm text-red-600' : 'text-zinc-500'}`}
        >
          {t.drugs}
        </button>
        <button
          onClick={() => setActiveTab('antidotes')}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'antidotes' ? 'bg-white dark:bg-zinc-800 shadow-sm text-red-600' : 'text-zinc-500'}`}
        >
          {t.antidote}
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'drugs' ? (
          filteredDrugs.map((drug, idx) => (
            <motion.div
              layout
              key={idx}
              className="bg-white dark:bg-zinc-800 p-5 rounded-3xl border border-zinc-100 dark:border-zinc-700 space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <Pill className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-white">{drug.name}</h3>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400 font-medium">{t.dosage}:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 font-bold">{drug.dosage}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-400 font-medium">{t.indications}:</span>
                  <span className="text-zinc-600 dark:text-zinc-400">{drug.indications}</span>
                </div>
                {drug.antidote !== 'N/A' && (
                  <div className="flex justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg mt-2">
                    <span className="text-green-700 dark:text-green-400 font-bold">{t.antidote}:</span>
                    <span className="text-green-800 dark:text-green-300 font-bold">{drug.antidote}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          filteredAntidotes.map((item, idx) => (
            <motion.div
              layout
              key={idx}
              className="bg-white dark:bg-zinc-800 p-5 rounded-3xl border border-zinc-100 dark:border-zinc-700 flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Poison</p>
                <p className="font-bold text-zinc-900 dark:text-white">{item.poison}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-xs font-black text-green-500 uppercase tracking-widest">Antidote</p>
                <p className="font-bold text-green-600 dark:text-green-400">{item.antidote}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default DrugReference;
