const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
  rejectUnauthorized,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  // GET route code here
  //const getAllThemesQuery = `SELECT * FROM "theme" ORDER BY "name" ASC;`
  const getAllThemesQuery = `SELECT "theme".*,  json_agg( DISTINCT"story") AS "stories", json_agg( DISTINCT "contact") AS "contacts" 
  FROM "theme"
  LEFT JOIN "theme_story" ON "theme"."id" = "theme_story"."theme_id"
  LEFT JOIN "story" ON "theme_story"."story_id" = "story"."id"
  LEFT JOIN "story_contact" ON "story_contact"."story_id" = "story"."id"
  LEFT JOIN "contact" ON "contact"."id" = "story_contact"."contact_id"
  GROUP BY "theme"."id"
  ;`
  pool.query(getAllThemesQuery).then((results) => {
    // console.log('theme results: ', results.rows)
    for (let theme of results.rows){
      if (theme.stories[0] === null) theme.stories = [];
      if (theme.contacts[0] === null) theme.contacts = [];
    }
    res.send(results.rows);
  }).catch((err) => {
    console.log('error in get all themes query: ', err)
    res.sendStatus(500)
  })
});

//CAN/WILL THIS BE MANAGED BY PULLING ID FROM STATE?
router.get('/current/:id',  rejectUnauthenticated, rejectUnauthorized,(req, res) => {
  // GET route for contact detail
  // console.log('In themes router GET, getting theme detail. URL: /api/themes/current/:id',[req.params.id]);
  const getCurrentThemeQuery = `SELECT * FROM "theme" WHERE "id" = $1;`
  pool.query(getCurrentThemeQuery,[req.params.id]).then((results) => {
    res.send(results.rows);
  }).catch((err) => {
    console.log('error in get current theme query: ', err)
    res.sendStatus(500);
  })
});


/**
 * POST route template
 */
router.put('/edit/:id', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  // EDIT here (this will handle "create" "delete" and "edit", but actually just edit all of the rows we created)
  const {name, description, month_year} = req.body;
  console.log('req.body:', req.body)
  const updateThemeQuery = `UPDATE "theme" SET "name" = $1, "description"= $2 WHERE "id" = $3;`
  pool.query(updateThemeQuery, [name, description, req.params.id]).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    console.log('error in edit current theme query: ', err)
    res.sendStatus(500);
  })
});


router.post('/themestoryadd', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  console.log('/themestoryadd req.body:', req.body);
  const {story_id, theme_id} = req.body;
  const addThemeStoryQuery = 'INSERT INTO "theme_story" ("theme_id", "story_id") VALUES ($1,$2);'
  pool.query(addThemeStoryQuery,[ theme_id,story_id]).then(() =>{
    res.sendStatus(200);
  }).catch((err) => {
    console.log('error in add story_theme query: ', err)
    res.sendStatus(500);
  })


})


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




module.exports = router;
