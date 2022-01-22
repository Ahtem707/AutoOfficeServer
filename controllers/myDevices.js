import { db } from "../config/database.js";

export const GetMyDevices = (req, res) => {
    const { idUser } = req.body.arguments
    db.query(`
        SELECT
            imageSrc,
            name,
            description
        FROM
            OfficeInventory
        WHERE
            Users_idUsers = ${idUser}`,
        (err, results) => {
            if (err) {
                console.log(err);
                res.json({ "error": err })
            } else {
                res.json(results)
            }
        }
    )
}

export const AddMyDevice = (req, res) => {
    const { idUser, image, title, description } = req.body.arguments
    db.query(`
        INSERT INTO
            OfficeInventory(
                title,
                Users_idUsers
                ${image ? ", imageSrc" : ""}
                ${description ? ", descrription" : ""})
            VALUE(
                ${title},
                ${idUser}
                ${image ? ", "+image : ""}
                ${description ? ", "+description : ""})
            )`,
        (err, results) => {
            if (err) {
                console.log(err);
                res.json({ "error": err })
            } else {
                res.json(results)
            }
        }
    )
}