/**
 * common function to handle error
 */
const errorHandler = (err, req, res, next) => {
    console.log("Error ...", err);
    res.status(err.statusCode || 500).json({
        status: err.status || 'An Error occurred.',
        message: err.message
    })
}

module.exports = { errorHandler }