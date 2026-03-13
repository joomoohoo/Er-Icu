import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, AlertTriangle, Trash2, MessageSquare, Copy, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { generateAIResponseStream } from '../services/aiService';
import Markdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistant: React.FC = () => {
  const { t, lang } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = lang === 'en' ? [
    "ACLS algorithm for V-Fib",
    "Calculate Parkland for 70kg, 30% TBSA",
    "Interpret ABG: pH 7.25, pCO2 55, HCO3 26",
    "Dosage of Adrenaline in anaphylaxis"
  ] : [
    "خوارزمية ACLS للرجفان البطيني",
    "احسب باركلاند لـ 70 كجم، 30٪ TBSA",
    "تفسير ABG: pH 7.25، pCO2 55، HCO3 26",
    "جرعة الأدرينالين في الحساسية المفرطة"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Add placeholder for assistant message
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    await generateAIResponseStream(messageText, lang, (chunk) => {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = chunk;
        return newMessages;
      });
    });

    setIsLoading(false);
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-zinc-900 rounded-[32px] border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-800/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-black text-zinc-900 dark:text-white">{t.aiAssistant}</h3>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Powered by Gemini
            </p>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="p-2 text-zinc-400 hover:text-red-500 transition-colors active:scale-90"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
            <div className="space-y-4 opacity-50">
              <Bot className="w-12 h-12 text-zinc-300 mx-auto" />
              <p className="text-sm font-medium text-zinc-400 max-w-[200px]">
                {t.aiPlaceholder}
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="text-left p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-xs font-bold text-zinc-500 hover:border-primary hover:text-primary transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-3 h-3" />
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-zinc-800 text-white' : 'bg-primary text-white'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed relative group/msg ${
                  msg.role === 'user' 
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' 
                    : 'bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 shadow-sm'
                }`}>
                  <div className="markdown-body prose dark:prose-invert max-w-none">
                    <Markdown>{msg.content || (isLoading && idx === messages.length - 1 ? '...' : '')}</Markdown>
                  </div>
                  
                  {msg.role === 'assistant' && msg.content && (
                    <button
                      onClick={() => copyToClipboard(msg.content, idx)}
                      className="absolute -bottom-8 right-0 p-2 text-zinc-400 hover:text-primary opacity-0 group-hover/msg:opacity-100 transition-all"
                    >
                      {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Disclaimer */}
      <div className="px-6 py-2 bg-amber-50 dark:bg-amber-900/10 border-y border-amber-100 dark:border-amber-900/20 flex items-center gap-2">
        <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
        <p className="text-[10px] font-bold text-amber-700 dark:text-amber-500 leading-tight">
          {t.aiDisclaimer}
        </p>
      </div>

      {/* Input */}
      <div className="p-6 bg-zinc-50/50 dark:bg-zinc-800/50 backdrop-blur-xl">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.aiPlaceholder}
            className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-primary transition-all text-zinc-900 dark:text-white"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
