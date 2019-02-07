import fetch from 'node-fetch';

import Provider, { IProviderOptions } from './Provider';

import NotificationType from '../types/NotificationType';

import prefixMessage from '../helpers/prefixMessage';

export interface ITelegramOptions {
  botToken: string;
  chatId: string | string[];
}

class TelegramProvider extends Provider {
  private options: ITelegramOptions;

  constructor(providerOptions: IProviderOptions, options: ITelegramOptions) {
    super(providerOptions);

    this.options = options;
  }

  public sendMessage(
    message: string,
    notificationType: NotificationType
  ): Promise<any> {
    let chatIds;
    if (typeof this.options.chatId === 'string') {
      chatIds = [this.options.chatId];
    } else {
      chatIds = this.options.chatId;
    }

    return Promise.all(
      chatIds.map(
        chatId =>
          new Promise((resolve, reject) => {
            const url = `https://api.telegram.org/bot${
              this.options.botToken
            }/sendmessage?chat_id=${chatId}&parse_mode=markdown&text=${encodeURIComponent(
              prefixMessage(this.globalPrefix, message, notificationType)
            )}`;
            fetch(url)
              .then(response => {
                response
                  .json()
                  .then(result => {
                    if (result.ok !== true) {
                      reject(
                        new Error(
                          `TelegramProvider API Error: ${result.description}`
                        )
                      );
                      return;
                    }
                    resolve({
                      provider: 'telegram',
                      success: true
                    });
                  })
                  .catch(reject);
              })
              .catch(reject);
          })
      )
    );
  }
}

export default TelegramProvider;
