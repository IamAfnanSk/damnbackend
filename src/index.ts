import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();
import http from "http";

import v1Router from "./api/v1/routes/routes";

import mongoose from "mongoose";

import { SocketController } from "./controllers/socketio.controller";

import { config } from "./configs/config";

const app = express();

const PORT: number = config.port;

// Connect to mongo
mongoose.connect(
  config.mongoServer,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (error) => {
    if (!error) {
      console.log("✨ MongoDB Connected");
    }
  }
);

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
  } catch (error) {
    console.log("😖 Again a crash");
  }
});
