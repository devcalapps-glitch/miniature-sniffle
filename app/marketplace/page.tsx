
'use client';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Marketplace() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const openTickets = [
    { id: '1', title: 'PaymentGateway v2', current: 1, max: 3, stack: ['React', 'Stripe', 'Node'], desc: 'Testing new subscription flow in Safari. Focus on checkout latency.' },
    { id: '2', title: 'CryptoWallet App', current: 0, max: 2, stack: ['Web3.js', 'iOS', 'TypeScript'], desc: 'Edge-case testing for seed phrase recovery on legacy devices.' },
    { id: '3', title: 'SaaS Analytics Dash', current: 2, max: 5, stack: ['Next.js', 'D3.js', 'Chrome'], desc: 'Performance audit for large data sets and heavy SVG rendering.' },
    { id: '4', title: 'Auth Module', current: 0, max: 1, stack: ['OAuth2', 'Python', 'Security'], desc: 'Penetration testing for login flow and token expiration.' },
  ];

  if (status === 'loading') {
    return <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">Loading...</div>;
  }

  const handleApply = (projectId: string) => {
    if (status !== 'authenticated') {
      signIn({ callbackUrl: `/dashboard/tester/apply/${projectId}` });
      return;
    }
    router.push(`/dashboard/tester/apply/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tighter mb-4">Project Marketplace</h1>
            <p className="text-zinc-400 text-lg max-w-xl">
              Browse high-impact tickets. Find apps that match your technical expertise and claim your slot.
            </p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-6">
            <div className="text-right">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Live Listings</div>
              <div className="text-3xl font-black text-indigo-400">{openTickets.length} Open</div>
            </div>
            <div className="w-px h-8 bg-zinc-800" />
            <div className="text-right">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Available Slots</div>
              <div className="text-3xl font-black text-emerald-400">
                {openTickets.reduce((acc, t) => acc + (t.max - t.current), 0)}
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar (UI Only) */}
        <div className="flex gap-4 mb-12">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search by stack, keyword or app name..." 
              className="w-full p-4 pl-12 bg-zinc-900 border border-zinc-800 rounded-2xl text-white focus:border-indigo-500 outline-none transition-all"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">🔍</span>
          </div>
          <button className="px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all font-medium">
            Filters
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {openTickets.map((ticket) => (
            <div key={ticket.id} className="group relative p-8 bg-zinc-900 border border-zinc-800 rounded-3xl transition-all hover:border-indigo-500/50 hover:bg-zinc-900/80 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
                    {ticket.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ticket.stack.map(s => (
                      <span key={s} className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700 group-hover:border-indigo-500/30 transition-colors">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-zinc-400 text-base mb-8 leading-relaxed">
                {ticket.desc}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[...Array(ticket.current)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-zinc-700 border-2 border-zinc-900 flex items-center justify-center text-[10px] font-bold">T</div>
                    ))}
                    {ticket.current === 0 && <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-900" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-300">{ticket.current}/{ticket.max} slots</span>
                    <span className="text-[10px] text-zinc-500 uppercase">Filled</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleApply(ticket.id)}
                  className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
