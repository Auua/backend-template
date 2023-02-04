import * as winston from 'winston';

interface AuditLevels extends winston.Logger {
  failure: winston.LeveledLogMethod;
  success: winston.LeveledLogMethod;
}

const auditLevels = {
  failure: 0,
  success: 1,
};

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
  failure: 'bold red',
  success: 'bold green',
};

winston.addColors(colors);

const messageFormat = (info: any) =>
  !!info.stack
    ? `${info.timestamp}\t${info.level}\t${info.context}\t${info.message}\t${info.stack}`
    : `${info.timestamp}\t${info.level}\t${info.context}\t${info.message}`;

const format = winston.format.combine(
  winston.format.timestamp({ format: 'DD.MM.YYYY HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => messageFormat(info)),
);

/* Json logging, not used yet
const formatJson = winston.format.combine(
  winston.format.timestamp({ format: 'DD.MM.YYYY HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.json(),
);

*/

const winstonTransports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: './logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({
    filename: './logs/all.log',
  }),
];

const auditTransport = [
  new winston.transports.Console({
    level: 'success',
  }),
  new winston.transports.File({
    filename: './logs/audit.log',
    level: 'success',
    format: format,
  }),
];

export const auditLogger: AuditLevels = <AuditLevels>winston.createLogger({
  levels: auditLevels,
  format,
  transports: auditTransport,
});

export const dailyLogger = winston.createLogger({
  level: level(),
  format,
  transports: winstonTransports,
});
