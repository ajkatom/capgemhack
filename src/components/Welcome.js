import React from 'react';
import { connect } from 'react-redux';
import Webcam from 'react-webcam';
var NotificationSystem = require('react-notification-system');
import axios from 'axios';
import Notify from 'notifyjs';

class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      happy: 0,
      sad: 0,
      angry: 0,
      confused: 0,
      disgusted: 0,
      surprised: 0,
      calm: 0,
      unknown: 0,
      interval: 0
    }
    this.setRef = this.setRef.bind(this);
    this.capture = this.capture.bind(this);
    this.doNotification = this.doNotification.bind(this);
    this._notificationSystem = null;
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
    if (!Notify.needsPermission) {
    } else if (Notify.isSupported()) {
      Notify.requestPermission(onPermissionGranted, onPermissionDenied);
    }

    function onPermissionGranted() {
      console.log('Permission has been granted by the user');
    }

    function onPermissionDenied() {
      console.warn('Permission has been denied by the user');
    }
  }

  doNotification(text) {
    var myNotification = new Notify('Balance Yoself', {
      body: text,
      tag: '',
      timeout: 4
    });
    myNotification.show();
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
              // this._notificationSystem.addNotification({
              //   message: 'Keep up the good mood!',
              //   level: 'success'
              // })
              this.doNotification('Keep up the good mood!');
            }
            if (type === 'angry') {
              // this._notificationSystem.addNotification({
              //   message: 'Whoa. You should step away to cool off.',
              //   level: 'error'
              // })
              this.doNotification('Whoa. You should step away to cool off.');
            }
            if (type === 'sad') {
              // this._notificationSystem.addNotification({
              //   message: 'Hey, you can get through this!',
              //   level: 'warning'
              // })
              this.doNotification('Hey, you can get through this!');
            }
            if (type === 'confused') {
              // this._notificationSystem.addNotification({
              //   message: 'You may want to pull up Google for that.',
              //   level: 'info'
              // })
              this.doNotification('You may want to pull up Google for that.');
            }
            if (type === 'calm') {
              this.doNotification('You are just too chill right now.');
            }
            if (type === 'disgusted') {
              this.doNotification('What is that smell?');
            }
            if (type === 'surprised') {
              this.doNotification('Well, that was quite the surprise.');
            }
          }
        })
      console.log(this.state);
    }, 2000);
    this.setState({ interval });
  }

  render() {
    // const { user } = this.props;
    return (
      <div className='container'>
        <div>

        </div>
        <div className='row'>
          <div className='col-md-3' />
          <Webcam
            audio={false}
            video={false}
            height={520}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={600}
            screenshotQuality={0.2}
          />
        </div>
        <div className="col-md-5 float-right">
          <button
            onClick={this.capture}
            className="btn btn-outline-success mr-2"
            type="button"
          >Activate</button>
          <button
            onClick={() => clearInterval(this.state.interval)}
            className="btn mr-4 btn-outline-warning"
            type="button"
          >Stop</button>
        </div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    )
  }
}


const mapStateToProps = ({ user }) => {
  return {
    //  user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
