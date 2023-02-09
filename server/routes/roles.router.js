const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
    rejectUnauthorized,
  } = require('../modules/authentication-middleware');

//roles router built on the assumption that a roles table will be constructed for the client, thus only a get request is required, will add more if need be
router.get('/', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
    const getAllRolesQuery = `SELECT * FROM "role" ORDER BY "name" ASC;`;
    pool.query(getAllRolesQuery).then((results) => {
        res.send(results.rows);
    }).catch((err) => {
        console.log('error in get all roles query: ', err)
        res.sendStatus(500)
    })
})




module.exports = router;