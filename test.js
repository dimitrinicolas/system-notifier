import dotenv from 'dotenv';

import test from 'ava';

import SystemNotifier from '.';

dotenv.config();

const PREFIX = 'system-notifier test';
const MESSAGE_BODY = 'Test message body';

test('Standard test', async t => {
  const notifier = new SystemNotifier({
    prefix: PREFIX,
    telegram: {
      botToken: process.env.TELEGRAM_BOT_TOKEN,
      chatId: process.env.TELEGRAM_CHAT_ID
    },
    twilio: {
      authToken: process.env.TWILIO_AUTH_TOKEN,
      accountSID: process.env.TWILIO_ACCOUNT_SID,
      fromNumber: process.env.TWILIO_FROM_NUMBER,
      toNumber: process.env.TWILIO_TO_NUMBER
    }
  });

  await notifier
    .notify(MESSAGE_BODY)
    .then(t.pass)
    .catch(t.fail);
});

test('Wrong Telegram bot token', async t => {
  const notifier = new SystemNotifier({
    prefix: PREFIX,
    telegram: {
      botToken: 'WRONG',
      chatId: process.env.TELEGRAM_CHAT_ID
    }
  });

  await notifier
    .notify(MESSAGE_BODY)
    .then(t.fail)
    .catch(t.pass);
});

test('Wrong Twilio auth token', async t => {
  const notifier = new SystemNotifier({
    prefix: PREFIX,
    twilio: {
      authToken: 'WRONG',
      accountSID: process.env.TWILIO_ACCOUNT_SID,
      fromNumber: process.env.TWILIO_FROM_NUMBER,
      toNumber: process.env.TWILIO_TO_NUMBER
    }
  });

  await notifier
    .notify(MESSAGE_BODY)
    .then(t.fail)
    .catch(t.pass);
});

test('Multiple Telegram ChatIds', async t => {
  const notifier = new SystemNotifier({
    prefix: PREFIX,
    telegram: {
      botToken: process.env.TELEGRAM_BOT_TOKEN,
      chatId: [process.env.TELEGRAM_CHAT_ID, process.env.TELEGRAM_CHAT_ID]
    }
  });

  await notifier
    .notify(MESSAGE_BODY)
    .then(t.pass)
    .catch(t.fail);
});

test('Multiple Twilio toNumber', async t => {
  const notifier = new SystemNotifier({
    prefix: PREFIX,
    twilio: {
      authToken: process.env.TWILIO_AUTH_TOKEN,
      accountSID: process.env.TWILIO_ACCOUNT_SID,
      fromNumber: process.env.TWILIO_FROM_NUMBER,
      toNumber: [process.env.TWILIO_TO_NUMBER, process.env.TWILIO_TO_NUMBER]
    }
  });

  await notifier
    .notify(MESSAGE_BODY)
    .then(t.pass)
    .catch(t.fail);
});

test('No prefix set', async t => {
  const notifier = new SystemNotifier({
    telegram: {
      botToken: process.env.TELEGRAM_BOT_TOKEN,
      chatId: process.env.TELEGRAM_CHAT_ID
    }
  });

  await notifier
    .notify(MESSAGE_BODY)
    .then(t.pass)
    .catch(t.fail);
});

test('No provider set', async t => {
  const notifier = new SystemNotifier();

  await notifier
    .notify(MESSAGE_BODY)
    .then(t.pass)
    .catch(t.fail);
});
