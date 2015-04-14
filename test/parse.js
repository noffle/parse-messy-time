var parse = require('../');
var months = require('months');
var test = require('tape');

test('parse dates', function (t) {
    var tomorrow = new Date((new Date).valueOf() + 24*60*60*1000);
    
    t.deepEqual(parse('11am'), {
        hours: 11
    });
    t.deepEqual(parse('11pm'), {
        hours: 23
    });
    t.deepEqual(parse('tomorrow at 7'), {
        hours: 7,
        date: tomorrow.getDate(),
        month: months[tomorrow.getMonth()]
    });
    t.deepEqual(parse('aug 25 2015 5pm'), {
        hours: 17,
        date: 25,
        month: 'August',
        year: 2015
    });
    t.deepEqual(parse('this friday', { now: new Date(1429029961000) }), {
        date: 17,
        month: 'April'
    });
    t.deepEqual(parse('friday', { now: new Date(1429029961000) }), {
        date: 17,
        month: 'April'
    });
    t.deepEqual(parse('this friday', { now: new Date(1429721563259) }), {
        date: 24,
        month: 'April'
    });
    t.deepEqual(parse('next friday', { now: new Date(1429721563259) }), {
        date: 1,
        month: 'May'
    });
    t.end();
});