"use strict";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();  
}

var moment = require("moment");

var forecast = require("./lib/forecast");
var peopleFilter = require("./lib/peoplefilter");
var lookup = require("./lib/lookup");
var activity = require("./lib/activity");
var personName = require("./lib/personname");
var personActivities = require("./lib/personactivities");
var personTimeOff = require("./lib/persontimeoff");
var conjunct = require("./lib/conjunct");
var slack = require("./lib/slack");

var options = {
  startDate: moment(),
  endDate: moment()
};

// skip if weekend
if (process.env.SKIP_IF_WEEKEND && (moment().day() === 6 || moment().day() === 0)) {
  console.log("It's weekend, skipping...");
  process.exit(); // eslint-disable-line no-process-exit
}

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

  let msg = [];

  people.forEach(p => {
    // get person activity for current day
    let personActivity = activity.get(p, assignments);

    if (personActivity.length === 0) {
      // no entry for person
      msg.push(`${personName(p)} got no entry for today.`);
    } else if (personActivity.length === 1 && personActivity[0].project_id === parseInt(process.env.PROJECT_ID_TIME_OFF)) {
      // person got time off and does nothing else
      let endDate = personTimeOff(personActivity);
      msg.push(`${personName(p)} is off and will be back ${endDate.format("YYYY-MM-DD")}.`);
    } else {
      // normal assignments (but ignore partial day time off)
      let activities = personActivities(personActivity, projects, clients);
      msg.push(`${personName(p)} will work with ${conjunct(activities)}.`);
    }
  });

  // send as Slack msg
  slack.send({
    attachments: [
      {
         "fallback": `${options.startDate.format("dddd YYYY-MM-DD")} according to Forecast...`,
         "pretext": `${options.startDate.format("dddd YYYY-MM-DD")} :sunrise: according to <${process.env.FORECAST_TEAM_URL}|Forecast>...`,
         "color": "good",
         "mrkdwn_in": ["pretext", "text", "fields"],
         "fields": [
            {
               "value": msg.join("\n"),
               "short": false
            }
         ]
      }
     ]
  });
}).catch(e => console.error(e.stack));
