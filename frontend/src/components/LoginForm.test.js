import React from 'react';
import { expect } from 'chai';
import { shallow,mount } from 'enzyme';
import sinon from 'sinon';
import LoginForm from './LoginForm';


describe('<LoginForm />', () => {

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<LoginForm display_form={onButtonClick} />);
    wrapper.find('button').at(0).simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
});