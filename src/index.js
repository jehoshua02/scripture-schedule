var moment = require('moment');
var format = require('util').format;
var scriptures = require('./scriptures');
var config = require('./config');


var schedule = scriptures.bom.makeSchedule({
  start: moment(config.start),
  end: moment(config.end)
});

var makeRow = function (segment) {
  return format('+ [ ] Day %d (%s): [__%s__](%s)',
    segment.day,
    segment.date.format('YYYY-MM-DD'),
    segment.range.toString(),
    segment.range.props.start.props.url
  );
};

console.log(schedule.toArray().map(makeRow).join('\n'));
console.log('verses per day: ' + schedule.getVersesPerDay());
