import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Alert from '../Alert.vue'

describe('Alert component', () => {
  test('renders the correct props', () => {
    const title = 'Failure'
    const text = 'An error occurred'
    const icon = '$error'
    const type = 'error'
    const wrapper = mount(Alert, {
      props: { title, text, icon, type }
    })
    expect(wrapper.html()).toMatchSnapshot()
  },

  test('emits close event after 5 seconds', async () => {
    const wrapper = mount(Alert)
    await new Promise(resolve => setTimeout(resolve, 5000))
    expect(wrapper.emitted()).toHaveProperty("closeAlert")
  })
)})
