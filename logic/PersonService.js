const pool = require("../config/mysqldev");

exports.persons = (data, res, next) => {
    const sql = `select * from person`;
    pool.query(sql, (err, results) => {
        if (err) resolve("Error")
        res.send(results);
    });
};