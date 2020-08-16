const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);


// Express App Config
app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' })); //add by alon, do not delet if fix long url ptoblem
// app.use(cors());
app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}




const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');
const movieRoutes = require('./api/movie/movie.routes');
const theaterRoutes = require('./api/theater/theater.routes');
const showRoutes = require('./api/show/show.routes');
const ticketRoutes = require('./api/ticket/ticket.routes');
// routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/theater', theaterRoutes);
app.use('/api/show', showRoutes);
app.use('/api/ticket', ticketRoutes);






const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;

if (process.env.NODE_ENV === 'production') {
    app.get('/**', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    })
}


http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});