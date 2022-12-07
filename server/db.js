const Pool = require("pg").Pool;

const pool = new Pool({
	user: "postgres",
	password: "0805",
	host: "localhost",
	port: 5432,
	database: "ivms_db",
});
module.exports = pool;
