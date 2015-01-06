var request = require('sync-request');
var $ = require('cheerio');
var writeJson = require('jsonfile').writeFileSync;


var Scraper = {
  urls: {
    base: 'https://www.lds.org/scriptures',
    bom: '/bofm',
    dc: '/dc-testament',
    pgp: '/pgp',
    ot: '/ot',
    nt: '/nt'
  },

  scrape: function (name) {
    var url = this.getUrl(name);
    var html = this.getHtml(url);
    var books = this.scrapeBooks(html);
    var self = this;

    books.forEach(function (book) {
      var html = self.getHtml(book.url);
      book.chapters = self.scrapeChapters(html);

      if (book.chapters.length === 0) {
        book.chapters.push({
          name: '1',
          url: book.url
        });
      }

      book.chapters.forEach(function (chapter) {
        var html = self.getHtml(chapter.url);
        chapter.verses = self.scrapeVerses(html);
      });

    });

    this.save(name, books);
    return books;
  },

  save: function (name, data) {
    writeJson(__dirname + '/data/' + name + '.json', data);
  },

  getUrl: function (name) {
    return (this.urls.base + this.urls[name]);
  },

  getHtml: function (url) {
    return request('GET', url).getBody().toString();
  },

  scrapeBooks: function (html) {
    var books = [];
    var $books = $(html).find('.books a');

    $books.each(function (index, book) {
      var $book = $(book);
      books.push({
        name: $book.text(),
        url: $book.attr('href')
      });
    });

    return books;
  },

  scrapeChapters: function (html) {
    var chapters = [];
    var $chapters = $(html).find('.jump-to-chapter li a');

    $chapters.each(function (index, chapter) {
      var $chapter = $(chapter);
      chapters.push({
        name: $chapter.text(),
        url: $chapter.attr('href')
      });
    });

    return chapters;
  },

  scrapeVerses: function (html) {
    return $(html).find('.verse').length;
  }

};

module.exports = Scraper;
