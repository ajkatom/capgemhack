const conn = require('./conn');
const User = require('./models/User');
const Emotion = require('./models/User');
const Response = require('./models/Response');

const sync = () => conn.sync({ force: true });

const seed = () => {
  return Promise.all([
    Response.create({
      id: 2,
      Response: `<speak><amazon:effect phonation="soft">I know you’re angry but try to come calm down.<break>Please?
      </break>Go take a walk.</amazon:effect></speak>`,
      is_email: false
    }),
    Response.create({
      id: 4,
      Response: ` <speak><amazon: effect name="whispered"> Hide that stank face!
       <emphasis level=”reduced”> Not a good look! </emphasis></amazon: effect></speak>`,
      is_email: false
    }),
    Response.create({
      id: 0,
      Response: `speak><break strength=”x-strong”><emphasis level=”strong”>Hey! 
      </emphasis></break><emphasis level=”strong”> You sure look happy today!</emphasis>
       <amazon: effect name="whispered"> Did something interesting happen?</amazon: effect> </speak>`,
      is_email: false
    }),
    Response.create({
      id: 1,
      Response: `<speak> <amazon:effect phonation="soft"> Awwww. Are you okay? 
      I think someone needs a hug!</amazon:effect>
      You should take a break and go talk to a friend.</speak>`,
      is_email: false
    }),
    Response.create({
      id: 5,
      Response: `<speak>What’s so surprising?Everything ok? <amazon:effect phonation="soft"> Do you need a Break</amazon:effect></speak>`,
      is_email: false
    }),
    Response.create({
      id: 3,
      Response: `<speak>You look confused. You should take a break, walk around. 
      <emphasis level=”strong”>Clear your mind.</emphasis></speak>`,
      is_email: false
    }),
    Response.create({
      id: 6,
      Response: `<speak>You sure are calm.<emphasis level=”strong”> you are in zone</emphasis> </speak>`,
      is_email: false
    }),
    Response.create({
      id: 9,
      Response: `Hey honey rough day at work ,I just want to get home and relax`,
      is_email: true
    }),
    Response.create({
      id: 7,
      Response: `hey sir/ma'am can we have a one on one soon?`,
      is_email: true
    }),
    Response.create({
      id: 8,
      Response: `Hey honey great day at work ,lets go out to dinner`,
      is_email: true
    })
  ]).catch(err => console.log(err));
};

module.exports = {
  conn,
  sync,
  seed,
  models: {
    User,
    Emotion,
    Response
  }
};
