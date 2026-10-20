
'use client';
import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Target, Rocket, CheckCircle2 } from 'lucide-react';

export default function ForDevelopers() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Zap size={12} /> Built for Modern Devs
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1]">
            Ship Faster. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Zero-Bug Releases.</span>
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Stop guessing if your app works. Get real-world testing from vetted experts across 50+ device combinations in hours, not weeks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signin" className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-cyan-500/20 active:scale-95">
              Start Testing Now
            </Link>
            <Link href="/how-it-works" className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl font-bold text-lg transition-all">
              How it Works
            </Link>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="py-24 px-6 bg-zinc-900/30 border-y border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to scale</h2>
            <p className="text-zinc-500 max-w-xl mx-auto">We handle the tester sourcing and escrow, you just get the bug reports.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Vetted Experts', desc: 'No amateurs. Only testers with a proven track record of finding critical edge cases.', icon: <ShieldCheck size={32} className="text-cyan-500" /> },
              { title: 'Device Diversity', desc: 'Testing across iOS, Android, Windows, and MacOS. No stone left unturned.', icon: <Target size={32} className="text-cyan-500" /> },
              { title: 'Fixed-Rate Pricing', desc: 'Transparent $6 per tester. No hidden fees, no surprises. Pure value.', icon: <Rocket size={32} className="text-cyan-500" /> },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-zinc-950 border border-zinc-800 rounded-3xl hover:border-cyan-500/50 transition-all group">
                <div className="mb-6 p-3 bg-zinc-900 rounded-2xl w-fit group-hover:bg-cyan-500/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">The Dev Workflow</h2>
          <div className="space-y-12">
            {[
              { step: '01', title: 'Submit Your App', desc: 'Define your goals, target devices, and the number of testers you need.' },
              { step: '02', title: 'Automatic Matching', desc: 'Our system matches your project with the best testers for your stack.' },
              { step: '03', title: 'Review & Verify', desc: 'Receive detailed bug reports. Verify them and release payouts.' },
            ].map((step, i) => (
              <div key={i} className="flex gap-8 items-start p-6 rounded-3xl hover:bg-zinc-900 transition-all group">
                <div className="text-4xl font-black text-zinc-800 group-hover:text-cyan-500 transition-colors">{step.step}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-zinc-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
