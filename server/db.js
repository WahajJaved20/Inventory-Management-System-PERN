const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "wahaj",
    host: "localhost",
    port: 5432,
    database: "ivms_db"

});
module.exports = pool;