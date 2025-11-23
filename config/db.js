const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root', // ✏️ DB 사용자 이름을 입력하세요.
    password: 'Wkdwlsrb1!', // ✏️ DB 비밀번호를 입력하세요.
    database: 'notice' // ✏️ DB 이름을 입력하세요.
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
