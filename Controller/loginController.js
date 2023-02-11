const mongoose = require("mongoose");
require("./../Model/teachers");
const jwt = require("jsonwebtoken");
const teachersSchema = mongoose.model("teachers");

exports.login = (request, response, next) => {
    if (request.body.userName == "Ahmed" && request.body.password == "12345") {
        let token = jwt.sign({
            role: "admin",
            userName: "Ahmed"
        }, process.env.SECRET_KEY, { expiresIn: "1hr" });
        response.status(200).json({ data: "admin authorized", token });
    }
    else {
        teachersSchema.findOne({ fullname: request.body.userName })
            .then(teachers => {
                if (teachers == null) {
                    let error = new Error("Not Authenticated");
                    error.status = 401;
                    next(error);
                }
                else {
                    let token = jwt.sign({
                        id: teachers._id,
                        name: teachers.fullname,
                        role: "teachers"
                    }, process.env.SECRET_KEY, { expiresIn: "1h" });
                    response.status(200).json({ data: "teacher", token });
                }
            })
            .catch(error => {
                next(error);
            })
    }
}