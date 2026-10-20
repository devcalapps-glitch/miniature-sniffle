
import Link from 'next/link';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold tracking-tighter mb-6">How it Works</h1>
          <p className="text-zinc-400 text-xl">A seamless bridge between quality code and professional testing.</p>
        </div>

        <div className="space-y-24">
          {/* Step 1 */}
          <div className="flex gap-12 items-start">
            <div className="text-6xl font-black text-indigo-500/20 leading-none">01</div>
            <div>
              <h2 className="text-2xl font-bold mb-4">The Submission</h2>
              <p className="text-zinc-400 leading-relaxed text-lg">
                Developers submit their application along with a specific testing goal and a budget. 
                The budget is held in a secure escrow account, ensuring that funds are available 
                but only released upon verified results.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-12 items-start">
            <div className="text-6xl font-black text-indigo-500/20 leading-none">02</div>
            <div>
              <h2 className="text-2xl font-bold mb-4">The Matching</h2>
              <p className="text-zinc-400 leading-relaxed text-lg">
                Our platform matches the project with curated testers who have the right 
                technical stack (e.g., React, iOS, Web3) and a proven track record of finding critical bugs.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-12 items-start">
            <div className="text-6xl font-black text-indigo-500/20 leading-none">03</div>
            <div>
              <h2 className="text-2xl font-bold mb-4">The Breaking Phase</h2>
              <p className="text-zinc-400 leading-relaxed text-lg">
                Testers dive into the app, attempting to crash it, bypass security, or find UX friction. 
                Every bug is reported with a clear set of reproduction steps and severity levels.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-12 items-start">
            <div className="text-6xl font-black text-indigo-500/20 leading-none">04</div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Verification & Payout</h2>
              <p className="text-zinc-400 leading-relaxed text-lg">
                Once the developer verifies the bug reports, the escrow is released. 
                Testers receive 80% of the budget, and the platform retains 20% for maintaining the infrastructure.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <Link href="/dashboard/dev" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full font-bold transition-all inline-block">
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}
