import http from "http";
import express from "express";
import WebSocket from "ws";
import mongoose from "mongoose";
import mongo from "./mongo";
import wsConnect from "./wsConnect";

mongo.connect();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const db = mongoose.connection;

db.once("open", () => {
  console.log("WSS MongoDB connected!");
  wss.on("connection", (ws) => {
    console.log("A new client connected!");
    ws.box = "";
    ws.onmessage = (msg) => {
      wsConnect.onMessage(wss, ws)(msg);
    };
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server is up on port ${PORT}!`));
