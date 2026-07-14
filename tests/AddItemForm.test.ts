import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AddItemForm from '~/components/AddItemForm.vue'

describe('AddItemForm', () => {
  beforeEach(() => localStorage.clear())

  it('emits submit with trimmed name and date when valid', async () => {
    const w = mount(AddItemForm)
    await w.find('#food-name').setValue('  Greek Yogurt  ')
    await w.find('#expiry-date').setValue('2026-08-01')
    await w.find('form').trigger('submit')
    expect(w.emitted('submit')).toHaveLength(1)
    expect(w.emitted('submit')?.[0]).toEqual(['Greek Yogurt', '2026-08-01'])
  })

  it('blocks when name empty, date empty, and clears inputs after submit', async () => {
    const w = mount(AddItemForm)
    await w.find('#expiry-date').setValue('2026-08-01')
    await w.find('form').trigger('submit')
    expect(w.emitted('submit')).toBeUndefined()
    expect(w.find('[role="alert"]').exists()).toBe(true)

    await w.find('#expiry-date').setValue('')
    await w.find('#food-name').setValue('Milk')
    await w.find('form').trigger('submit')
    expect(w.emitted('submit')).toBeUndefined()
    expect(w.find('[role="alert"]').exists()).toBe(true)

    await w.find('#expiry-date').setValue('2026-09-10')
    await w.find('form').trigger('submit')
    expect((w.find('#food-name').element as HTMLInputElement).value).toBe('')
    expect((w.find('#expiry-date').element as HTMLInputElement).value).toBe('')
  })
})
