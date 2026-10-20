
'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Wallet, Clock, CheckCircle, TrendingUp, ArrowRight, Bug, Store, Briefcase, HelpCircle } from 'lucide-react';

export default function TesterDashboard() {
  const { data: session } = useSession();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">Hello, {session?.user?.name} 👋</h1>
          <p className="text-zinc-500">Ready to find some bugs today?</p>
        </div>
        <Link href="/marketplace" className="bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2">
          Find New Work <ArrowRight size={18} />
        </Link>
      </div>

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Total Earnings', value: '$1,240.00', color: 'text-emerald-400', icon: <Wallet size={24} /> },
          { label: 'Active Tasks', value: '3', color: 'text-white', icon: <Clock size={24} /> },
          { label: 'Bugs Reported', value: '42', color: 'text-cyan-400', icon: <Bug size={24} /> },
        ].map((kpi, i) => (
          <div key={i} className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              {React.cloneElement(kpi.icon, { size: 64 })}
            </div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-zinc-800 rounded-lg text-zinc-300">{kpi.icon}</div>
            </div>
            <div className="text-sm text-zinc-500 font-medium">{kpi.label}</div>
            <div className={`text-3xl font-black ${kpi.color}`}>{kpi.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Assignments */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-sm">
            <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/80 flex justify-between items-center">
              <h2 className="font-bold text-zinc-300">Current Assignments</h2>
              <Link href="/dashboard/tester/work" className="text-xs text-emerald-400 hover:underline font-medium">View All →</Link>
            </div>
            <div className="divide-y divide-zinc-800">
              {[
                { name: 'PaymentGateway v2', status: 'Active', payout: '$25.00', progress: 60, deadline: '2 days left' },
                { name: 'UserAuth Module', status: 'Review', payout: '$25.00', progress: 100, deadline: 'Completed' },
                { name: 'NovaPay Mobile App', status: 'Active', payout: '$50.00', progress: 20, deadline: '5 days left' },
              ].map((work, i) => (
                <div key={i} className="p-6 hover:bg-white/[0.02] transition-colors flex items-center justify-between group">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-zinc-200">{work.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        work.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-cyan-500/10 text-cyan-400'
                      }`}>{work.status}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className={`h-full bg-emerald-500 transition-all`} style={{ width: `${work.progress}%` }}></div>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-medium">{work.progress}% Complete</span>
                      <span className="text-[10px] text-zinc-600">• {work.deadline}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 ml-8">
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-400">{work.payout}</div>
                      <div className="text-[10px] text-zinc-500 uppercase">Earnings</div>
                    </div>
                    <Link href={`/dashboard/tester/work/${work.name}`} className="p-2 bg-zinc-800 rounded-xl text-zinc-400 group-hover:text-white transition-colors">
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Earning Trend */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <TrendingUp size={20} className="text-emerald-500" /> Earnings Trend
              </h2>
              <span className="text-xs text-zinc-500">Last 30 Days</span>
            </div>
            <div className="flex items-end justify-between h-32 gap-2">
              {[40, 70, 45, 90, 65, 80, 30, 50, 85, 100, 60, 40, 75, 50, 95, 60, 40, 80, 30, 60, 70, 50, 80, 40, 60, 90, 50, 70, 80, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/40 transition-all rounded-t-sm" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Quick Links */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl sticky top-24">
            <h2 className="text-lg font-bold mb-6">Quick Access</h2>
            <div className="space-y-3">
              <Link href="/marketplace" className="flex items-center justify-between p-4 bg-black/30 border border-zinc-800 rounded-2xl hover:border-emerald-500 transition-all group">
                <div className="flex items-center gap-3">
                  <Store size={18} className="text-emerald-500" />
                  <span className="text-sm font-medium text-zinc-300">Open Marketplace</span>
                </div>
                <ArrowRight size={14} className="text-zinc-600 group-hover:text-emerald-400 transition-colors" />
              </Link>
              <Link href="/dashboard/tester/work" className="flex items-center justify-between p-4 bg-black/30 border border-zinc-800 rounded-2xl hover:border-emerald-500 transition-all group">
                <div className="flex items-center gap-3">
                  <Briefcase size={18} className="text-emerald-500" />
                  <span className="text-sm font-medium text-zinc-300">My Assignments</span>
                </div>
                <ArrowRight size={14} className="text-zinc-600 group-hover:text-emerald-400 transition-colors" />
              </Link>
              <Link href="/how-it-works" className="flex items-center justify-between p-4 bg-black/30 border border-zinc-800 rounded-2xl hover:border-emerald-500 transition-all group">
                <div className="flex items-center gap-3">
                  <HelpCircle size={18} className="text-emerald-500" />
                  <span className="text-sm font-medium text-zinc-300">Payment Guide</span>
                </div>
                <ArrowRight size={14} className="text-zinc-600 group-hover:text-emerald-400 transition-colors" />
              </Link>
            </div>

            <div className="mt-8 p-4 bg-emerald-600/10 border border-emerald-500/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-sm">
                <CheckCircle size={16} /> Pro Tip
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Find high-priority bugs in the Marketplace to earn bonus payouts and increase your tester rank.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
