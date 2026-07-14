export type ExpiryStatus = 'fresh' | 'expiring-soon' | 'expired'

export interface FridgeItem {
  id: string
  name: string
  expiryDate: string // ISO date string (YYYY-MM-DD)
}

// Status calculation uses browser local timezone.
// "today" = start of current local day, "days until expiry" = difference in whole calendar days.
// Fresh: >3 days remaining | Expiring Soon: 0-3 days remaining | Expired: past today
export function getExpiryStatus(expiryDateStr: string): ExpiryStatus {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const expiry = new Date(expiryDateStr + 'T00:00:00')

  const diffMs = expiry.getTime() - today.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays > 3) return 'fresh'
  if (diffDays >= 0) return 'expiring-soon'
  return 'expired'
}

export function getDaysUntilExpiry(expiryDateStr: string): number {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const expiry = new Date(expiryDateStr + 'T00:00:00')
  return Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

export function sortByExpiry(items: FridgeItem[]): FridgeItem[] {
  return [...items].sort(
    (a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
  )
}

const STORAGE_KEY = 'fridge-watchlist-items'

export function loadItems(): FridgeItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item: unknown): item is FridgeItem =>
        typeof item === 'object'
        && item !== null
        && typeof (item as FridgeItem).id === 'string'
        && typeof (item as FridgeItem).name === 'string'
        && typeof (item as FridgeItem).expiryDate === 'string'
        && /^\d{4}-\d{2}-\d{2}$/.test((item as FridgeItem).expiryDate)
    )
  } catch {
    return []
  }
}

export function saveItems(items: FridgeItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // localStorage unavailable (private browsing, quota exceeded) — silent fallback
  }
}
