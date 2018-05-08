const express = require('express');
const sql = require('mssql');
const bookRouter = express.Router();
const debug = require('debug')('app:bookRoutes');
function router(nav) {
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
  bookRouter.route('/')
    .get((req, res) => {
      const request = new sql.Request();

      request.query('select * from books')
        .then((result) => {
          debug(result);
          res.render(
            'bookListView',
            {
              nav,
              title: 'Library',
              books: result.recordset
            }
          );
        });
    });
  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book: books[id]
        }
      );
    });
  return bookRouter;
}


module.exports = router;
