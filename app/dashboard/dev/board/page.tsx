
'use client';
import React from 'react';
import Link from 'next/link';
import { MoreHorizontal, User, MessageSquare, AlertCircle } from 'lucide-react';

export default function TicketBoard() {
  const columns = [
    { id: 'submitted', title: 'Submitted', color: 'bg-zinc-700' },
    { id: 'testing', title: 'Testing', color: 'bg-cyan-600' },
    { id: 'review', title: 'Review', color: 'bg-amber-600' },
    { id: 'completed', title: 'Completed', color: 'bg-emerald-600' },
  ];

  const tickets = [
    { id: 'T-101', title: 'Payment Gateway API', budget: '$200', testers: '2/5', status: 'testing', priority: 'High', comments: 4, bugs: 2 },
    { id: 'T-102', title: 'User Auth Module', budget: '$100', testers: '5/5', status: 'completed', priority: 'Medium', comments: 12, bugs: 0 },
    { id: 'T-103', title: 'KYC Flow Audit', budget: '$150', testers: '0/3', status: 'submitted', priority: 'Low', comments: 1, bugs: 0 },
    { id: 'T-104', title: 'Mobile Responsive Fix', budget: '$80', testers: '1/2', status: 'review', priority: 'High', comments: 8, bugs: 5 },
  ];

  return (
    <div className="max-w-full mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">Ticket Work Board</h1>
          <p className="text-zinc-500">Track the real-time progress of your application testing.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-400">
            <div className="w-2 h-2 rounded-full bg-cyan-500"></div> Active Tests
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-400">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Finished
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((col) => (
          <div key={col.id} className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${col.color}`}></span>
                <h2 className="font-bold text-zinc-300 text-sm uppercase tracking-widest">{col.title}</h2>
                <span className="text-xs text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded-full">
                  {tickets.filter(t => t.status === col.id).length}
                </span>
              </div>
              <MoreHorizontal size={16} className="text-zinc-600 cursor-pointer hover:text-zinc-400" />
            </div>

            <div className="flex-1 space-y-4 min-h-[500px] bg-zinc-900/30 p-3 rounded-2xl border border-zinc-800/50">
              {tickets.filter(t => t.status === col.id).map((ticket) => (
                <Link 
                  href={`/dashboard/dev/board/${ticket.id}`} 
                  key={ticket.id} 
                  className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg hover:border-zinc-600 transition-all cursor-pointer group block"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">{ticket.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      ticket.priority === 'High' ? 'bg-red-500/10 text-red-400' : 
                      ticket.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-zinc-200 mb-4 group-hover:text-cyan-400 transition-colors leading-snug">
                    {ticket.title}
                  </h3>

                  <div className="flex items-center gap-3 mb-4 text-zinc-500 text-xs">
                    <div className="flex items-center gap-1">
                      <User size={12} /> {ticket.testers}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={12} /> {ticket.comments}
                    </div>
                    {ticket.bugs > 0 && (
                      <div className="flex items-center gap-1 text-red-400">
                        <AlertCircle size={12} /> {ticket.bugs} Bugs
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex justify-between items-center">
                    <span className="text-xs font-mono text-zinc-500">{ticket.budget}</span>
                    <div className="flex -space-x-2">
                      {[1, 2].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-[8px] font-bold text-zinc-400">
                          U{i}
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
              
              <button className="w-full py-3 border-2 border-dashed border-zinc-800 rounded-2xl text-zinc-600 text-xs font-medium hover:border-zinc-700 hover:text-zinc-500 transition-all">
                + Add Ticket
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
