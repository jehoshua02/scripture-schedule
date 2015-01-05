var through = require('through2');
var $ = require('cheerio');


var booksStream = function () {
  var html = '';

  function collect(chunk, enc, callback) {
    console.log('collect');
    html += chunk.toString();
    callback();
  }

  function process(callback) {
    console.log('process');

    var $html = $(html);
    var $books = $html.find('.books .tocEntry');
    console.log($books.length);

    var self = this;
    $books.each(function (index, book) {
      var $book = $(book);
      self.push({
        name: $book.text(),
        url: $book.attr('href')
      });
    });

    return callback();
  }

  return through.obj(collect, process);
};

module.exports = booksStream;
