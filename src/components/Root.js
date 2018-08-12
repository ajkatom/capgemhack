import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUsers } from '../redux/users';
import { getLoggedIn } from '../redux/user';

import Nav from './Nav';
import Verify from './Verify';
import Welcome from './Welcome';
import Main from './Main';
import Chart from './Chart';
import Home from './Home';
import Settings from './Settings';
import Admin from './Admin';

class Root extends React.Component {
  componentDidMount() {
   // this.props.fetchUsers();
   // this.props.getLoggedIn();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
            <Route exact path="/" component={Main} />
            <Route exact path="/verify" render={({ history }) => <Verify history={history} />} />
            <Route exact path="/welcome" render={({ history }) => <Welcome history={history} />} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/chart" component={Chart} />
            <Route exact path='/admin' render={({ history }) => <Admin history={history} />} />
          </div>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    getLoggedIn: () => dispatch(getLoggedIn())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Root);
