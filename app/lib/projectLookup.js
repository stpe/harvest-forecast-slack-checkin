"use strict";

var projectLookup = {};

projectLookup.lookup = function(projects) {
  let lookup = {};

  projects.forEach(p => lookup[p.id] = p);

  return lookup;
};

module.exports = projectLookup;
