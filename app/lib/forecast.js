"use strict";

var Forecast = require("forecast-api");
var forecastApi = new Forecast({
	accountId: process.env.FORECAST_ACCOUNT_ID,
	authorization: process.env.FORECAST_AUTH_TOKEN
});

var forecast = {};

forecast.projects = function() {
  return new Promise(
    function(resolve, reject) {
      forecastApi.projects(function(err, projects) {
        if (err) reject(err);
        resolve(projects);
      });
    }
  );
};

forecast.people = function() {
  return new Promise(
    function(resolve, reject) {
      forecastApi.people(function(err, people) {
        if (err) reject(err);
        resolve(people);
      });
    }
  );
};

forecast.assignments = function(options) {
  return new Promise(
    function(resolve, reject) {
      forecastApi.assignments(options, function(err, assignments) {
        if (err) reject(err);
        resolve(assignments);
      });
    }
  );
};

forecast.clients = function() {
  return new Promise(
    function(resolve, reject) {
      forecastApi.clients(function(err, clients) {
        if (err) reject(err);
        resolve(clients);
      });
    }
  );
};

module.exports = forecast;
