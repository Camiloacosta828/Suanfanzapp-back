const chatService = require("../logic/ChatService");

exports.createChat = (req, res, next) => {
    try {
        chatService.createChat(req, res);
    } catch (Error) {
        return next(Error);
    }
};