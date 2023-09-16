import { config as dotenvConfig } from "dotenv";
dotenvConfig();

import http from "http";
import express from "express";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import mongoose from "mongoose";

import v1Router from "./api/v1/routes/routes";

import { SocketController } from "./controllers/socketio.controller";

import { config } from "./configs/config";

const app = express();

const PORT: number = config.port;

// Connect to mongo
(async () => {
  try {
    await mongoose.connect(config.mongoServer);
    console.log("db connected");
  } catch (error: any) {
    console.log(error);
  }
})();

// Middlewares
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

// Routes
app.use("/api/v1", v1Router);

// Socket IO
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`✨ Server running at http://localhost:${PORT}`);

  const socketController = new SocketController();

  try {
    socketController.socketWorkIt(server);
  } catch (error: any) {
    console.log("😖 Again a crash");
  }
});
