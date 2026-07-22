'use client'

import React from 'react'

export default function Modal({ open, onClose, title, children }: { open: boolean, onClose: () => void, title?: string, children?: React.ReactNode }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 w-[min(800px,95%)] p-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{title}</h3>
            <button onClick={onClose} className="text-[var(--muted)]">Close</button>
          </div>

          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  )
}
