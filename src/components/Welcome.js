import React from 'react';
import { connect } from 'react-redux';
import Webcam from 'react-webcam';
var NotificationSystem = require('react-notification-system');
import axios from 'axios';

class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      _notificationSystem: {},
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
          Emotions.forEach(emotion => {
            const type = emotion.Type.toLowerCase();
            const count = this.state[type] + 1;
            this.setState({ [type]: count });
          })
        })
      console.log(this.state);
    }, 3000);
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
            className="btn btn-outline-secondary mr-2"
            type="button"
          >Activate</button>
          <button
            onClick={() => clearInterval(this.state.interval)}
            className="btn mr-4 btn-outline-secondary"
            type="button"
          >Cancel</button>
        </div>
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

