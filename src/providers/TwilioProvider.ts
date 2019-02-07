import { Twilio } from 'twilio';

import Provider, { IProviderOptions } from './Provider';

import NotificationType from '../types/NotificationType';

import prefixMessage from '../helpers/prefixMessage';

export interface ITwilioOptions {
  accountSID: string;
  authToken: string;
  fromNumber: string;
  toNumber: string | string[];
}

class TwilioProvider extends Provider {
  private options: ITwilioOptions;
  private client: Twilio;

  constructor(providerOptions: IProviderOptions, options: ITwilioOptions) {
    super(providerOptions);

    this.options = options;

    this.init();
  }

  public sendMessage(
    message: string,
    notificationType: NotificationType
  ): Promise<any> {
    let toNumbers;
    if (typeof this.options.toNumber === 'string') {
      toNumbers = [this.options.toNumber];
    } else {
      toNumbers = this.options.toNumber;
    }

    return Promise.all(
      toNumbers.map(
        to =>
          new Promise((resolve, reject) => {
            this.client.messages
              .create({
                body: prefixMessage(
                  this.globalPrefix,
                  message,
                  notificationType
                ),
                from: this.options.fromNumber,
                to
              })
              .then(() => {
                resolve({
                  provider: 'twilio',
                  success: true
                });
              })
              .catch(reject);
          })
      )
    );
  }

  private init() {
    try {
      this.client = new Twilio(this.options.accountSID, this.options.authToken);
    } catch (error) {}
  }
}

export default TwilioProvider;
