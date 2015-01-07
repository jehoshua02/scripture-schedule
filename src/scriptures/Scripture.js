var Schedule = require('./Schedule');
var Reference = require('./Reference');
var Book = require('./Book');


var Scripture = function (props) {
  this.props = props;

  this.props.books = this.props.books.map(function (book) {
    return new Book(book);
  });
};

Scripture.prototype = {

  getVerses: function () {
    var verses = 0;
    this.props.books.forEach(function (book) {
      verses += book.getVerses();
    });
    return verses;
  },

  makeSchedule: function (props) {
    props.scripture = this;
    return new Schedule(props);
  },

  getReference: function (verse) {
    var bookLimit = this.props.books.length;
    for (var bookIndex = 0; bookIndex < bookLimit; bookIndex++) {
      var book = this.props.books[bookIndex];
      var chapterLimit = book.props.chapters.length;
      for (var chapterIndex = 0; chapterIndex < chapterLimit; chapterIndex++) {
        var chapter = chapterIndex + 1;
        var verses = book.props.chapters[chapterIndex].verses;
        if (verse <= verses) {
          return new Reference({
            book: book.props.name,
            chapter: chapter,
            verse: verse
          });
        } else {
          verse -= verses;
        }
      }
    }
  },

  getLastReference: function () {
    var lastBook = this.props.books[this.props.books.length - 1];
    var lastChapter = lastBook.props.chapters[lastBook.props.chapters.length - 1];
    return new Reference({
      book: lastBook.props.name,
      chapter: lastChapter.name,
      verse: lastChapter.verses
    });
  }

};

module.exports = Scripture;
