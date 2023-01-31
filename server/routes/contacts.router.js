const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log(
    'In contacts router GET, getting all contacts. URL: /api/contacts'
  );
  res.sendStatus(200);
});

router.get('/current/:id', (req, res) => {
  // GET route code here
  let id = req.params.id;
  console.log(
    `In contacts :id router GET, getting contact by id ${id}. URL: /api/contacts/current/:id`
  );
  res.sendStatus(200);
});

// search happening on front-end
// router.get('/search', (req, res) => {
//   // GET route code here
//   console.log(
//     'In contacts router search GET, getting all contacts by search. URL: /api/contacts/search'
//   );
//   res.sendStatus(200);
// });


/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log(
    'In contacts router search POST, making contact. URL: /api/contacts'
  );
  res.sendStatus(200);
});

router.put('/:id', (req, res) => {
  // PUT route goes here, req.body is entire contact object
  res.sendStatus(200);
})

router.delete('/:id', (req, res) => {
  // DELETE route goes here
  res.sendStatus(200);
})



// require ID for params and req.body to include tags
router.post('/tag/:id' , (req, res) => {
  // CREATE tags for a contact
  res.sendStatus(200);
})

router.delete('/tag/:id' , (req, res) => {
  // DELETE a tag from a contact
  res.sendStatus(200);
})


module.exports = router;
