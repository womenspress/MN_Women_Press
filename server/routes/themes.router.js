const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('In themes router GET, getting all themes. URL: /api/themes');
  res.sendStatus(200);
});


router.get('/current/:id', (req, res) => {
  // GET route for contact detail
  console.log('In themes router GET, getting all themes. URL: /api/themes');
  res.sendStatus(200);
});


// router.get('/archive', (req, res) => {
//   // GET route code here
//   console.log(
//     'In themes router GET, getting all archived themes. URL: /api/themes/archive'
//   );
//   res.sendStatus(200);
// });


// search will be handled on front-end (for now)
// router.get('/search', (req, res) => {
//   // GET route code here
//   console.log(
//     'In themes router GET search, getting all themes that match search. URL: /api/themes/search'
//   );
//   res.sendStatus(200);
// });


/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
