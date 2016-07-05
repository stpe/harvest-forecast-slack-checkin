"use strict";

var moment = require("moment");

// calculate first day back based on end_date, assuming end_date is string in YYYY-MM-DD format
function extendDateToNextWorkingDay(end_date) {
  let endDate = moment(end_date, "YYYY-MM-DD");

  // if end date Friday, Saturday or Sunday, assume back next Monday
  if (endDate.day() === 5 || endDate.day() === 6 || endDate.day() === 0) {
    // if weekend, back next Monday
    endDate.day(1 + 7);
  } else {
    // if Monday-Thusday, assume back the next day
    endDate.add(1, "day");
  }

  return endDate;
}

module.exports = (personActivities) => {
  personActivities = personActivities
    // get only activities that are time off
    .filter(p => p.project_id === parseInt(process.env.PROJECT_ID_TIME_OFF))
    // sort by end date
    .sort((a, b) => a.end_date < b.end_date ? -1 : (a.end_date > b.end_date ? 1 : 0))
    // extend end date to next working day
    .map(p => {
      p.end_date = extendDateToNextWorkingDay(p.end_date).format("YYYY-MM-DD");
      return p;
    });

  // iterate activities to determine when there are no more overlapping periods of time off
  let it = personActivities[Symbol.iterator]();
  let activity = it.next().value;

  while (activity) {
    let nextActivity = it.next().value;
    if (!nextActivity || moment(activity.end_date).isBefore(moment(nextActivity.start_date))) {
      break;
    }

    activity = nextActivity;
  }

  return moment(activity.end_date);
};
