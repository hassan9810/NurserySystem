const mongoose = require("mongoose");
require("./../Model/child");
const childSchema = mongoose.model("child");

exports.getChild = (request, response, next) => {
    childSchema.find()
        .then((data) => {
            response.status(200).json(data);
        })
        .catch((error) => next(error))
}

exports.addChild = (request, response, next) => {
    let newChild = new childSchema({
        _id: request.body.id,
        childfullname: request.body.fullname,
        childage: request.body.age,
        childlevel: request.body.level,
        childaddress: request.body.address
    });
    newChild.save()
        .then(result => {
            response.status(201).json(result);
        })
        .catch(error => next(error))
}

exports.updateChild = (request, response, next) => {
    childSchema.updateOne({
        _id: request.body.id,
    }, {
        $set: {
            childfullname: request.body.fullname,
            childage: request.body.age,
            childlevel: request.body.level,
            childaddress: request.body.address
        }
    }).then(result => {
        response.status(200).json({ message: "updated" });
    })
        .catch(error => next(error))
}

exports.deleteChild = (request, response, next) => {
    response.status(201).json({ message: "delete" })
}

exports.deleteChildByID = (request, response, next) => {
    childSchema.findByIdAndDelete({ _id: request.params.id })
        .then((data) => {
            if (data != null) {
                response.status(200).json({ message: "deleted" });
            } else {
                next(new Error("child doesn't Exist"));
            }
        })
        .catch((error) => next(error));
};

exports.getChildByID = (request, response, next) => {
    childSchema.findOne({ id: request.params.id })
        .then(data => {
            if (data != null)
                response.status(200).json(data);
            else {
                next(new Error("Child doesn't Exist"));
            }
        })
        .catch(error => next(error))
}