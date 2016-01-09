"use strict";

var peopleFilter = require("../app/lib/peoplefilter");

describe("People filter", () => {
  let people = [
    {
      id: 93726
    },
    {
      id: 64834
    },
    {
      id: 71151
    }
  ];

  it("Exclude people on filter list", () => {
    let list = peopleFilter.exclude(people, "71151,93726");

    list.should.be.an.Array();
    list.should.not.containEql({ id: 71151 });
    list.should.not.containEql({ id: 93726 });
    list.length.should.eql(1);
  });

  it("Keep people not included on filter list", () => {
    let list = peopleFilter.exclude(people, "93726");

    list.should.be.an.Array();
    list.should.containEql({ id: 64834 });
    list.should.containEql({ id: 71151 });
    list.length.should.eql(2);
  });
});
