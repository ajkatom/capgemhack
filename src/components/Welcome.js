import React from 'react';
import { connect } from 'react-redux';
import Webcam from 'react-webcam';
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
            className="btn btn-outline-secondary mt-2"
            type="button"
          >
            Activate
              </button>
        </div>
        <div className="col-md-5 float-right">
          <button
            onClick={() => clearInterval(this.state.interval)}
            className="btn btn-outline-secondary mt-2"
            type="button"
          >
            Cancel
              </button>
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

