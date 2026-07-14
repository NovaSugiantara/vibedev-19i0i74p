import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  getExpiryStatus,
  getDaysUntilExpiry,
  sortByExpiry,
  loadItems,
  saveItems,
  type FridgeItem,
} from '~/composables/useFridgeItems'

function isoDaysFromNow(days: number): string {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + days)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

describe('getExpiryStatus', () => {
  it('treats expiry today as Expiring Soon (0 days)', () => {
    expect(getExpiryStatus(isoDaysFromNow(0))).toBe('expiring-soon')
  })

  it('treats tomorrow (1 day) as Expiring Soon', () => {
    expect(getExpiryStatus(isoDaysFromNow(1))).toBe('expiring-soon')
  })

  it('treats exactly 3 days as Expiring Soon', () => {
    expect(getExpiryStatus(isoDaysFromNow(3))).toBe('expiring-soon')
  })

  it('treats 4 days as Fresh', () => {
    expect(getExpiryStatus(isoDaysFromNow(4))).toBe('fresh')
  })

  it('treats yesterday as Expired', () => {
    expect(getExpiryStatus(isoDaysFromNow(-1))).toBe('expired')
  })
})

describe('getDaysUntilExpiry', () => {
  it('returns 0 for today', () => {
    expect(getDaysUntilExpiry(isoDaysFromNow(0))).toBe(0)
  })
  it('returns negative for past dates', () => {
    expect(getDaysUntilExpiry(isoDaysFromNow(-5))).toBe(-5)
  })
})

describe('sortByExpiry', () => {
  it('sorts soonest-expiring first', () => {
    const items: FridgeItem[] = [
      { id: '1', name: 'A', expiryDate: '2026-12-01' },
      { id: '2', name: 'B', expiryDate: '2026-01-01' },
      { id: '3', name: 'C', expiryDate: '2026-06-15' },
    ]
    expect(sortByExpiry(items).map((i) => i.id)).toEqual(['2', '3', '1'])
  })

  it('does not mutate the original array', () => {
    const items: FridgeItem[] = [
      { id: '1', name: 'A', expiryDate: '2026-12-01' },
      { id: '2', name: 'B', expiryDate: '2026-01-01' },
    ]
    sortByExpiry(items)
    expect(items.map((i) => i.id)).toEqual(['1', '2'])
  })
})

describe('localStorage persistence', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns empty array when nothing stored', () => {
    expect(loadItems()).toEqual([])
  })

  it('round-trips saved items', () => {
    const items: FridgeItem[] = [
      { id: '1', name: 'Milk', expiryDate: '2026-03-01' },
    ]
    saveItems(items)
    expect(loadItems()).toEqual(items)
  })

  it('falls back to empty array on corrupt data', () => {
    localStorage.setItem('fridge-watchlist-items', '{not valid json')
    expect(loadItems()).toEqual([])
  })

  it('filters out malformed entries', () => {
    localStorage.setItem(
      'fridge-watchlist-items',
      JSON.stringify([
        { id: '1', name: 'Milk', expiryDate: '2026-03-01' },
        { id: '2', name: 'Bad' }, // missing expiryDate
      ])
    )
    const result = loadItems()
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('falls back gracefully when localStorage throws on read', () => {
    vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(loadItems()).toEqual([])
  })
})
