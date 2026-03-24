import pinoHttp from "pino-http";

export const httpLogger = pinoHttp({
  customLogLevel: (res : any, err) => {
    if (res.statusCode >= 500 || err) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
});