'use client'

import React, { useState } from 'react'
import Modal from './Modal'

export default function VerificationCenter() {
  const [digiConnected, setDigiConnected] = useState(() => {
    try {
      return localStorage.getItem('optra:digi') === '1'
    } catch {
      return false
    }
  })
  const [cgpa, setCgpa] = useState<string | null>(() => {
    try {
      return localStorage.getItem('optra:cgpa') ?? null
    } catch {
      return null
    }
  })
  const [webcamOpen, setWebcamOpen] = useState(false)

  function toggleDigi() {
    // simulate fetch
    setDigiConnected(true)
    localStorage.setItem('optra:digi', '1')
    localStorage.setItem('optra:cgpa', '8.42')
    setCgpa('8.42')
  }

  return (
    <div>
      <div className="card p-4">
        <h4 className="font-semibold">DigiLocker Integration</h4>
        <div className="mt-2 text-sm text-[var(--muted)]">Connect to simulate fetching verified CGPA and documents.</div>
        <div className="mt-3 flex items-center gap-3">
          <button onClick={toggleDigi} className={`px-3 py-2 rounded ${digiConnected ? 'bg-[var(--emerald)] text-black' : 'border border-[var(--border)] text-[var(--muted)]'}`}>
            {digiConnected ? 'Connected' : 'Connect DigiLocker Account'}
          </button>
          {cgpa && <div className="text-sm">Verified CGPA: <span className="font-semibold">{cgpa}/10.0</span></div>}
        </div>
      </div>

      <div className="card p-4 mt-4">
        <h4 className="font-semibold">AI Anti-Proxy</h4>
        <div className="mt-2 text-sm text-[var(--muted)]">Simulated webcam preview with liveness scan.</div>
        <div className="mt-3 flex items-center gap-3">
          <div className="w-40 h-28 bg-black/60 border border-[var(--border)] rounded flex items-center justify-center">Webcam Preview</div>
          <div>
            <div className="text-sm">Liveness: <span className="font-semibold text-[var(--emerald)]">Blink Verified</span></div>
            <div className="text-sm mt-1">Face Match: <span className="font-semibold">99.2%</span></div>
            <button onClick={() => setWebcamOpen(true)} className="mt-3 px-3 py-2 rounded border border-[var(--border)] text-sm">Open Webcam Simulation</button>
          </div>
        </div>
      </div>

      <Modal open={webcamOpen} onClose={() => setWebcamOpen(false)} title="Webcam Simulation">
        <div className="p-3 flex flex-col items-center">
          <div className="w-80 h-48 bg-gradient-to-br from-black to-zinc-900 rounded border border-[var(--border)] flex items-center justify-center">
            <div className="text-[var(--muted)] text-sm">Wireframe Scan Animation</div>
          </div>

          <div className="mt-3 text-sm">Status: <span className="font-semibold text-[var(--emerald)]">Blink Verified</span></div>
          <div className="mt-1 text-sm">Face Match: <span className="font-semibold">99.2%</span></div>
        </div>
      </Modal>
    </div>
  )
}
