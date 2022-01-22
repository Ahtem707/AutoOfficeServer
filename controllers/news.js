import { db } from "../config/database.js";

export const AddNew = (req, res) => {
    const data = req.body.arguments

    db.query(`
        INSERT INTO
        News(Title,Description,ImageSrc,Date)
        Value(
            '${data.title}',
            '${data.description}',
            '${data.imageSrc}',
            '${data.date}';`,
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

export const GetNews = (req, res) => {
    const limit = req.body.arguments.limit || 10

    db.query(`
        SELECT
            Title as title,
            Description as description,
            ImageSrc as imageSrc,
            Date as date
        FROM
            News
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