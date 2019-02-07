import NotificationType from '../types/NotificationType';

import messagePrefix from './messagePrefixes';

const prefixMessage = (
  globalPrefix: string,
  message: string,
  notificationType: NotificationType
): string =>
  `${globalPrefix}${messagePrefix[notificationType] || ''} ${message}`;

export default prefixMessage;
