const router = require('express').Router();
const respond = require('../polly-speaker');
const axios = require('axios');
const AWS = require('aws-sdk');
// const Stream = require('stream');
// const Speaker = require('speaker');
// AWS.config.setPromisesDependency(require('bluebird'));
// AWS.config.update({
//   accessKeyId: 'AKIAISGYKWP46YOGWJJQ',
//   secretAccessKey: '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'
// });
const Rekognition = new AWS.Rekognition({
  accessKeyId: 'AKIAIFSKYTZKJYVLLQ5A',
  secretAccessKey: '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',
  region: 'us-east-2'
});
//AWS.config.region = 'us-east-2';
router.post('/', (req, res, next) => {
  const { pic } = req.body;
  const base64Image = pic.split(';base64,').pop();

  const image = './out.jpg';
  const params = {
    Image: {
      Bytes: new Buffer(
        base64Image.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      )
    },
    Attributes: ['ALL']
  };

  Rekognition.detectFaces(params, (err, data) => {
    if (err) {
      console.log(err);

      return next();
    }

    let score = 0;
    const emotion = data.FaceDetails[0].Emotions.filter(val => {
      let type = '';
      if (val.Confidence > score) {
        score = val.Confidence;
        return true;
      }
      return false;
    });
    res.send(emotion);
  });
});

module.exports = router;
