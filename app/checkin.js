"use strict";

var moment = require("moment");

var forecast = require("./lib/forecast");

var options = {
  startDate: moment(),
  endDate: moment().add(1, "day")
};

forecast.assignments(options).then(assignments => {
  console.log("Assignments");
  console.log(JSON.stringify(assignments.map(a => `${a.id}: project ${a.project_id}, person ${a.person_id} `), 0, 2));
});

forecast.projects().then(projects => {
  console.log("Projects");
  console.log(JSON.stringify(projects.map(p => `${p.id}: ${p.name}`), 0, 2));
});

forecast.people().then(people => {
  console.log("People");
  console.log(JSON.stringify(people.map(p => `${p.id}: ${p.first_name}`), 0, 2));
});
