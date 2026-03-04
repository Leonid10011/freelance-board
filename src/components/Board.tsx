"use client"

import { createSupabaseBrowserClient } from "@/db/supabase.client"
import StatusFilterBar from "./StatusFiterBar"

export default async function Board() {
  const supabase = createSupabaseBrowserClient()

  const { data, error } = await supabase.from("projects").select("*").limit(5)
  console.log("sample data", { data, error })

  return (
    <>
      <div className="flex flex-col h-screen w-screen items-center justify-center p-16">
        <h1 className="text-2xl font-bold">Freelance Board</h1>
        <StatusFilterBar />
      </div>
    </>
  )
}
