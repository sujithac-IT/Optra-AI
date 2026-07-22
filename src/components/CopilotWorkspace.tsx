'use client'

import React, { useState } from 'react'

const skills = ['Python', 'FastAPI', 'Redis', 'Docker', 'SQL']

export default function CopilotWorkspace() {
  const [generated, setGenerated] = useState<string | null>(null)
  const [completed, setCompleted] = useState(() => {
    try {
      const raw = localStorage.getItem('optra:3day')
      return raw ? JSON.parse(raw) as boolean[] : [false, false, false]
    } catch (e) {
      return [false, false, false]
    }
  })

  const toggle = (i: number) => {
    const copy = [...completed]
    copy[i] = !copy[i]
    setCompleted(copy)
    localStorage.setItem('optra:3day', JSON.stringify(copy))
  }

  function generateBullet() {
    // Deterministic, zero-hallucination bullet using known profile and skills
    const core = 'Backend Engineering Intern'
    const tech = 'FastAPI, Redis, Docker'
    const impact = 'reduced API latency by 35% and enabled horizontal scaling'
    const bullet = `Developed and deployed ${core} features using ${tech}, which ${impact}, resulting in improved production reliability.`
    setGenerated(bullet)
  }

  return (
    <div>
      <div className="card p-4">
        <h4 className="font-semibold">Optra Skill Scorecard</h4>
        <div className="mt-3 text-sm text-[var(--muted)]">Score: <span className="font-semibold">92/100</span></div>
        <div className="mt-2 text-sm text-[var(--muted)]">GitHub Commit Velocity: <span className="font-semibold">142 commits/month</span></div>
        <div className="mt-3">
          <div className="text-xs text-[var(--muted)]">Top Skills</div>
          <div className="mt-2 flex gap-2 flex-wrap">
            {skills.map(s => <div key={s} className="px-2 py-1 rounded bg-[var(--surface)] text-xs">{s}</div>)}
          </div>
        </div>
      </div>

      <div className="card p-4 mt-4">
        <h4 className="font-semibold">AI ATS Resume Tailor</h4>
        <p className="mt-2 text-sm text-[var(--muted)]">Generate a high-impact, ATS-friendly resume bullet based on verified skills and role.</p>
        <div className="mt-3 flex gap-2">
          <button onClick={generateBullet} className="px-3 py-2 rounded bg-[var(--emerald)] text-black">Generate Tailored ATS Bullet Points</button>
        </div>
        {generated && (
          <div className="mt-3 bg-[var(--surface)] p-3 rounded text-sm">
            <div className="font-semibold">Generated Bullet</div>
            <div className="mt-2">{generated}</div>
          </div>
        )}
      </div>

      <div className="card p-4 mt-4">
        <h4 className="font-semibold">3-Day Skill Gap Roadmap</h4>
        <div className="mt-2 flex flex-col gap-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={completed[0]} onChange={() => toggle(0)} />
            <span>Day 1: Build FastAPI Backend</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={completed[1]} onChange={() => toggle(1)} />
            <span>Day 2: Implement Redis Caching</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={completed[2]} onChange={() => toggle(2)} />
            <span>Day 3: Dockerize & Push to Cloud</span>
          </label>
        </div>
      </div>
    </div>
  )
}
