import * as express from "express";
import * as http from "http";
import * as cors from "cors";

const serverLoader = () => {
  const app = express();
  const server = http.createServer(app);

  app.use(cors());

  app.get("/", (_req, res) => {
    res.send("Shatzen");
  });

  app.get("/health", (_req, res) => {
    res.send(true);
  });
  return { app, server };
};

export default serverLoader;
