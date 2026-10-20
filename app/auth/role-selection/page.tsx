
'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RoleSelection() {
  const { data: session } = useSession();
  const router = useRouter();

  const selectRole = async (role: 'DEV' | 'TESTER') => {
    // API call to update user role in DB
    await fetch('/api/user/set-role', {
      method: 'POST',
      body: JSON.stringify({ role }),
    });
    
    if (role === 'DEV') router.push('/dashboard/dev');
    else router.push('/dashboard/tester');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome, {session?.user?.name}!</h2>
        <p className="text-zinc-400 mb-8">To get started, tell us how you want to use the platform.</p>
        <div className="grid grid-cols-1 gap-4">
          <button onClick={() => selectRole('DEV')} className="p-6 border border-zinc-800 rounded-xl hover:border-indigo-500 text-left group">
            <div className="font-bold text-lg group-hover:text-indigo-400">I'm a Developer</div>
            <div className="text-zinc-500 text-sm">I want to find testers for my application.</div>
          </button>
          <button onClick={() => selectRole('TESTER')} className="p-6 border border-zinc-800 rounded-xl hover:border-indigo-500 text-left group">
            <div className="font-bold text-lg group-hover:text-indigo-400">I'm a Tester</div>
            <div className="text-zinc-500 text-sm">I want to find apps to test and earn money.</div>
          </button>
        </div>
      </div>
    </div>
  );
}
