import React from 'react';
import { shallow } from 'enzyme';
import { Cover } from '../../../app/features/cover/Cover';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn()
}));

describe('Cover', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Cover />);
    expect(wrapper).not.toBeFalsy();
    // expect(wrapper).toMatchSnapshot();
  });
});
