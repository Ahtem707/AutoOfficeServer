import { db } from "../config/database.js";

export const AddEvent = (req, res) => {
    const data = req.body.arguments

    db.query(`
        INSERT INTO
        Events(Title,Description,Date,WhereEvents,ImageSrc)
        Value(
            '${data.title}',
            '${data.description}',
            '${data.date}',
            '${data.whereEvents}'),
            '${data.imageSrc}';`,
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

export const GetEvents = (req, res) => {
    const limit = req.body.arguments.limit || 10

    db.query(`
        SELECT
            Title as title,
            Description as description,
            Date as date,
            WhereEvents as whereEvents,
            ImageSrc as imageSrc
        FROM
            Events
        Limit ${limit}`,
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