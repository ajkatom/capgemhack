const AWS = require('aws-sdk');
const Stream = require('stream');
const Speaker = require('speaker');
AWS.config.setPromisesDependency(require('bluebird'));
AWS.config.update({
  accessKeyId: 'AKIAIFSKYTZKJYVLLQ5A',
  secretAccessKey: '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'
});

const respond = text => {
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
};

module.exports = respond;
