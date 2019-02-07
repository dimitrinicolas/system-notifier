# system-notifier [![Build Status][ci badge]][ci link] [![Coverage Status][coverage badge]][coverage link]

System notifier sending Telegram message and SMS.

## Installation

```bash
npm install system-notifier
```

## Usage

```javascript
const SystemNotifier = require('system-notifier');
/** Or with ES6+ */
import SystemNotifier from 'system-notifier';

const notifier = new SystemNotifier({
  prefix: 'domain.com',
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
})
```

Then, call `notifier.notify` function with your message:

```javascript
notifier.notify('Internal Server Error...');
```

You can add an emoji prefix with one of the following codes: `info` (ℹ️), `error` (❌), `warning` (⚠️) or `success` (✅).

```javascript
notifier.notify('Internal Server Error...', 'error');
```

## Build

```bash
npm run build
```

## Test

Create a `.env` file and add your providers credentials:

```dosini
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
TWILIO_AUTH_TOKEN=
TWILIO_ACCOUNT_SID=
TWILIO_FROM_NUMBER=
TWILIO_TO_NUMBER=
```

```bash
npm run build
```

## Related

- [twilio-node][twilio-node] - A Twilio helper library

## License

This project is licensed under the [MIT license](LICENSE).

[ci badge]: https://travis-ci.org/dimitrinicolas/system-notifier.svg?branch=master
[ci link]: https://travis-ci.org/dimitrinicolas/system-notifier
[coverage badge]: https://coveralls.io/repos/github/dimitrinicolas/system-notifier/badge.svg?branch=master
[coverage link]: https://coveralls.io/github/dimitrinicolas/system-notifier?branch=master

[twilio-node]: https://github.com/twilio/twilio-node
