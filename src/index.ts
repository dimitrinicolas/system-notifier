import fetch from 'node-fetch';

import NotificationType from './types/NotificationType';

import Provider from './providers/Provider';
import TelegramProvider, {
  ITelegramOptions
} from './providers/TelegramProvider';
import TwilioProvider, { ITwilioOptions } from './providers/TwilioProvider';

export { NotificationType };

interface ISystemNotifierOptions {
  prefix?: string;
  twilio?: ITwilioOptions;
  telegram?: ITelegramOptions;
}

class SystemNotifier {
  private providers: Provider[] = [];

  constructor(options: ISystemNotifierOptions = { prefix: '' }) {
    const providerOptions = {
      globalPrefix: options.prefix
    };

    if (options.twilio) {
      this.providers.push(new TwilioProvider(providerOptions, options.twilio));
    }
    if (options.telegram) {
      this.providers.push(
        new TelegramProvider(providerOptions, options.telegram)
      );
    }
  }

  /**
   * Send notification message
   * @param message Message to send
   * @param notificationType Notification type
   */
  public notify(
    message: string,
    notificationType: NotificationType = NotificationType.Default
  ) {
    return Promise.all(
      this.providers.map(provider => {
        return provider.sendMessage(message, notificationType);
      })
    );
  }
}

export default SystemNotifier;
