// Import 
import http from 'http'
import express from 'express'
import mongoose from 'mongoose'
import WebSocket from 'ws'
import mongo from './mongo'

import wsConnect from './wsConnect'

// Mongoose connection
mongo.connect()

// Server 
const app = express()
const server = http.createServer( app )
const serverWS = new WebSocket.Server( { server } )
const db = mongoose.connection

const PORT = process.env.PORT || 4000
server.listen( PORT, () => { console.log( `Listening on http://localhost:${PORT}` ) } )

// Set onmessage function
db.once( 'open', () => {
    console.log( 'db connected' )
    serverWS.on( 'connection', ( clientWS ) => {
        console.log( 'client connected' )
        clientWS.onmessage = wsConnect.onMessage( serverWS, clientWS )
    } )
} )