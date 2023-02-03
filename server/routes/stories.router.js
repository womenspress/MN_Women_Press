const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('In stories router GET, getting all stories. URL: /api/stories');
  let getAllQueryText = 'SQL';
  pool.query(getAllQueryText).then().catch();

  res.sendStatus(200);
});

router.get('/current/:id', (req, res) => {
  // GET route code here
  let id = req.params.id;
  console.log(
    `In stories router GET by id, getting story details by id ${id}. URL: /api/stories/:id`
  );
  let getDetailsQueryText = 'SQL';
  pool.query(getDetailsQueryText, [id]).then().catch();
  res.sendStatus(200);
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
  "final_draft_deadline", "publication_date", "archived")
  VALUES 
  ($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
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
      story.title,
      story.subtitle,
      story.article_text,
      story.article_link,
      story.notes,
      story.type,
      story.copies_sent,
      story.photo_uploaded,
      story.fact_checked,
      story.graphic_image_required,
      story.external_link,
      story.word_count,
      story.date_added,
      story.rough_draft_deadline,
      story.final_draft_deadline,
      story.publication_date,
      story.archived,
    ]);
    console.log('toryId:', storyResponse.rows[0].id);
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
