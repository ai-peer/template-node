import { Command } from "commander";
import logger from "../src/utils/logger";

const program = new Command();
let appParams: any = program //
   .option("-p, --port [value]", "绑定端口", "4321") //
   .option("-h, --host [value]", "绑定IP", "0.0.0.0") //
   .parse(process.argv)
   .opts();

(async () => {
   console.info("====>>>start", appParams);
   logger.info("test===", "ok", "xx");
   logger.user.info("user print", "aaa");
})();
