import { tagsAll, summary, query, body } from "koa-swagger-decorator";
import BaseApi, { router, Context } from "./baseapi";
import * as utils from "../utils";
@tagsAll(["前端/节点管理"])
export default class AppMedisApi extends BaseApi {
   @router("get", "/ip")
   @router("post", "/ip")
   @summary("ip")
   async get(ctx: Context) {
      let ip = this.getClientIp()
         .replace(/[; ,].*/, "")
         .trim();
      let contentType = ctx.get("content-type");
      if (/json/i.test(contentType)) {
         ctx.body = JSON.stringify({
            ip: ip,
         });
      } else {
         ctx.body = ip;
      }
   }
}
