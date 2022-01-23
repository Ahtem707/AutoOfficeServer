import mysql from "mysql2";

export const db = mysql.createConnection({
    host: 'server77.hosting.reg.ru',
    port: '3306',
    database: 'u1548790_autooffice',
    user: 'u1548790_adminis',
    password: '2s5O9u1cXO'
});