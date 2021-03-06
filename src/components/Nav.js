import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLogout } from '../redux/user';

class Nav extends React.Component {
  render() {
    let { user } = this.props;
    if (!user) user = {};
    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          {
            user.id ? <Link className='text-center navbar-brand' activeclassname='active' to='/welcome'>
              <img src='/public/favicon.ico' width='40' height='50' className='mr-3 d-inline-block' />
              Sentiment</Link> : <Link className='text-center navbar-brand' activeclassname='active' to='/'>
                <img src='/public/favicon.ico' width='40' height='50' className='mr-3 d-inline-block' />
                Sentiment</Link>
          }
          <div className='col-md-7' />
          <div className='col-md-3 collapse navbar-collapse justify-content-end'>
            <Link className='nav-link' to='/admin'>
              <button className='btn btn-outline-light my-1'>Stats</button></Link>
            {
              user.id ? <div className='row'>
                <Link className='nav-link' to='/Settings'>
                  <button className='btn btn-outline-light my-1'>Settings</button>
                </Link>
              <Link className='nav-link' to='/'>
                <button onClick={() => this.props.getLogout()} className='btn btn-outline-light my-1'>Logout</button>
                </Link> </div>:
                <Link className='nav-link' to='/welcome'>
                  <button className='btn btn-outline-light my-1'>Tracker</button>
                </Link>
            }
          </div>
        </nav>
      </div>
    );
  }
}


const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLogout: () => dispatch(getLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);

