# system-notifier

System notifier sending Telegram message and SMS.

## Installation

```bash
npm install system-notifier
```

## Usage

```js
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

```js
notifier.notify('Internal Server Error...');
```

You can add an emoji prefix with one of the following codes: `info` (ℹ️), `error` (❌), `warning` (⚠️) or `success` (✅).

```js
notifier.notify('Internal Server Error...', 'error');
```

## Build

```bash
npm run build
```

## Related

- [twilio-node][twilio-node] - A Twilio helper library

## License

This project is licensed under the [MIT license](LICENSE).

[twilio-node]: https://github.com/twilio/twilio-node
