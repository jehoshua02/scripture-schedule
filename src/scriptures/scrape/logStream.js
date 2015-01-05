var through = require('through2');


var logStream = function () {
  var html = '';

  function collect(chunk, enc, callback) {
    console.log('got a book: ', chunk);
    callback();
  }

  return through.obj(collect);
};

module.exports = logStream;
