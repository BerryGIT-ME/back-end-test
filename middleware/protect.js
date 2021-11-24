import jwt from "jsonwebtoken";
import { SECRETKEY } from "./../index.js";

export function protect(req, res, next) {
  // check for the authorization - expects token of this format: "bearer tokenString"
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];

    jwt.verify(token, SECRETKEY, (err, data) => {
      if (err) {
        res.status(401).json({ message: "Invalid authentication" });
        return;
      }
      req.data = data;
      next();
    });
  } else {
    res.status(401).json({ message: "Invalid authentication" });
  }
}
