import * as core from '@actions/core';
import { IncomingWebhook } from '@slack/webhook';

async function slack() {
  try {
    if (process.env.SLACK_WEBHOOK_URL === undefined) {
      throw new Error('SLACK_WEBHOOK_URL not set as a secret in github');
    }
    const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
    var payload = eval("payload = " + core.getInput('payload'));

    await webhook.send(JSON.parse(JSON.stringify(payload)));
  } catch (error) {
    core.setFailed(error.message);
  }
}

slack();