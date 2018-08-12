import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="row">
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
