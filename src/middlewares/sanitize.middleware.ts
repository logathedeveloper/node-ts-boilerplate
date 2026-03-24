import xss from "xss";
import mongoSanitize from "mongo-sanitize";

export const sanitizeInput = (req: any, res: any, next: any) => {
  // sanitize body
  if (req.body) {
    for (let key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = xss(req.body[key]);
      }
      req.body[key] = mongoSanitize(req.body[key]);
    }
  }

  // sanitize query
  if (req.query) {
    for (let key in req.query) {
      if (typeof req.query[key] === "string") {
        req.query[key] = xss(req.query[key]);
      }
      req.query[key] = mongoSanitize(req.query[key]);
    }
  }

  next();
};