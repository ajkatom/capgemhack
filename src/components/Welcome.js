import React from 'react';
import { connect } from 'react-redux';
import Webcam from 'react-webcam';
var NotificationSystem = require('react-notification-system');
import axios from 'axios';

class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stream: '',
      happy: 0,
      sad: 0,
      angry: 0,
      confused: 0,
      disgusted: 0,
      surprised: 0,
      calm: 0,
      unknown: 0
    }
    this.setRef = this.setRef.bind(this);
    this.capture = this.capture.bind(this);
    this._notificationSystem = null;
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  setRef(webcam) {
    this.webcam = webcam;
  }

  capture() {
    this.setState({
      load: true
    });
    let imageSrc = this.webcam.getScreenshot();
    axios
      .post('/api/facedetector', { pic: imageSrc })
      .then(res => res.data)
      .then(_faces => {
        const { Emotions, AgeRange, Eyeglasses } = _faces.FaceDetails[0];
        console.log(this.state);
      });
    const interval = setInterval(() => {
      imageSrc = this.webcam.getScreenshot();
      axios
        .post('/api/facedetector', { pic: imageSrc })
        .then(res => res.data)
        .then(_faces => {
          const { Emotions } = _faces.FaceDetails[0];
          let confident;
          let most = -Infinity;
          Emotions.forEach(emotion => {
            if (emotion.Confidence > most) {
              most = emotion.Confidence;
              confident = emotion.Type;
            }
          })
          const type = confident.toLowerCase();
          const count = this.state[type] + 1;
          this.setState({ [type]: count });
          if (count > 1 && count % 2 === 0) {
            if (type === 'happy') {
              this._notificationSystem.addNotification({
                message: 'Keep up the good mood!',
                level: 'success'
              })
            }
            if (type === 'angry') {
              this._notificationSystem.addNotification({
                message: 'Whoa. You should step away to cool off.',
                level: 'error'
              })
            }
            if (type === 'sad') {
              this._notificationSystem.addNotification({
                message: 'Hey, you can get through this!',
                level: 'warning'
              })
            }
            if (type === 'confused') {
              this._notificationSystem.addNotification({
                message: 'You may want to pull up Google for that.',
                level: 'info'
              })
            }
          }
        })
      console.log(this.state);
    }, 3000);
    this.setState({ interval });
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
        <div className="col-md-5 float-right">
          <button
            onClick={this.capture}
            className="btn btn-outline-success mt-2"
            type="button"
          >
            Activate
              </button>
        </div>
        <div className="col-md-5 float-left">
          <button
            onClick={() => clearInterval(this.state.interval)}
            className="btn btn-outline-warning mt-2"
            type="button"
          >
            Stop
              </button>
        </div>
        <NotificationSystem ref="notificationSystem" />
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

