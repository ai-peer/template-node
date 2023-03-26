import logger from "../src/utils/logger";
import config from "../src/config";
const yargs = require("yargs");

process.on("uncaughtException", (e) => console.error("uncaughtException ", e.stack));
process.on("unhandledRejection", (e: any) => logger.warn("unhandledRejection", e?.stack || ""));

const optimistUsageLength = 98;

const opts = yargs
   .usage("Usage: $0")
   .wrap(Math.min(optimistUsageLength, yargs.terminalWidth()))
   .options({
      api_version: {
         demandOption: false,
         describe: "使用api版本",
         default: config.apiVersion,
      },
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
   }).argv; //.boolean("allow_discovery")
for (let key of Object.keys(opts)) {
   let field = key
      .split("_")
      .map((v, i) => {
         if (i < 1) return v;
         return v.substring(0, 1).toUpperCase() + v.substring(1);
      })
      .join("");
   if (field in config) {
      if (opts[key]) config[field] = opts[key];
   }
}
(async () => {
   console.info(`=======start====use api_version=${config.apiVersion}`);
   const App = require("../src/app");
   const app = new App();
   let server = app.listen(opts.port, opts.host, () => {
      let address: any = server.address();
      console.info("server listen ", address);
   });
})();
