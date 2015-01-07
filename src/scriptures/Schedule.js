var ReferenceRange = require('./ReferenceRange');


var Schedule = function (props) {
  this.props = props;
};

Schedule.prototype = {

  getVerses: function () {
    return this.props.scripture.getVerses();
  },

  getDays: function () {
    var end = this.props.end.clone().add(1, 'day');
    return end.diff(this.props.start, 'days');
  },

  getVersesPerDay: function () {
    return Math.ceil(this.getVerses() / this.getDays());
  },

  getDate: function (day) {
    day = (day || 1) - 1;
    return this.props.start.clone().add(day, 'days');
  },

  getStartReference: function (day) {
    var verse = this.getVersesPerDay() * (day - 1) + 1;
    return this.props.scripture.getReference(verse);
  },

  getEndReference: function (day) {
    var verse = this.getVersesPerDay() * day;
    var reference = this.props.scripture.getReference(verse);
    if (reference === undefined) {
      reference = this.props.scripture.getLastReference();
    }
    return reference;
  },

  getReferenceRange: function (day) {
    return new ReferenceRange({
      start: this.getStartReference(day),
      end: this.getEndReference(day)
    });
  },

  toArray: function () {
    var schedule = [];

    var days = this.getDays();
    for (var day = 1; day <= days; day++) {

      var segment = {
        day: day,
        date: this.getDate(day),
        range: this.getReferenceRange(day)
      };

      schedule.push(segment);
    }

    return schedule;
  }

};

module.exports = Schedule;
