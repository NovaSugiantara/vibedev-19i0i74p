export type ExpiryStatus = 'fresh' | 'expiring-soon' | 'expired'

export interface FridgeItem {
  id: string
  name: string
  expiryDate: string // ISO YYYY-MM-DD
}

// All date math uses browser local timezone. "today" = local calendar day.
// Fresh: >3 days · Expiring Soon: 0-3 days · Expired: <0 days
export function getExpiryStatus(expiryDateStr: string): ExpiryStatus {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diffDays = Math.floor((new Date(expiryDateStr + 'T00:00:00').getTime() - today.getTime()) / 86400000)
  if (diffDays > 3) return 'fresh'
  if (diffDays >= 0) return 'expiring-soon'
  return 'expired'
}

export function getDaysUntilExpiry(expiryDateStr: string): number {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.floor((new Date(expiryDateStr + 'T00:00:00').getTime() - today.getTime()) / 86400000)
}

export function sortByExpiry(items: FridgeItem[]): FridgeItem[] {
  return [...items].sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
}

// Round-trip check: JS Date rolls overflow (Feb 31 -> Mar 3), so verify parsed y/m/d match
export function isValidDateString(dateStr: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr)
  if (!m) return false
  const y = Number(m[1]); const mo = Number(m[2]); const d = Number(m[3])
  const parsed = new Date(y, mo - 1, d)
  if (isNaN(parsed.getTime())) return false
  return parsed.getFullYear() === y && parsed.getMonth() === mo - 1 && parsed.getDate() === d
}

const STORAGE_KEY = 'fridge-watchlist-items'

function isFridgeItem(item: unknown): item is FridgeItem {
  return typeof item === 'object' && item !== null
    && typeof (item as FridgeItem).id === 'string'
    && typeof (item as FridgeItem).name === 'string'
    && typeof (item as FridgeItem).expiryDate === 'string'
    && /^\d{4}-\d{2}-\d{2}$/.test((item as FridgeItem).expiryDate)
}

export function loadItems(): FridgeItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isFridgeItem)
  } catch { return [] }
}

export function saveItems(items: FridgeItem[]): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch {}
}
