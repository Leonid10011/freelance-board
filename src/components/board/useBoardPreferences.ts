"use client"

import { useSyncExternalStore, type Dispatch, type SetStateAction } from "react"
import { ProjectStatus } from "@/domain/project"
import { ProjectCardField } from "./types"

export type BoardPreferences = {
  visibleStatuses: Record<ProjectStatus, boolean>
  visibleCardFields: Record<ProjectCardField, boolean>
}

const STORAGE_KEY = "freelance-board:prefs:v1"
const PREFS_EVENT = "freelance-board:prefs:change"

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

// Cache verhindert neue Objekt-Referenz bei unverändertem Storage
let cachedRaw: string | null = null
let cachedSnapshot: BoardPreferences = DEFAULT_PREFS

function mergePrefs(parsed: Partial<BoardPreferences>): BoardPreferences {
  return {
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
  }
}

function getSnapshot(): BoardPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFS

  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === cachedRaw) return cachedSnapshot

  cachedRaw = raw

  if (!raw) {
    cachedSnapshot = DEFAULT_PREFS
    return cachedSnapshot
  }

  try {
    cachedSnapshot = mergePrefs(JSON.parse(raw) as Partial<BoardPreferences>)
  } catch {
    cachedSnapshot = DEFAULT_PREFS
  }

  return cachedSnapshot
}

function getServerSnapshot(): BoardPreferences {
  return DEFAULT_PREFS
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {}

  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback()
  }
  const onCustom = () => callback()

  window.addEventListener("storage", onStorage)
  window.addEventListener(PREFS_EVENT, onCustom)

  return () => {
    window.removeEventListener("storage", onStorage)
    window.removeEventListener(PREFS_EVENT, onCustom)
  }
}

function writePrefs(next: BoardPreferences) {
  const raw = JSON.stringify(next)
  localStorage.setItem(STORAGE_KEY, raw)
  cachedRaw = raw
  cachedSnapshot = next
  window.dispatchEvent(new Event(PREFS_EVENT))
}

export function useBoardPreferences() {
  const prefs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setPrefs: Dispatch<SetStateAction<BoardPreferences>> = (value) => {
    const prev = getSnapshot()
    const next =
      typeof value === "function"
        ? (value as (prev: BoardPreferences) => BoardPreferences)(prev)
        : value
    writePrefs(next)
  }

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
