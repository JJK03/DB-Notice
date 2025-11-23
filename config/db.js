const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Wkdwlsrb1!',
    database: 'notice'
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
