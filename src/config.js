const isDev = process.env.NODE_ENV == "development";

const config = {
   isDev: isDev,
   logger: isDev ? "debug" : "info",
   loggerDay: isDev ? "1d" : "30d",
   loggerSize: "20m",
   staticWWW: "",
   staticRootPath: "",
   /** 使用api版本 */
   apiVersion: "v1",
   port:80,
};

module.exports = config;
