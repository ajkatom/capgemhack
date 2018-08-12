const Sequelize = require('sequelize');

// const conn = new Sequelize(
//   'postgresql://emotiondb.cmxtj7pruf8o.us-east-1.rds.amazonaws.com/emotionDB',
//   'WonBot',
//   'socialhack',
//   {
//     define: {
//       underscored: true
//     },
//     dialect: 'postgres'
//     'postgres://user:pass@example.com:5432/dbname'
//     //logging: false
//   }
// );
const conn = new Sequelize(
  'postgresql://WonBot:socialhack@emotiondb.cmxtj7pruf8o.us-east-1.rds.amazonaws.com/emotionDB',
  {
    define: {
      underscored: true
    },
    maxConcurrentQueries: 100,
    dialect: 'postgres',
    dialectOptions: {
      ssl: 'Amazon RDS'
    }
  }
);
conn
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = conn;
