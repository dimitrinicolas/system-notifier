import NotificationType from '../types/NotificationType';

interface IMessagePrefixMap {
  [key: string]: string;
}

const messagePrefix: IMessagePrefixMap = {};
messagePrefix[NotificationType.Default] = '';
messagePrefix[NotificationType.Info] = 'ℹ️';
messagePrefix[NotificationType.Error] = '❌';
messagePrefix[NotificationType.Warning] = '⚠️';
messagePrefix[NotificationType.Success] = '✅';

export default messagePrefix;
