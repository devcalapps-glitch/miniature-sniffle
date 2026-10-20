
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Monitor, Smartphone, Laptop, ShieldCheck, Zap, Layout } from 'lucide-react';

export default function SubmitAppPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    appType: 'Fintech',
    devices: 'iOS, Android, Web',
    testingType: 'Edge-case discovery',
    numTesters: 1,
  });

  const RATE_PER_TESTER = 6; 
  const TOTAL_BUDGET = formData.numTesters * RATE_PER_TESTER;
  const PLATFORM_FEE = formData.numTesters * 1;
  const TESTER_PAYOUT = formData.numTesters * 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting project:', formData);
    alert('Project submitted successfully! Funds have been moved to escrow.');
    router.push('/dashboard/dev');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <Link href="/dashboard/dev" className="text-zinc-500 hover:text-white text-sm font-medium flex items-center gap-2 mb-4 transition-colors">
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight">Submit New Application</h1>
        <p className="text-zinc-400 mt-2">Define your testing goals and set your budget.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-8">
            {/* Basic Info Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
                <h2 className="text-lg font-bold text-zinc-200">Basic Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Application Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-2xl focus:border-cyan-500 outline-none transition-all text-white"
                    placeholder="e.g. NovaPay Wallet"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Application URL</label>
                  <input 
                    type="url" 
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-2xl focus:border-cyan-500 outline-none transition-all text-white"
                    placeholder="https://beta.novapay.app"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Testing Goals & Description</label>
                <textarea 
                  rows={4} 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-2xl focus:border-cyan-500 outline-none transition-all text-white"
                  placeholder="Describe what you want testers to focus on... (e.g. 'Test the KYC flow on iOS 16')"
                />
              </div>
            </div>

            {/* Technical Specifications Section */}
            <div className="space-y-6 pt-6 border-t border-zinc-800">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
                <h2 className="text-lg font-bold text-zinc-200">Technical Specifications</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">App Category</label>
                  <select 
                    value={formData.appType}
                    onChange={(e) => setFormData({...formData, appType: e.target.value})}
                    className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-2xl focus:border-cyan-500 outline-none transition-all text-white appearance-none cursor-pointer"
                  >
                    <option value="Fintech">Fintech</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="SaaS">SaaS / Enterprise</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Health">Health & Wellness</option>
                    <option value="Social">Social Media</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Testing Type</label>
                  <select 
                    value={formData.testingType}
                    onChange={(e) => setFormData({...formData, testingType: e.target.value})}
                    className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-2xl focus:border-cyan-500 outline-none transition-all text-white appearance-none cursor-pointer"
                  >
                    <option value="Edge-case discovery">Edge-case discovery</option>
                    <option value="UI/UX Audit">UI/UX Audit</option>
                    <option value="Performance & Load">Performance & Load</option>
                    <option value="Security Audit">Security Audit</option>
                    <option value="Compatibility">Cross-device Compatibility</option>
                    <option value="Beta Testing">General Beta Testing</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Target Devices</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'ios', label: 'iOS', icon: <Smartphone size={16} /> },
                    { id: 'android', label: 'Android', icon: <Smartphone size={16} /> },
                    { id: 'web', label: 'Web Browser', icon: <Monitor size={16} /> },
                    { id: 'macos', label: 'MacOS', icon: <Laptop size={16} /> },
                  ].map((dev) => (
                    <div 
                      key={dev.id}
                      onClick={() => {
                        const current = formData.devices.split(', ');
                        const next = current.includes(dev.label) 
                          ? current.filter(i => i !== dev.label) 
                          : [...current, dev.label];
                        setFormData({...formData, devices: next.join(', ')});
                      }}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-xs font-medium ${
                        formData.devices.includes(dev.label) 
                        ? 'bg-cyan-600/20 border-cyan-500 text-cyan-400' 
                        : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                      }`}
                    >
                      {dev.icon} {dev.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Budget Section */}
            <div className="space-y-6 pt-6 border-t border-zinc-800">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-cyan-500 rounded-full"></div>
                <h2 className="text-lg font-bold text-zinc-200">Budget Allocation</h2>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Number of Testers Required</label>
                <input 
                  type="number" 
                  min="1"
                  value={formData.numTesters}
                  onChange={(e) => setFormData({...formData, numTesters: Math.max(1, parseInt(e.target.value || '0'))})}
                  className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-2xl focus:border-cyan-500 outline-none transition-all text-white font-mono text-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl">
            <h3 className="text-xl font-bold mb-6">Payment Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Total Budget</span>
                <span className="text-white font-medium">${TOTAL_BUDGET.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Platform Fee ($1/tester)</span>
                <span className="text-zinc-300">${PLATFORM_FEE.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-zinc-800 flex justify-between items-end">
                <span className="text-sm font-bold text-zinc-400">To Testers</span>
                <span className="text-2xl font-black text-cyan-400">${TESTER_PAYOUT.toFixed(2)}</span>
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-zinc-200 transition-all shadow-lg shadow-white/10"
            >
              Confirm & Pay
            </button>
            <p className="text-[10px] text-zinc-500 text-center mt-4 uppercase tracking-widest">
              Funds will be held in secure escrow
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
