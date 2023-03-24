import logger from "../src/utils/logger";
import App from "../src/app";
const yargs = require("yargs");

process.on("uncaughtException", (e) => console.error("uncaughtException ", e.stack));
process.on("unhandledRejection", (e: any) => logger.warn("unhandledRejection", e?.stack || ""));

const optimistUsageLength = 98;

const opts = yargs
   .usage("Usage: $0")
   .wrap(Math.min(optimistUsageLength, yargs.terminalWidth()))
   .options({
      expire_timeout: {
         demandOption: false,
         alias: "t",
         describe: "timeout (milliseconds)",
         default: 5000,
      },
      concurrent_limit: {
         demandOption: false,
         alias: "c",
         describe: "concurrent limit",
         default: 5000,
      },
      alive_timeout: {
         demandOption: false,
         describe: "broken connection check timeout (milliseconds)",
         default: 60000,
      },
      key: {
         demandOption: false,
         alias: "k",
         describe: "connection key",
         default: "peerjs",
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
         default: 80,
      },
      path: {
         demandOption: false,
         describe: "custom path",
         default: "/",
      },
      allow_discovery: {
         demandOption: false,
         describe: "allow discovery of peers",
      },
      proxied: {
         demandOption: false,
         describe: "Set true if PeerServer stays behind a reverse proxy",
         default: false,
      },
   })
   .boolean("allow_discovery").argv;

(async () => {
   const app = new App();
   let server = app.listen(opts.port, opts.host, () => {
      let address: any = server.address();
      console.info("server listen ", address);
   });
})();
