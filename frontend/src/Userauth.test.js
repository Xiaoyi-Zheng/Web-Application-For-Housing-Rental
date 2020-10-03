import React from 'react';
import { expect } from 'chai';
import { shallow,mount } from 'enzyme';
import sinon from 'sinon';
import Userauth from './Userauth.js';
import LoginForm from './components/LoginForm.js';
import SignupForm from './components/SignupForm';
import Capp from './Capp';
describe('<LoginForm />', () => {

  it('CHECK userauth initial state', () => {
    const wrapper = mount(<Userauth />);
    expect(wrapper.state('logged_in')).to.equal(false);
  });
  it('CHECK userauth initial form', () => {

    const wrapper = mount(<Userauth />);
    expect(wrapper.find(LoginForm)).to.have.lengthOf(1);
  });
  it('CHECK userauth about sign up form', () => {

    const wrapper = mount(<Userauth />);
    wrapper.setState({ displayed_form: 'signup' });
    expect(wrapper.find(SignupForm)).to.have.lengthOf(1);
  });
  it('CHECK userauth login state', () => {

    const wrapper = mount(<Userauth />);
    wrapper.setState({ logged_in: true });
    expect(wrapper.find(Capp)).to.have.lengthOf(1);
  });
  it('CHECK userauth login state', () => {

    const wrapper = mount(<Userauth />);
    wrapper.setState({ logged_in: true });
    expect(wrapper.find(Capp)).to.have.lengthOf(1);
    //wrapper.find('button').at(1).simulate('click');
    //expect(wrapper.state('logged_in')).to.equal(false);
  });

  it('CHECK userauth about log out', () => {

    const wrapper = mount(<Userauth />);
    wrapper.setState({ logged_in: true });
    const instance = wrapper.instance();
    expect(wrapper.find(Capp)).to.have.lengthOf(1);
    instance.handle_logout();
    expect(wrapper.state('logged_in')).to.equal(false);
  });
});