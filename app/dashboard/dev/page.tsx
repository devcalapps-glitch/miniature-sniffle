
'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Ticket, DollarSign, Bug } from 'lucide-react';

export default function DevDashboard() {
  const { data: session } = useSession();
  const [budget, setBudget] = useState(5);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">Welcome back, {session?.user?.name}</h1>
          <p className="text-zinc-500">Here is what's happening with your projects.</p>
        </div>
        <Link href="/dashboard/dev/submit" className="bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20">
          + New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Active Tickets', value: '2', color: 'text-cyan-400', icon: <Ticket size={24} /> },
          { label: 'Total Spent', value: '$300.00', color: 'text-white', icon: <DollarSign size={24} /> },
          { label: 'Bugs Found', value: '14', color: 'text-emerald-400', icon: <Bug size={24} /> },
        ].map((kpi, i) => (
          <div key={i} className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-zinc-800 rounded-lg text-zinc-300">
                {kpi.icon}
              </div>
            </div>
            <div className="text-sm text-zinc-500 font-medium">{kpi.label}</div>
            <div className={`text-3xl font-black ${kpi.color}`}>{kpi.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-sm">
            <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/80 flex justify-between items-center">
              <h2 className="font-bold text-zinc-300">Your Projects</h2>
              <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">2 Tickets</span>
            </div>
            <table className="w-full text-left border-collapse">
              <thead className="text-zinc-500 text-[11px] uppercase tracking-widest font-bold border-b border-zinc-800">
                <tr>
                  <th className="p-6">Project</th>
                  <th className="p-6">Budget</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {[
                  { name: 'PaymentGateway v2', budget: '$200', status: 'Testing', color: 'text-cyan-400', bg: 'bg-cyan-500/10', id: 'T-101' },
                  { name: 'UserAuth Module', budget: '$100', status: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-500/10', id: 'T-102' },
                ].map((p, i) => (
                  <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 font-semibold text-zinc-200">{p.name}</td>
                    <td className="p-6 text-zinc-400">{p.budget}</td>
                    <td className="p-6">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${p.bg} ${p.color}`}>{p.status}</span>
                    </td>
                    <td className="p-6 text-right">
                      <Link 
                        href={`/dashboard/dev/board/${p.id}`} 
                        className="text-sm text-zinc-500 group-hover:text-cyan-400 transition-colors font-medium"
                      >
                        Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-6">Recent Activity Logs</h2>
            <div className="space-y-6">
              {[
                { time: '2h ago', msg: 'Tester Mike R. found a Critical bug in PaymentGateway v2', type: 'bug' },
                { time: '5h ago', msg: 'New tester joined Project UserAuth Module', type: 'user' },
                { time: '1d ago', msg: 'Payout of $80 released for UserAuth Module', type: 'money' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 items-start p-3 rounded-xl hover:bg-zinc-800/50 transition-all">
                  <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${log.type === 'bug' ? 'bg-red-500' : log.type === 'money' ? 'bg-emerald-500' : 'bg-cyan-500'}`} />
                  <div className="flex-1">
                    <p className="text-sm text-zinc-300">{log.msg}</p>
                    <span className="text-[10px] text-zinc-600 uppercase font-bold">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl sticky top-24">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
              Budget Planner
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Testers Required</label>
                <div className="relative">
                  <input 
                    type="number" 
                    min="1"
                    value={budget} 
                    onChange={(e) => setBudget(Math.max(1, parseInt(e.target.value || '0')))}
                    className="w-full p-4 bg-black border border-zinc-700 rounded-2xl text-white focus:border-cyan-500 outline-none transition-all font-mono text-lg"
                  />
                </div>
              </div>
              <div className="p-5 bg-black/50 rounded-2xl border border-zinc-800 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Tester Payout (x{budget})</span>
                  <span className="text-zinc-300 font-mono">${(budget * 5).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Platform Fee (x{budget})</span>
                  <span className="text-zinc-300 font-mono">${(budget * 1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                  <span className="text-sm font-bold text-zinc-400">Total Cost</span>
                  <span className="text-2xl font-black text-cyan-400 font-mono">${(budget * 6).toFixed(2)}</span>
                </div>
              </div>
              <Link 
                href="/dashboard/dev/submit"
                className="block w-full text-center bg-white text-black py-4 rounded-2xl font-bold hover:bg-zinc-200 transition-all shadow-lg shadow-white/5"
              >
                Confirm & Pay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
