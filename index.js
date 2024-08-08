const express = require("express");
const {connectDB} = require("./config/db")
const {ApiError} = require('./utils/apiError'); 
const {errorHandler} = require('./middlewares/errorHandler');

const app = express();

// Connect Database
connectDB();

app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find ${req.originalUrl}`, 404));
});

// Init Middleware
app.use(errorHandler, express.json({ extended: false }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on  http://localhost:${PORT}`));
