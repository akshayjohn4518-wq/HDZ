import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Authentic developer setup & command sequence simulating building DAY ZERO
const terminalSequence = [
  { type: 'command', text: 'git init' },
  { type: 'output', text: 'Initialized empty Git repository in /Users/dayzero/workspace/hdz/.git/' },
  { type: 'command', text: 'git branch -M main' },
  { type: 'command', text: 'git add .' },
  { type: 'command', text: 'git commit -m "Initialize DAY ZERO"' },
  {
    type: 'output',
    text: '[main (root-commit) 8f3a1d9] Initialize DAY ZERO\n 12 files changed, 480 insertions(+)\n create mode 100644 package.json\n create mode 100644 src/App.jsx',
  },
  { type: 'command', text: 'git remote add origin git@github.com:dayzero/hdz.git' },
  { type: 'command', text: 'git push -u origin main' },
  {
    type: 'output',
    text: "Enumerating objects: 12, done.\nCounting objects: 100% (12/12), done.\nWriting objects: 100% (12/12), 16.2 KiB | 3.24 MiB/s, done.\nTo github.com:dayzero/hdz.git\n * [new branch]      main -> main\nBranch 'main' set up to track remote branch 'main'.",
  },
  { type: 'command', text: 'npm create vite@latest' },
  {
    type: 'output',
    text: 'Creating project in /Users/dayzero/workspace/hdz...\nDone. Now run:\n  cd day-zero && npm install && npm run dev',
  },
  { type: 'command', text: 'cd day-zero' },
  { type: 'command', text: 'npm install' },
  {
    type: 'output',
    text: 'added 42 packages in 620ms\nfound 0 vulnerabilities',
  },
  { type: 'command', text: 'npm run dev' },
  {
    type: 'output',
    text: '  VITE v8.2.0  ready in 140 ms\n  ➜  Local:   http://localhost:5173/\n  ➜  press h + enter to show help',
  },
  { type: 'command', text: 'git status' },
  {
    type: 'output',
    text: "On branch main\nYour branch is up to date with 'origin/main'.\n\nChanges to be committed:\n  modified:   src/components/layout/ContactSection.jsx",
  },
  { type: 'command', text: 'git add .' },
  { type: 'command', text: 'git commit -m "Build Contact Experience"' },
  {
    type: 'output',
    text: '[main e4f5g6h] Build Contact Experience\n 2 files changed, 220 insertions(+)',
  },
  { type: 'command', text: 'git push' },
  {
    type: 'output',
    text: 'Everything up-to-date.\n# Workstation online. Connection established.',
  },
];

const GOOGLE_FORM_URL = 'https://forms.google.com';

export default function ContactSection({ onClose }) {
  const [activeTab, setActiveTab] = useState('CONTACT'); // 'CONTACT' | 'QUEST'
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentTypingText, setCurrentTypingText] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isInView, setIsInView] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const sectionRef = useRef(null);
  const terminalBodyRef = useRef(null);

  // Reset and restart animation when section enters viewport or is revisited
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Restart terminal sequence upon re-entering viewport
          setTerminalHistory([]);
          setCurrentTypingText('');
          setCurrentStepIndex(0);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Keyboard accessibility: ESC key listener if closed as modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Terminal Typing Logic - Natural speed, realistic delays, auto restart loop
  useEffect(() => {
    if (!isInView) return;

    if (currentStepIndex >= terminalSequence.length) {
      // Pause at end of sequence before seamlessly restarting loop
      const loopTimeout = setTimeout(() => {
        setTerminalHistory([]);
        setCurrentTypingText('');
        setCurrentStepIndex(0);
      }, 4000);
      return () => clearTimeout(loopTimeout);
    }

    const currentItem = terminalSequence[currentStepIndex];

    if (currentItem.type === 'output') {
      const outputTimeout = setTimeout(() => {
        setTerminalHistory((prev) => [...prev, currentItem]);
        setCurrentStepIndex((prev) => prev + 1);
      }, 280);
      return () => clearTimeout(outputTimeout);
    }

    if (currentItem.type === 'command') {
      if (currentTypingText.length < currentItem.text.length) {
        // Natural human-like variable typing delay (20-45ms)
        const randomTypingDelay = Math.floor(Math.random() * 25) + 20;
        const typingTimeout = setTimeout(() => {
          setCurrentTypingText(
            currentItem.text.slice(0, currentTypingText.length + 1)
          );
        }, randomTypingDelay);
        return () => clearTimeout(typingTimeout);
      } else {
        // Pause briefly after pressing Enter before executing next line
        const finishTimeout = setTimeout(() => {
          setTerminalHistory((prev) => [
            ...prev,
            { type: 'command', text: currentItem.text },
          ]);
          setCurrentTypingText('');
          setCurrentStepIndex((prev) => prev + 1);
        }, 220);
        return () => clearTimeout(finishTimeout);
      }
    }
  }, [currentStepIndex, currentTypingText, isInView]);

  // Auto-scroll terminal container whenever terminal output changes
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalHistory, currentTypingText]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <motion.div
      ref={sectionRef}
      id="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-2xl overflow-y-auto flex flex-col justify-between p-4 sm:p-6 md:p-10 select-none"
    >
      {/* Top Header Status Bar */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between border-b border-white/10 pb-4 mb-6 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] text-white/60 uppercase">
            WORKSTATION-ENGINE v2.4
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-mono text-white/40">
          <span className="hidden sm:inline"></span>
          {onClose && (
            <button
              onClick={onClose}
              className="text-xs font-mono text-white/60 hover:text-white flex items-center gap-2 border border-white/20 hover:border-white/50 px-3 py-1 rounded-full transition-all cursor-pointer bg-white/5"
            >
              <span className="text-[10px] text-white/40">ESC</span>
              <span className="tracking-wider uppercase font-semibold"></span>
            </button>
          )}
        </div>
      </div>

      {/* Main Split Layout Container: 60% Left (Terminal, desktop only) / 40% Right (Editorial Form/Quest) */}
      <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10 my-auto z-10">

        {/* ================= LEFT PANEL (60%): macOS Light Theme Terminal (Desktop Only) ================= */}
        <div className="hidden lg:flex w-full lg:w-[60%] flex-col justify-center">
          <div className="bg-[#FFFFFF] rounded-xl border border-black/15 shadow-2xl shadow-black/90 flex flex-col overflow-hidden text-left font-mono transition-all">

            {/* macOS Light Terminal Title Bar */}
            <div className="bg-[#EAEAEA] border-b border-black/10 px-4 py-2.5 flex items-center justify-between shrink-0 select-none">
              {/* macOS Traffic Light Buttons */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block shadow-xs" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block shadow-xs" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block shadow-xs" />
              </div>

              {/* Terminal Title */}
              <div className="text-[11px] font-sans font-medium text-black/60 tracking-wide">
                zsh — dayzero@macbook: ~/workspace/hdz — 80×24
              </div>

              <div className="w-12" />
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalBodyRef}
              className="p-4 sm:p-6 overflow-y-auto text-[11px] sm:text-xs leading-relaxed text-[#24292E] font-mono space-y-2 h-[340px] sm:h-[400px] lg:h-[440px] scroll-smooth bg-white"
            >
              {/* Terminal Welcome Header */}
              <div className="text-black/40 text-[10px] sm:text-[11px] pb-2 border-b border-black/10">
                DAY ZERO GitHub Terminal v2.4.0 [main]
                <br />
                Executing live project initialization &amp; commit sequence...
              </div>

              {/* Executed History Commands & Output Lines */}
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="whitespace-pre-wrap break-words">
                  {item.type === 'command' ? (
                    <div className="flex items-center gap-2 text-[#005CC5] font-medium">
                      <span className="text-black/40 select-none">dayzero@macbook hdz %</span>
                      <span className="text-[#24292E] font-semibold">{item.text}</span>
                    </div>
                  ) : (
                    <div className="text-[#57606A] font-mono text-[10px] sm:text-[11px] pl-2 border-l-2 border-black/10">
                      {item.text}
                    </div>
                  )}
                </div>
              ))}

              {/* Active Character-by-Character Typing Line */}
              {currentStepIndex < terminalSequence.length &&
                terminalSequence[currentStepIndex].type === 'command' && (
                  <div className="flex items-center gap-2 text-[#005CC5] font-medium">
                    <span className="text-black/40 select-none">dayzero@macbook hdz %</span>
                    <span className="text-[#24292E] font-semibold">{currentTypingText}</span>
                    <span className="w-2 h-4 bg-[#24292E] inline-block animate-pulse ml-0.5" />
                  </div>
                )}

              {/* Active Standby Cursor */}
              {currentStepIndex >= terminalSequence.length && (
                <div className="flex items-center gap-2 text-[#005CC5] font-medium pt-1">
                  <span className="text-black/40 select-none">dayzero@macbook hdz %</span>
                  <span className="w-2 h-4 bg-[#24292E] inline-block animate-pulse ml-0.5" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL (40%): Editorial Interface (QUEST | CONTACT) ================= */}
        <div className="w-full lg:w-[40%] max-w-xl lg:max-w-none mx-auto flex flex-col justify-center">
          <div className="bg-[#0B0B0D] border border-white/10 p-6 sm:p-8 rounded-xl flex flex-col justify-between min-h-[440px]">
            <div>
              {/* Segmented Navigation Header */}
              <div className="flex items-center gap-8 border-b border-white/15 pb-3 mb-6 relative">
                <button
                  type="button"
                  onClick={() => setActiveTab('CONTACT')}
                  className={`text-xs font-mono tracking-[0.2em] uppercase transition-colors duration-200 pb-1 relative cursor-pointer ${activeTab === 'CONTACT'
                    ? 'text-white font-bold'
                    : 'text-white/40 hover:text-white/80 font-normal'
                    }`}
                >
                  CONTACT
                  {activeTab === 'CONTACT' && (
                    <motion.div
                      layoutId="editorialTabUnderline"
                      className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-white"
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('QUEST')}
                  className={`text-xs font-mono tracking-[0.2em] uppercase transition-colors duration-200 pb-1 relative cursor-pointer ${activeTab === 'QUEST'
                    ? 'text-white font-bold'
                    : 'text-white/40 hover:text-white/80 font-normal'
                    }`}
                >
                  QUEST
                  {activeTab === 'QUEST' && (
                    <motion.div
                      layoutId="editorialTabUnderline"
                      className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-white"
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              </div>

              {/* Horizontal Sliding Tab Content */}
              <div className="relative overflow-hidden min-h-[320px]">
                <AnimatePresence mode="wait" initial={false}>
                  {activeTab === 'CONTACT' ? (
                    <motion.div
                      key="CONTACT"
                      initial={{ x: activeTab === 'CONTACT' ? -30 : 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-4"
                    >
                      {submitted ? (
                        <div className="py-12 px-6 text-center border border-white/20 bg-white/5 space-y-4 rounded-lg">
                          <div className="text-xs font-mono text-white/50 tracking-widest uppercase">
                            STATUS: 200 OK
                          </div>
                          <h3 className="text-sm font-mono font-semibold text-white tracking-wide">
                            TRANSMISSION RECEIVED
                          </h3>
                          <p className="text-xs font-mono text-white/60 max-w-xs mx-auto leading-relaxed">
                            Thank you for reaching out. Our engineering team will review your inquiry shortly.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setSubmitted(false);
                              setFormData({ name: '', email: '', subject: '', message: '' });
                            }}
                            className="mt-4 text-[10px] font-mono tracking-widest uppercase text-white/50 hover:text-white underline cursor-pointer"
                          >
                            Send another transmission
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleFormSubmit} className="space-y-3.5">
                          {/* Name Field */}
                          <div>
                            <label
                              htmlFor="contact-name"
                              className="block text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1.5"
                            >
                              [01] FULL NAME *
                            </label>
                            <input
                              id="contact-name"
                              type="text"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Alex Rivera"
                              className="w-full bg-[#050505] border border-white/15 focus:border-white focus:ring-1 focus:ring-white/20 text-white placeholder:text-white/20 px-3.5 py-2.5 text-xs font-mono outline-none transition-colors rounded-none"
                            />
                          </div>

                          {/* Email Field */}
                          <div>
                            <label
                              htmlFor="contact-email"
                              className="block text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1.5"
                            >
                              [02] EMAIL ADDRESS *
                            </label>
                            <input
                              id="contact-email"
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="alex@workstation.dev"
                              className="w-full bg-[#050505] border border-white/15 focus:border-white focus:ring-1 focus:ring-white/20 text-white placeholder:text-white/20 px-3.5 py-2.5 text-xs font-mono outline-none transition-colors rounded-none"
                            />
                          </div>

                          {/* Subject Field */}
                          <div>
                            <label
                              htmlFor="contact-subject"
                              className="block text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1.5"
                            >
                              [03] TRANSMISSION SUBJECT
                            </label>
                            <input
                              id="contact-subject"
                              type="text"
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              placeholder="Collaboration Inquiry"
                              className="w-full bg-[#050505] border border-white/15 focus:border-white focus:ring-1 focus:ring-white/20 text-white placeholder:text-white/20 px-3.5 py-2.5 text-xs font-mono outline-none transition-colors rounded-none"
                            />
                          </div>

                          {/* Message Field */}
                          <div>
                            <label
                              htmlFor="contact-message"
                              className="block text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1.5"
                            >
                              [04] INTENT &amp; MESSAGE *
                            </label>
                            <textarea
                              id="contact-message"
                              name="message"
                              required
                              rows={3}
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="Describe your inquiry..."
                              className="w-full bg-[#050505] border border-white/15 focus:border-white focus:ring-1 focus:ring-white/20 text-white placeholder:text-white/20 px-3.5 py-2.5 text-xs font-mono outline-none transition-colors resize-none rounded-none"
                            />
                          </div>

                          {/* Submit Button */}
                          <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-white text-black font-mono font-bold text-[11px] tracking-widest uppercase py-3 px-5 border border-white hover:bg-white/90 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 mt-1"
                          >
                            {submitting ? 'EXECUTING TRANSMISSION...' : 'EXECUTE TRANSMISSION →'}
                          </button>
                        </form>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="QUEST"
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-6 py-2 flex flex-col justify-between h-full"
                    >
                      <div className="space-y-4">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-white/40 uppercase block">
                          // INITIATIVE ZERO
                        </span>
                        <h3 className="font-display text-xl font-bold text-white tracking-tight uppercase">
                          THE DAY ZERO QUEST
                        </h3>
                        <p className="text-xs font-mono text-white/70 leading-relaxed">
                          An intentional engineering challenge for founders, builders, and visionaries.
                        </p>
                        <p className="text-xs font-mono text-white/50 leading-relaxed">
                          Answer a few concise questions about your architectural vision to join our inner circle and collaborate from Day Zero.
                        </p>
                      </div>

                      {/* Quest CTA Button */}
                      <div className="pt-4 border-t border-white/10">
                        <a
                          href={GOOGLE_FORM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-between w-full bg-white text-black font-mono font-bold text-[11px] tracking-widest uppercase py-3.5 px-5 border border-white hover:bg-white/90 active:scale-[0.99] transition-all cursor-pointer"
                        >
                          <span>BEGIN QUEST</span>
                          <span className="text-sm">↗</span>
                        </a>
                        <span className="text-[9px] font-mono text-white/30 block mt-2 text-center">
                          Opens external form in a new tab
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/30">
              <span>SYSTEM: ONLINE</span>
              <span>LATENCY: 12ms</span>
              <span>ENCRYPTED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Bottom Footer note */}
      <div className="max-w-7xl w-full mx-auto text-center pt-4 border-t border-white/10 text-[10px] font-mono text-white/30 shrink-0 z-10">
        © {new Date().getFullYear()} DAY ZERO — WORKSTATION INTERFACE
      </div>
    </motion.div>
  );
}
