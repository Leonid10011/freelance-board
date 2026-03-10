"use client"

import Link from "next/link"

export default function RecruiterCta() {
  return (
    <section className="rounded-xl border p-4 md:p-6">
      <h2 className="text-lg font-semibold">Für Recruiter</h2>
      <p className="mt-1 text-sm text-gray-600">
        Ohne Registrierung testen oder direkt sicheren Zugang per Magic Link
        erhalten.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          type="button"
          href="/demo"
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Demo starten
        </Link>
        <Link
          type="button"
          href="/board"
          className="rounded-md border px-4 py-2"
        >
          Magic Link anfordern (TODO)
        </Link>
      </div>
    </section>
  )
}
