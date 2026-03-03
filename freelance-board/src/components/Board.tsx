import { createSupabaseBrowserClient } from "@/db/supabase.client"

export default async function Board() {
  const supabase = createSupabaseBrowserClient()

  const { data, error } = await supabase.from("projects").select("*").limit(5)
  console.log("sample data", { data, error })

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Freelance Board</h1>
      </div>
    </>
  )
}
