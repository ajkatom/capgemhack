const router = require('express').Router();
const { Response } = require('../db').models;
const polly = require('../polly-speaker');

router.get('/', (req, res, next) => {
  let response = '';
  return Response.findAll().then(responses =>
    responses.map(response => {
      console.log(responses);
      console.log(typeof req.query.emotion);
      switch (req.query.emotion) {
        case 'HAPPY':
          response = `<speak>
          I want to tell you a secret.
          <amazon:effect name="whispered">I am not a real human.</amazon:effect>.
          Can you believe it?
      </speak>`;
          //response = responses[0].Response;
          break;
        case 'SAD':
          response = responses[1].Response;
          break;
        case 'ANGRY':
          response = responses[2].Response;
          break;
        case 'CONFUSED':
          response = responses[3].Response;
          break;
        case 'DISGUSTED':
          response = responses[4].Response;
          break;
        case 'SURPRISED':
          response = responses[5].Response;
          break;
        case 'CALM':
          response = responses[6].Response;
          break;
        default:
          response = `<speak>
          I want to tell you a secret.
          <amazon:effect name="whispered">I am not a real human.</amazon:effect>.
          Can you believe it?
      </speak>`;
      }
      if (!response)
        response = `<speak>
          I want to tell you a secret.
          <amazon:effect name="whispered">I am not a real human.</amazon:effect>.
          Can you believe it?
      </speak>`;
      polly(response);
    })
  );
  res.sendStatus(200);
});

module.exports = router;
