const isDev = process.env.NODE_ENV == "development";

export default {
   isDev: isDev,
   logger: isDev ? "debug" : "info",
};
