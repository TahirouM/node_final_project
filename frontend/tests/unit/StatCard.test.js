import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatCard from '../../components/common/StatCard.vue'

describe('StatCard', () => {
  const defaultProps = { label: 'Total commandes', value: 42 }

  it('renders the label', () => {
    const wrapper = mount(StatCard, { props: defaultProps })
    expect(wrapper.text()).toContain('Total commandes')
  })

  it('renders the numeric value', () => {
    const wrapper = mount(StatCard, { props: defaultProps })
    expect(wrapper.text()).toContain('42')
  })

  it('renders a string value', () => {
    const wrapper = mount(StatCard, { props: { label: 'Status', value: 'Actif' } })
    expect(wrapper.text()).toContain('Actif')
  })

  it('shows sublabel when provided', () => {
    const wrapper = mount(StatCard, { props: { ...defaultProps, sublabel: 'Ce mois-ci' } })
    expect(wrapper.text()).toContain('Ce mois-ci')
  })

  it('hides sublabel when not provided', () => {
    const wrapper = mount(StatCard, { props: defaultProps })
    const sublabel = wrapper.find('p.text-xs')
    expect(sublabel.exists()).toBe(false)
  })

  it('applies a custom color class', () => {
    const wrapper = mount(StatCard, { props: { ...defaultProps, color: 'green' } })
    expect(wrapper.html()).toContain('text-green-600')
  })

  it('renders the default slot icon', () => {
    const wrapper = mount(StatCard, { props: defaultProps })
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
