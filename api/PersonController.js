const personService = require("../logic/PersonService");
const sql = require("../config/mysqldev");


exports.persons = (req, res, next) => {
    try {
        personService.persons(req, res);
    } catch (Error) {
        return next(Error);
    }
};
exports.update = (req, res, next) => {
    try {
        personService.update(req, res);
    } catch (Error) {
        return next(Error);
    }
};
exports.contactList = (req, res, next) => {
    const params = req.params.id;
    try {
        personService.contactList(params, res, next);
    } catch (Error) {
        return next(Error);
    }
};
exports.findByNumberOrEmail = (req, res, next) => {
    const params = req.params.numberoremail;
    try {
        personService.findByNumberOrEmail(params, res, next);
    } catch (Error) {
        return next(Error);
    }
};
exports.createContact = (req, res, next) => {
    try {
        personService.createContact(req, res);
    } catch (Error) {
        return next(Error);
    }
};
exports.login = (req, res, next) => {
    try {
        personService.login(req, res, next);
    } catch (Error) {
        return next(Error);
    }
};
exports.save = (req, res, next) => {
    try {
        personService.create(req, res, next);
    }
    catch (Error) {
        return next(Error);
    }
};
exports.createGroup = (req, res, next) => {
    try {
        personService.createGroup(req, res, next);
    }
    catch (Error) {
        return next(Error);
    }
};
exports.createGroupPerson = (req, res, next) => {
    try {
        personService.createGroupPerson(req, res, next);
    }
    catch (Error) {
        return next(Error);
    }
};