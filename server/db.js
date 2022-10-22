const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "fast",
    host: "localhost",
    port: 5432,
    database: "IVMS_DB"

});
module.exports = pool;