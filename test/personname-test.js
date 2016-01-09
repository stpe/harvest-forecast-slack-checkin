"use strict";

var personName = require("../app/lib/personname");

describe("People name", () => {
  let person = {"id":64829,"first_name":"Sara","last_name":"","email":"","login":"enabled","admin":true,"archived":false,"subscribed":true,"avatar_url":"https://secure.gravatar.com/avatar/8fa1223101641c44704ca47d437c6219.jpg?s=200&d=https://forecast-files.s3.amazonaws.com/default-avatars/SC.png","teams":["Product Owner"],"updated_at":"2015-12-18T15:57:15.447Z","updated_by_id":64829,"harvest_user_id":985214,"hours_per_day":null,"assignment_ids":[649762,704927,704934]}; // eslint-disable-line

  it("Should be a string", () => {
    personName(person).should.be.a.String();
  });
});
