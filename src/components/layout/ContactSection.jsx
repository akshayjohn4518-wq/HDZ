import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowRight } from 'lucide-react';

/**
 * Rebuilt Contact Experience for DAY ZERO
 * - Asymmetric 3-zone cinematic editorial composition
 * - Blended atmospheric portal visual with lone silhouette approaching illuminated doorway
 * - Minimalist header (ONLY "DAY ZERO") with subtle divider
 * - Industrial thin-line contact form with interaction tags & direct contact details
 */
export default function ContactSection({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [activeMarker, setActiveMarker] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Keyboard accessibility: ESC listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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
      id="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#050505] text-[#F3F4F6] overflow-y-auto overflow-x-hidden flex flex-col justify-between"
    >
      {/* Clean Dark Background */}
      <div className="absolute inset-0 bg-[#050505] pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* TOP MINIMAL BRAND HEADER                                                  */}
      {/* ========================================================================= */}
      <header className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-6 sm:pt-8 pb-4 flex items-center justify-between z-20">
        <button
          type="button"
          onClick={() => {
            if (onClose) onClose();
            window.location.hash = '';
            if (window.lenis) {
              window.lenis.scrollTo(0, { duration: 1.2 });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2 sm:gap-3 group select-none hover:opacity-80 transition-opacity cursor-pointer text-left focus:outline-none"
          title="Return to homepage"
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 relative flex items-center justify-center shrink-0">
            <svg viewBox="0 0 600 600" className="w-6 h-6 sm:w-7 sm:h-7 overflow-visible">
              <g>
                <path d="M 85 300 L 515 300" fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
                <path d="M 470 300 A 170 170 0 1 0 433.96 404.66" fill="none" stroke="#ffffff" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
                <g transform="translate(437.65, 399.93) rotate(-52.3)">
                  <path d="M 14 0 L -8 -9 L -2 0 L -8 9 Z" fill="#ffffff" stroke="#ffffff" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                </g>
              </g>
            </svg>
          </div>
        </button>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white transition-colors cursor-pointer border border-white/15 hover:border-white/40 px-3 py-1 bg-white/5 rounded-xs"
            title="Close Contact (ESC)"
          >
            <span className="text-[10px] text-white/40 tracking-wider">ESC</span>
          </button>
        )}
      </header>

      {/* Subtle Horizontal Divider underneath Header */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 z-20">
        <div className="w-full h-[1px] bg-white/10" />
      </div>

      {/* ========================================================================= */}
      {/* MAIN CONTACT EXPERIENCE (Asymmetric 3-Zone Layout)                         */}
      {/* ========================================================================= */}
      <main className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-8 sm:py-12 my-auto flex-1 flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-12 z-10">

        {/* ------------------------------------------------------------------------- */}
        {/* LEFT ZONE: Editorial Headline & Micro-Interaction Markers                */}
        {/* ------------------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full lg:w-[38%] flex flex-col justify-between space-y-8"
        >
          <div className="space-y-4 sm:space-y-6">
            <div className="text-[10px] sm:text-xs font-mono text-white/40 tracking-[0.25em] uppercase flex items-center gap-2">

              <span>ESTABLISH CONNECTION</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white uppercase leading-[0.92] select-none">
              LET’S<br />
              BUILD<br />
              WHAT’S<br />
              NEXT.
            </h1>

            <p className="text-xs sm:text-sm md:text-base font-light text-white/65 max-w-md leading-relaxed">
              Ideas, collaborations, or just a hello — we’re always open to conversations that push boundaries.
            </p>
          </div>

          {/* Three Small Interaction Labels */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-2.5 sm:gap-3">
            {[
              { id: 'COLLABORATE', label: 'COLLABORATE', sub: 'Build together' },
              { id: 'INQUIRE', label: 'INQUIRE', sub: 'Ask anything' },
              { id: 'EXPLORE', label: 'EXPLORE', sub: 'New possibilities' },
            ].map((marker) => (
              <button
                key={marker.id}
                type="button"
                onClick={() => {
                  setActiveMarker(marker.id);
                  setFormData((prev) => ({
                    ...prev,
                    subject:
                      marker.id === 'COLLABORATE'
                        ? 'Project Collaboration'
                        : marker.id === 'INQUIRE'
                          ? 'General Inquiry'
                          : 'Exploration & Concepts',
                  }));
                }}
                className={`text-left p-2.5 transition-all duration-200 border-l cursor-pointer group ${activeMarker === marker.id
                  ? 'border-white bg-white/10'
                  : 'border-white/20 hover:border-white/50 hover:bg-white/[0.03]'
                  }`}
              >
                <div className="text-[10px] font-mono tracking-wider text-white font-semibold group-hover:text-white">
                  {marker.label}
                </div>
                <div className="text-[9px] font-mono text-white/40 mt-0.5 truncate">
                  {marker.sub}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ------------------------------------------------------------------------- */}
        {/* CENTER ZONE: Minimalist Glowing Compass Crosshair (No letters, refined)   */}
        {/* ------------------------------------------------------------------------- */}
        <div className="hidden lg:flex lg:w-[18%] xl:w-[22%] relative items-center justify-center py-6 pointer-events-none select-none">
          {/* Subtle warm ambient radial bloom */}
          <div className="absolute w-40 h-40 rounded-full bg-amber-400/[0.035] blur-2xl pointer-events-none" />

          {/* Compass Crosshair Assembly */}
          <div className="relative z-10 flex flex-col items-center">
            {/* North Vertical Line */}
            <span className="w-[1px] h-8 sm:h-10 animate-contact-line" />

            {/* West Line — DAY ZERO — East Line */}
            <div className="flex items-center gap-2 sm:gap-2.5 my-1.5">
              <span className="h-[1px] w-6 sm:w-8 animate-contact-line" />
              <span className="text-[8.5px] sm:text-[10px] font-dune tracking-[0.22em] uppercase animate-contact-bulb whitespace-nowrap px-1">
                DAY ZERO
              </span>
              <span className="h-[1px] w-6 sm:w-8 animate-contact-line" />
            </div>

            {/* South Vertical Line */}
            <span className="w-[1px] h-8 sm:h-10 animate-contact-line" />
          </div>
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* RIGHT ZONE: Refined Industrial Form & Direct Contact Channels            */}
        {/* ------------------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full lg:w-[42%] xl:w-[38%] flex flex-col justify-between space-y-6"
        >
          <div className="bg-[#0A0A0C]/85 border border-white/10 p-5 sm:p-7 rounded-xs space-y-5 backdrop-blur-md shadow-2xl">
            {/* Form Eyebrow */}
            <div className="flex items-center justify-between text-[10px] font-mono text-white/40 tracking-widest uppercase pb-2.5 border-b border-white/10">
              <span className="text-white/80">[ SEND A MESSAGE ]</span>
              <span className="hidden sm:inline text-white/40">WE’LL GET BACK SOON.</span>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 text-center space-y-4 font-mono"
              >
                <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center mx-auto text-white">
                  ✓
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold tracking-wider uppercase text-white">
                    MESSAGE TRANSMITTED
                  </h3>
                  <p className="text-xs text-white/50 max-w-xs mx-auto">
                    Thank you, {formData.name}. Your connection request has been received.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setActiveMarker(null);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="mt-4 inline-flex items-center gap-2 text-xs text-white/70 hover:text-white underline cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5 font-mono text-xs">
                {/* Name */}
                <div className="space-y-1">
                  <label className="block text-[10px] tracking-wider text-white/50 uppercase">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 focus:border-white text-white text-xs placeholder:text-white/20 outline-none transition-colors rounded-none"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-[10px] tracking-wider text-white/50 uppercase">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="alex@domain.com"
                    className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 focus:border-white text-white text-xs placeholder:text-white/20 outline-none transition-colors rounded-none"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="block text-[10px] tracking-wider text-white/50 uppercase">
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Project Collaboration"
                    className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 focus:border-white text-white text-xs placeholder:text-white/20 outline-none transition-colors rounded-none"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="block text-[10px] tracking-wider text-white/50 uppercase">
                    YOUR MESSAGE
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your idea, vision, or inquiry..."
                    className="w-full px-3.5 py-2.5 bg-black/60 border border-white/15 focus:border-white text-white text-xs placeholder:text-white/20 outline-none transition-colors resize-none rounded-none"
                  />
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 bg-white text-black font-mono text-xs tracking-[0.2em] font-semibold uppercase flex items-center justify-center gap-3 hover:bg-white/90 hover:shadow-[0_0_22px_rgba(255,255,255,0.25)] transition-all cursor-pointer group disabled:opacity-50"
                  >
                    <span>{submitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Direct Contact Info */}
          <div className="space-y-2 pt-1 font-mono text-xs">
            <div className="text-[10px] text-white/40 tracking-widest uppercase">
              [ OR REACH US DIRECTLY ]
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-white/60">
              <a
                href="mailto:dayzeromedia.co@gmail.com"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-white/40" />
                <span>dayzeromedia.co@gmail.com</span>
              </a>

              <div className="inline-flex items-center gap-2 text-white/50">
                <MapPin className="w-3.5 h-3.5 text-white/40" />
                <span>HYDERABAD, India</span>
              </div>

              <a
                href="https://www.linkedin.com/in/heyitsdayzero/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-[2px] bg-white/20 text-white text-[9px] font-bold">
                  in
                </span>
                <span>/heyitsdayzero</span>
              </a>

              <a
                href="https://github.com/heyitsdayzero/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-[2px] bg-white/20 text-white text-[9px] font-bold">
                  gh
                </span>
                <span>/heyitsdayzero</span>
              </a>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ========================================================================= */}
      {/* BOTTOM MINIMAL EDITORIAL FOOTER                                           */}
      {/* ========================================================================= */}
      <footer className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-white/35 uppercase tracking-widest z-20">
        <div>SAME PEOPLE. A BRIGHTER TOMORROW.</div>
        <div className="hidden sm:block">IDEAS TODAY. IMPACT TOMORROW.</div>
      </footer>
    </motion.div>
  );
}
