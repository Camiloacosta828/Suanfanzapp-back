const pool = require("../config/mysqldev");

const Person = function (person) {
    this.email = person.email;
    this.lastname = person.lastname;
    this.name = person.name;
    this.password = person.password;
    this.url_img_profile = person.url_img_profile;
    this.id_number_format = person.id_number_format;
    this.number = person.number;
};
const GroupPerson = function (groupPerson) {
    this.id = groupPerson.id;
    this.id_person = groupPerson.id_person;
    this.id_group = groupPerson.id_group;
};
const ChatGroup = function (group) {
    this.name = group.name;
    this.id_person_admin = group.id_person_admin;
    this.url_img_group = group.url_img_group;
    this.id = group.id;
};
const Contact = function (contact) {
    this.person_id_from = contact.person_id_from;
    this.contact_id = contact.contact_id;
    this.contact_name = contact.contact_name;

};
exports.persons = (data, res, next) => {
    const sql = `select * from person`;
    pool.query(sql, (err, results) => {
        if (err) resolve("Error")
        res.send(results);
    });
};
exports.login = (data, res, next) => {
    if (!data.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const sql = `select * from person 
    where number ='${data.body.numberoremail}'
    or email = '${data.body.numberoremail}'
    and password = '${data.body.password}' `;
    pool.query(sql, (err, results) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (results[0] === undefined) {
            res.status(404).send({
                message: "A error occurred when person id not exist or password doesn't match "
            });
        } else {
            res.send(results);
        }
    });
};

Contact.create = (contact, result) => {
    var sqlq = `INSERT INTO contact(person_id_from, contact_id,contact_name) 
    VALUES('${contact.person_id_from}','${contact.contact_id}','${contact.contact_name}')`;
    pool.query(sqlq, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created contact: ", { id: res.person_id_from, ...contact });
        result(null, { id: res.person_id_from, ...contact });
    });
};
Person.create = (person, result) => {
    var sqlq = `INSERT INTO person(name, number,lastname,email,password,id_number_format) 
    VALUES('${person.name}','${person.number}','${person.lastname}',
    '${person.email}','${person.password}', '${person.id_number_format}')`;
    pool.query(sqlq, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", { id: res.insertId, ...person });
        result(null, { id: res.insertId, ...person });
    });
};
Person.update = (person, result) => {
    console.log("La persona es: " + JSON.stringify(person));
    var sqlq = `UPDATE person SET name = '${person.name}',
    lastname = '${person.lastname}', email = '${person.email}', password = '${person.password}', 
    id_number_format='${person.id_number_format}', url_img_profile ='${person.url_img_profile}'
    WHERE number = '${person.number}'`;
    pool.query(sqlq, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("update person: ", { ...person });
        result(null, { ...person });
    });
};
ChatGroup.create = (group, result) => {
    var sqlq = `INSERT INTO chat_group(name, id_person_admin,url_img_group,id) 
    VALUES('${group.name}','${group.id_person_admin}','${group.url_img_group}','${group.id}')`;
    pool.query(sqlq, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created group : ", { ...group });
        result(null, { ...group });
    });
};
GroupPerson.create = (groupPerson, result) => {
    var sqlq = `INSERT INTO group_person(id,id_person,id_group) 
    VALUES('${groupPerson.id}','${groupPerson.id_person}','${groupPerson.id_group}')`;
    pool.query(sqlq, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created group : ", { ...groupPerson });
        result(null, { ...groupPerson });
    });
};
exports.createContact = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a contact
    const contact = new Contact({
        person_id_from: req.body.person_id_from,
        contact_id: req.body.contact_id,
        contact_name: req.body.contact_name
    });
    Contact.create(contact, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the person."
            });
        else res.send(data);
    });
}
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a person
    const person = new Person({
        email: req.body.email,
        name: req.body.name,
        lastname: req.body.lastname,
        number: req.body.number,
        id_number_format: req.body.id_number_format,
        password: req.body.password
    });
    Person.create(person, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the person."
            });
        else res.send(data);
    });
}
exports.createGroup = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a group
    const group = new ChatGroup({
        name: req.body.name,
        id_person_admin: req.body.id_person_admin,
        url_img_group: req.body.url_img_group,
        id: req.body.id
    });
    ChatGroup.create(group, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the group."
            });
        else res.send(data);
    });
}
exports.createGroupPerson = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a group
    const groupPerson = new GroupPerson({
        id: req.body.id,
        id_person: req.body.id_person,
        id_group: req.body.id_group,
    });
    GroupPerson.create(groupPerson, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the group."
            });
        else res.send(data);
    });
}
exports.update = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a person
    const person = new Person({
        email: req.body.email,
        name: req.body.name,
        lastname: req.body.lastname,
        number: req.body.number,
        url_img_profile: req.body.url_img_profile,
        id_number_format: req.body.id_number_format,
        password: req.body.password
    });
    Person.update(person, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the person."
            });
        else res.send(data);
    });
}
exports.contactList = (data, res, next) => {
    const sql =
        `SELECT c.contact_name,c.contact_id,c.person_id_from,p.url_img_profile from contact c , person p 
        WHERE c.person_id_from = '${data}' AND 
        c.contact_id = p.number;`;
    pool.query(sql, (err, results) => {
        if (err) resolve("Error")
        res.send(results);
    });
}
exports.findByNumberOrEmail = (req, res, next) => {
    if (!req) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const sql = `select * from person 
    where number ='${req}'
    or email = '${req}' `;
    pool.query(sql, (err, results) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while find the person."
            });
        if (results[0] === undefined)
            res.status(404).send({
                message: "This conctact dont exist "
            });
        else res.send(results);
    });
}