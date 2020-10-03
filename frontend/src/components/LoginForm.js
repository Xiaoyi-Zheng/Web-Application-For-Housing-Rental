import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <div class="card">
        <article class="card-body">
        <button onClick={() => this.props.display_form('signup')} class="float-right btn btn-outline-primary">Sign up</button>
        <h4 class="card-title mb-4 mt-1">Log in</h4>
          <form onSubmit={e => this.props.handle_login(e, this.state)}>
            <div class="form-group">
              <label htmlFor="username">Username</label>
              <input name="username" class="form-control" placeholder="Username" type="text"         
                value={this.state.username}
                onChange={this.handle_change}/>
            </div>
            <div class="form-group">
            <label htmlFor="password">Password</label>
            <input name="password" class="form-control" placeholder="******" type="password"
            value={this.state.password}
            onChange={this.handle_change}
            />
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block"> Login  </button>
            </div> 
          </form>
        </article>
      </div> 
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired,
  display_form: PropTypes.func.isRequired
};