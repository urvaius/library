const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app.local.strategy');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      const url = 'mongodb://urvaius:Buffy11%24@arne-5-mongo1-shard-00-00-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-01-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-02-ujozx.mongodb.net:27017/test?ssl=true&replicaSet=arne-5-mongo1-shard-0&authSource=admin';
      // const url = 'mongodb+srv://urvaius:Buffy11$@arne-5-mongo1-ujozx.mongodb.net/test';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;

        try {
          client = await MongoClient.connect(url);

          debug('connected to mongo db');

          const db = client.db(dbName);
          const col = db.collection('users');

          const user = await col.findOne({ username });

          if (user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          console.log(err.stack);
        }
        client.close();
      }());
    }));
};
