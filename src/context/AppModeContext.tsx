"use client"

import { createContext, useContext, useState } from "react"

type AppModeType = "demo" | "live"
type AppModeContextType = {
  mode: "demo" | "live"
  handleModeChange?: (mode: AppModeType) => void
}
const AppModeContext = createContext<AppModeContextType>({ mode: "demo" })

export function useAppModeContext() {
  const context = useContext(AppModeContext)
  if (!context) {
    throw new Error("useAppMode must be used within an AppModeProvider")
  }
  return context
}

export function AppModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<AppModeType>("demo")

  const handleModeChange = (newMode: AppModeType) => {
    setMode(newMode)
  }

  return (
    <AppModeContext.Provider value={{ mode, handleModeChange }}>
      {children}
    </AppModeContext.Provider>
  )
}
