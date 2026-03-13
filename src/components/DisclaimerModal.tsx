import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle } from 'lucide-react';

const DisclaimerModal: React.FC = () => {
  const { t, lang } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('disclaimerAccepted');
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-primary/10 dark:border-primary/30 text-center"
          >
            <div className="w-16 h-16 bg-primary/10 dark:bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-primary w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
              {t.disclaimerTitle}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              {t.disclaimerText}
            </p>
            <button
              onClick={handleAccept}
              className="w-full py-4 bg-primary hover:bg-secondary text-white rounded-2xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
            >
              {t.understand}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DisclaimerModal;
