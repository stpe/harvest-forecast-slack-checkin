"use strict";

var Slack = require("slack-node");
var merge = require("lodash.merge");

var slack = new Slack();
slack.setWebhook(process.env.SLACK_WEBHOOK);

var slackMessenger = {};

slackMessenger.send = function(msg) {
    var slackMsg = {
        "channel": "#" + process.env.SLACK_CHANNEL,
        "icon_emoji": process.env.SLACK_ICON_URL,
        "username": process.env.SLACK_USERNAME
    };

    msg = merge(slackMsg, msg);

    slack.webhook(msg, function(err, response) {  // eslint-disable-line no-unused-vars
      if (err) throw Error(err);
    });
};

module.exports = slackMessenger;
