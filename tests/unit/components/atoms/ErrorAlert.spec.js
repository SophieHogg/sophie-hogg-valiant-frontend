import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorAlert from '@/components/atoms/ErrorAlert.vue'

describe('ErrorAlert.vue', () => {
  it('renders error message and advice', () => {
    const wrapper = mount(ErrorAlert, {
      props: {
        errorMessage: 'Something went wrong',
        errorAdvice: 'Try again later',
      },
    })
    expect(wrapper.text()).toContain('Something went wrong')
    expect(wrapper.text()).toContain('Try again later')
  })

  it('renders with empty props', () => {
    const wrapper = mount(ErrorAlert, {
      props: {
        errorMessage: '',
        errorAdvice: '',
      },
    })
    expect(wrapper.find('h3').text()).toBe('')
    expect(wrapper.find('small').text()).toBe('')
  })
})
