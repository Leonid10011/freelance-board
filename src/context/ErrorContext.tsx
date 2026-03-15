"use client"
import { createContext, useContext, useState, ReactNode } from "react"

type ErrorContextType = {
  error: string | null
  handleError: (msg: string | null) => void
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined)

export function useErrorContext() {
  const context = useContext(ErrorContext)
  if (!context)
    throw new Error("useErrorContext must be used within ErrorProvider")
  return context
}

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string | null>(null)

  const handleError = (msg: string | null) => {
    setError(msg)
  }

  return (
    <ErrorContext.Provider value={{ error, handleError }}>
      {children}
      {error && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            background: "#ef4444",
            color: "white",
            padding: "1rem",
            borderRadius: 8,
            zIndex: 9999,
          }}
        >
          {error}
        </div>
      )}
    </ErrorContext.Provider>
  )
}
