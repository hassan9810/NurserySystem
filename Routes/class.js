const express = require("express");
const { body, query, param, validationResult } = require("express-validator");
const controller = require("./../Controller/class")
const validator = require("./../Middelwares/errorValidation")
const validationArray = require("./../Middelwares/validation");
const authorization = require("./../Middelwares/authorization");

const router = express.Router();

router.route("/class")
    .all(authorization.checkAdmin)
    .get(controller.getClass)
    .post(validationArray.classValidation, validator, controller.addClass)
    .patch(validationArray.classValidation, validator, controller.updateClass)
    .delete(controller.deleteClass);

router.get("/class/:id",
    param("id").isInt().withMessage("delete"),
    authorization.checkAdmin, validator, controller.getClassByID);

router.delete("/class/:id",
    param("id").isInt().withMessage("delete"),
    authorization.checkAdmin, validator, controller.deleteClassByID);

module.exports = router;



