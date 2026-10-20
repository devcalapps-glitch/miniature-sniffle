
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-cyan-500/30">
      <main className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto px-6 py-32 text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
            Ship your app with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">absolute confidence.</span>
          </h1>
          <p className="text-zinc-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect with professional testers who break your code before your users do. Fair pay, verified results, zero friction.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/dashboard/dev" className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-zinc-200 transition-all">
              I'm a Developer
            </Link>
            <Link href="/dashboard/tester" className="border border-zinc-700 bg-zinc-900/50 px-8 py-4 rounded-full font-semibold text-lg hover:bg-zinc-800 transition-all">
              I'm a Tester
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'For Developers', desc: 'Submit a ticket, set your budget, and let curated testers find the edge cases you missed.' },
              { title: 'For Testers', desc: 'Get paid to break things. Choose projects that match your stack and earn 80% of the fee.' },
              { title: 'Transparent Split', desc: 'Simple 80/20 revenue share. We handle escrow and payouts so you can focus on code.' },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-cyan-500/50 transition-all group">
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{f.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
