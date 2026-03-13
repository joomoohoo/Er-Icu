import React, { useState } from 'react';
import { useAppContext, colorSchemes, ColorScheme } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutGrid, Calculator, Activity, Pill, 
  ShieldAlert, ClipboardCheck, Wind, Timer, 
  TestTube, Search, Moon, Sun, Languages,
  MessageCircle, HeartPulse, Droplets, Palette
} from 'lucide-react';

import ECGMonitor from './ECGMonitor';
import ParklandCalculator from './ParklandCalculator';
import SBARGenerator from './SBARGenerator';
import VentilatorGuide from './VentilatorGuide';
import DrugReference from './DrugReference';
import CodeBlueTimer from './CodeBlueTimer';
import ABGInterpreter from './ABGInterpreter';
import ClinicalCalculators from './ClinicalCalculators';
import EmergencyScenarios from './EmergencyScenarios';
import LabValues from './LabValues';

const Dashboard: React.FC = () => {
  const { t, lang, setLang, theme, colorScheme, setColorScheme } = useAppContext();
  const [activeView, setActiveView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPalette, setShowPalette] = useState(false);

  const menuItems = [
    { id: 'calculators', icon: Calculator, label: t.calculators, color: 'bg-blue-500', component: <ClinicalCalculators /> },
    { id: 'ecg', icon: Activity, label: t.ecg, color: 'bg-emerald-500', component: <ECGMonitor /> },
    { id: 'drugs', icon: Pill, label: t.drugs, color: 'bg-purple-500', component: <DrugReference /> },
    { id: 'scenarios', icon: ShieldAlert, label: t.scenarios, color: 'bg-red-500', component: <EmergencyScenarios /> },
    { id: 'sbar', icon: ClipboardCheck, label: t.sbar, color: 'bg-amber-500', component: <SBARGenerator /> },
    { id: 'ventilator', icon: Wind, label: t.ventilator, color: 'bg-cyan-500', component: <VentilatorGuide /> },
    { id: 'codeBlue', icon: Timer, label: t.codeBlue, color: 'bg-zinc-800', component: <CodeBlueTimer /> },
    { id: 'labValues', icon: TestTube, label: t.labValues, color: 'bg-indigo-500', component: <LabValues /> },
    { id: 'parkland', icon: Droplets, label: t.parkland, color: 'bg-orange-500', component: <ParklandCalculator /> },
    { id: 'abg', icon: Activity, label: t.abg, color: 'bg-rose-500', component: <ABGInterpreter /> },
  ];

  const filteredItems = menuItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderView = () => {
    if (activeView === 'home') {
      return (
        <div className="space-y-8 pb-32">
          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/10 blur-xl group-focus-within:bg-primary/20 transition-all rounded-3xl" />
            <div className="relative flex items-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-800/50 rounded-3xl p-2 shadow-xl">
              <Search className="ml-4 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-zinc-900 dark:text-white placeholder-zinc-400 font-medium"
              />
            </div>
          </div>

          {/* Grid Menu */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {filteredItems.map((item) => (
              <motion.button
                key={item.id}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView(item.id)}
                className="relative group overflow-hidden bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-white/20 dark:border-zinc-800/50 p-6 rounded-[32px] flex flex-col items-center gap-4 shadow-lg hover:shadow-primary/10 transition-all"
              >
                <div className={`p-4 rounded-2xl ${item.color} text-white shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <span className="font-bold text-sm text-zinc-900 dark:text-white text-center">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Footer Credits */}
          <div className="pt-12 pb-8 text-center space-y-4">
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
            <p className="text-xs font-medium text-zinc-500 leading-relaxed max-w-xs mx-auto">
              {t.developedBy}
            </p>
            <p className="text-sm font-black text-primary">
              {t.developerName}
            </p>
            <a
              href="https://wa.me/201023312473?text=Hello%20Yousef,%20I%20am%20using%20the%20ER%20&%20ICU%20Guide%20app%20and%20I%20have%20a%20suggestion:"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-green-500/20"
            >
              <MessageCircle className="w-5 h-5" />
              {t.contactDeveloper}
            </a>
          </div>
        </div>
      );
    }

    const currentItem = menuItems.find(i => i.id === activeView);
    return (
      <div className="pb-32">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => setActiveView('home')}
            className="p-3 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md rounded-2xl border border-white/20 dark:border-zinc-700/50 text-zinc-500 hover:text-primary transition-colors"
          >
            <LayoutGrid className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-black text-zinc-900 dark:text-white">{currentItem?.label}</h2>
          <div className={`p-2 rounded-xl ${currentItem?.color} text-white`}>
            {currentItem && <currentItem.icon className="w-5 h-5" />}
          </div>
        </div>
        <div className="mt-4">
          {currentItem?.component}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-transparent text-white transition-colors relative z-10 dark">
      {/* Background Decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
              <HeartPulse className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight">ER & ICU</h1>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Guide Pro</p>
            </div>
          </div>
          <div className="flex gap-2 relative">
            <button 
              onClick={() => setShowPalette(!showPalette)}
              className="p-3 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md rounded-2xl border border-white/20 dark:border-zinc-700/50"
            >
              <Palette className="w-5 h-5 text-zinc-500" />
            </button>
            
            {showPalette && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute top-full mt-2 right-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-white/20 dark:border-zinc-800/50 rounded-2xl p-2 shadow-2xl flex gap-2 z-50"
              >
                {(Object.keys(colorSchemes) as ColorScheme[]).map((scheme) => (
                  <button
                    key={scheme}
                    onClick={() => {
                      setColorScheme(scheme);
                      setShowPalette(false);
                    }}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      colorScheme === scheme ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: colorSchemes[scheme].primary }}
                  />
                ))}
              </motion.div>
            )}

            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="p-3 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md rounded-2xl border border-white/20 dark:border-zinc-700/50"
            >
              <Languages className="w-5 h-5 text-zinc-500" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-white/20 dark:border-zinc-800/50 rounded-[32px] p-2 shadow-2xl flex items-center justify-around">
          <button 
            onClick={() => setActiveView('home')}
            className={`flex-1 py-4 rounded-2xl flex flex-col items-center gap-1 transition-all ${activeView === 'home' ? 'text-primary bg-primary/10' : 'text-zinc-400'}`}
          >
            <LayoutGrid className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveView('calculators')}
            className={`flex-1 py-4 rounded-2xl flex flex-col items-center gap-1 transition-all ${activeView === 'calculators' ? 'text-primary bg-primary/10' : 'text-zinc-400'}`}
          >
            <Calculator className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveView('drugs')}
            className={`flex-1 py-4 rounded-2xl flex flex-col items-center gap-1 transition-all ${activeView === 'drugs' ? 'text-primary bg-primary/10' : 'text-zinc-400'}`}
          >
            <Pill className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveView('scenarios')}
            className={`flex-1 py-4 rounded-2xl flex flex-col items-center gap-1 transition-all ${activeView === 'scenarios' ? 'text-primary bg-primary/10' : 'text-zinc-400'}`}
          >
            <ShieldAlert className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
