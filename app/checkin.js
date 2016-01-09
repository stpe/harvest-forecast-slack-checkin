"use strict";

require("dotenv").load();

var moment = require("moment");

var forecast = require("./lib/forecast");
var peopleFilter = require("./lib/peoplefilter");
var projectLookup = require("./lib/projectlookup");
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
  forecast.assignments(options)
]).then(data => {
  let people = data[0];
  let projects = data[1];
  let assignments = data[2];

  // exclude persons
  people = peopleFilter.exclude(people, process.env.PEOPLE_EXCLUDE_FILTER);

  // sort persons alphabetically
  people.sort((a, b) => a.first_name.localeCompare(b.first_name));

  // allow projects to be looked up by id
  projects = projectLookup.lookup(projects);

  people.forEach(p => {



}).catch(e => console.error(e.stack));
