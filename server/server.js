const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const genreRouter = require('./routes/genre.router')
const eventRouter = require('./routes/event.router')
const djRouter = require('./routes/dj.router')
const bookingRouter = require('./routes/booking.router')
const uploadRouter = require('./routes/upload.router')

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));
app.use('/uploads', express.static('uploads')) 


// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/genres', genreRouter)
app.use('/api/events', eventRouter)
app.use('/api/dj', djRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/upload', uploadRouter)

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
