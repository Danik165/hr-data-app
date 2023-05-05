const handleErrors = require("../error/errorhandler")

const mysql = require('mysql2');



const sqlDb = mysql.createConnection({
    host: 'JTDSK_082',
    user: 'dev1',
    password: 'jeevan@12345',
    port:3308,
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