const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('In stories router GET, getting all stories. URL: /api/stories');
  res.sendStatus(200);
});

router.get('/search', (req, res) => {
  // GET route code here
  console.log(
    'In stories router GET search, getting all stories that match search. URL: /api/stories/search'
  );
  res.sendStatus(200);
});

router.get('/archive', (req, res) => {
  // GET route code here
  console.log(
    'In stories router GET archive, getting all archive stories. URL: /api/stories/archive'
  );
  res.sendStatus(200);
});
router.get('/id/:id', (req, res) => {
  // GET route code here
  let id = req.params.id;
  console.log(
    `In stories router GET by id, getting story details by id ${id}. URL: /api/stories/:id`
  );
  res.sendStatus(200);
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
