"use strict";

var activity = {};

activity.get = function(person, assignments) {
  return assignments.filter(a => a.person_id === person.id);
};

module.exports = activity;
