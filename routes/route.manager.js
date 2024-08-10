const userRoute = require("./user.route");
const groupRoute = require("./group.route");
const authRoute = require("./auth.route");
const postRoute = require("./post.route");
const timelineRoute = require("./timeline.route");

const routeManager = (app) => {
    // API Routes
    app.use('/users', userRoute);
    app.use('/auth', authRoute);
    app.use('/groups', groupRoute);
    app.use('/posts', postRoute);
    app.use('/timeline', timelineRoute);
}

module.exports = routeManager;