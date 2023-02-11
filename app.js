const express = require("express");
const mongoose = require("mongoose");
const teachersRouter = require("./Routes/teachers");
const chileRouter = require("./Routes/child");
const classRouter = require("./Routes/class");
const loginRouter = require("./Routes/login");
const authorization = require("./Middelwares/authorization");
require("dotenv").config();
const server = express();

let port = process.env.PORT || 8080;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to Database ....");
    server.listen(port, () => {
        console.log("App listening on Port .... ", port);
    });
})
    .catch(error => {
        console.log("DB Problem " + error);
    })
/* First MiddleWare */
server.use((request, response, next) => {
    console.log("From FirstMW", request.url, request.method);
    next();
});
/* routes */
server.use(express.json());
server.use(loginRouter);
server.use(authorization);
server.use(teachersRouter);
server.use(chileRouter);
server.use(classRouter);
/* NoT Found */
server.use((request, response, next) => {
    response.status(404).json({ data: "Not Fount" });
});
/* Error MiddleWare */
server.use((error, request, response, next) => {
    const status = error.status || 500;
    response.status(status).json({ message: "Error " + error });
});

