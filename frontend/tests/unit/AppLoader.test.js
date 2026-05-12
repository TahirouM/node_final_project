import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppLoader from '../../components/common/AppLoader.vue'

describe('AppLoader', () => {
  it('renders the spinner', () => {
    const wrapper = mount(AppLoader)
    expect(wrapper.find('.animate-spin').exists()).toBe(true)
  })

  it('shows label when provided', () => {
    const wrapper = mount(AppLoader, { props: { label: 'Chargement...' } })
    expect(wrapper.find('p').text()).toBe('Chargement...')
  })

  it('hides label paragraph when no label', () => {
    const wrapper = mount(AppLoader, { props: { label: '' } })
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('has py-20 centering class', () => {
    const wrapper = mount(AppLoader)
    expect(wrapper.classes()).toContain('py-20')
  })
})
