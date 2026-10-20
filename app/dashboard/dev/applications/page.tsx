
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, User, Clock, ArrowLeft } from 'lucide-react';

export default function ReviewApplications() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      const res = await fetch('/api/applications'); // This API needs to be implemented
      const data = await res.json();
      setApplications(data);
    } catch (e) {
      // Mock data for prototype if API fails
      setApplications([
        { id: 'app_1', testerName: 'Mike R.', projectId: 'T-101', projectTitle: 'PaymentGateway v2', status: 'PENDING', appliedAt: '2h ago' },
        { id: 'app_2', testerName: 'Sarah L.', projectId: 'T-101', projectTitle: 'PaymentGateway v2', status: 'PENDING', appliedAt: '5h ago' },
        { id: 'app_3', testerName: 'Alex K.', projectId: 'T-104', projectTitle: 'Mobile Responsive Fix', status: 'PENDING', appliedAt: '1d ago' },
      ]);
    }
  }

  async function handleStatus(id: string, status: 'ACCEPTED' | 'REJECTED') {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        alert(`Application ${status.toLowerCase()} successfully!`);
        fetchApplications();
      }
    } catch (e) {
      alert('Failed to update application');
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="p-2 hover:bg-zinc-900 rounded-xl text-zinc-500 transition-all">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-extrabold tracking-tight">Review Applications</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {applications.map((app: any, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400">
                <User size={24} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-zinc-100">{app.testerName}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-bold uppercase">
                    {app.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-500">Applying for <span className="text-zinc-300 font-medium">{app.projectTitle}</span></p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs text-zinc-600">
                <Clock size={14} /> {app.appliedAt}
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleStatus(app.id, 'REJECTED')}
                  className="p-3 bg-zinc-800 text-zinc-400 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all"
                  title="Reject"
                >
                  <XCircle size={20} />
                </button>
                <button 
                  onClick={() => handleStatus(app.id, 'ACCEPTED')}
                  className="p-3 bg-zinc-800 text-zinc-400 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-all"
                  title="Approve"
                >
                  <CheckCircle size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
