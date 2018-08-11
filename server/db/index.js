const conn = require('./conn');
const User = require('./models/User');

const sync = () => conn.sync({ force: true });

const seed = () => {
  return Promise.all([
    User.create({ name: 'ca', faceId: 'd4b11fdc9d2b471797d', gender: 'M', race: 'asian', age: 20, admin: true })
  ])
};

module.exports = {
  conn,
  sync,
  seed,
  models: {
    User
  }
};
