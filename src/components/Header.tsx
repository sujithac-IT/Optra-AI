'use client'

import React, { useState } from 'react'
import { Rocket } from 'lucide-react'
import Modal from './Modal'
import { QRCodeSVG } from 'qrcode.react'

const profile = {
  name: 'Sujitha',
  college: 'Sri Shakthi Institute of Engineering & Technology',
  department: 'B.Tech Information Technology',
  hometown: 'Madurai',
  achievements: ['State-Level Swimmer', 'National Abacus Champion'],
  skillScore: 92
}

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-[linear-gradient(90deg,#063d2f,#10b981)] shadow-md">
          <Rocket size={28} color="#000" />
        </div>
        <div>
          <div className="text-2xl font-extrabold h-glow">OPTRA AI</div>
          <div className="text-sm text-[var(--muted)]">Autonomous Tech Career Copilot</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-3 card p-3">
          <div className="w-12 h-12 rounded-full bg-[var(--surface)] flex items-center justify-center font-bold">S</div>
          <div>
            <div className="font-semibold">{profile.name}</div>
            <div className="text-xs text-[var(--muted)]">{profile.college} · {profile.department}</div>
            <div className="mt-1 text-xs text-[var(--muted)]">{profile.hometown}</div>
          </div>
        </div>

        <button onClick={() => setOpen(true)} className="px-3 py-2 rounded bg-[var(--emerald)]/12 border border-[var(--emerald)] text-[var(--emerald)] text-sm">
          Resume QR
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Resume QR — Sujitha">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="bg-[var(--surface)] p-3 rounded">
            <QRCodeSVG value="https://optra-ai.web.app/u/sujitha" size={160} />
          </div>

          <div>
            <div className="font-semibold">{profile.name}</div>
            <div className="text-sm text-[var(--muted)]">{profile.college}</div>
            <div className="mt-2 text-sm">Department: {profile.department}</div>
            <div className="mt-2 text-sm">Hometown: {profile.hometown}</div>
            <div className="mt-2 text-sm">Achievements:</div>
            <ul className="list-disc list-inside text-sm">
              {profile.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </header>
  )
}
