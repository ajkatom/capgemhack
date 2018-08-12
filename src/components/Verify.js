import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { connect } from 'react-redux';
// import config from '../../config';

import { createUser } from '../redux/users';
import { getLoggedIn, getLogout } from '../redux/user';

class Verify extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.states(this.props);
    this.setRef = this.setRef.bind(this);
    this.capture = this.capture.bind(this);
    // this.enroll = this.enroll.bind(this);
    // this.onChange = this.onChange.bind(this);
    // this.delete = this.delete.bind(this);
  }

  states(props) {
    return {
      load: false,
      register: false,
      name: '',
      faceId: '',
      age: 0,
      gender: '',
      race: '',
      state: 0,
      happy: 0,
      sad: 0,
      angry: 0,
      confused: 0,
      disgusted: 0,
      surprised: 0,
      calm: 0,
      unknown: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.states(nextProps));
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
            this.setState({[type]: count});
          })
        })
        console.log(this.state);
    }, 3000);
    this.setState({ interval });
  }

  //   axios.post(`https://api.kairos.com/recognize`, {
  //     gallery_name: "newGallery",
  //     image: imageSrc,
  //   }, {
  //       headers: {
  //         app_id: config.kairosId,
  //         app_key: config.kairosKey
  //       }
  //     }).then((response) => {
  //       if (response.data.Errors || response.data.images[0].transaction.message === 'no match found') {
  //         axios.post(`https://api.kairos.com/detect`, {
  //           gallery_name: "newGallery",
  //           image: imageSrc,
  //         }, {
  //             headers: {
  //               app_id: config.kairosId,
  //               app_key: config.kairosKey
  //             }
  //           }).then((response) => {
  //             this.setState({
  //               load: false,
  //               gender: response.data.images[0].faces[0].attributes.gender.type,
  //               register: true,
  //             });

  //           })
  //       } else {
  //         const faceID = response.data.images[0].transaction.face_id;
  //         const user = this.props.users.find(user => user.faceId === faceID);
  //         this.setState({ load: false });
  //         this.props.getLoggedIn(user);
  //         this.props.history.push('/welcome');
  //       }
  //     });
  // }

  // enroll() {
  //   this.setState({
  //     load: true
  //   });

  //   const imageSrc = this.webcam.getScreenshot();

  //   axios.post(`https://api.kairos.com/enroll`, {
  //     gallery_name: "newGallery",
  //     image: imageSrc,
  //     subject_id: this.state.name
  //   }, {
  //       headers: {
  //         app_id: config.kairosId,
  //         app_key: config.kairosKey
  //       }
  //     }).then((response) => {
  //       if (response.data.images) {
  //         if (response.data.images[0].transaction)
  //           var race = [
  //             { race: 'asian', value: response.data.images[0].attributes.asian },
  //             { race: 'black', value: response.data.images[0].attributes.black },
  //             { race: 'hispanic', value: response.data.images[0].attributes.hispanic },
  //             { race: 'white', value: response.data.images[0].attributes.asian },
  //           ]

  //         const tmpRace = race.reduce((current, next) => {
  //           if (current.value < next.value) {
  //             current = next;
  //           }
  //           return current
  //         })

  //         this.setState({
  //           faceId: response.data.images[0].transaction.face_id,
  //           load: false,
  //           age: response.data.images[0].attributes.age,
  //           race:tmpRace.race
  //         })
  //       }

  //       const user = {
  //         name: this.state.name,
  //         faceId: this.state.faceId,
  //         age: this.state.age,
  //         gender: this.state.gender,
  //         race: this.state.race
  //       }
  //       this.props.createUser(user);
  //       this.props.getLoggedIn(user);
  //       this.props.history.push('/welcome');
  //     })
  // }

  // delete() {
  //   this.setState({
  //     load: true
  //   });

  //   const imageSrc = this.webcam.getScreenshot();
  //   axios.post(`https://api.kairos.com/gallery/remove`, {
  //     gallery_name: "newGallery",
  //   }, {
  //       headers: {
  //         app_id: config.kairosId,
  //         app_key: config.kairosKey
  //       }
  //     }).then((response) => {
  //       this.setState({
  //         load: false,
  //       })
  //       this.props.getLogout();
  //     }
  //     )
  // }

  // onChange(e) {
  //   this.setState({ [e.target.name]: e.target.value });

  render() {
    const { register, name, gender } = this.state;
    return (
      <div className="container-fluid">
        {/* <button
          onClick={this.delete}
          className="input-group-append btn btn-outline-secondary"
          type="button"
        >
          delete
        </button> */}
        {register ? (
          <div>
            <div className="text-center mt-5">
              <h4>
                Hello
                <span className="text-danger">
                  {gender == 'M' ? ' Sir, ' : " Ma'am "}
                </span>
                Welcome{' '}
              </h4>
              <h4>Please register your name</h4>
            </div>
            <div className="row">
              <div className="col-md-4" />
              <Webcam
                audio={false}
                height={320}
                ref={this.setRef}
                screenshotFormat="image/jpg"
                width={480}
              />
            </div>
          </div>
        ) : (
            <div>
              <div className="text-center">
                <h3>Capture</h3>
              </div>
              <div className="row">
                <div className="col-md-4" />
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
          )}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: user => dispatch(createUser(user)),
    getLoggedIn: user => dispatch(getLoggedIn(user)),
    getLogout: () => dispatch(getLogout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verify);
