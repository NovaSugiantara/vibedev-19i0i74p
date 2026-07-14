import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getExpiryStatus, getDaysUntilExpiry, sortByExpiry, loadItems, saveItems, isValidDateString, type FridgeItem } from '~/composables/useFridgeItems'

function isoDaysFromNow(days: number): string {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + days)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

describe('getExpiryStatus', () => {
  it('today=Expiring Soon, 1d=Expiring, 3d=Expiring, 4d=Fresh, -1d=Expired', () => {
    expect(getExpiryStatus(isoDaysFromNow(0))).toBe('expiring-soon')
    expect(getExpiryStatus(isoDaysFromNow(1))).toBe('expiring-soon')
    expect(getExpiryStatus(isoDaysFromNow(3))).toBe('expiring-soon')
    expect(getExpiryStatus(isoDaysFromNow(4))).toBe('fresh')
    expect(getExpiryStatus(isoDaysFromNow(-1))).toBe('expired')
  })
})

describe('getDaysUntilExpiry', () => {
  it('returns 0 for today, negative for past', () => {
    expect(getDaysUntilExpiry(isoDaysFromNow(0))).toBe(0)
    expect(getDaysUntilExpiry(isoDaysFromNow(-5))).toBe(-5)
  })
})

describe('sortByExpiry', () => {
  it('sorts soonest first, does not mutate', () => {
    const items: FridgeItem[] = [
      { id: '1', name: 'A', expiryDate: '2026-12-01' },
      { id: '2', name: 'B', expiryDate: '2026-01-01' },
      { id: '3', name: 'C', expiryDate: '2026-06-15' },
    ]
    expect(sortByExpiry(items).map(i => i.id)).toEqual(['2', '3', '1'])
    expect(items.map(i => i.id)).toEqual(['1', '2', '3'])
  })
})

describe('localStorage', () => {
  beforeEach(() => localStorage.clear())

  it('round-trips and handles corrupt/missing storage', () => {
    expect(loadItems()).toEqual([])
    saveItems([{ id: '1', name: 'Milk', expiryDate: '2026-03-01' }])
    expect(loadItems()).toHaveLength(1)
    localStorage.setItem('fridge-watchlist-items', '{bad json')
    expect(loadItems()).toEqual([])
    localStorage.setItem('fridge-watchlist-items', JSON.stringify([{ id: '1', name: 'Milk' }, { id: '2', name: 'Eggs', expiryDate: '2026-06-15' }]))
    expect(loadItems()).toHaveLength(1)
  })

  it('handles localStorage throw', () => {
    vi.spyOn(localStorage, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    expect(loadItems()).toEqual([])
  })
})

describe('isValidDateString', () => {
  it('accepts real dates, rejects overflow and non-dates', () => {
    expect(isValidDateString('2026-03-15')).toBe(true)
    expect(isValidDateString('2024-02-29')).toBe(true)
    expect(isValidDateString('2026-02-31')).toBe(false)
    expect(isValidDateString('2026-13-01')).toBe(false)
    expect(isValidDateString('')).toBe(false)
    expect(isValidDateString('abc')).toBe(false)
  })
})
