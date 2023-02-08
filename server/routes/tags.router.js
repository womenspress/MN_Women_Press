const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
    rejectUnauthorized,
} = require('../modules/authentication-middleware');

router.get('/',  rejectUnauthenticated, rejectUnauthorized,(req, res) => {
    const getAllTagsQuery = `SELECT * FROM "tag" ORDER BY "name" ASC;`;
    pool
        .query(getAllTagsQuery)
        .then((results) => {
            res.send(results.rows);
        })
        .catch((err) => {
            console.log('error in get all tags query: ', err);
            res.sendStatus(500);
        });
});

router.post('/', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
    const getAllTagsQuery = `INSERT INTO "tag"("name", "description") VALUES ($1,$2) RETURNING "id";`;
    pool
        .query(getAllTagsQuery, [req.body.name, req.body.description])
        .then((response) => {
            let tagId = response.rows[0];
            console.log('TAGID:', tagId);
            res.send(tagId);
        })
        .catch((err) => {
            console.log('error in add tag query: ', err);
            res.sendStatus(500);
        });
});

router.delete('/deletetag/:id', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
    const deleteTagQuery = `DELETE FROM "tag" WHERE "id" = $1;`;
    pool
        .query(deleteTagQuery, [req.params.id])
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('error in delete tag query: ', err);
            res.sendStatus(500);
        });
});

module.exports = router;
