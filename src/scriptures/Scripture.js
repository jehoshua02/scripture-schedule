var Schedule = require('./Schedule');
var Reference = require('./Reference');


var add = function (a, b) {
  return a + b;
};

var Scripture = function (props) {
  this.props = props;
};

Scripture.prototype = {

  getVerses: function () {
    return this.props.data.books.map(function (book) {
      return book.chapters.reduce(add);
    }).reduce(add);
  },

  makeSchedule: function (props) {
    props.scripture = this;
    return new Schedule(props);
  },

  getReference: function (verse) {
    var bookLimit = this.props.data.books.length;
    for (var bookIndex = 0; bookIndex < bookLimit; bookIndex++) {
      var book = this.props.data.books[bookIndex];
      var chapterLimit = book.chapters.length;
      for (var chapterIndex = 0; chapterIndex < chapterLimit; chapterIndex++) {
        var chapter = chapterIndex + 1;
        var verses = book.chapters[chapterIndex];
        if (verse <= verses) {
          return new Reference({
            book: book.name,
            chapter: chapter,
            verse: verse
          });
        } else {
          verse -= verses;
        }
      }
    }
  }

};

module.exports = Scripture;
