"use strict";

var moment = require("moment");

var activity = {};

activity.get = function(person, assignments) {
  // assuming assignments with person_id null is for everyone
  return assignments.filter(a => a.person_id === person.id || a.person_id === null);
};

activity.today = function(person, assignments) {
  return activity
    .get(person, assignments)
    .filter(a => moment().isBetween(a.start_date, a.end_date, null, "[]"));
};

module.exports = activity;
