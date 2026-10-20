
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bug, CheckCircle2, Clock, DollarSign, MessageSquare } from 'lucide-react';

export default function TesterWorkPage() {
  const router = useRouter();

  const projects = [
    { id: 'T-101', name: 'PaymentGateway v2', payout: '$25.00', progress: 60, status: 'Active', bugsFound: 2, comments: 5, deadline: '48h left' },
    { id: 'T-102', name: 'UserAuth Module', payout: '$25.00', progress: 100, status: 'Review', bugsFound: 0, comments: 12, deadline: 'Completed' },
    { id: 'T-104', name: 'Mobile Responsive Fix', payout: '$50.00', progress: 20, status: 'Active', bugsFound: 1, comments: 3, deadline: '120h left' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()} 
          className="p-2 hover:bg-zinc-900 rounded-xl text-zinc-500 hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Assignments</h1>
          <p className="text-zinc-500">Manage and report bugs for your active projects.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((p, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-emerald-500/50 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-emerald-500">
                <Bug size={28} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-zinc-200">{p.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-cyan-500/10 text-cyan-400'
                  }`}>{p.status}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><Clock size={12} /> {p.deadline}</span>
                  <span className="flex items-center gap-1"><MessageSquare size={12} /> {p.comments} logs</span>
                  <span className="flex items-center gap-1 text-emerald-400"><DollarSign size={12} /> {p.payout} payout</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex-1 md:w-48 space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-zinc-500">
                  <span>Progress</span>
                  <span>{p.progress}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all" style={{ width: `${p.progress}%` }}></div>
                </div>
              </div>
              <button className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-all whitespace-nowrap">
                Open Project
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
