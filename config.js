const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

let pool = null;

if (isProduction){
    pool = new Pool({
        connectionString : process.env.DATABASE_URL, ssl : {
            rejectUnauthorized : false
        }
    })
} else {
    pool = new Pool({
        user : "postgres",
        password : "123456",
        host : "localhost",
        database : "projeto",
        port : 5432
    })
}

module.exports = { pool }