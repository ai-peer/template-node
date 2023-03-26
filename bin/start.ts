import logger from "../src/utils/logger";
import App from "../src/app";
import config from "../src/config";
const yargs = require("yargs");

process.on("uncaughtException", (e) => console.error("uncaughtException ", e.stack));
process.on("unhandledRejection", (e: any) => logger.warn("unhandledRejection", e?.stack || ""));

const optimistUsageLength = 98;

const opts = yargs
   .usage("Usage: $0")
   .wrap(Math.min(optimistUsageLength, yargs.terminalWidth()))
   .options({
      alive_timeout: {
         demandOption: false,
         describe: "broken connection check timeout (milliseconds)",
         default: 60000,
      },
      sslkey: {
         demandOption: false,
         describe: "path to SSL key",
      },
      sslcert: {
         demandOption: false,
         describe: "path to SSL certificate",
      },
      host: {
         demandOption: false,
         alias: "H",
         describe: "host",
         default: "0.0.0.0",
      },
      port: {
         demandOption: true,
         alias: "p",
         describe: "port",
         default: config.port,
      },
      path: {
         demandOption: false,
         describe: "custom path",
         default: "/",
      },
   }) //.boolean("allow_discovery")
   .argv;

(async () => {
   const app = new App();
   let server = app.listen(opts.port, opts.host, () => {
      let address: any = server.address();
      console.info("server listen ", address);
   });
})();
