import React from 'react';
import { connect } from 'react-redux';
import Webcam from 'react-webcam';
var NotificationSystem = require('react-notification-system');

class Welcome extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      _notificationSystem: {}
    }
    this.setRef = this.setRef.bind(this);
  }

  // _addNotification(ev) {
  //   ev.preventDefault();
  //   this.setState(_notificationSystem.addNotification({
  //     message: 'Notification message',
  //     level: 'success'
  //   }))
  // }

  // componentDidMount() {
  //   this._notificationSystem = this.refs.notificationSystem;
  // }

  setRef(webcam) {
    this.webcam = webcam;
  }

  capture() {
    this.setState({
      load: true
    });

    const imageSrc = this.webcam.getScreenshot();
    axios
      .post('/api/facedetector', { pic: imageSrc })
      .then(res => res.data)
      .then(_faces => {
        console.log(_faces.FaceDetails[0].Emotions);
      });
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
          <Webcam
            audio={false}
            video={false}
            height={320}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={480}
            screenshotQuality={0.2}
          />
        </div>
        <div>
          <button onClick={this._addNotification}>Add notification</button>
          <NotificationSystem ref="notificationSystem" />
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

