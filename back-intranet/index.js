const express = require('express');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);


const usersRouter = require('./routes/auth.users');
const eventsRouter = require('./routes/events.routes');
const newsRouter = require('./routes/news.routes');
const commentsRouter = require('./routes/comments.routes');
const adminRouter = require('./routes/admin.routes');
const chatRouter = require('./routes/chat.routes');
const chatPostsRouter = require('./routes/chatPosts.routes');
const projectsRouter = require('./routes/projects.routes');

const dotenv = require('dotenv').config({ path: './.env.local' })

const PORT = 4500;
const server = express();

const { connectToDb } = require('./config/db');
connectToDb();


const router = express.Router();

require('./passport');

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(express.static(path.join(__dirname, 'public')))


server.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false,
            secure: false,
            sameSite: false,
        },
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);


server.use(passport.initialize());

server.use(passport.session());

server.use('/auth', usersRouter);
server.use('/events', eventsRouter);
server.use('/news', newsRouter);
server.use('/comments', commentsRouter);
server.use('/admin', adminRouter);
server.use('/chat', chatRouter);
server.use('/messages', chatPostsRouter);
server.use('/projects', projectsRouter);


server.use('*', (req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
})

server.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error);
});

server.listen(PORT, () => {
    console.log(`Server OK: https://localhost:${PORT}`);
})

