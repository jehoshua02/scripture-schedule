var $ = require('cheerio');


var scrapeBooks = function (html) {
  var books = [];

  var $html = $(html);
  var $books = $html.find('.books .tocEntry');

  $books.each(function (index, book) {
    var $book = $(book);
    books.push({
      name: $book.text(),
      url: $book.attr('href')
    });
  });

  return books;
};

module.exports = scrapeBooks;
