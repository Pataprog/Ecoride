import chalk from 'chalk';

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'success';
const levelOrder: LogLevel[] = ['debug', 'info', 'warn', 'success', 'error'];

// Niveau actuel de log : change-le selon tes besoins (ou charge depuis une config .env si tu veux)
const CURRENT_LEVEL: LogLevel = 'debug';

const shouldLog = (level: LogLevel) =>
  levelOrder.indexOf(level) >= levelOrder.indexOf(CURRENT_LEVEL);

const timestamp = () => {
  return chalk.gray(`[${new Date().toLocaleTimeString()}]`);
};

export const logger = {
  debug: (msg: string) => {
    if (shouldLog('debug')) {
      console.log(`${timestamp()} ${chalk.white('[DEBUG]')} ${msg}`);
    }
  },

  info: (msg: string) => {
    if (shouldLog('info')) {
      console.log(`${timestamp()} ${chalk.blue('[INFO]')} ${msg}`);
    }
  },

  warn: (msg: string) => {
    if (shouldLog('warn')) {
      console.warn(`${timestamp()} ${chalk.yellow('[WARN]')} ${msg}`);
    }
  },

  error: (msg: string) => {
    if (shouldLog('error')) {
      console.error(`${timestamp()} ${chalk.red('[ERROR]')} ${msg}`);
    }
  },

  success: (msg: string) => {
    if (shouldLog('success')) {
      console.log(`${timestamp()} ${chalk.green('[OK]')} ${msg}`);
    }
  },

  custom: (msg: string, style: (txt: string) => string) => {
    console.log(`${timestamp()} ${style(msg)}`);
  }
};