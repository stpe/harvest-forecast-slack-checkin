"use strict";

require("dotenv").load();

var moment = require("moment");

var forecast = require("./lib/forecast");
var peopleFilter = require("./lib/peoplefilter");
var projectLookup = require("./lib/projectLookup");

var options = {
  startDate: moment(),
  endDate: moment().add(1, "day")
};

Promise.all([
  forecast.people(),
  forecast.projects(),
  forecast.assignments(options)
]).then(data => {
  let people = data[0];
  let projects = data[1];
  let assignments = data[2];

  people = peopleFilter.exclude(people, process.env.PEOPLE_EXCLUDE_FILTER);

  projects = projectLookup.lookup(projects);

  console.log("Assignments");
  console.log(JSON.stringify(assignments.map(a => `${a.id}: project ${a.project_id}, person ${a.person_id} : ${a.start_date} - ${a.end_date}`), 0, 2));

  console.log("Projects");
  console.log(JSON.stringify(projects, 0, 2));

  console.log("People");
  console.log(JSON.stringify(people.map(p => `${p.id}: ${p.first_name}`), 0, 2));

}).catch(e => console.error(e.stack));
