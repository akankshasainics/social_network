const errorHandler = (err, req, res, next) => {
    console.log("Error ...", err.message);
    res.status(err.statusCode || 500).json({
        status: err.status || 'An Error occurred.',
        message: err.message
    })
}

module.exports = {errorHandler}