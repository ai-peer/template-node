const isDev = process.env.NODE_ENV == "development";

const config = {
   isDev: isDev,
   logger: isDev ? "debug" : "info",
   loggerDay: isDev ? "1d" : "30d",
   loggerSize: "20m",
   staticWWW: "",
   staticRootPath: "",
   apiVersion: "v2",
};

module.exports = config;
