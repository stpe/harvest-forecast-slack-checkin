"use strict";

// join list of strings with conjunction

var conjunct = function(list, printFunc) {
  if (list.length === 0) return "";

  printFunc = typeof printFunc === "undefined" ? (str) => str : printFunc;

  if (list.length > 1) {
    return [
      list.slice(0, -1).map(p => printFunc(p)).join(", "),
      " and ",
      list.slice(-1).map(p => printFunc(p))
    ].join("");
  }

  return printFunc(list[0]);
};

module.exports = conjunct;
