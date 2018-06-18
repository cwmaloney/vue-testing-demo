import { shallowMount } from '@vue/test-utils'
import Message from '../src/components/Message.vue'

describe('Message.vue', () => {
  it('display the message defined in propos', () => {
    const message = 'test message';
    const wrapper = shallowMount(Message, {
      propsData: { message }
    });
    expect(wrapper.text()).toBe(message);
  });

  it('displays default message if no messages defined', () => {
    const defaultMessage = 'no message';
    const wrapper = shallowMount(Message);
    expect(wrapper.text()).toBe(defaultMessage);
  });
});
