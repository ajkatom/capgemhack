const AWS = require('aws-sdk');
const Stream = require('stream');
const Speaker = require('speaker');

AWS.config.setPromisesDependency(require('bluebird'));
AWS.config.update({
  accessKeyId: 'AKIAJ5BIIJJXJ6NPCZ5A',
  secretAccessKey: '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',
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
    I want to tell you a secret.
    <amazon:effect name="whispered">I am not a real human.</amazon:effect>.
    Can you believe it?
</speak>
`;

let params = {
  OutputFormat: 'pcm',
  VoiceId: 'Kimberly',
  Text: text,
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
