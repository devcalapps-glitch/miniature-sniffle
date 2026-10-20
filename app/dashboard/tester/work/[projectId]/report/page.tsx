
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, AlertCircle, Image as ImageIcon, Send } from 'lucide-react';

export default function ReportBugPage({ params }: { params: Promise<{ projectId: string }> }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      projectId: (await params).projectId,
      title: formData.get('title'),
      description: formData.get('description'),
      severity: formData.get('severity'),
    };

    try {
      const res = await fetch('/api/bugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert('Bug reported successfully!');
        router.push(`/dashboard/tester/work/${data.projectId}`);
      }
    } catch (err) {
      alert('Failed to report bug');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="p-2 hover:bg-zinc-900 rounded-xl text-zinc-500 transition-all">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-extrabold tracking-tight">Report a Bug</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Bug Title</label>
            <input 
              name="title"
              required
              className="w-full p-4 bg-black border border-zinc-800 rounded-2xl focus:border-emerald-500 outline-none transition-all text-white"
              placeholder="e.g. Checkout button does not respond on iPhone 13"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Severity</label>
            <select 
              name="severity" 
              className="w-full p-4 bg-black border border-zinc-800 rounded-2xl focus:border-emerald-500 outline-none transition-all text-white appearance-none cursor-pointer"
            >
              <option value="CRITICAL">Critical (App Crashes)</option>
              <option value="MAJOR">Major (Broken Feature)</option>
              <option value="MINOR">Minor (UI/UX Glitch)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Steps to Reproduce & Description</label>
            <textarea 
              name="description"
              required
              rows={6}
              className="w-full p-4 bg-black border border-zinc-800 rounded-2xl focus:border-emerald-500 outline-none transition-all text-white"
              placeholder="1. Navigate to checkout...&#10;2. Click 'Pay Now' twice...&#10;3. App freezes..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Evidence (Screenshot/Video)</label>
            <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-8 text-center hover:border-zinc-700 transition-all cursor-pointer group">
              <div className="flex flex-col items-center gap-3 text-zinc-500">
                <div className="p-3 bg-zinc-900 rounded-full group-hover:text-emerald-500 transition-colors">
                  <ImageIcon size={24} />
                </div>
                <span className="text-sm">Click to upload or drag and drop</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-500 text-xs">
            <AlertCircle size={14} />
            <span>Reports are reviewed by the developer.</span>
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : <><Send size={18} /> Submit Report</>}
          </button>
        </div>
      </form>
    </div>
  );
}
