import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TooltipPopup from '@/components/atoms/TooltipPopup.vue'
import tippy from 'tippy.js'

vi.mock('tippy.js', () => ({
  default: vi.fn(() => ({ destroy: vi.fn() })),
}))

describe('TooltipPopup.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(TooltipPopup, {
      props: {
        content: 'Tooltip text',
        selectorId: '#test-el',
      },
      slots: {
        default: '<span id="test-el">Hover me</span>',
      },
    })
    expect(wrapper.html()).toContain('Hover me')
  })

  it('initializes tippy on mount', () => {
    mount(TooltipPopup, {
      props: {
        content: 'Tooltip text',
        selectorId: '#test-el',
      },
      slots: {
        default: '<span id="test-el">Hover me</span>',
      },
    })
    expect(tippy).toHaveBeenCalledWith(document.querySelector('#test-el'), expect.objectContaining({ content: 'Tooltip text' }))
  })

  it('destroys tippy on unmount', () => {
    const tippyInstance = { destroy: vi.fn() }
    tippy.mockReturnValueOnce(tippyInstance)
    const wrapper = mount(TooltipPopup, {
      props: {
        content: 'Tooltip text',
        selectorId: '#test-el',
      },
      slots: {
        default: '<span id="test-el">Hover me</span>',
      },
    })
    wrapper.unmount()
    expect(tippyInstance.destroy).toHaveBeenCalled()
  })
})
