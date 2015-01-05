var through = require('through2');
var $ = require('cheerio');


var scrapeStream = function (options) {
  var html = '';

  function collect(chunk, enc, callback) {
    console.log('collect');
    html += chunk.toString();
    callback();
  }

  function process(callback) {
    console.log('process');

    var self = this;
    options.scrape(html).forEach(function (item) {
      self.push(item);
    });

    return callback();
  }

  return through.obj(collect, process);
};

module.exports = scrapeStream;
