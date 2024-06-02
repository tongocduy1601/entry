module.exports = (app) => {
  app.use("/api/users", require("../routes/user.route.js"));
};
