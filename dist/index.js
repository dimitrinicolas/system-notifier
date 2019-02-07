"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotificationType_1 = require("./types/NotificationType");
exports.NotificationType = NotificationType_1.default;
const TelegramProvider_1 = require("./providers/TelegramProvider");
const TwilioProvider_1 = require("./providers/TwilioProvider");
class SystemNotifier {
    constructor(options = { prefix: '' }) {
        this.providers = [];
        const providerOptions = {
            globalPrefix: options.prefix
        };
        if (options.twilio) {
            this.providers.push(new TwilioProvider_1.default(providerOptions, options.twilio));
        }
        if (options.telegram) {
            this.providers.push(new TelegramProvider_1.default(providerOptions, options.telegram));
        }
    }
    /**
     * Send notification message
     * @param message Message to send
     * @param notificationType Notification type
     */
    notify(message, notificationType = NotificationType_1.default.Default) {
        return Promise.all(this.providers.map(provider => {
            return provider.sendMessage(message, notificationType);
        }));
    }
}
exports.default = SystemNotifier;
