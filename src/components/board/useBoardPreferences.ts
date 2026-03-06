"use client"

import { useEffect, useState } from "react"
import { ProjectStatus } from "@/domain/project"
import { ProjectCardField } from "./types"

export type BoardPreferences = {
  visibleStatuses: Record<ProjectStatus, boolean>
  visibleCardFields: Record<ProjectCardField, boolean>
}

const STORAGE_KEY = "freelance-board:prefs:v1"

const DEFAULT_PREFS: BoardPreferences = {
  visibleStatuses: {
    inquiry: false,
    proposal: false,
    negotiation: false,
    active: false,
    waiting: false,
    completed: false,
  },
  visibleCardFields: {
    client: true,
    budget: true,
    deadline: true,
    priority: true,
  },
}

export function useBoardPreferences() {
  const [prefs, setPrefs] = useState<BoardPreferences>(DEFAULT_PREFS)

  // load once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return

      const parsed = JSON.parse(raw) as Partial<BoardPreferences>

      setPrefs({
        ...DEFAULT_PREFS,
        ...parsed,
        visibleStatuses: {
          ...DEFAULT_PREFS.visibleStatuses,
          ...(parsed.visibleStatuses ?? {}),
        },
        visibleCardFields: {
          ...DEFAULT_PREFS.visibleCardFields,
          ...(parsed.visibleCardFields ?? {}),
        },
      })
    } catch {
      // ignore malformed storage
    }
  }, [])

  // persist on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  }, [prefs])

  function toggleStatus(status: ProjectStatus) {
    setPrefs((p) => ({
      ...p,
      visibleStatuses: {
        ...p.visibleStatuses,
        [status]: !p.visibleStatuses[status],
      },
    }))
  }
  function toggleCardField(field: keyof BoardPreferences["visibleCardFields"]) {
    setPrefs((p) => ({
      ...p,
      visibleCardFields: {
        ...p.visibleCardFields,
        [field]: !p.visibleCardFields[field],
      },
    }))
  }

  return { prefs, setPrefs, toggleStatus, toggleCardField }
}
