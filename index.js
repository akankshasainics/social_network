const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db")
const { ApiError } = require('./utils/apiError');
const routeManager = require("./routes/route.manager");
const { errorHandler } = require('./middlewares/errorHandler');

dotenv.config();

const app = express();
app.use(express.json());
routeManager(app);

// establish database connection
connectDB();

app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find ${req.originalUrl}`, 404));
});

app.use(errorHandler, cors());

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on  http://localhost:${PORT}`));
