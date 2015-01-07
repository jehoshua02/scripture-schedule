var Scripture = require('./Scripture');
var readJson = require('jsonfile').readFileSync;


var getInstance = function (name) {
  return new Scripture({
    books: readJson(__dirname + '/data/' + name + '.json')
  });
};

var scriptures = {
  ot: getInstance('ot'),
  nt: getInstance('nt'),
  bom: getInstance('bom'),
  dc: getInstance('dc'),
  pgp: getInstance('pgp')
};

module.exports = scriptures;
