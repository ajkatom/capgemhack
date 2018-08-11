import React from 'react';
import { connect } from 'react-redux';
import Video from './Video';
import Webcam from 'react-webcam';
import VideoExample from './Video';
class Welcome extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stream: ''
    }
    this.setRef = this.setRef.bind(this);
  }
  setRef(webcam) {
    this.webcam = webcam;
  }

  handleUserMedia() {
    const stream = this.webcam.stream;
    console.log(stream);
  }

  render() {
    const { user } = this.props;

    if (!user) {
      return null;
    }
    return (
      <div className='container'>
        <div>
          <h4 className='text-center mt-5'>Welcome! {user.name}</h4>
        </div>
        <div className='row'>
          <div className='col-md-4' />
          <VideoExample />
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

