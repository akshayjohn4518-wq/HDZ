import React, { useEffect } from 'react';
import {
  ArrowRight,
  ArrowDown,
  Terminal,
  FolderGit2,
  AppWindow,
  CheckSquare,
  BookOpen,
  Box,
  Feather,
  Shield,
  GraduationCap,
  Palette,
  Briefcase,
  Rocket,
  MoreHorizontal,
  User,
  Atom,
  Layers,
  Zap,
  Database,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

const WEB_LOGIN_URL = 'https://day-zero-os.vercel.app/login';
const DOWNLOAD_URL = 'https://day-zero-os.vercel.app/download';

export default function DayZeroOsExperience({ onClose, _onOpenContact }) {
  // ESC key listener to exit back to the products archive
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="relative w-full bg-[#000000] text-[#F3F4F6] selection:bg-white selection:text-black font-sans">

      {/* Main Container */}
      <main className="relative w-full pt-16 pb-16">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================================= */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-24 lg:pt-16 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Hero Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
                — DIGITAL OPERATING SYSTEM
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.04]">
                One Platform.<br />
                Different <span className="font-serif italic font-normal text-neutral-200">Ways</span> of Working.
              </h1>

              <p className="text-sm sm:text-base md:text-lg font-sans text-neutral-400 font-light leading-relaxed max-w-xl">
                Day Zero OS is a unified digital operating environment built to help people{' '}
                <span className="text-white font-normal">organize their work, collaborate</span>, manage projects and grow — with specialized OS experiences for different sectors.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={WEB_LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs sm:text-[13px] font-bold tracking-wider uppercase hover:bg-neutral-200 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.18)]"
                >
                  <span>Open Day Zero OS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-transparent text-white font-mono text-xs sm:text-[13px] font-medium tracking-wider uppercase hover:border-white/50 hover:bg-white/5 transition-all cursor-pointer"
                >
                  <span>Download the App</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Hero Column: Day Zero OS Dashboard Mockup */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl border border-white/15 bg-[#0B0B0B] p-4 sm:p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
                {/* Subtle background gradient depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />

                {/* Window Header Bar with 3 dots */}
                <div className="relative flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08] text-[10px] font-mono text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="tracking-widest uppercase text-white/50 text-[9px]">DAY ZERO OS</span>
                  </div>
                  <div className="text-[9px] text-white/30">v1.0.0</div>
                </div>

                {/* Window Body Layout */}
                <div className="grid grid-cols-12 gap-3 min-h-[310px]">
                  {/* Mini Sidebar */}
                  <div className="col-span-3 border-r border-white/[0.06] pr-2 space-y-1 text-[11px] font-mono">
                    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded bg-white/10 text-white font-medium">
                      <Terminal className="w-3 h-3 text-emerald-400" />
                      <span className="truncate">Home</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded text-neutral-400 hover:text-white">
                      <FolderGit2 className="w-3 h-3 text-neutral-500" />
                      <span className="truncate">Projects</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded text-neutral-400 hover:text-white">
                      <CheckSquare className="w-3 h-3 text-neutral-500" />
                      <span className="truncate">Tasks</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded text-neutral-400 hover:text-white">
                      <BookOpen className="w-3 h-3 text-neutral-500" />
                      <span className="truncate">Knowledge</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded text-neutral-400 hover:text-white">
                      <Box className="w-3 h-3 text-neutral-500" />
                      <span className="truncate">Assets</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded text-neutral-400 hover:text-white">
                      <User className="w-3 h-3 text-neutral-500" />
                      <span className="truncate">Team</span>
                    </div>
                  </div>

                  {/* Main Workspace Area */}
                  <div className="col-span-9 pl-1 space-y-3">
                    {/* Greeting & Subheading */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-display font-bold text-white tracking-wide">
                          Good morning, Builder.
                        </div>
                        <div className="text-[10px] text-neutral-400 font-sans">
                          Here's what's happening with your work today.
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[9px] font-mono text-white/70">
                        DZ
                      </div>
                    </div>

                    {/* 4 Metric Stats Cards */}
                    <div className="grid grid-cols-4 gap-1.5">
                      <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06]">
                        <div className="text-[8px] font-mono text-neutral-500 uppercase truncate">Active Projects</div>
                        <div className="text-sm font-display font-bold text-white mt-0.5">4</div>
                      </div>
                      <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06]">
                        <div className="text-[8px] font-mono text-neutral-500 uppercase truncate">Open Tasks</div>
                        <div className="text-sm font-display font-bold text-white mt-0.5">12</div>
                      </div>
                      <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06]">
                        <div className="text-[8px] font-mono text-neutral-500 uppercase truncate">Team Members</div>
                        <div className="text-sm font-display font-bold text-white mt-0.5">3</div>
                      </div>
                      <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06]">
                        <div className="text-[8px] font-mono text-neutral-500 uppercase truncate">Updated Today</div>
                        <div className="text-sm font-display font-bold text-emerald-400 mt-0.5">2</div>
                      </div>
                    </div>

                    {/* Split Dashboard Row: Recent Projects & Upcoming Tasks */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {/* Recent Projects Card */}
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06] space-y-2">
                        <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 uppercase">
                          <span>Recent Projects</span>
                          <ArrowRight className="w-2.5 h-2.5 text-neutral-500" />
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span className="text-neutral-300 font-sans truncate">Aurora Engine</span>
                            </div>
                            <span className="text-[8px] font-mono text-neutral-500">v1.2</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                              <span className="text-neutral-300 font-sans truncate">Nebula Cloud</span>
                            </div>
                            <span className="text-[8px] font-mono text-neutral-500">v0.8</span>
                          </div>
                        </div>
                      </div>

                      {/* Upcoming Tasks Card */}
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06] space-y-2">
                        <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 uppercase">
                          <span>Upcoming Tasks</span>
                          <span className="text-[8px] font-mono text-white/30">3 pending</span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-1.5 truncate">
                              <CheckSquare className="w-2.5 h-2.5 text-neutral-500" />
                              <span className="text-neutral-300 font-sans truncate">Finish API migration</span>
                            </div>
                            <span className="text-[8px] font-mono text-emerald-400">Today</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-1.5 truncate">
                              <CheckSquare className="w-2.5 h-2.5 text-neutral-500" />
                              <span className="text-neutral-300 font-sans truncate">Design system updates</span>
                            </div>
                            <span className="text-[8px] font-mono text-neutral-500">Tomorrow</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Thin Horizontal Divider */}
        <div className="w-full border-t border-white/[0.08]" />

        {/* ========================================================================= */}
        {/* 2. THE PROBLEM & 3. THE SOLUTION */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* THE PROBLEM */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
                — WHY IT EXISTS
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                The Problem
              </h2>

              <p className="text-sm sm:text-base font-sans text-neutral-400 font-light leading-relaxed">
                Teams struggle with communication, shared resources, tasks, deadlines and project status. Work becomes scattered across multiple tools, generic productivity tools often make users adapt their workflow to the software, and different sectors have fundamentally different ways of working.
              </p>

              {/* 4 Compact Information Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0B0B0B] space-y-1.5">
                  <div className="text-white/40 font-mono text-xs">01 // STATUS</div>
                  <div className="text-xs font-sans text-neutral-200 font-medium">Scattered Information</div>
                  <div className="text-[11px] text-neutral-500 font-light leading-relaxed">Tasks and status lost between chat and docs.</div>
                </div>

                <div className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0B0B0B] space-y-1.5">
                  <div className="text-white/40 font-mono text-xs">02 // CONTEXT</div>
                  <div className="text-xs font-sans text-neutral-200 font-medium">Tool Proliferation</div>
                  <div className="text-[11px] text-neutral-500 font-light leading-relaxed">Constant switching destroys focused output.</div>
                </div>

                <div className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0B0B0B] space-y-1.5">
                  <div className="text-white/40 font-mono text-xs">03 // ADAPTATION</div>
                  <div className="text-xs font-sans text-neutral-200 font-medium">Forced Conformity</div>
                  <div className="text-[11px] text-neutral-500 font-light leading-relaxed">Users bend their workflow to match rigid software.</div>
                </div>

                <div className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0B0B0B] space-y-1.5">
                  <div className="text-white/40 font-mono text-xs">04 // SECTOR</div>
                  <div className="text-xs font-sans text-neutral-200 font-medium">One-Size-Fits-None</div>
                  <div className="text-[11px] text-neutral-500 font-light leading-relaxed">Engineers, creators, and teachers work differently.</div>
                </div>
              </div>
            </div>

            {/* THE SOLUTION */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8 lg:border-l lg:border-white/[0.08] lg:pl-16">
              <div className="space-y-6">
                <div className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
                  — THE PARADIGM SHIFT
                </div>

                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  The Solution
                </h2>

                <p className="text-base sm:text-lg font-sans text-neutral-300 font-light leading-relaxed">
                  Day Zero OS approaches the problem from the opposite direction: the operating environment should adapt to the user's workflow.
                </p>
              </div>

              {/* Visual Callout Statement */}
              <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0B0B0B] relative overflow-hidden">
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-white" />
                <div className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-white tracking-tight leading-snug">
                  Not just another tool.<br />
                  <span className="text-neutral-400 font-light">A workspace that works the way you do.</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Thin Horizontal Divider */}
        <div className="w-full border-t border-white/[0.08]" />

        {/* ========================================================================= */}
        {/* 4. ENGINEER OS — CURRENT V1 SHOWCASE */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left: Large Engineer OS Dashboard Visual */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-2xl border border-white/15 bg-[#090909] p-5 sm:p-6 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95)]">
                {/* Window Bar */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    </div>
                    <span className="text-[10px] font-mono text-white/50 tracking-wider ml-2">DAY ZERO // ENGINEER OS</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    CURRENT V1
                  </span>
                </div>

                {/* Workspace Content Simulation */}
                <div className="space-y-4">
                  {/* Header Profile Banner */}
                  <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">MISSION CONTROL</div>
                      <div className="text-base font-display font-bold text-white mt-0.5">Engineering Workspace</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-emerald-400 font-bold">100% OPERATIONAL</div>
                      <div className="text-[9px] font-mono text-neutral-500">Supabase RLS Active</div>
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] text-center">
                      <div className="text-[9px] font-mono text-neutral-500 uppercase">Active Projects</div>
                      <div className="text-lg font-display font-bold text-white mt-1">4</div>
                    </div>
                    <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] text-center">
                      <div className="text-[9px] font-mono text-neutral-500 uppercase">Open Tasks</div>
                      <div className="text-lg font-display font-bold text-white mt-1">12</div>
                    </div>
                    <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] text-center">
                      <div className="text-[9px] font-mono text-neutral-500 uppercase">In Progress</div>
                      <div className="text-lg font-display font-bold text-white mt-1">3</div>
                    </div>
                  </div>

                  {/* Projects Table Preview */}
                  <div className="rounded-xl bg-black/40 border border-white/[0.06] p-3 space-y-2 text-xs">
                    <div className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider pb-1 border-b border-white/[0.04]">
                      Recent Engineering Workspaces
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="text-neutral-200 font-medium">Aurora</span>
                        <span className="text-[9px] font-mono text-neutral-500">Web Application</span>
                      </div>
                      <div className="text-[9px] font-mono text-neutral-400">77% complete</div>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                      <div className="flex items-center gap-2">
                        <Database className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="text-neutral-200 font-medium">Nebula</span>
                        <span className="text-[9px] font-mono text-neutral-500">Backend System</span>
                      </div>
                      <div className="text-[9px] font-mono text-neutral-400">45% complete</div>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="text-neutral-200 font-medium">Orion</span>
                        <span className="text-[9px] font-mono text-neutral-500">Mobile Client</span>
                      </div>
                      <div className="text-[9px] font-mono text-neutral-400">20% complete</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Product Description & 8 Features List */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
                — CURRENT V1
              </div>

              <h2 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-white">
                Engineer OS
              </h2>

              <p className="text-base sm:text-lg font-sans text-neutral-400 font-light leading-relaxed">
                The first Day Zero OS experience, designed for engineers and builders who need a central environment to organize projects and the information surrounding them.
              </p>

              <div className="text-xs font-mono tracking-widest text-white/50 uppercase pt-2">
                Key Features
              </div>

              {/* Clean Feature List with Minimal Line Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-[#0A0A0A]">
                  <Terminal className="w-4 h-4 text-white/70 shrink-0" />
                  <span className="text-xs font-mono text-neutral-300">Mission Control</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-[#0A0A0A]">
                  <FolderGit2 className="w-4 h-4 text-white/70 shrink-0" />
                  <span className="text-xs font-mono text-neutral-300">Projects</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-[#0A0A0A]">
                  <AppWindow className="w-4 h-4 text-white/70 shrink-0" />
                  <span className="text-xs font-mono text-neutral-300">Project Workspace</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-[#0A0A0A]">
                  <CheckSquare className="w-4 h-4 text-white/70 shrink-0" />
                  <span className="text-xs font-mono text-neutral-300">Tasks & Planning</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-[#0A0A0A]">
                  <BookOpen className="w-4 h-4 text-white/70 shrink-0" />
                  <span className="text-xs font-mono text-neutral-300">Knowledge</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-[#0A0A0A]">
                  <Box className="w-4 h-4 text-white/70 shrink-0" />
                  <span className="text-xs font-mono text-neutral-300">Assets</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-[#0A0A0A]">
                  <Feather className="w-4 h-4 text-white/70 shrink-0" />
                  <span className="text-xs font-mono text-neutral-300">Content Engine</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-[#0A0A0A]">
                  <Shield className="w-4 h-4 text-white/70 shrink-0" />
                  <span className="text-xs font-mono text-neutral-300">Workspace Management</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Thin Horizontal Divider */}
        <div className="w-full border-t border-white/[0.08]" />

        {/* ========================================================================= */}
        {/* 5. SECTOR-SPECIFIC OS VISION */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
                — THE BIGGER PICTURE
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Sector-Specific OS Vision
              </h2>
              <p className="text-sm sm:text-base font-sans text-neutral-400 font-light leading-relaxed">
                One platform. Multiple specialized OS experiences for different ways of working.
              </p>
            </div>

            {/* Right Column: Premium Grid of Cards */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">

                {/* Card 1: Engineer OS */}
                <div className="p-4 rounded-xl border border-white/25 bg-[#101010] space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                      <Terminal className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      V1 ACTIVE
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-white">Engineer OS</h3>
                    <div className="text-[10px] font-mono text-white/50">Engineers / builders</div>
                  </div>
                  <p className="text-xs font-sans text-neutral-400 font-light leading-relaxed">
                    Build, organize, collaborate and ship.
                  </p>
                </div>

                {/* Card 2: Student OS */}
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0A0A0A] space-y-3">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-white/60" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-white">Student OS</h3>
                    <div className="text-[10px] font-mono text-white/40">Students</div>
                  </div>
                  <p className="text-xs font-sans text-neutral-400 font-light leading-relaxed">
                    Organize academic work, subjects, study activities and student workflows.
                  </p>
                </div>

                {/* Card 3: Creator OS */}
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0A0A0A] space-y-3">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                    <Palette className="w-4 h-4 text-white/60" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-white">Creator OS</h3>
                    <div className="text-[10px] font-mono text-white/40">Creators</div>
                  </div>
                  <p className="text-xs font-sans text-neutral-400 font-light leading-relaxed">
                    Organize ideas, content, assets and publishing workflows.
                  </p>
                </div>

                {/* Card 4: Teacher OS */}
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0A0A0A] space-y-3">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white/60" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-white">Teacher OS</h3>
                    <div className="text-[10px] font-mono text-white/40">Teachers / educators</div>
                  </div>
                  <p className="text-xs font-sans text-neutral-400 font-light leading-relaxed">
                    Organize teaching, courses, students and educational workflows.
                  </p>
                </div>

                {/* Card 5: Freelancer OS */}
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0A0A0A] space-y-3">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white/60" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-white">Freelancer OS</h3>
                    <div className="text-[10px] font-mono text-white/40">Freelancers</div>
                  </div>
                  <p className="text-xs font-sans text-neutral-400 font-light leading-relaxed">
                    Organize clients, projects, tasks, resources and delivery.
                  </p>
                </div>

                {/* Card 6: Startup OS */}
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#0A0A0A] space-y-3">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                    <Rocket className="w-4 h-4 text-white/60" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-white">Startup OS</h3>
                    <div className="text-[10px] font-mono text-white/40">Startup teams</div>
                  </div>
                  <p className="text-xs font-sans text-neutral-400 font-light leading-relaxed">
                    Organize company work, execution, projects and collaboration.
                  </p>
                </div>

                {/* Card 7: And more... */}
                <div className="p-4 rounded-xl border border-dashed border-white/15 bg-transparent space-y-3 sm:col-span-2 flex flex-col justify-center">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                    <MoreHorizontal className="w-4 h-4 text-white/50" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-white">And more...</h3>
                    <div className="text-[10px] font-mono text-white/40">Platform Vision</div>
                  </div>
                  <p className="text-xs font-sans text-neutral-400 font-light leading-relaxed">
                    More specialized sector experiences coming.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Thin Horizontal Divider */}
        <div className="w-full border-t border-white/[0.08]" />

        {/* ========================================================================= */}
        {/* 6. HOW IT WORKS / TECHNICAL ARCHITECTURE */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-24 md:py-32">
          <div className="space-y-12">

            {/* Header */}
            <div className="max-w-3xl space-y-4">
              <div className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
                — HOW IT WORKS
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Simple. Secure. Scalable.
              </h2>
              <p className="text-sm sm:text-base font-sans text-neutral-400 font-light leading-relaxed">
                Day Zero OS is built with a modern, scalable architecture using React, TypeScript and Supabase. Authentication, database access and row-level security ensure workspace data remains protected and accessible only within the appropriate workspace context.
              </p>
            </div>

            {/* Horizontal Technical Architecture Diagram */}
            <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0B0B0B] space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center text-center">

                {/* 1: User */}
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#070707] space-y-2 flex flex-col items-center justify-center">
                  <User className="w-5 h-5 text-white/70" />
                  <div className="text-xs font-mono font-bold text-white uppercase">User</div>
                  <div className="text-[9px] font-mono text-white/40">Client Session</div>
                </div>

                {/* 2: React UI */}
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#070707] space-y-2 flex flex-col items-center justify-center">
                  <Atom className="w-5 h-5 text-white/70" />
                  <div className="text-xs font-mono font-bold text-white uppercase">React UI</div>
                  <div className="text-[9px] font-mono text-white/40">Vite + TypeScript</div>
                </div>

                {/* 3: Feature / Service Layer */}
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#070707] space-y-2 flex flex-col items-center justify-center">
                  <Layers className="w-5 h-5 text-white/70" />
                  <div className="text-xs font-mono font-bold text-white uppercase truncate">Service Layer</div>
                  <div className="text-[9px] font-mono text-white/40">Domain Hooks</div>
                </div>

                {/* 4: Supabase */}
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#070707] space-y-2 flex flex-col items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <div className="text-xs font-mono font-bold text-white uppercase">Supabase</div>
                  <div className="text-[9px] font-mono text-white/40">Auth + Gateways</div>
                </div>

                {/* 5: PostgreSQL */}
                <div className="p-4 rounded-xl border border-white/[0.08] bg-[#070707] space-y-2 flex flex-col items-center justify-center">
                  <Database className="w-5 h-5 text-white/70" />
                  <div className="text-xs font-mono font-bold text-white uppercase">PostgreSQL</div>
                  <div className="text-[9px] font-mono text-white/40">RLS Enforced</div>
                </div>

              </div>

              {/* Architecture Micro-Tags */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-mono text-neutral-400">
                <span className="px-3 py-1 rounded-full border border-white/10 bg-[#080808]">Authentication</span>
                <span className="px-3 py-1 rounded-full border border-white/10 bg-[#080808]">RLS</span>
                <span className="px-3 py-1 rounded-full border border-white/10 bg-[#080808]">Workspace Membership</span>
                <span className="px-3 py-1 rounded-full border border-white/10 bg-[#080808]">PWA</span>
                <span className="px-3 py-1 rounded-full border border-white/10 bg-[#080808]">Capacitor</span>
                <span className="px-3 py-1 rounded-full border border-white/10 bg-[#080808]">Tauri</span>
              </div>

              {/* Security Positioning Statement */}
              <div className="text-xs font-mono text-center text-neutral-400 border-t border-white/[0.08] pt-4">
                Access control is enforced at the database layer, not only by hiding controls in the frontend.
              </div>
            </div>

          </div>
        </section>

        {/* Thin Horizontal Divider */}
        <div className="w-full border-t border-white/[0.08]" />

        {/* ========================================================================= */}
        {/* 7. CROSS-PLATFORM */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
                — CROSS-PLATFORM
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Available On
              </h2>
              <p className="text-sm sm:text-base font-sans text-neutral-400 font-light leading-relaxed">
                Access Day Zero OS on the platform that works for you.
              </p>
            </div>

            {/* Right Column: 4 Platform Cards */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {/* Web */}
                <div className="p-4 rounded-xl border border-white/10 bg-[#0B0B0B] space-y-2 flex flex-col items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                  <div>
                    <div className="text-xs font-display font-bold text-white">Web</div>
                    <div className="text-[10px] font-mono text-white/40 mt-0.5">(Chrome, Firefox, Safari, Edge)</div>
                  </div>
                </div>

                {/* PWA */}
                <div className="p-4 rounded-xl border border-white/10 bg-[#0B0B0B] space-y-2 flex flex-col items-center justify-center">
                  <AppWindow className="w-5 h-5 text-white" />
                  <div>
                    <div className="text-xs font-display font-bold text-white">PWA</div>
                    <div className="text-[10px] font-mono text-white/40 mt-0.5">(Installable Web App)</div>
                  </div>
                </div>

                {/* Android / iOS */}
                <div className="p-4 rounded-xl border border-white/10 bg-[#0B0B0B] space-y-2 flex flex-col items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                  <div>
                    <div className="text-xs font-display font-bold text-white">Android / iOS</div>
                    <div className="text-[10px] font-mono text-white/40 mt-0.5">(via Capacitor)</div>
                  </div>
                </div>

                {/* Desktop */}
                <div className="p-4 rounded-xl border border-white/10 bg-[#0B0B0B] space-y-2 flex flex-col items-center justify-center">
                  <Monitor className="w-5 h-5 text-white" />
                  <div>
                    <div className="text-xs font-display font-bold text-white">Desktop</div>
                    <div className="text-[10px] font-mono text-white/40 mt-0.5">(via Tauri)</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* BOTTOM RETURN TO ARCHIVE FOOTER */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8">
          <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0A0A0A] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <div className="text-xs font-mono text-white/40 uppercase tracking-widest">
                EXPLORE MORE EXPERIMENTS & BUILDS
              </div>
              <div className="text-lg font-display font-bold text-white">
                Ready to return to the product archive?
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-neutral-200 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.18)] shrink-0"
            >
              ← Back to Product Archive
            </button>
          </div>
        </section>

      </main>

    </div>
  );
}
