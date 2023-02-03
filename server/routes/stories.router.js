const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('In stories router GET, getting all stories. URL: /api/stories');
  let getAllQueryText = `SELECT "story".*,  json_agg(DISTINCT "tag") AS "tags",  json_agg(DISTINCT "contact") AS "contacts", json_agg(DISTINCT "theme") AS "theme"
  FROM "story"
  LEFT JOIN "story_tag" ON "story"."id" = "story_tag"."story_id"
  LEFT JOIN "tag" ON "tag"."id" = "story_tag"."tag_id"
  LEFT JOIN "story_contact" ON "story"."id" = "story_contact"."story_id"
  LEFT JOIN "contact" ON "contact"."id" = "story_contact"."contact_id"
  LEFT JOIN "theme_story" ON "theme_story"."story_id" = "story"."id"
  LEFT JOIN "theme" ON "theme_story"."theme_id" = "theme"."id"
  GROUP BY "story"."id"
  ORDER BY "story"."publication_date" ASC
  ;`;

  pool
    .query(getAllQueryText)
    .then((response) => res.send(response))
    .catch((err) => {
      res.sendStatus(200);
      console.log(err);
    });
});

router.get('/current/:id', (req, res) => {
  // GET route code here
  let id = req.params.id;
  console.log(
    `In stories router GET by id, getting story details by id ${id}. URL: /api/stories/:id`
  );
  let getDetailsQueryText = `SELECT "story".*,  json_agg(DISTINCT "tag") AS "tags",  json_agg(DISTINCT "contact") AS "contacts", json_agg(DISTINCT "theme") AS "theme"
  FROM "story"
  LEFT JOIN "story_tag" ON "story"."id" = "story_tag"."story_id"
  LEFT JOIN "tag" ON "tag"."id" = "story_tag"."tag_id"
  LEFT JOIN "story_contact" ON "story"."id" = "story_contact"."story_id"
  LEFT JOIN "contact" ON "contact"."id" = "story_contact"."contact_id"
  LEFT JOIN "theme_story" ON "theme_story"."story_id" = "story"."id"
  LEFT JOIN "theme" ON "theme_story"."theme_id" = "theme"."id"
  WHERE "story"."id" = $1
  GROUP BY "story"."id"
  ;`;
  pool
    .query(getDetailsQueryText, [id])
    .then((response) => res.send(response))
    .catch((err) => {
      res.sendStatus(200);
      console.log(err);
    });
});

/**
 * POST route template
 */
router.post('/', async (req, res) => {
  console.log('In post route', req.body);
  console.log(req.body.tags);
  // POST route code here
  //themes aren't applicable to this process
  //let theme = req.body.theme;
  let story = req.body;
  let tags = req.body.tags;
  let contacts = req.body.contacts;
  let postStoryQuery = `INSERT INTO "story" 
  ("title", "subtitle", "article_text", "article_link", "notes", "type", "copies_sent", "photo_uploaded", 
  "fact_checked", "graphic_image_required", "external_link", "word_count", "date_added", "rough_draft_deadline",
  "final_draft_deadline", "publication_date", "photo_required", "fact_check_required","graphic_image_completed")
  VALUES 
  ($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
  RETURNING "id";`; //Return id of story
  let attachTagsQuery = `
  INSERT INTO "story_tag"
  ( "tag_id","story_id")
  VALUES 
  ($1,$2);`;
  //I am building this under the assumption that all tags and contacts that are attached are already in the tags table.
  let postContactsQuery = `INSERT INTO "story_contact" 
  ("contact_id","story_id","invoice_paid", "invoice_total", "project_association") 
  VALUES 
  ($1, $2, $3, $4, $5);`;
  const connection = await pool.connect();
  try {
    await connection.query('BEGIN;');
    console.log('In query');
    let storyResponse = await connection.query(postStoryQuery, [
      story.title, //1
      story.subtitle, //2
      story.article_text, //3
      story.article_link, //4
      story.notes, //5
      story.type, //6
      story.copies_sent, //7
      story.photo_uploaded, //8
      story.fact_check_completed, //9, same as fact_checked, different naming conventions in data
      story.graphic_image_required, //10
      story.external_link, //11
      story.word_count, //12
      story.date_added, //13
      story.rough_draft_deadline, //14
      story.final_draft_deadline, //15
      story.publication_date, //16
      //story.photo, // will put in when exisits in DB
      //y.copies_required, //will put in when exisits in DB
      story.photo_required, //17
      story.fact_check_required, //18
      story.graphic_image_completed, //19
      //story.payment_required,//will add when exisits in DB
      //story.payment_completed, will add when exisits in DB
    ]);
    console.log('StoryId:', storyResponse.rows[0].id);
    let storyId = storyResponse.rows[0].id;
    for (let tag of tags) {
      await connection.query(attachTagsQuery, [tag.id, storyId]);
    }
    for (let contact of contacts) {
      await connection.query(postContactsQuery, [
        contact.id,
        storyId,
        contact.invoice_paid,
        contact.project_association,
        contact.invoice_amount,
      ]);
    }
    await connection.query('COMMIT;');
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    await connection.query('ROLLBACK');
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

/**
 * DELETE route template
 */
router.delete('/:id', (req, res) => {
  // DELETE route code here
  let id = req.params.id;
  let deleteQueryText = 'SQL';
  pool.query(deleteQueryText, [id]).then().catch();
  res.sendStatus(200);
});

/**
 * EDIT route template
 */
router.put('/:id', (req, res) => {
  // EDIT route code here
  let id = req.params.id;
  let story = req.body;
  let updateStoryQueryText = 'SQL';
  pool.query(updateStoryQueryText, [id, story.name]).then().catch();
  res.sendStatus(200);
});

// require ID for params and req.body to include tags
router.post('/tag/:id', (req, res) => {
  // CREATE tags for a story
  let id = req.params.id;
  let postTagQueryText = 'SQL';
  pool.query(postTagQueryText, [id]).then().catch();
  res.sendStatus(200);
});

router.delete('/tag/:id', (req, res) => {
  // DELETE a tag from a story
  let id = req.params.id;
  let deleteTagQueryText = 'SQL';
  pool.query(deleteTagQueryText, [id]).then().catch();
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
