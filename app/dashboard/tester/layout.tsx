
'use client';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Briefcase, Store, HelpCircle, LogOut, Menu, X } from 'lucide-react';

export default function TesterDashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (status === 'loading') {
    return <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">Loading...</div>;
  }

  if (status !== 'authenticated') {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">Access Restricted</h1>
          <p className="text-zinc-500 mb-8">Please sign in to access your tester dashboard.</p>
          <button onClick={() => router.push('/auth/signin')} className="bg-emerald-600 px-8 py-3 rounded-xl font-bold">Sign In</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 border-r border-zinc-800 bg-zinc-900/90 backdrop-blur-xl transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col
      `}>
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-black text-white">T</div>
            <span className="text-lg font-bold tracking-tight">TesterHub</span>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="lg:hidden p-2 text-zinc-400">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard/tester" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-600 text-white font-medium transition-all">
            <LayoutDashboard size={20} /> Overview
          </Link>
          <Link href="/dashboard/tester/work" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all">
            <Briefcase size={20} /> My Assignments
          </Link>
          <Link href="/marketplace" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all">
            <Store size={20} /> Find Work
          </Link>
          <Link href="/how-it-works" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all">
            <HelpCircle size={20} /> Help Center
          </Link>
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
            <div className="text-[10px] font-bold text-zinc-500 uppercase mb-2">Account</div>
            <div className="text-sm font-medium truncate">{session?.user?.name}</div>
            <button onClick={() => router.push('/api/auth/signout')} className="flex items-center gap-2 text-xs text-zinc-500 hover:text-red-400 mt-3 transition-colors">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-black text-white">T</div>
            <span className="font-bold tracking-tight">TesterHub</span>
          </div>
          <button onClick={() => setIsMenuOpen(true)} className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400">
            <Menu size={20} />
          </button>
        </header>
        <main className="p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
