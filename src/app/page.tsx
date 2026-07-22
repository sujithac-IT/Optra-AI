'use client'

import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ScoutFeed from '../components/ScoutFeed'
import CopilotWorkspace from '../components/CopilotWorkspace'
import VerificationCenter from '../components/VerificationCenter'

type TabKey = 'feed' | 'copilot' | 'verify'

export default function Page() {
  const [tab, setTab] = useState<TabKey>('feed')

  useEffect(() => {
    const saved = globalThis?.localStorage?.getItem('optra:activeTab') as TabKey | null
    if (saved) setTab(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('optra:activeTab', tab)
  }, [tab])

  return (
    <div>
      <Header />

      <div className="mt-8">
        <nav className="flex items-center gap-2 bg-[var(--surface)] p-2 rounded-md border border-[var(--border)]">
          <button
            onClick={() => setTab('feed')}
            className={`px-3 py-1 rounded-md text-sm ${tab === 'feed' ? 'bg-[var(--emerald)]/12 border border-[var(--emerald)] text-[var(--emerald)]' : 'text-[var(--muted)]'}`}>
            Hyper-Scout Feed
          </button>
          <button
            onClick={() => setTab('copilot')}
            className={`px-3 py-1 rounded-md text-sm ${tab === 'copilot' ? 'bg-[var(--emerald)]/12 border border-[var(--emerald)] text-[var(--emerald)]' : 'text-[var(--muted)]'}`}>
            Agentic Copilot
          </button>
          <button
            onClick={() => setTab('verify')}
            className={`px-3 py-1 rounded-md text-sm ${tab === 'verify' ? 'bg-[var(--emerald)]/12 border border-[var(--emerald)] text-[var(--emerald)]' : 'text-[var(--muted)]'}`}>
            Trust & Verification
          </button>
        </nav>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {tab === 'feed' && <ScoutFeed />}
            {tab === 'copilot' && <CopilotWorkspace />}
            {tab === 'verify' && <VerificationCenter />}
          </div>

          <aside className="lg:col-span-1">
            <div className="card p-4">
              <h3 className="text-sm text-[var(--muted)]">Student Snapshot</h3>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[linear-gradient(90deg,#0ea5a2,#10b981)] flex items-center justify-center text-black font-bold">S</div>
                <div>
                  <div className="font-semibold">Sujitha</div>
                  <div className="text-xs text-[var(--muted)]">B.Tech · Information Technology</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[var(--muted)]">Skill Score</div>
                  <div className="font-semibold">92/100</div>
                </div>
                <div className="w-full bg-zinc-900 h-2 rounded mt-2 overflow-hidden border border-[var(--border)]">
                  <div style={{ width: '92%' }} className="h-2 bg-[var(--emerald)]" />
                </div>
              </div>

              <div className="mt-4 flex gap-2 flex-wrap">
                <div className="px-2 py-1 rounded bg-[var(--emerald)]/12 text-[var(--emerald)] text-xs">DigiLocker Verified</div>
                <div className="px-2 py-1 rounded bg-blue-900/10 text-sky-400 text-xs">Face Anti-Proxy Passed</div>
              </div>
            </div>

            <div className="card p-4 mt-4">
              <h4 className="text-sm text-[var(--muted)]">Quick Actions</h4>
              <div className="mt-3 flex flex-col gap-2">
                <a className="px-3 py-2 rounded bg-[var(--emerald)] text-black text-sm text-center" href="#">Apply to Featured</a>
                <button className="px-3 py-2 rounded border border-[var(--border)] text-sm">Export Resume</button>
                <button className="px-3 py-2 rounded border border-[var(--border)] text-sm">Connect GitHub</button>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}
