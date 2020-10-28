const pool = require("../config/mysqldev");

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
                message: "A error occurred when person id not exist or password doesen't match "
            });
        } else {
            res.send(results);
        }
    });
};
const Person = function (customer) {
    this.email = customer.email;
    this.name = customer.name;
    this.password = customer.password;
    this.id_number_format = customer.id_number_format;
    this.number = customer.number;
};
Person.create = (person, result) => {
    var sqlq = `INSERT INTO person(name, number,email,password,id_number_format) 
    VALUES('${person.name}','${person.number}',
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