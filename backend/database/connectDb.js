const handleErrors = require("../error/errorhandler")
const dotenv = require('dotenv');
const mysql = require('mysql2');


dotenv.config()
const sqlDb = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME
});

sqlDb.connect((err) => {
    if (err) {
        handleErrors(err)
    }
    else{
        console.log('Connected to MySQL database.');
    }
});
 

module.exports = sqlDb;
