'use client'

import React, { useMemo, useState } from 'react'
import Modal from './Modal'

type FilterKey = 'All' | 'Global Challenges' | 'Hackathons' | 'Remote Startup Jobs' | 'Govt Exams'

type Opportunity = {
  id: string
  title: string
  category: FilterKey
  source: string
  meta?: string
  deadline?: string
  prize?: string
  stipend?: string
  actions?: string[]
}

const OPPS: Opportunity[] = [
  {
    id: '1',
    title: 'TCS CodeVita 2026',
    category: 'Global Challenges',
    source: 'TCS Portal',
    deadline: '15 Days',
    meta: 'Global Coding Challenge'
  },
  {
    id: '2',
    title: 'Ilaiyaraaja Tech & Media Hackathon',
    category: 'Hackathons',
    source: 'Devfolio',
    prize: '₹50,000',
    meta: 'Audio/AI Bounties'
  },
  {
    id: '3',
    title: 'Backend Engineering Intern',
    category: 'Remote Startup Jobs',
    source: 'Twitter/X Scraped',
    stipend: '₹35,000/mo',
    meta: 'Series-A AI Startup'
  },
  {
    id: '4',
    title: 'ISRO Technical Officer Exam',
    category: 'Govt Exams',
    source: 'Govt Portal',
    meta: 'Technical Officer Exam',
    actions: ['Tutorial Guide']
  }
]

export default function ScoutFeed() {
  const [filter, setFilter] = useState<FilterKey>('All')
  const [tutorialOpen, setTutorialOpen] = useState(false)
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null)

  const list = useMemo(() => {
    return OPPS.filter((o) => filter === 'All' ? true : o.category === filter)
  }, [filter])

  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {(['All', 'Global Challenges', 'Hackathons', 'Remote Startup Jobs', 'Govt Exams'] as FilterKey[]).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-md text-sm ${filter === f ? 'bg-[var(--emerald)]/12 border border-[var(--emerald)] text-[var(--emerald)]' : 'text-[var(--muted)]'}`}>{f}</button>
        ))}
      </div>

      <div className="mt-4 grid gap-4">
        {list.map((o) => (
          <div key={o.id} className="card p-4 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{o.title}</h4>
                <div className="text-xs text-[var(--muted)]">• {o.source}</div>
              </div>
              <div className="text-sm text-[var(--muted)] mt-2">{o.meta}</div>
              <div className="mt-2 flex gap-2 items-center text-xs text-[var(--muted)]">
                {o.deadline && <div>Deadline: {o.deadline}</div>}
                {o.prize && <div>Prize: {o.prize}</div>}
                {o.stipend && <div>Stipend: {o.stipend}</div>}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <a className="px-3 py-1 rounded bg-[var(--emerald)]/12 border border-[var(--emerald)] text-[var(--emerald)] text-sm" href="#">View</a>
              {o.actions?.includes('Tutorial Guide') && (
                <button onClick={() => { setSelectedOpp(o); setTutorialOpen(true) }} className="px-3 py-1 rounded border border-[var(--border)] text-sm">Tutorial Guide</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal open={tutorialOpen} onClose={() => setTutorialOpen(false)} title={`Tutorial Guide — ${selectedOpp?.title ?? ''}`}>
        <div>
          <h4 className="font-semibold">Eligibility Verification Steps</h4>
          <ol className="list-decimal list-inside mt-2 text-sm text-[var(--muted)]">
            <li>Confirm educational eligibility: B.Tech/Equivalent.</li>
            <li>Ensure photograph and signature in DigiLocker match government ID.</li>
            <li>Cross-check experience certificates if applying to senior roles.</li>
          </ol>

          <h4 className="mt-4 font-semibold">Required Documents</h4>
          <ul className="list-disc list-inside mt-2 text-sm text-[var(--muted)]">
            <li>Academic transcript / CGPA</li>
            <li>Government ID (Aadhaar / Passport)</li>
            <li>Photo & signature</li>
          </ul>

          <div className="mt-4 text-sm">This guide checks common eligibility signals and required documents for the application.</div>
        </div>
      </Modal>
    </div>
  )
}
