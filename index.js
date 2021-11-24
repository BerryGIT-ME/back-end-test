import express from "express";
import dotenv from "dotenv";
import login from "./routes/login.js";
import resizeThumbnail from "./routes/thumbnail.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
export const SECRETKEY = process.env.JWTSECRETE;

export const app = express();
app.use(express.json());

app.use("/api/login", login);
app.use("/api/resize-thumbnail", resizeThumbnail);

app.listen(PORT, (err) => {
  console.log(`server started on port ${PORT}`);
});
