import express from "express";
import dotenv from "dotenv";
import login from "./routes/login.js";

dotenv.config();

export const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/login", login);

app.listen(PORT, (err) => {
  console.log(`server started on port ${PORT}`);
});
