import { shallowMount } from '@vue/test-utils'
import MessageList from '../src/components/MessageList.vue'

describe('MessageList.vue', () => {

  it('renders li for each message', () => {
    const messages = ['Apple', 'Orange', 'Banana'];
    const wrapper = shallowMount(MessageList, {
      propsData: { messages }
    });
    expect(wrapper.findAll('li')).toHaveLength(messages.length);
  });

  it('rendors items', () => {
    const items = ['item1', 'item2'];
    const wrapper = shallowMount(MessageList, {
      propsData: { items }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

});
