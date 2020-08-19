import React from 'react';
import { shallow } from 'enzyme';
import { Cover } from '../../../app/features/cover/Cover';

describe('Cover', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Cover />);
    expect(wrapper).toMatchSnapshot();
  });
});
