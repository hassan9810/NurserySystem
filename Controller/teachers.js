const mongoose = require("mongoose");
require("./../Model/teachers");
const teachersSchema = mongoose.model("teachers");

exports.getTeacher = (request, response, next) => {
    teachersSchema.find()
        .then((data) => {
            response.status(200).json(data);
        })
        .catch((error) => next(error))
}
exports.addTeacher = (request, response, next) => {
    let newTeacher = new teachersSchema({
        _id: request.body.id,
        fullname: request.body.name,
        tpassword: request.body.password,
        temail: request.body.email,
        timage: request.body.image
    });
    newTeacher.save()
        .then(result => {
            response.status(201).json(result);
        })
        .catch(error => next(error))
}
exports.updateTeacher = (request, response, next) => {
    teachersSchema.updateOne({
        _id: request.body.id
    }, {
        $set: {
            fullname: request.body.name,
            tpassword: request.body.password,
            temail: request.body.email,
            timage: request.body.image
        }
    }).then(result => {
        response.status(200).json({ message: "updated" });
    })
        .catch(error => next(error))
}
exports.getTeacherByID = (request, response, next) => {
    teachersSchema.findOne({ _id: request.params.id })
        .then(data => {
            if (data != null)
                response.status(200).json(data);
            else {
                next(new Error("Teacher doesn't Exist"));
            }
        })
        .catch(error => next(error))
}
exports.deleteTeacherByID = (request, response, next) => {
    teachersSchema.findByIdAndDelete({ _id: request.params.id })
        .then((data) => {
            if (data != null) {
                response.status(200).json({ message: "deleted" });
            } else {
                next(new Error("teacher doesn't Exist"));
            }
        })
        .catch((error) => next(error));
};

