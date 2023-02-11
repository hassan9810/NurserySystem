const { response } = require("express");
const jwt = require("jsonwebtoken");
module.exports = (request, response, next) => {
    try {
        let token = request.get("authorization").split(" ")[1];
        let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decodedToken);
        request.id = decodedToken.id;
        request.role = decodedToken.role;
    } catch (error) {
        error.status = 403;
        error = new Error("Not Authorized");
        next(error);
    }
    next();
}
/* Check Admin */
module.exports.checkAdmin = (request, response, next) => {
    if (request.role == "admin") {
        next()
    }
    else {
        let error = new Error("Not Authorized");
        error.status = 403;
        next(error);
    }
}
/* Check Teacher */
module.exports.checkTeacher = (request, response, next) => {
    if (request.role == "teachers") {
        next()
    }
    else {
        let error = new Error("Not Authorized");
        error.status = 403;
        next(error);
    }
}
/* Check Admin or Teacher */
module.exports.checkAdminOrTeacher = (request, response, next) => {
    if (request.role == "teachers" || request.role == "admin") {
        next()
    }
    else {
        let error = new Error("Not Authorized");
        error.status = 403;
        next(error);
    }
}

