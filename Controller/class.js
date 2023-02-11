const mongoose = require("mongoose");
require("./../Model/class");
const classSchema = mongoose.model("class");

exports.getClass = (request, response, next) => {
    classSchema.find()
        .populate({ path: "classSupervisor", select: { fullname: 1 } })
        .populate({ path: "classChildren", select: { childfullname: 1 } })
        .then((data) => {
            response.status(200).json(data);
        })
        .catch((error) => next(error));
}

exports.addClass = (request, response, next) => {
    let newClass = new classSchema({
        _id: request.body.id,
        className: request.body.name,
        classSupervisor: request.body.supervisor,
        classChildren: request.body.children,
    });
    newClass.save()
        .then((result) => {
            response.status(201).json(result);
        })
        .catch((error) => next(error));
};

exports.updateClass = (request, response, next) => {
    classSchema.updateOne(
        {
            _id: request.body.id,
        },
        {
            $set: {
                className: request.body.name,
                classSupervisor: request.body.supervisor,
                classChildren: request.body.children
            }
        }
    )
        .then((result) => {
            response.status(200).json({ message: "updated" });
        })
        .catch((error) => next(error));
};

exports.deleteClass = (request, response, next) => {
    response.status(201).json({ message: "delete" })
}

exports.getClassByID = (request, response, next) => {
    classSchema.findOne({ id: request.params.id })
        .then((data) => {
            if (data != null) {
                response.status(200).json(data);
            }
            else {
                next(new Error("class doesn't Exist"));
            }
        })
        .catch((error) => next(error));
};

exports.deleteClassByID = (request, response, next) => {
    classSchema.findByIdAndDelete({ _id: request.params.id })
        .then((data) => {
            if (data != null) {
                response.status(200).json({ message: "deleted" });
            } else {
                next(new Error("class doesn't Exist"));
            }
        })
        .catch((error) => next(error));
};
