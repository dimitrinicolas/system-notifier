import NotificationType from '../types/NotificationType';

export interface IProviderOptions {
  globalPrefix: string;
}

class Provider {
  protected globalPrefix: string = null;

  constructor(options: IProviderOptions) {
    this.globalPrefix = options.globalPrefix;
  }

  /**
   * sendMessage Send Message
   */
  public sendMessage(message: string, notificationType?: NotificationType) {}
}

export default Provider;
