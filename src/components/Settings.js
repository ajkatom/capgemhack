import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      settings: [{ name: 'voice', on: false }, { name: 'share', on: true }]
    };
  }
  render() {
    const { settings } = this.state;
    console.log(settings);
    return (
      <div>
        {settings &&
          settings.map(setting => {
            return (
              <div className="user-row" key={setting.name}>
                <div>
                  <span>{`${setting.name} Notifications`}</span>
                  <label className="switch">
                    <input
                      checked={setting.on}
                      type="checkbox"
                      datatype="toggle"
                      onChange={() => activate(setting)}
                    />
                    <span className="slider" />
                  </label>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
