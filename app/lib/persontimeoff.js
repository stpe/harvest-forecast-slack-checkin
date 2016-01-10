"use strict";

var moment = require("moment");

module.exports = (personActivity) => {
  // calculate first day back based on end_date
  let endDate = moment(personActivity[0].end_date, "YYYY-MM-DD");

  if (endDate.day() === 6 || endDate.day() === 0) {
    // if weekend, back next Monday
    endDate.day(1 + 7);
  } else {
    // back the next day
    endDate.add(1, "day");
  }

  return endDate;
};
