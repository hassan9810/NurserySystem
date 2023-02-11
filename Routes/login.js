const express = require('express');
const controller = require("./../Controller/loginController");
const loginRouter = express.Router();

loginRouter.route("/login")
    .post(controller.login);

module.exports = loginRouter;

