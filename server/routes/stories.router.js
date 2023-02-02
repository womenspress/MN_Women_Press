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

router.get('/current/:id', (req, res) => {
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
  res.sendStatus(200);
});

/**
 * DELETE route template
 */
router.delete('/:id', (req, res) => {
  // DELETE route code here
  res.sendStatus(200);
});

/**
 * EDIT route template
 */
router.put('/:id', (req, res) => {
  // EDIT route code here
  res.sendStatus(200);
});

// require ID for params and req.body to include tags
router.post('/tag/:id', (req, res) => {
  // CREATE tags for a story
  res.sendStatus(200);
});

router.delete('/tag/:id', (req, res) => {
  // DELETE a tag from a story
  res.sendStatus(200);
});

// search is happening on front end, looking at store items
// router.get('/search', (req, res) => {
//   // GET route code here
//   console.log(
//     'In stories router GET search, getting all stories that match search. URL: /api/stories/search'
//   );
//   res.sendStatus(200);
// });

// Commenting this out because current plan is to handle archive story separation on the front-end

// router.get('/archive', (req, res) => {
//   // GET route code here
//   console.log(
//     'In stories router GET archive, getting all archive stories. URL: /api/stories/archive'
//   );
//   res.sendStatus(200);
// });

module.exports = router;
