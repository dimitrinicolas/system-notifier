import NotificationType from './types/NotificationType';
import { ITelegramOptions } from './providers/TelegramProvider';
import { ITwilioOptions } from './providers/TwilioProvider';
export { NotificationType };
interface ISystemNotifierOptions {
    prefix?: string;
    twilio?: ITwilioOptions;
    telegram?: ITelegramOptions;
}
declare class SystemNotifier {
    private providers;
    constructor(options?: ISystemNotifierOptions);
    /**
     * Send notification message
     * @param message Message to send
     * @param notificationType Notification type
     */
    notify(message: string, notificationType?: NotificationType): Promise<void[]>;
}
export default SystemNotifier;
