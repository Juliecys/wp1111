import http from 'http';
import express from 'express';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import WebSocket from 'ws';
import mongo from './mongo';
import wsConnect from './wsConnect' 

mongo.connect();

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server: server })
const db = mongoose.connection

db.once('open', () => {
    console.log("MongoDB connected!");
    wss.on('connection', (ws) => {
        // console.log("Client connected");
        // Define WebSocket connection logic
        wsConnect.initData(ws);
        ws.onmessage = wsConnect.onMessage(wss);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`),
);