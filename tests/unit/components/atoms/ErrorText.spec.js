import { mount } from '@vue/test-utils'
import ErrorText from '@/components/atoms/ErrorText.vue'

describe('ErrorText.vue', () => {
  it('renders error message when passed as prop', () => {
    const errorMessage = 'This is an error!'
    const wrapper = mount(ErrorText, {
      props: { errorMessage }
    })
    expect(wrapper.text()).toContain(errorMessage)
  })
})