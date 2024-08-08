const uesrRoute = require("./user.route");
const authRoute = require("./auth.route");

const routeManager = (app) => {
    // API Routes
    app.use('/users', uesrRoute);
    app.use('/auth', authRoute);
}

module.exports = routeManager;