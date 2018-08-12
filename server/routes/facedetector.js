const router = require('express').Router();
const AWS = require('aws-sdk');
const Rekognition = new AWS.Rekognition({
  accessKeyId: 'AKIAJ4Z6X4I66AXYQQCQ',
  secretAccessKey: '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',
  region: 'us-east-2'
});
router.post('/', (req, res, next) => {
  console.log('ok');
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
    console.log(data.FaceDetails[0].Emotions);
    res.send(data);
  });
});

module.exports = router;
