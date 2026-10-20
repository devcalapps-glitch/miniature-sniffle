
'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';
import { Zap } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white group-hover:bg-indigo-500 transition-colors">P</div>
            <span className="font-bold tracking-tighter text-lg">pleaseTestMyApp</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/for-developers" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">For Developers</Link>
            <Link href="/for-testers" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">For Testers</Link>
            <Link href="/marketplace" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Marketplace</Link>
            <Link href="/how-it-works" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">How it Works</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-zinc-500">Welcome, {session.user?.name}</span>
              <button 
                onClick={() => signOut()} 
                className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold hover:bg-zinc-800 transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/auth/signin" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold transition-all">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
