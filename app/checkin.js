"use strict";

require("dotenv").load();

var moment = require("moment");

var forecast = require("./lib/forecast");
var peopleFilter = require("./lib/peoplefilter");
var lookup = require("./lib/lookup");
var activity = require("./lib/activity");
var personName = require("./lib/personname");
var conjunct = require("./lib/conjunct");

var options = {
  startDate: moment(),
  endDate: moment().add(1, "day")
};

console.log(options.startDate.format("YYYY-MM-DD") + " according to Forecast...");

Promise.all([
  forecast.people(),
  forecast.projects(),
  forecast.clients(),
  forecast.assignments(options)
]).then(data => {
  let people = data[0];
  let projects = lookup(data[1]);
  let clients = lookup(data[2]);
  let assignments = data[3];

  // exclude persons
  people = peopleFilter.exclude(people, process.env.PEOPLE_EXCLUDE_FILTER);

  // sort persons alphabetically
  people.sort((a, b) => a.first_name.localeCompare(b.first_name));

  people.forEach(p => {
    // get person activity for current day
    let personActivity = activity.get(p, assignments);

    if (personActivity.length === 0) {
      // no entry for person
      console.log(`${personName(p)} got no entry for today.`);
    } else if (personActivity.length === 1 && personActivity[0].project_id === parseInt(process.env.PROJECT_ID_TIME_OFF)) {
      // person got time off and does nothing else
      let endDate = moment(personActivity[0].end_date, "YYYY-MM-DD");
      if (endDate.day() === 6 || endDate.day() === 0) {
        // if weekend, back next Monday
        endDate.day(1 + 7);
      } else {
        // back the next day
        endDate.add(1, "day");
      }

      console.log(`${personName(p)} is off and will be back ${endDate.format("YYYY-MM-DD")}.`);
    } else {
      let activities = personActivity
        .filter(a => a.project_id !== parseInt(process.env.PROJECT_ID_TIME_OFF))
        .map(a => {
          let project = projects[a.project_id];

          if (project.client_id === parseInt(process.env.CLIENT_ID_INTERNAL)) {
            // if internal, use project name
            return project.name;
          }

          // otherwise use client name
          return clients[project.client_id].name;
        });

      console.log(`${personName(p)} is planning to work with ${conjunct(activities)}.`);
    }
  });
}).catch(e => console.error(e.stack));
