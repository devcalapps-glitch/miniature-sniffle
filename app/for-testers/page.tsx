
'use client';
import React from 'react';
import Link from 'next/link';
import { Wallet, Zap, TrendingUp, CheckCircle2, ArrowRight, Award } from 'lucide-react';

export default function ForTesters() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-emerald-500/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Wallet size={12} /> Earn by Breaking Apps
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1]">
            Hunt Bugs. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">Get Paid.</span>
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Join a network of elite testers. Find critical bugs in the world's newest apps and earn a guaranteed flat rate for every slot.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signin" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
              Start Earning Now
            </Link>
            <Link href="/how-it-works" className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl font-bold text-lg transition-all">
              See How it Works
            </Link>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="py-24 px-6 bg-zinc-900/30 border-y border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why test with us?</h2>
            <p className="text-zinc-500 max-w-xl mx-auto">The most transparent marketplace for freelance testers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Guaranteed Payouts', desc: 'No more chasing payments. Funds are held in escrow and released upon verification.', icon: <Wallet size={32} className="text-emerald-500" /> },
              { title: 'Instant Matching', desc: 'Your profile matches you to apps that fit your hardware and expertise.', icon: <Zap size={32} className="text-emerald-500" /> },
              { title: 'Build Your Rank', desc: 'The more critical bugs you find, the higher your rank and the better the projects you get.', icon: <Award size={32} className="text-emerald-500" /> },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-zinc-950 border border-zinc-800 rounded-3xl hover:border-emerald-500/50 transition-all group">
                <div className="mb-6 p-3 bg-zinc-900 rounded-2xl w-fit group-hover:bg-emerald-500/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How You Earn</h2>
          <div className="space-y-12">
            {[
              { step: '01', title: 'Claim a Slot', desc: 'Browse the marketplace and apply for projects that match your device.' },
              { step: '02', title: 'Hunt for Bugs', desc: 'Test the app and submit detailed reports with screenshots and logs.' },
              { step: '03', title: 'Get Paid', desc: 'Once the developer verifies the bug, your payout is released instantly.' },
            ].map((step, i) => (
              <div key={i} className="flex gap-8 items-start p-6 rounded-3xl hover:bg-zinc-900 transition-all group">
                <div className="text-4xl font-black text-zinc-800 group-hover:text-emerald-500 transition-colors">{step.step}</div>
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
