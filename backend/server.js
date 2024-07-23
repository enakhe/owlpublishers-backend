const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');

const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

const PORT = process.env.PORT || 5003;
const app = express();

// Connect to DB;
connectDB();

// Middleware for JSON body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Routes Middleware
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));

// Middleware for error handling
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));


module.exports = app;