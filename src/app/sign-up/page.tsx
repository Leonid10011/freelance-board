"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/db/supabase.client"

export default function SignupPage() {
  const supabase = createSupabaseBrowserClient()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return

    setError(null)
    setSuccess(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess("Konto erstellt. Prüfe deine E-Mails zur Bestätigung.")
    router.refresh()
  }

  return (
    <main className="p-6 max-w-md">
      <h1 className="text-2xl font-bold">Sign up</h1>
      <p className="text-sm text-gray-500 mt-2">
        Create an account with email and password.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input
          className="w-full rounded-xl p-3 border"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <input
          className="w-full rounded-xl p-3 border"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <button
          className="w-full rounded-xl p-3 bg-black text-white disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      {success && <p className="mt-4 text-sm text-green-700">{success}</p>}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </main>
  )
}
