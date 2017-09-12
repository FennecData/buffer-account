import React from 'react';
import { mount } from 'enzyme';
import InputWeekday from './index';

describe('InputWeekday', () => {
  it('should trigger onChange when day is selected', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <InputWeekday
        input={{
          onChange,
          value: '',
        }}
      />,
    );
    wrapper
      .find('select')
      .first()
      .simulate('change', { target: { value: 'wed' } });
    expect(onChange)
      .toBeCalledWith({
        day: 'wed',
      });
  });
});
