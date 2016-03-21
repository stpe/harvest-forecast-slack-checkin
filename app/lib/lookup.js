"use strict";

module.exports = function(data) {
  let lookup = {};

  if (data) {
    data.forEach(d => lookup[d.id] = d);
  }

  return lookup;
};
