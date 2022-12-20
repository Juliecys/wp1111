import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db'; 
import routes from './routes/index'; 
// import dotenv from "dotenv-defaults";
// import mongoose from 'mongoose';
const app = express();
const port = process.env.PORT || 4000;

// Parses the text as JSON and exposes the resulting 
// object on req.body.
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

app.use('/', routes);
// dotenv.config();
// mongoose
//     .connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then((res) => console.log("mongo db connection created"));
db.connect();

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);