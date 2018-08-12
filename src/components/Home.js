import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="text">
        <h1>Welcome To sentiment</h1>
        <h2>Keeping your work/life balance and your wellbeing tomorrow</h2>
        <div>
          <Link to="#">
            <button className="btn btn-outline-secondary">Activate</button>
          </Link>
        </div>
        <div>
          <Link to="#">
            <button className="btn btn-outline-secondary">Share</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = ({ user }) => {
//   return {
//     user
//   };
// };

export default connect(null)(Home);
