import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeartPulse } from 'lucide-react';

const SplashScreen: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-primary"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <HeartPulse className="w-24 h-24 text-white" />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 bg-white rounded-full -z-10"
            />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-3xl font-bold text-white tracking-wider"
          >
            ER & ICU Guide
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-1 bg-white/30 mt-4 rounded-full overflow-hidden"
          >
            <motion.div
              animate={{ x: [-200, 200] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-1/2 h-full bg-white"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
