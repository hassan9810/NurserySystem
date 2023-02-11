const express = require("express");
const { body, query, param, validationResult } = require("express-validator");
const controller = require("./../Controller/child")
const validator = require("./../Middelwares/errorValidation")
const authorization = require("./../Middelwares/authorization");
const validationArray = require("./../Middelwares/validation");

const router = express.Router();

router.route("/child")
    .all(authorization.checkAdminOrTeacher)
    .get(controller.getChild)
    .post(validationArray.childValidation, validator, controller.addChild)
    .patch(validationArray.childValidation, validator, controller.updateChild)
    .delete(controller.deleteChild);

router.delete("/child/:id",
    param("id").isInt().withMessage("delete"),
    authorization.checkAdminOrTeacher, validator, controller.deleteChildByID);

router.get("/child/:id",
    param("id").isInt().withMessage("delete"),
    authorization.checkAdminOrTeacher, validator, controller.getChildByID);

module.exports = router;










