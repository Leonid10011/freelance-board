"use client"

import { useState } from "react"
import { createSupabaseBrowserClient } from "@/db/supabase.client"

const BASE_PATH = "/freelance-board"

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient()
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Muss auf deine Domain zeigen (Vercel URL)
        emailRedirectTo: `${location.origin}${BASE_PATH}/auth/callback`,
      },
    })

    if (error) setError(error.message)
    else setSent(true)
  }

  return (
    <main className="p-6 max-w-md">
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="text-sm text-gray-500 mt-2">Get a magic link via email.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input
          className="w-full rounded-xl p-3 border"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <button className="w-full rounded-xl p-3 bg-black text-white">
          Send magic link
        </button>
      </form>

      {sent && <p className="mt-4 text-sm">Check your inbox.</p>}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </main>
  )
}
