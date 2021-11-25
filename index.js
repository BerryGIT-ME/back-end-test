import express from "express";
import dotenv from "dotenv";
import login from "./routes/login.js";
import resizeThumbnail from "./routes/thumbnail.js";
import patch from "./routes/patch.js";
import logger from "./service/logService.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
export const SECRETKEY = process.env.JWTSECRETE;

const app = express();
app.use(express.json());

app.use("/api/login", login);
app.use("/api/resize-thumbnail", resizeThumbnail);
app.use("/api/patch", patch);

app.listen(PORT, (err) => {
  logger.info(`server started on port ${PORT}`);
});

export default app;
