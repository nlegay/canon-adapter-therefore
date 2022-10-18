const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const timezoned = () => {
    return new Date().toLocaleString('fr-FR', {
        timeZone: 'Europe/Paris'
    });
};

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: timezoned }),
        myFormat
    ),
    transports: [
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      new transports.File({ filename: './logs/error.log', level: 'error' }),
      new transports.File({ filename: './logs/combined.log' }),
    ]
});

module.exports = logger;