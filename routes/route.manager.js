const uesrRoute = require("./user.route");
const groupRoute = require("./group.route");
const authRoute = require("./auth.route");

const routeManager = (app) => {
    // API Routes
    app.use('/users', uesrRoute);
    app.use('/auth', authRoute);
    app.use('/groups', groupRoute);
}

module.exports = routeManager;