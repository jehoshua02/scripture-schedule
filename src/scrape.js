var request = require('request');
var scraper = require('./scriptures/scrape/scrapeStream');
var books = require('./scriptures/scrape/books');
var log = require('./scriptures/scrape/logStream');

request('https://www.lds.org/scriptures/bofm')
  .pipe(scraper({scrape: books}))
  .pipe(log());
