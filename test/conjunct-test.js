"use strict";

var conjunct = require("../app/lib/conjunct");

describe("Conjunction", () => {
  it("Conjunction when more than two", () => {
    conjunct(["Stefan", "Pelle", "Josefine"]).should.be.equal("Stefan, Pelle and Josefine");
    conjunct(["Pelle", "Josefine"]).should.be.equal("Pelle and Josefine");
  });

  it("No conjunction if only one", () => {
    conjunct(["Stefan"]).should.be.equal("Stefan");
    conjunct([]).should.be.equal("");
  });
});
