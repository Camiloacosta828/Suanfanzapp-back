const pool = require("../config/mysqldev");

const Chat = function (chat) {
    this.id = chat.id;
    this.id_to_person = chat.id_to_person;
    this.id_from_person = chat.id_from_person;
};

Chat.create = (chat, result) => {
    var sqlq = `INSERT INTO chat(id_to_person, id_from_person) 
    VALUES('${chat.id_to_person}','${chat.id_from_person}')`;
    pool.query(sqlq, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created chat: ", { ...chat });
        result(null, { ...chat });
    });
};
exports.createChat = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a chat
    const chat = new Chat({
        id: req.body.id,
        id_to_person: req.body.id_to_person,
        id_from_person: req.body.id_from_person
    });
    Chat.create(chat, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the chat."
            });
        else res.send(data);
    });
}