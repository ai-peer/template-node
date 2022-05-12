/* import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone); */

//const timezonel = "Asia/Shanghai";
import winston from "winston";
import "winston-daily-rotate-file";
import Config from "../config";
import os from "os";
import path from "path";
import mkdirs from "mkdirs";
import pkg from "../../package.json";

const logDir = Config.isDev ? path.resolve("") : path.join(os.homedir(), "." + pkg.name);
mkdirs(logDir);
console.info("logdir", logDir);

const logFormat = winston.format.combine(
   winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
   //winston.format.align(),
   //winston.format.printf((info) => `${info.level}: ${[info.timestamp]} ${info.message}`),
   winston.format.json(),
);
/** 普通日志 */
const log = winston.createLogger({
   level: Config.logger,
   format: logFormat,
   defaultMeta: { service: "log" },
   transports: [
      new winston.transports.DailyRotateFile({
         filename: "logs/log-%DATE%.log",
         level: "info",
      }),
      new winston.transports.DailyRotateFile({
         filename: "logs/error-%DATE%.log",
         level: "error",
      }),
   ],
});
/** 用户日志 */
const logUser = winston.createLogger({
   level: Config.logger,
   format: logFormat,
   defaultMeta: { service: "user" },
   transports: [
      new winston.transports.DailyRotateFile({
         filename: "logs/log-%DATE%.log",
         level: "info",
      }),
      new winston.transports.DailyRotateFile({
         filename: "logs/error-%DATE%.log",
         level: "error",
      }),
   ],
});

class Logger0 {
   private logger: winston.Logger;
   constructor(logger: winston.Logger) {
      this.logger = logger;
   }
   info(...args) {
      this.logger.info.bind(this.logger)(...args);
   }
   warn(...args) {
      this.logger.warn.bind(this.logger)(...args);
   }
   error(...args) {
      this.logger.error.bind(this.logger)(...args);
   }
   debug(...args) {
      this.logger.debug.bind(this.logger)(...args);
   }
   log(...args) {
      this.logger.debug.bind(this.logger)(...args);
   }
}
const log0 = new Logger0(log);
class Logger {
   user = new Logger0(logUser);
   info(...args) {
      log0.info(...args);
   }
   warn(...args) {
      log0.warn(...args);
   }
   error(...args) {
      log0.error(...args);
   }
   debug(...args) {
      log0.debug(...args);
   }
}

const expLog = new Logger();

export default expLog;
