const express = require("express");
const { body, query, param, validationResult } = require("express-validator");
const controller = require("./../Controller/teachers")
const validator = require("./../Middelwares/errorValidation")
const authorization = require("./../Middelwares/authorization");
const validationArray = require("./../Middelwares/validation");
const router = express.Router();

router.route("/teachers")
    .all(authorization.checkAdminOrTeacher)
    .get(controller.getTeacher)
    .post(validationArray.teacherValidation, validator, controller.addTeacher)
    .patch(validationArray.teacherValidation, validator, controller.updateTeacher)

router.delete("/teachers/:id",
    param("id").isMongoId().withMessage("delete"),
    validator, controller.deleteTeacherByID);

router.get("/teachers/:id",
    param("id").isMongoId().withMessage("delete"),
    validator, controller.getTeacherByID);

module.exports = router;



