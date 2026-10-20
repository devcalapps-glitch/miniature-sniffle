
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Smartphone, 
  Laptop, 
  ShieldCheck, 
  FileText, 
  Zap,
  AlertCircle
} from 'lucide-react';

export default function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // In a real app, we would fetch the project details by params.id
  const project = {
    title: 'PaymentGateway v2',
    payout: '$5.00',
    desc: 'Testing new subscription flow in Safari. Focus on checkout latency.',
    slots: '1/3'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(res => setTimeout(res, 1500));
    alert('Application submitted successfully! The developer will review your profile.');
    router.push('/dashboard/tester');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()} 
          className="p-2 hover:bg-zinc-900 rounded-xl text-zinc-500 hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Apply for Position</h1>
          <p className="text-zinc-500">Submit your application to join the testing team.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Project Summary Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl flex items-center gap-6">
            <div className="w-16 h-16 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-500">
              <Zap size={32} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-zinc-100">{project.title}</h2>
              <p className="text-zinc-400 text-sm mb-2">{project.desc}</p>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                  Payout: {project.payout} / slot
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                  Slots: {project.slots}
                </span>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                <h3 className="text-lg font-bold text-zinc-200">Your Application</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Why are you a good fit for this project?</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full p-4 bg-black border border-zinc-800 rounded-2xl focus:border-emerald-500 outline-none transition-all text-white placeholder-zinc-600"
                    placeholder="Mention your experience with the project's stack or specific device bugs you've found before..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Hardware & Environment</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'ios', label: 'iOS / Safari', icon: <Smartphone size={16} /> },
                      { id: 'android', label: 'Android / Chrome', icon: <Smartphone size={16} /> },
                      { id: 'macos', label: 'MacOS / Safari', icon: <Laptop size={16} /> },
                      { id: 'windows', label: 'Windows / Edge', icon: <Laptop size={16} /> },
                    ].map((dev) => (
                      <label key={dev.id} className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-900/50 cursor-pointer hover:border-zinc-700 transition-all">
                        <input type="checkbox" className="accent-emerald-500 w-4 h-4" />
                        <span className="text-xs text-zinc-300 flex items-center gap-2">
                          {dev.icon} {dev.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-800 space-y-4">
              <div className="flex items-start gap-3 p-4 bg-zinc-800/30 rounded-2xl border border-zinc-800">
                <ShieldCheck size={20} className="text-emerald-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-zinc-200">Tester Agreement</p>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    I agree to provide honest, detailed bug reports. I understand that payouts are released only after the developer verifies the findings.
                  </p>
                </div>
              </div>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" required className="accent-emerald-500 w-4 h-4" />
                <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  I confirm that I have the required hardware to test this application.
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting Application...' : 'Send Application'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl sticky top-24">
            <h3 className="text-lg font-bold mb-6">Application Guide</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 font-bold text-sm">1</div>
                <div>
                  <p className="text-sm font-bold text-zinc-200">Be Specific</p>
                  <p className="text-xs text-zinc-500">Describe exactly which version of OS/Browser you use.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 font-bold text-sm">2</div>
                <div>
                  <p className="text-sm font-bold text-zinc-200">Show Expertise</p>
                  <p className="text-xs text-zinc-500">Mention similar apps you've tested or bugs you've caught.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 font-bold text-sm">3</div>
                <div>
                  <p className="text-sm font-bold text-zinc-200">Wait for Approval</p>
                  <p className="text-xs text-zinc-500">Developers typically review applications within 24-48 hours.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-zinc-800/50 rounded-2xl border border-zinc-800">
              <div className="flex items-center gap-2 mb-2 text-zinc-400 font-bold text-xs">
                <AlertCircle size={14} /> Need Help?
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                If you have questions about the requirements, contact the developer via the marketplace ticket.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
