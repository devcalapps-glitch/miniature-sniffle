
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, AlertTriangle, Bug, CheckCircle } from 'lucide-react';

export default function TesterWorkspace({ params }: { params: Promise<{ projectId: string }> }) {
  const router = useRouter();
  
  // In a real app, we'd use a hook to fetch project details via API
  const project = {
    title: 'PaymentGateway v2',
    url: 'https://beta.novapay.app',
    desc: 'Testing new subscription flow in Safari. Focus on checkout latency.',
    payout: '$5.00'
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="p-2 hover:bg-zinc-900 rounded-xl text-zinc-500 transition-all">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-extrabold tracking-tight">Project Workspace</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                <p className="text-zinc-400">{project.desc}</p>
              </div>
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl border border-emerald-500/20">
                <CheckCircle size={24} />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-6 bg-black/40 border border-zinc-800 rounded-2xl">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-zinc-400">App URL:</span>
                <span className="text-sm font-mono text-zinc-200">{project.url}</span>
              </div>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold transition-all">
                Open App <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Your Bug Reports</h3>
              <Link 
                href={`/dashboard/tester/work/${params}/report`} 
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold transition-all flex items-center gap-2"
              >
                <Bug size={16} /> Report Bug
              </Link>
            </div>
            <div className="space-y-4">
              {/* Mock reports */}
              {[
                { title: 'Checkout Crash on iOS', severity: 'Critical', date: '1h ago', status: 'Open' },
                { title: 'Typo in Footer', severity: 'Minor', date: '5h ago', status: 'Fixed' },
              ].map((bug, i) => (
                <div key={i} className="p-4 bg-black/30 border border-zinc-800 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${bug.severity === 'Critical' ? 'bg-red-500' : 'bg-amber-500'}`} />
                    <span className="text-sm font-medium text-zinc-200">{bug.title}</span>
                    <span className="text-[10px] text-zinc-500">{bug.date}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${bug.status === 'Fixed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
                    {bug.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl sticky top-24">
            <h3 className="text-lg font-bold mb-4">Project Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Slot Payout</span>
                <span className="text-emerald-400 font-bold">{project.payout}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Requirement</span>
                <span className="text-zinc-300"> Safari / iOS 16+</span>
              </div>
            </div>
            <div className="mt-8 p-4 bg-zinc-800/50 rounded-2xl border border-zinc-800">
              <div className="flex items-center gap-2 mb-2 text-zinc-400 font-bold text-xs">
                <AlertTriangle size={14} /> Reporting Tip
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Always include a screenshot and clear steps to reproduce the bug to ensure faster verification and payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
