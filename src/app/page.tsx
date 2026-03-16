"use client"

import Link from "next/link"

export default function RecruiterCta() {
  return (
    <section className="rounded-xl border p-4 md:p-6">
      <h2 className="text-lg font-semibold">For Recruiters</h2>
      <p className="mt-1 text-sm text-gray-600">
        Try the app without registration - in demo mode, no data is saved
        (everything stays only in your browser).
        <br />
        If you log in with Magic Link, a user account will be created using your
        email address.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          type="button"
          href="/demo"
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Try Demo
        </Link>
        <Link
          type="button"
          href="/login-magic-link"
          className="rounded-md border px-4 py-2"
        >
          Login with Magic Link
        </Link>
      </div>
    </section>
  )
}
