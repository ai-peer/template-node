import { Command } from "commander";
import logger from "../src/utils/logger";
import App from "../src/app";


const program = new Command();
let appParams: any = program //
   .option("-p, --port [value]", "绑定端口", "80") //
   .option("-h, --host [value]", "绑定IP", "0.0.0.0") //
   .parse(process.argv)
   .opts();

console.info("====>>>start", appParams);
logger.info("test===", "ok", "xx");
logger.user.info("user print", "aaa");

(async () => {
   const app = new App();
   let server = app.listen(appParams.port, appParams.host, () => {
      let address: any = server.address();
      console.info("server listen ", address);
   });
})();
