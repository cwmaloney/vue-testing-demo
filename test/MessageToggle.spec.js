import { shallowMount } from '@vue/test-utils'
import MessageToggle from '../src/components/MessageToggle.vue'
import Message from '../src/components/Message.vue'

describe('MessageToggle.vue', () => {

  it('toggles message when button is clicked', () => {
    const propsData = {
      message1: "one",
      message2: "two"
    };
    const wrapper = shallowMount(MessageToggle, { propsData });
    const button = wrapper.find('#change-button');
    button.trigger('click');
    const MessageComponent = wrapper.find(Message);
    expect(MessageComponent.props()).toEqual({message: 'two'});
    button.trigger('click');
    expect(MessageComponent.props()).toEqual({message: 'one'});
  });

});
