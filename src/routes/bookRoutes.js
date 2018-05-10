const express = require('express');
<<<<<<< HEAD
const sql = require('mssql');

const bookRouter = express.Router();
const debug = require('debug')('app:bookRoutes');
=======

const bookRouter = express.Router();
>>>>>>> parent of 79d624c... sql connected. going to do async part next

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
<<<<<<< HEAD
      (async function query() {
        const request = new sql.Request();
        const { recordset } = await request.query('select * from books');
        //  debug(result);
        res.render('bookListView', {
          nav,
          title: 'Library',
          books: recordset
        });
      }());
=======
      res.render(
        'bookListView',
        {
          nav,
          title: 'Library',
          books
        }
      );
>>>>>>> parent of 79d624c... sql connected. going to do async part next
    });
  bookRouter.route('/:id')
    .all((req, res, next) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request.input('id', sql.Int, id)
          .query('select * from books where id = @id');
        // req.book = recordset[0];
        [req.book] = recordset;
        next();
      }());
    })
    .get((req, res) => {
      res.render('bookView', {
        nav,
        title: 'Library',
        book: req.book
      });
    });
  return bookRouter;
}


module.exports = router;
