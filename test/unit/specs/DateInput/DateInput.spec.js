import DateInput from '@/components/DateInput.vue'
import {flushPromises, mount} from '@vue/test-utils'
import {en} from '@/locale'

describe('DateInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(DateInput, {
      shallow: true,
      props: {
        selectedDate: new Date(2018, 2, 24),
        format: 'dd MMM yyyy',
        translation: en
      }
    })
  })

  it('should render correct contents', () => {
    expect(wrapper.findAll('input')).toHaveLength(1)
  })

  it('nulls date', async () => {
    wrapper.setProps({
      selectedDate: null
    })
    await flushPromises()
    expect(wrapper.vm.formattedValue).toBeNull()
    expect(wrapper.find('input').element.value).toEqual('')
  })

  it('formats date', () => {
    expect(wrapper.vm.formattedValue).toEqual('24 Mar 2018')
    expect(wrapper.find('input').element.value).toEqual('24 Mar 2018')
  })

  it('delegates date formatting', async () => {
    wrapper.setProps({
      selectedDate: new Date(2016, 1, 15),
      format: () => '2016/1/15'
    })
    await flushPromises()
    expect(wrapper.vm.formattedValue).toEqual('2016/1/15')
    expect(wrapper.find('input').element.value).toEqual('2016/1/15')
  })

  it('emits showCalendar', () => {
    wrapper.vm.showCalendar()
    expect(wrapper.emitted().showCalendar).toBeTruthy()
  })

  it('adds bootstrap classes', async () => {
    wrapper.setProps({
      bootstrapStyling: true
    })
    await flushPromises()
    expect(wrapper.find('input').element.classList).toContain('form-control')
  })

  it('appends bootstrap classes', async () => {
    wrapper.setProps({
      inputClass: 'someClass',
      bootstrapStyling: true
    })
    await flushPromises()
    expect(wrapper.find('input').element.classList).toContain('form-control')
    expect(wrapper.find('input').element.classList).toContain('someClass')
  })

  it('can be disabled', async () => {
    wrapper.setProps({
      disabled: true
    })
    await flushPromises()
    expect(wrapper.find('input').attributes().disabled).toBeDefined()
  })

  it('accepts a function as a formatter', async () => {
    wrapper.setProps({
      format: () => '!'
    })
    await flushPromises()
    expect(wrapper.find('input').element.value).toEqual('!')
  })

  it('triggers closeCalendar on blur', () => {
    wrapper.find('input').trigger('blur')
    expect(wrapper.emitted('closeCalendar')).toBeTruthy()
  })
})
