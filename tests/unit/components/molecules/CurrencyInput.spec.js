import { mount } from '@vue/test-utils'
import CurrencyInput from '@/components/molecules/CurrencyInput.vue'

describe('CurrencyInput', () => {
  it('renders with initial value', () => {
    const wrapper = mount(CurrencyInput, {
      props: { modelValue: 123.45 },
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('123.45')
  })

  it('emits update:modelValue with only numbers and dot', async () => {
    const wrapper = mount(CurrencyInput, {
      props: { modelValue: undefined },
    })
    const input = wrapper.find('input')
    await input.setValue('123.45')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toStrictEqual([123.45])
  })

  it('blocks letters and special characters on keydown', async () => {
    const wrapper = mount(CurrencyInput, {
      props: { modelValue: undefined },
    })
    const input = wrapper.find('input')
    // Simulate typing a letter
    await input.trigger('keydown', { key: 'a' })
    // Simulate typing a dollar sign
    await input.trigger('keydown', { key: '$' })
    // Should not change value
    expect(input.element.value).toBe('')
  })

  it('allows only one dot', async () => {
    const wrapper = mount(CurrencyInput, {
      props: { modelValue: 12.3 },
    })
    const input = wrapper.find('input')
    // Try to type another dot
    await input.trigger('keydown', { key: '.' })
    // Should not add another dot
    expect(input.element.value).toBe('12.3')
  })

  it('allows navigation and control keys', async () => {
    const wrapper = mount(CurrencyInput, {
      props: { modelValue: 123 },
    })
    const input = wrapper.find('input')
    for (const key of ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End']) {
      await input.trigger('keydown', { key })
      // Should not prevent default for these keys
      expect(input.element.value).toBe('123')
    }
  })

  it('updates value when modelValue prop changes', async () => {
    const wrapper = mount(CurrencyInput, {
      props: { modelValue: 1 },
    })
    await wrapper.setProps({ modelValue: 999.99 })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('999.99')
  })

  it('formats value on blur', async () => {
    const wrapper = mount(CurrencyInput, {
      props: { modelValue: 1234.5 },
    })
    const input = wrapper.find('input')
    await input.trigger('blur')
    expect(input.element.value).toBe('1,234.50')
  })
})
