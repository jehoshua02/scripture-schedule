var request = require('request');
var books = require('./scriptures/scrape/booksStream');
var log = require('./scriptures/scrape/logStream');

request('https://www.lds.org/scriptures/bofm')
  .pipe(books())
  .pipe(log());
