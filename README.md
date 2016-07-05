# Daily Harvest Forecast Checkin Slack Integration

This is a Slack integration that does post a summary of what each person is planning to do the current day according to [Harvest Forecast](https://www.getharvest.com/forecast).

Example output:

<img src="http://stpe.github.io/harvest-forecast-slack-checkin/forecast-slack-msg.png" height="322" width="471">

## Background

At [Rebel & Bird](http://www.rebelandbird.com/) we use Forecast to schedule the team across different projects with different clients. The idea of this Slack integration originated after noticing a few things, that it also tries to address...

- Occasionally people forgot to update Forecast. This will make mistakes much more visible so they can be addressed immediately.
- Sometimes non project managers didn't look in Forecast. This makes sure everyone know what they are scheduled to as well as what their colleagues are up to.
- People on vacation felt the need to post on Slack that they were away. This states when someone got time off as well as the date when they will be back.

## Future

This is just a first stab at this, and there are certainly more potentially useful enhancements that could be made.

With a greater number of people it may not be feasible to just post a huge list; support for posting in different channels depending on team, location, etc is a possible solution.

Feel free to [submit pull requests](https://github.com/stpe/harvest-forecast-slack-checkin/pulls) or [suggest enhancements](https://github.com/stpe/harvest-forecast-slack-checkin/issues).

## Installation

Checkout the harvest-forecast-slack-checkin repository. If you're new to GitHub, check out [GitHub Desktop](https://desktop.github.com/).

Make sure you have installed the latest stable version of [Node.js](https://nodejs.org/).

In the checked out repository, install run:

`npm install`

## Configuration

Put configuration in a file named `.env`.

Example:

```
FORECAST_ACCOUNT_ID=123456
FORECAST_AUTH_TOKEN=Bearer 22789.ToKeN...

PEOPLE_EXCLUDE_FILTER=45678,12345,98765
PROJECT_ID_TIME_OFF=234567
CLIENT_ID_INTERNAL=23456
FORECAST_TEAM_URL=https://forecastapp.com/123456/schedule/team
SKIP_IF_WEEKEND=yup

SLACK_WEBHOOK=https://hooks.slack.com/services/...
SLACK_CHANNEL=checkin
SLACK_ICON_URL=https://forecastapp.com/assets/images/apple-touch-icon.png
SLACK_USERNAME=Forecast
SLACK_FORECAST_ADMIN=stefan
```

* `FORECAST_ACCOUNT_ID` - Your Forecast Account ID
* `FORECAST_AUTH_TOKEN` - Your Forecast Authentication Token

  As of now there is no super convenient way to get your account ID and authorization token.

   1. Open up your browser of choice.
   2. Open *Developer Tools*.
   3. Select the *Network* tab, and then *XHR*.
   4. Open a page on Forecast while logged in.
   5. In the list of requests, click the one of the *GET* requests to see *Headers*.
   6. Scroll down to *Request Headers*.
   7. Find *authorization*, the long string starting with _Bearer_ is the `FORECAST_AUTH_TOKEN`.
   8. Find *forecast-account-id*, the value is your `FORECAST_ACCOUNT_ID`.

  Note that the auth token may expire and then you need to set a new one. If this is the case the a DM will be sent (see `SLACK_FORECAST_ADMIN`).

* `PEOPLE_EXCLUDE_FILTER` - Comma separated list of people IDs to exclude
* `PROJECT_ID_TIME_OFF` - Project ID of what is time off
* `CLIENT_ID_INTERNAL` - Client ID to determine what is internal work
* `FORECAST_TEAM_URL` - Team URL used as link in Slack message
* `SKIP_IF_WEEKEND` - Set to something to not run on weekend (otherwise remove line)
* `SLACK_WEBHOOK` - Webhook URL as stated on [Incoming Webhook integration page](https://my.slack.com/services/new/incoming-webhook/)
* `SLACK_CHANNEL` - Slack channel to post message in (without `#`)
* `SLACK_ICON_URL` - URL to Slack message icon
* `SLACK_USERNAME` - Slack username to use when posting message
* `SLACK_FORECAST_ADMIN` - Slack user (username without leading @-character) to DM if failing to retrieve data from Forecast

## Tests

Perform tests by running:

`npm test`

## Run locally

`npm start`

## Deploy to Heroku

To deploy to [Heroku](https://www.heroku.com) you need to have an account and have the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

1. Create an Heroku application:

    `heroku create your-appname-of-choice`

2. Push your local configuration to Heroku:

    `heroku config:push`

3. Deploy the code to Heroku:

    `git push heroku master`

4. Verify that it does run:

    `heroku run worker`

5. Set up the Heroku Scheduler addon:

    `heroku addons:create scheduler:standard`

6. Configure the scheduler:

    `heroku addons:open scheduler`

  Add a new job where the command is simply `worker` scheduled daily to the time you want the message posted in Slack.

## Changelog

#### 0.2.0

  * Support adjacent time-off assignments for more correct guess when someone will be back after time off (previously adjacent assignment were ignored and only the current one was used).
  * Support assignments assigned to everyone.
  * Use a long format to display names when multiple persons share the same first name.
  * Notify Slack user with DM if failing to retrieve data from Forecast.

#### 0.0.1

  * First version.
