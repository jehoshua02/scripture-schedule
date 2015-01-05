var format = require('util').format;


var ReferenceRange = function (props) {
  this.props = props;
};

ReferenceRange.prototype = {
  toString: function () {
    var start = this.props.start;
    var end = this.props.end;

    // start string with start reference
    var str = start.toString();

    // figure out end reference
    var sameBook = start.props.book === end.props.book;
    var sameChapter = start.props.chapter === end.props.chapter;
    var sameVerse = start.props.verse === end.props.verse;
    if (sameBook && sameChapter && sameVerse) {
      // do nothing
    } else if (sameBook && sameChapter) {
      str += '-' + end.props.verse;
    } else if (sameBook) {
      str += ' - ' + end.props.chapter + ':' + end.props.verse;
    } else {
      str += ' - ' + end.toString();
    }

    return str;
  }
};

module.exports = ReferenceRange;
