"use strict";

module.exports = function(data) {
  let lookup = {};

  data.forEach(d => lookup[d.id] = d);

  return lookup;
};
