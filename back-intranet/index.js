const express = require('express');
const passport = require('passport');
const cors = require('cors');

const {connectToDb} = require('./config/db');
connectToDb();

const PORT = 4500;
const server = express();
const router = express.Router();

server.use((req, res, next) =>{
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use(passport.initialize());

server.listen(PORT, () =>{
    console.log(`Server OK: https://localhost:${PORT}`);
})

