const AWS = require('aws-sdk');

const env = require('./config');
Object.assign(process.env, env)

AWS.config.region = 'us-east-2'

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: process.env.IdentityPoolId
});

const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

});

// let Bucket

// S3.listBuckets((err, response)=>{
//   Bucket = response.Buckets[0]
// })




const rekognition = new AWS.Rekognition({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})


module.exports = rekognition;


console.log(rekognition)
