import { mount } from '@vue/test-utils'
import SelectDropdown from '@/components/molecules/SelectDropdown.vue'

describe('SelectDropdown', () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]

  it('renders options and placeholder', () => {
    const wrapper = mount(SelectDropdown, {
      props: {
        options,
        placeholder: 'Choose one',
        id: 'test-select',
      },
    })
    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
    expect(select.find('option:disabled').text()).toBe('Choose one')
    expect(select.findAll('option').length).toBe(options.length + 1) // +1 for placeholder
  })

  it('emits update:modelValue when option is selected', async () => {
    const wrapper = mount(SelectDropdown, {
      props: {
        options,
        modelValue: null,
        id: 'test-select',
      },
    })
    const select = wrapper.find('select')
    await select.setValue('2')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(options[1])
  })

  it('shows placeholder style when no value is selected', () => {
    const wrapper = mount(SelectDropdown, {
      props: {
        options,
        modelValue: null,
        id: 'test-select',
      },
    })
    const select = wrapper.find('select')
    expect(select.classes()).toContain('text-gray-500')
  })

  it('shows selected value when modelValue is set', () => {
    const wrapper = mount(SelectDropdown, {
      props: {
        options,
        modelValue: options[2],
        id: 'test-select',
      },
    })
    const select = wrapper.find('select')
    expect(select.element.value).toBe('3')
  })
})
