import { mount } from '@vue/test-utils'
import ContentCard from '@/components/atoms/ContentCard.vue'

describe('ContentCard', () => {
  it('renders slot content when passed as slot', () => {
    const slotContent = 'This is the slot content!'
    const wrapper = mount(ContentCard, {
      slots: {
        default: `<div>${slotContent}</div>`,
      },
    })
    expect(wrapper.text()).toContain(slotContent)
  })
})
