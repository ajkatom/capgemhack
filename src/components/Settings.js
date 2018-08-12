import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      settings: [{ name: 'Voice', on: false }, { name: 'Share', on: false }]
    };
    this.activate = this.activate.bind(this);
  }

  activate(e) {
    console.log(e)
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { settings } = this.state;
    console.log(settings);
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-4' />
          {settings &&
            settings.map(setting => {
              return (
                <div className="user-row" key={setting.name}>
                  <div>
                    <span>{`${setting.name} Notifications `}</span>
                    <label className="switch">
                      <input
                        checked={setting.on}
                        type="checkbox"
                        datatype="toggle"
                        onChange={() => this.activate(setting)}
                        name = {setting.name}
                      />
                      <span className="slider" />
                    </label>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
