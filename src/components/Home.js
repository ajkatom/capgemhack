import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Chart from './Chart';

const Home = () => {
  return (
    <div className="home">
      <Chart />
    </div>
  );
};

// const mapStateToProps = ({ user }) => {
//   return {
//     user
//   };
// };

export default connect(null)(Home);
