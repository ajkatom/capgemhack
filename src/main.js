import { Container } from 'reactstrap';
import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Chart from './Chart';

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Chart />
        </Container>
      </Router>
    );
  }
}
