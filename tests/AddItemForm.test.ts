import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AddItemForm from '~/components/AddItemForm.vue'

describe('AddItemForm', () => {
  beforeEach(() => localStorage.clear())

  it('emits submit with trimmed name and date when valid', async () => {
    const wrapper = mount(AddItemForm)
    await wrapper.find('#food-name').setValue('  Greek Yogurt  ')
    await wrapper.find('#expiry-date').setValue('2026-08-01')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')).toHaveLength(1)
    expect(wrapper.emitted('submit')?.[0]).toEqual(['Greek Yogurt', '2026-08-01'])
  })

  it('blocks submit and shows error when name is empty', async () => {
    const wrapper = mount(AddItemForm)
    await wrapper.find('#expiry-date').setValue('2026-08-01')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')).toBeUndefined()
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('blocks submit and shows error when date is empty', async () => {
    const wrapper = mount(AddItemForm)
    await wrapper.find('#food-name').setValue('Milk')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')).toBeUndefined()
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('clears inputs after successful submit', async () => {
    const wrapper = mount(AddItemForm)
    await wrapper.find('#food-name').setValue('Eggs')
    await wrapper.find('#expiry-date').setValue('2026-09-10')
    await wrapper.find('form').trigger('submit')

    expect((wrapper.find('#food-name').element as HTMLInputElement).value).toBe('')
    expect((wrapper.find('#expiry-date').element as HTMLInputElement).value).toBe('')
  })
})
