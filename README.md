# Create a Github Action based of this Action

This Action connects with a Slack webhook, it will send a json payload with the slack message api to post a message.

## Setup

### Webhook
First you will need to setup a webhook in slack for your app and channel.
-  That will be under your workspace, then apps

After that is complete, you will need to head to github.com and login.
- Go to your repo
- Then the tab settings, under secrets
- Create a new secret with the name **SLACK_WEBHOOK_URL**
- Paste your webhook link from slack into the value field

### Action
First you will need to create a github workflow file.

- Press the Actions tab in github: **Your Repo/actions**
- Create a new **yaml file**
- Different requests can be used such as:
```yaml
on: [pull, push, pull_request]
```
- You will need to build the action, support exist for Win, Mac, Linux
```yaml
build:
    runs-on: ubuntu-latest
```
- In order to connect to this Action you need to use this repository
```yaml
uses: amansson/slack-notification-action@v1
```

Since we are sending a json payload to slack, we can build the message however we want without having to rely on hard coded requests, this give alot of flexibility.

To request the api from github use:
```yaml
${{ github.event.YOUR_REQUEST }}
```

See the Api for Github:\
https://developer.github.com/v3/

See the Api slack builder to create a message:\
https://api.slack.com/tools/block-kit-builder


**This is an example on how this file can be setup**

```yaml
name: "slack notification"
on: pull_request
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: amansson/slack-notification-action@v1
        with:
          payload: |
            {
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "${{ github.event.pull_request.title }}"
                  }
                },
                {
                  "type": "divider"
                },
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "<${{ github.event.pull_request.html_url }}|Link to pull request>"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```


## TODO
Setup a working dev environment so api can be tested outside of slack