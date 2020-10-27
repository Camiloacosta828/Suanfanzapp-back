const personService = require("../logic/PersonService");

exports.persons = (req, res, next) => {
    try {
        personService.persons(req, res);
    } catch (Error) {
        return next(Error);
    }
};