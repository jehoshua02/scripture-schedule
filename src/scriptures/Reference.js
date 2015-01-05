var format = require('util').format;


var Reference = function (props) {
  this.props = props;
};

Reference.prototype = {
  toString: function () {
    return format('%s %d:%d',
      this.props.book, this.props.chapter, this.props.verse
    );
  }
};

module.exports = Reference;
