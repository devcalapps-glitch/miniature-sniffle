
'use client';
import React, { use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare, 
  User, 
  Clock, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

// Mock data for the detail view
const TICKET_DATA: Record<string, any> = {
  'T-101': {
    title: 'Payment Gateway API',
    budget: '$200',
    testers: '2/5',
    status: 'Testing',
    priority: 'High',
    url: 'https://beta.novapay.app',
    description: 'We need a comprehensive audit of the new Payment Gateway API. Specifically, focus on the edge cases for currency conversion and timeout handling during high-load simulations.',
    bugs: [
      { id: 'B-1', title: 'Race condition on double-click checkout', severity: 'Critical', tester: 'Mike R.', date: '2h ago' },
      { id: 'B-2', title: 'Incorrect rounding on JPY conversion', severity: 'Medium', tester: 'Sarah L.', date: '5h ago' },
    ],
    activity: [
      { user: 'Mike R.', msg: 'Found a critical race condition in the checkout flow. See attached logs.', time: '2h ago' },
      { user: 'Sarah L.', msg: 'Currency conversion for JPY is off by 1 yen in some cases.', time: '5h ago' },
      { user: 'System', msg: 'Tester Mike R. joined the project.', time: '1d ago' },
    ]
  },
  'T-102': {
    title: 'User Auth Module',
    budget: '$100',
    testers: '5/5',
    status: 'Completed',
    priority: 'Medium',
    url: 'https://beta.novapay.app/auth',
    description: 'Verify the OAuth2 flow and JWT token expiration logic. Ensure that session persistence works across different browser tabs.',
    bugs: [],
    activity: [
      { user: 'Alex K.', msg: 'All test cases passed. No major issues found.', time: '3d ago' },
      { user: 'System', msg: 'All testers have completed the assignment.', time: '3d ago' },
    ]
  },
  'T-103': {
    title: 'KYC Flow Audit',
    budget: '$150',
    testers: '0/3',
    status: 'Submitted',
    priority: 'Low',
    url: 'https://beta.novapay.app/kyc',
    description: 'User experience audit for the KYC upload process. Check for friction points in the document upload and verification wait screen.',
    bugs: [],
    activity: [
      { user: 'System', msg: 'Ticket created and listed in marketplace.', time: '1h ago' },
    ]
  },
  'T-104': {
    title: 'Mobile Responsive Fix',
    budget: '$80',
    testers: '1/2',
    status: 'Review',
    priority: 'High',
    url: 'https://beta.novapay.app/mobile',
    description: 'Fix CSS overflow issues on iPhone 13 and Samsung S22. The main navigation menu is partially hidden in landscape mode.',
    bugs: [
      { id: 'B-3', title: 'Navbar hidden in landscape', severity: 'High', tester: 'Jenna W.', date: '12h ago' },
      { id: 'B-4', title: 'Footer overlapping content', severity: 'Medium', tester: 'Jenna W.', date: '15h ago' },
      { id: 'B-5', title: 'Input field not focusing', severity: 'Low', tester: 'Jenna W.', date: '18h ago' },
      { id: 'B-6', title: 'Slow load on 3G connection', severity: 'Low', tester: 'Jenna W.', date: '20h ago' },
      { id: 'B-7', title: 'Back button crashes app', severity: 'Critical', tester: 'Jenna W.', date: '22h ago' },
    ],
    activity: [
      { user: 'Jenna W.', msg: 'The app crashes when using the system back button on Android.', time: '22h ago' },
      { user: 'Jenna W.', msg: 'Found several layout issues in landscape mode.', time: '20h ago' },
    ]
  },
};

export default function TicketDetail({ params }: { params: Promise<{ ticketId: string }> }) {
  const resolvedParams = use(params);
  const ticketId = resolvedParams.ticketId;
  const ticket = TICKET_DATA[ticketId] || TICKET_DATA['T-101']; // Fallback to T-101
  const router = useRouter();

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
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{ticketId}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              ticket.priority === 'High' ? 'bg-red-500/10 text-red-400' : 
              ticket.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-zinc-800 text-zinc-400'
            }`}>
              {ticket.priority} Priority
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">{ticket.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ShieldCheck size={20} className="text-cyan-500" /> Project Overview
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              {ticket.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={ticket.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium transition-all">
                <ExternalLink size={14} /> Open Application
              </a>
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-500">
                <Clock size={14} /> Created 2 days ago
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/80 flex justify-between items-center">
              <h2 className="font-bold text-zinc-300 flex items-center gap-2">
                <AlertCircle size={18} className="text-red-400" /> Found Bugs
              </h2>
              <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">{ticket.bugs.length} Reported</span>
            </div>
            <div className="divide-y divide-zinc-800">
              {ticket.bugs.length > 0 ? ticket.bugs.map((bug, i) => (
                <div key={i} className="p-6 hover:bg-white/[0.02] transition-colors flex items-start gap-4">
                  <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                    bug.severity === 'Critical' ? 'bg-red-500' : bug.severity === 'High' ? 'bg-orange-500' : 'bg-amber-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-zinc-200">{bug.title}</h3>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">{bug.severity}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      <span className="flex items-center gap-1"><User size={12} /> {bug.tester}</span>
                      <span>•</span>
                      <span>{bug.date}</span>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="p-12 text-center">
                  <CheckCircle2 size={40} className="mx-auto text-emerald-500 mb-4" />
                  <p className="text-zinc-400">No bugs reported yet. Your app is looking clean!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl sticky top-24">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <User size={20} className="text-cyan-500" /> Status & Team
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Current Status</span>
                <span className="text-cyan-400 font-bold">{ticket.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Testers Assigned</span>
                <span className="text-zinc-300 font-mono">{ticket.testers}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Escrow Budget</span>
                <span className="text-zinc-300 font-mono">{ticket.budget}</span>
              </div>
            </div>

            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MessageSquare size={20} className="text-cyan-500" /> Activity Feed
            </h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {ticket.activity.map((act, i) => (
                <div key={i} className="p-3 bg-black/30 border border-zinc-800 rounded-2xl">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-zinc-300">{act.user}</span>
                    <span className="text-[10px] text-zinc-600">{act.time}</span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">{act.msg}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <button className="w-full py-3 bg-white text-black rounded-2xl font-bold hover:bg-zinc-200 transition-all">
                Mark as Reviewed
              </button>
              <button className="w-full py-3 bg-zinc-800 text-white rounded-2xl font-bold hover:bg-zinc-700 transition-all border border-zinc-700">
                Message Testers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
