"use strict";

require("dotenv").load();

var moment = require("moment");

var forecast = require("../app/lib/forecast");

// mock forecast api requests
var nock = require("nock");
require("./fixtures/forecast")(nock);

describe("Forecast", () => {
  it("Get People data", () => {
    return forecast.people().should.eventually.be.an.Array();
  });

  it("Get Projects data", () => {
    return forecast.projects().should.eventually.be.an.Array();
  });

  it("Get Assignments data", () => {
    var options = {
      startDate: moment("2016-01-07", "YYYY-MM-DD"),
      endDate: moment("2016-01-07", "YYYY-MM-DD")
    };
    return forecast.assignments(options).should.eventually.be.an.Array();
  });
});
