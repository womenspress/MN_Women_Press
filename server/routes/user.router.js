const express = require('express');
const {
  rejectUnauthenticated,
  rejectUnauthorized,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// gets all users for admin dashboard (we will filter unauthorized vs authorized on the front end so we can add/remove permissions for everyone)
router.get('/all', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  // GET request for all users goes here
  const queryText = 'SELECT * FROM "user";';

  pool.query(queryText).then((results) => {
    res.send(results.rows);
  }).catch((err) => {
    console.log('error in get all user query: ', err)
    res.sendStatus(500)
  })
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password, access)
    VALUES ($1, $2, False) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// grants or removes access, initiated from admin page
router.put('/access', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  const queryText = 'UPDATE "user" set "access" = $1 WHERE "id" = $2;';
  const queryParams = [req.body.access, req.body.userId];

  pool.query(queryText, queryParams).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    console.log('error in update user access query:', err);
  });
});

// deletes user, initiated from admin page
router.delete('/:id', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  const id = req.params.id;
  const queryText = `DELETE from "user" where "id"=$1;`;

  pool.query(queryText, [id]).then(() => {
    res.sendStatus(200);
  }).catch(err => {
    console.log('error deleting user in query:', err);
  })
})

module.exports = router;
