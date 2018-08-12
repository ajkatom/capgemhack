import React, { Component } from 'react';
import { connect } from 'react-redux';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      settings: [{ name: 'Voice', on: false }, { name: 'Share', on: false }]
    };
    this.activate = this.activate.bind(this);
  }

  activate(e) {
    this.setState({ [e.name]: e.on = !e.on });
  }

  render() {
    const { settings } = this.state;
    console.log(this.props);
    const { user } = this.props;
    return (
      <div className='container'>
        <div className='mt-5'>
          <div className='col-lg-4' />
          <h5>User name: {user.name}</h5>
          <div className='row'>
            {settings &&
              settings.map(setting => {
                return (
                  <div className="user-row mr-4 mt-5" key={setting.name}>
                    <div>
                      <span>{`${setting.name} Notifications `}</span>
                      <label className="switch">
                        <input
                          checked={setting.on}
                          type="checkbox"
                          datatype="toggle"
                          onChange={() => this.activate(setting)}
                          name={setting.name}
                        />
                        <span className="slider" />
                      </label>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, user }) => {
  return {
    users,
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLoggedIn: user => dispatch(getLoggedIn(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
