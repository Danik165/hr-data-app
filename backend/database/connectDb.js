const handleErrors = require("../error/errorhandler")

const mysql = require('mysql2');



const sqlDb = mysql.createConnection({
    host: 'localhost',
    user: 'dev1',
    password: 'Welcome@123',
    port:3306,
    database: 'company_skills'
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
