const uesrRoute = require("./user.route");

const routeManager = (app) => {
    // API Routes
    app.use('/users', uesrRoute);

}

module.exports = routeManager;