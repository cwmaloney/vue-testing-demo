import { shallowMount } from '@vue/test-utils'
import Counter from '../src/components/Counter.vue'

//import { extendExpect, attachSnapshot, detachSnapshot } from "./SnapshotUtilities.js"

// import snapshot from "snap-shot-it";

//extendExpect();

describe('Counter.vue', () => {

  //beforeEach(attachSnapshot);

  //afterEach(detachSnapshot);

  it('increments count when button is clicked', () => {
    const wrapper = shallowMount(Counter);
    wrapper.find("#increment-button").trigger('click');
    expect(wrapper.find('div').text()).toContain('1');
  });

  it('decrements count when button is clicked', () => {
    const wrapper = shallowMount(Counter);
    wrapper.find("#decrement-button").trigger('click');
    expect(wrapper.find('div').text()).toContain('-1');
  });

  it('rendors counter', () => {
    const wrapper = shallowMount(Counter);
    expect(wrapper.html()).toMatchSnapshot();
    // snapshot(wrapper.html());
  });

});
