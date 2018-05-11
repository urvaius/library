const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(bookService, nav) {
  function getIndex(req, res) {
    const url = 'mongodb://urvaius:Buffy11%24@arne-5-mongo1-shard-00-00-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-01-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-02-ujozx.mongodb.net:27017/test?ssl=true&replicaSet=arne-5-mongo1-shard-0&authSource=admin';
    // const url = 'mongodb+srv://urvaius:Buffy11$@arne-5-mongo1-ujozx.mongodb.net/test';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected to server');

        const db = client.db(dbName);

        const col = await db.collection('books');

        const books = await col.find().toArray();

        res.render('bookListView', {
          nav,
          title: 'Library',
          books
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }
  function getById(req, res) {
    const {
      id
    } = req.params;
    const url = 'mongodb://urvaius:Buffy11%24@arne-5-mongo1-shard-00-00-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-01-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-02-ujozx.mongodb.net:27017/test?ssl=true&replicaSet=arne-5-mongo1-shard-0&authSource=admin';
    // const url = 'mongodb+srv://urvaius:Buffy11$@arne-5-mongo1-ujozx.mongodb.net/test';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to mongo server');

        const db = client.db(dbName);
        const col = await db.collection('books');

        const book = await col.findOne({ _id: new ObjectID(id) });
        debug(book);

        book.details = await bookService.getBookById(book.bookId);
        res.render('bookView', {
          nav,
          title: 'Library',
          book
        });
      } catch (err) {
        debug(err.stack);
      }
    }());
  }

  function middleware(req, res, next) {
    // if (req.user) {
    next();
    // } else {
    //  res.redirect('/');
    // }
  }
  return {
    getIndex,
    getById,
    middleware
  };
}

module.exports = bookController;
