import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppAlert from '../../components/common/AppAlert.vue'

describe('AppAlert', () => {
  it('renders nothing when message is empty', () => {
    const wrapper = mount(AppAlert, { props: { message: '' } })
    expect(wrapper.find('div').exists()).toBe(false)
  })

  it('renders the message text', () => {
    const wrapper = mount(AppAlert, { props: { message: 'Une erreur est survenue' } })
    expect(wrapper.text()).toContain('Une erreur est survenue')
  })

  it('applies error styles by default', () => {
    const wrapper = mount(AppAlert, { props: { message: 'Erreur' } })
    expect(wrapper.classes()).toContain('bg-red-50')
    expect(wrapper.classes()).toContain('text-red-800')
  })

  it('applies success styles for type=success', () => {
    const wrapper = mount(AppAlert, { props: { message: 'OK', type: 'success' } })
    expect(wrapper.classes()).toContain('bg-green-50')
    expect(wrapper.classes()).toContain('text-green-800')
  })

  it('applies info styles for type=info', () => {
    const wrapper = mount(AppAlert, { props: { message: 'Info', type: 'info' } })
    expect(wrapper.classes()).toContain('bg-blue-50')
  })

  it('applies warning styles for type=warning', () => {
    const wrapper = mount(AppAlert, { props: { message: 'Avertissement', type: 'warning' } })
    expect(wrapper.classes()).toContain('bg-yellow-50')
  })

  it('renders the SVG icon', () => {
    const wrapper = mount(AppAlert, { props: { message: 'Test' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
