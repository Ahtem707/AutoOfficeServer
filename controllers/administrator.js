import { db } from "../config/database.js";

var adminLogin = 'admin';
var adminPassword = 'admin';

export const administrator = (req, res) => {
    console.log(req.body)
    const data = req.body;

    function response(err, results) {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json(results)
        }
    }

    function createErr(err) {
        throw new Error(err)
    }
    switch (data.method) {
        case 'login':
            if (data.arguments.login == adminLogin && data.arguments.password == adminPassword) {
                response(null, true)
            } else {
                response(createErr('Access denied'))
            }
            break;
        case 'showUsers':
            db.query(`
            SELECT
                idUsers,
                userName AS username,
                email,
                create_time AS 'createTime',
                last_entry AS 'lastEntry',
                reputation
            FROM users`, (e, r) => response(e, r));
            break;
        case 'deleteUser':
            db.query(`
                DELETE
                FROM users
                WHERE idUsers = ${data.arguments.idUser}`, (e, r) => response(e, r));
            break;
        case 'showBooks':
            db.query(`
            SELECT
                b.*,
                s.status AS statuswriting,
                u.userName AS author
            FROM
                books AS b,
                users AS u,
                StatusWriting AS s
            WHERE
                u.idUsers = b.Users_idUsers AND
                s.idStatusWriting = b.StatusWriting_idStatusWriting
            UNION
            SELECT
                b.*,
                'NULL' AS statuswriting,
                u.userName AS author
            FROM
                books AS b,
                users AS u
            WHERE
                u.idUsers = b.Users_idUsers AND
                ISNULL(StatusWriting_idStatusWriting);`, (e, r) => response(e, r));
            break;
        case 'deleteBook':
            db.query(`
                DELETE
                FROM Books
                WHERE idBooks = ${data.arguments.id}`, (e, r) => response(e, r));
            break;
        case 'getStatusWriting':
            db.query(`
            SELECT
                idStatusWriting AS id,
                status
            FROM StatusWriting`, (e, r) => response(e, r));
            break;
        case 'deleteStatusWriting':
            db.query(`
            DELETE
            FROM StatusWriting
            WHERE idStatusWriting = ${data.arguments.id}`, (e, r) => response(e, r));
            break;
        case 'createStatusWriting':
            db.query(`
            INSERT INTO StatusWriting(status)
            VALUE('${data.arguments.status}')`, (e, r) => response(e, r));
            break;
        case 'getStatusReading':
            db.query(`
            SELECT
                idStatusReading AS id,
                status
            FROM StatusReading`, (e, r) => response(e, r));
            break;
        case 'deleteStatusReading':
            db.query(`
            DELETE
            FROM StatusReading
            WHERE idStatusReading = ${data.arguments.id}`, (e, r) => response(e, r));
            break;
        case 'createStatusReading':
            db.query(`
            INSERT INTO StatusReading(status)
            VALUE('${data.arguments.status}')`, (e, r) => response(e, r));
            break;
        case 'getAwards':
            db.query(`
            SELECT
                idAwards AS id,
                award,
                description,
                cost
            FROM Awards`, (e, r) => response(e, r));
            break;
        case 'deleteAwards':
            db.query(`
            DELETE
            FROM Awards
            WHERE idAwards = ${data.arguments.id}`, (e, r) => response(e, r));
            break;
        case 'createAwards':
            db.query(`
            INSERT INTO Awards(award,description,cost)
            VALUE('${data.arguments.award}','${data.arguments.description}','${data.arguments.cost}')`, (e, r) => response(e, r));
            break;
        case 'getAchievement':
            db.query(`
            SELECT
                idAchievement AS id,
                achievement,
                description,
                receipt_condition
            FROM Achievement`, (e, r) => response(e, r));
            break;
        case 'deleteAchievement':
            db.query(`
            DELETE
            FROM Achievement
            WHERE idAchievement = ${data.arguments.id}`, (e, r) => response(e, r));
            break;
        case 'createAchievement':
            db.query(`
            INSERT INTO Achievement(achievement,description,receipt_condition)
            VALUE('${data.arguments.achievement}','${data.arguments.description}','${data.arguments.receipt_condition}')`, (e, r) => response(e, r));
            break;
        case 'getGenre':
            db.query(`
            SELECT
                idGenre AS id,
                genre,
                count(*) AS count
            FROM
                Genre AS g,
                Books_has_Genre AS bhg
            WHERE
                bhg.Genre_idGenre = g.idGenre
            GROUP BY g.genre
            UNION
            SELECT
                idGenre AS id,
                genre,
                '0' AS count
            FROM Genre
            WHERE idGenre not in
            (SELECT g.idGenre
            FROM
                Genre AS g,
                Books_has_Genre AS bhg
            WHERE
                bhg.Genre_idGenre = g.idGenre
            GROUP BY g.genre)
            GROUP BY genre;`, (e, r) => response(e, r));
            break;
        case 'deleteGenre':
            db.query(`
            DELETE
            FROM Genre
            WHERE idGenre = ${data.arguments.id}`, (e, r) => response(e, r));
            break;
        case 'createGenre':
            db.query(`
            INSERT INTO Genre(genre)
            VALUE('${data.arguments.genre}')`, (e, r) => response(e, r));
            break;
        case 'getCycleWorks':
            db.query(`
            (SELECT
                c.idCycleWorks AS id,
                c.title,
                count(*) AS count
            FROM
                CycleWorks AS c,
                Books AS b
            where
                idCycleWorks = CycleWorks_idCycleWorks
            GROUP BY c.title)
            UNION
            (SELECT
                c.idCycleWorks AS id,
                c.title,
                '0' AS count
            FROM
                CycleWorks AS c,
                Books AS b
            where
                idCycleWorks != CycleWorks_idCycleWorks
                GROUP BY c.title);`, (e, r) => response(e, r));
            break;
        case 'deleteCycleWorks':
            db.query(`
            DELETE
            FROM CycleWorks
            WHERE idCycleWorks = ${data.arguments.id}`, (e, r) => response(e, r));
            break;
        case 'createCycleWorks':
            db.query(`
            INSERT INTO CycleWorks(title)
            VALUE('${data.arguments.title}')`, (e, r) => response(e, r));
            break;
    }
}