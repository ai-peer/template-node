import Koa from "koa";
export function getClientIp(ctx: Koa.Context): string {
   let ip =
      ctx.get("cf-connecting-ip") || //
      ctx.get("x-client-ip") ||
      ctx.get("x-forwarded-for") ||
      ctx.get("x-real-ip") ||
      "";
   if (!ip) {
      try {
         ip = ctx.socket.remoteAddress || "";
      } catch (err) {}
   }
   ip = ip?.replace(/^::ffff:/, "").trim();
   ip = (ip.split(",")[0] || "").trim();
   return ip || "";
}
