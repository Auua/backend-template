import * as morgan from 'morgan';
import { dailyLogger } from './winston.logger';

const stream = {
  write: (message: any) => dailyLogger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

export const morganLogger = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream, skip },
);
