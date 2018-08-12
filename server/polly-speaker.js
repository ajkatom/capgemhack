const AWS = require('aws-sdk');
const Stream = require('stream');
const Speaker = require('speaker');

AWS.config.setPromisesDependency(require('bluebird'));
AWS.config.update({
  accessKeyId: 'AKIAIHRJSCASFHGSPT5Q',
  secretAccessKey: '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'
});

// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1'
});

// Create the Speaker instance
const Player = new Speaker({
  channels: 1,
  bitDepth: 16,
  sampleRate: 16000
});
const text = `<speak>
    Here is a number <w role="amazon:VBD">read</w> 
    as a cardinal number: 
    <say-as interpret-as="cardinal">12345</say-as>. 
    Here is a word spelled out: 
    <say-as interpret-as="spell-out">hello</say-as>. 
</speak>`;
// let params = {
//   Text: text,
//   OutputFormat: 'pcm',
//   VoiceId: 'Kimberly',
//   SpeechMarkTypes: ['ssml'],
//   TextType: 'ssml'
// };
let params = {
  OutputFormat: 'pcm',
  VoiceId: 'Kimberly',
  Text: '<speak>Hi, my name is @anaptfox.</speak>',
  SpeechMarkTypes: ['ssml'],
  TextType: 'ssml'
};

let synthesizeSpeechPromise = Polly.synthesizeSpeech(params).promise();
synthesizeSpeechPromise
  .then(data => {
    if (data.AudioStream instanceof Buffer) {
      // Initiate the source
      var bufferStream = new Stream.PassThrough();
      // convert AudioStream into a readable stream
      bufferStream.end(data.AudioStream);
      // Pipe into Player
      bufferStream.pipe(Player);
    }
  })
  .catch(err => console.log(err));
