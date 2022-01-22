import { db } from '../../config/database.js';

export default (req, res) => {
    // if (req.body.token != "admin") {
    //     res.json({ error: "Not authorized" })
    //     return
    // }

    function queryComplete(err, results) {
        if (err) {
            console.log(err);
            res.json({ error: err })
        } else {
            res.json(results)
        }
    }

    switch (req.params.method) {
        case "getAllUsers":
            db.query(`
                SELECT
                u.idUsers as id,
                u.avatarSrc,
                u.userName,
                u.phone,
                u.email,
                u.create_time as createTime,
                u.last_entry as lastEntry,
                u.birthday,
                ur.userRoles as role,
                u.confirmed
            FROM
                Users as u, UserRoles as ur
            WHERE
                u.UserRoles_idUserRoles = ur.idUserRoles`,
                queryComplete);
            break;
        case "removeUser":
            db.query(`
            DELETE
            FROM
                Users as u, UserRoles as ur
            WHERE
                u.UserRoles_idUserRoles = ur.idUserRoles`,
                queryComplete);
            break;
        case "setConfirmUser":
            db.query(`
                SELECT
                u.idUsers as id,
                u.avatarSrc,
                u.userName,
                u.phone,
                u.email,
                u.create_time as createTime,
                u.last_entry as lastEntry,
                u.birthday,
                ur.userRoles as role,
                u.confirmed
            FROM
                Users as u, UserRoles as ur
            WHERE
                u.UserRoles_idUserRoles = ur.idUserRoles`,
                queryComplete);
            break;
    }
}