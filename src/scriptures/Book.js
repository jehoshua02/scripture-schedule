var Book = function (props) {
  this.props = props;
};

Book.prototype = {
  getVerses: function () {
    var verses = 0;
    this.props.chapters.forEach(function (chapter) {
      verses += chapter.verses;
    });
    return verses;
  }
};

module.exports = Book;
