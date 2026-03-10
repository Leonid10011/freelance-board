"use client"

import { usePathname } from "next/navigation"

export type AppMode = "live" | "demo"

export function useAppMode(): AppMode {
  const pathname = usePathname()
  return pathname.startsWith("/demo") ? "demo" : "live"
}
