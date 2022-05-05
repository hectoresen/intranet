const express = require('express');
const passport = require('passport');
const cors = require('cors');
const usersRouter = require('./routes/auth.users');
const eventsRouter = require('./routes/events.routes');
const newsRouter = require('./routes/news.routes');
const commentsRouter = require('./routes/comments.routes');
const adminRouter = require('./routes/admin.routes');

const {connectToDb} = require('./config/db');
connectToDb();

const PORT = 4500;
const server = express();
const router = express.Router();

require('./passport');

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

server.use('/auth',usersRouter);
server.use('/events', eventsRouter);
server.use('/news', newsRouter);
server.use('/comments', commentsRouter);
server.use('/admin', adminRouter);


server.use('*', (req, res, next) =>{
    const error = new Error('Ruta no encontrada');
    error.status= 404;
    next(error);
})

server.use((error, req, res, next) =>{
    return res.status(error.status || 500).json(error);
});

server.listen(PORT, () =>{
    console.log(`Server OK: https://localhost:${PORT}`);
})

