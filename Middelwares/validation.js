const { body, query, param, validationResult } = require("express-validator");
/* Teacher Validation */
exports.teacherValidation = [
    body("name").isString().withMessage("name should be a string")
        .isLength({ min: 5, max: 10 }).withMessage("name length should be between 5 and 10 characters"),
    body("password").isStrongPassword().withMessage("password is weak"),
    body("email").isEmail().withMessage("E-mail is not valid"),
    body("image").isString().withMessage("image should be a string")
];
/* Class Validation */
exports.classValidation = [
    body("name").isString().withMessage("name should be a string")
        .isLength({ min: 5, max: 10 }).withMessage("name length should be between 5 and 10 characters"),
    body("supervisor").isMongoId().withMessage("supervisor should be an object"),
    body("children").isArray().withMessage("children should be an array"),
];
/* Child Validation */
exports.childValidation = [
    body("fullname").isString().withMessage("fullname should be a string")
        .isLength({ min: 5, max: 10 }).withMessage("name length should be between 5 and 10 characters"),
    body("age").isInt({ min: 3, max: 6 }).withMessage("age should be an integer"),
    body("level").isIn(["PreKG", "KG1", "KG2"]).withMessage("level should be a string & in [PreKG or KG1 or KG2]"),
    body("address").isObject().withMessage("address should be an object"),
    body("address.city").isString().withMessage("city should be a string"),
    body("address.street").isString().withMessage("street should be a string"),
    body("address.building").isInt().withMessage("building should be a number")
];
