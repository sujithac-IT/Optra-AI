import './styles/globals.css'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Optra AI — Your Autonomous Tech Career Copilot',
  description: 'Agentic copilot to help accelerate tech careers.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen px-4 md:px-8 lg:px-16 py-8">
        <main className="max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
