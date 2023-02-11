/* the only line you likely need to change is

 database: 'mn_women_press_app',

 change `mn_women_press_app` to the name of your database, and you should be all set!
*/

const pg = require('pg');
let pool;

// When our app is deployed to the internet 
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg: 
//  DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/mn_women_press_app
if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
// When we're running this app on our own computer
// we'll connect to the postgres database that is 
// also running on our computer (localhost)
else {
    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'mn_women_press_app',   // 	💥 Change this to the name of your database!
        max: 5, // set pool max size to 20
        idleTimeoutMillis: 1000, // close idle clients after 1 second
        connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established

    });
}

module.exports = pool;
