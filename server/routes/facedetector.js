const router = require('express').Router();
const AWS = require('aws-sdk');
const Rekognition = new AWS.Rekognition({
  accessKeyId: 'key goes here',
  secretAccessKey: 'secret goes here',
  region: 'us-east-2'
});
//AWS.config.region = 'us-east-2';
router.post('/', (req, res, next) => {
  console.log('ok');
  const { pic } = req.body;
  const base64Image = pic.split(';base64,').pop();

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
    console.log(data.FaceDetails);
    res.send(data);
  });
});

module.exports = router;
