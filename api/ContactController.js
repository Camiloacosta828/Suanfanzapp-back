const contactService = require("../logic/ContactService");


exports.contactList = (req, res, next) => {
    const params = req.params.id;
    try {
        contactService.contactList(params, res, next);
    } catch (Error) {
        return next(Error);
    }
};
exports.lastMessage = (req, res, next) => {
    const params = req.params.id;
    try {
        contactService.lastMessage(params, res, next);
    } catch (Error) {
        return next(Error);
    }
};
exports.allMessage = (req, res, next) => {
    const params = req.params.id;
    try {
        contactService.allMessage(params, res, next);
    } catch (Error) {
        return next(Error);
    }
};