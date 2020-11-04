const pool = require("../config/mysqldev");


exports.contactList = (data, res, next) => {
    const sql =
        `SELECT tittle,icon, contact_id, person_id_from, ch.id as chat_id from chat ch RIGHT JOIN 
            (SELECT distinct  c.contact_name as tittle, p.url_img_profile as icon, contact_id, c.person_id_from
            FROM contact c, person p
            WHERE c.person_id_from = '${data}' and
            c.contact_id = p.number) as algo  on   algo.person_id_from = ch.id_person1 and algo.contact_id = ch.id_person2 
            or algo.person_id_from = ch.id_person2 and algo.contact_id = ch.id_person1;`;
    pool.query(sql, (err, results) => {
        if (err) res.send(err.message)
        res.send(results);
    });
}
exports.lastMessage = (data, res, next) => {
    const sql =
        `select message as msgPreview, m.date from message m
        where
        m.id_chat = ${data}
        order by date desc limit 1;`;
    pool.query(sql, (err, results) => {
        if (err) res.send(err.message)
        res.send(results);
    });
}
exports.allMessage = (data, res, next) => {
    const sql =
        `select m.message as content, origin, date from message m
        where
        m.id_chat = ${data}
        order by date asc;`;
    pool.query(sql, (err, results) => {
        if (err) res.send(err.message)
        res.send(results);
    });
}