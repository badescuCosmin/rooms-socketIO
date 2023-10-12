import express from "express";
import api from "./routes/api";
import path from "path";

const app = express();

app.use(express.json());
api.use(express.static(path.join(__dirname, "..", "public")));
app.use(api);

api.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

export default app;
