"use strict";

// this is the place to change to change format of how person names are printed

module.exports = (person, people) => {
  // check if there is someone else with the same first name
  let useLongFormat = people.some(p => p.first_name === person.first_name && p.id !== person.id);

  if (useLongFormat) {
    // name long format
    return `*${person.first_name} ${person.last_name.slice(0, 1)}*`;
  }

  // name short format
  return `*${person.first_name}*`;
};
