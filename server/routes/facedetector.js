const router = require('express').Router();
const AWS = require('aws-sdk');
const Rekognition = new AWS.Rekognition({
  accessKeyId: 'AKIAJUDMCVZBKF22A7TQ',
  secretAccessKey: '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',
  region: 'us-east-2'
});
//AWS.config.region = 'us-east-2';
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
    console.log(data.FaceDetails[0].Smile);
    res.send(data);
  });
});

module.exports = router;