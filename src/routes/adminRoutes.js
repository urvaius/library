const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

const books = [{
  title: 'war and peace',
  genre: 'Historical Fiction',
  author: 'Lev Nikolayevich Tolstoy',
  read: false
},
{
  title: 'Les Miserables',
  genre: 'Historical Fiction',
  author: 'Victor Hugo',
  read: false
},
{
  title: 'Sword Of Shannara',
  genre: 'Fantasy',
  author: 'Terry Brooks',
  read: true
}
];
function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://urvaius:Buffy11%24@arne-5-mongo1-shard-00-00-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-01-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-02-ujozx.mongodb.net:27017/test?ssl=true&replicaSet=arne-5-mongo1-shard-0&authSource=admin';
      // const url = 'mongodb+srv://urvaius:Buffy11$@arne-5-mongo1-ujozx.mongodb.net/test';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connected to server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
