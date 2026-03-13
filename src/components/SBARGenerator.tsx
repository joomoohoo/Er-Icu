import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { ClipboardCheck, Copy, Check } from 'lucide-react';

const SBARGenerator: React.FC = () => {
  const { t } = useAppContext();
  const [form, setForm] = useState({
    situation: '',
    background: '',
    assessment: '',
    recommendation: ''
  });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `SBAR HANDOVER REPORT\n\nSITUATION:\n${form.situation}\n\nBACKGROUND:\n${form.background}\n\nASSESSMENT:\n${form.assessment}\n\nRECOMMENDATION:\n${form.recommendation}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {Object.keys(form).map((key) => (
        <div key={key} className="space-y-2">
          <label className="text-sm font-bold text-zinc-500 px-1 capitalize">
            {t[key as keyof typeof t] || key}
          </label>
          <textarea
            value={form[key as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            rows={3}
            className="w-full p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none"
            placeholder={`Enter ${key}...`}
          />
        </div>
      ))}

      <button
        onClick={handleCopy}
        disabled={!form.situation}
        className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
      >
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        {t.copyHandover}
      </button>
    </div>
  );
};

export default SBARGenerator;
