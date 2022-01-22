import mysql from "mysql2";

export const db = mysql.createConnection({
    host: 'server77.hosting.reg.ru',
    port: '3306',
    database: 'u1548790_autooffice',
    user: 'u1548790_adminis',
    password: '2s5O9u1cXO'
});

export const ftpConfig = {
    host: '37.140.192.241',
    port: 21,
    user: 'u1548790',
    password: '2K6gxGZ63w4DDJoQ'
}