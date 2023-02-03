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
  let story = req.body;
  let tags = req.body.tags;
  let contacts = req.body.contacts;
  let postStoryQuery = `
  INSERT INTO "story" 
  ("title", "subtitle", "article_text", "article_link", "notes", "type", "copies_sent", "photo_uploaded", 
  "fact_checked", "graphic_image_required", "external_link", "word_count", "date_added", "rough_draft_deadline",
  "final_draft_deadline", "publication_date", "photo_required", "fact_check_required","graphic_image_completed")
  VALUES 
  ($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
  RETURNING "id";`; //Return id of story

  //I am building this under the assumption that all tags and contacts that are attached are already in the tags table.
  let attachTagsQuery = `
  INSERT INTO "story_tag"
  ( "tag_id","story_id")
  VALUES 
  ($1,$2);`;

  let postContactsQuery = `
  INSERT INTO "story_contact" 
  ("contact_id","story_id","invoice_paid", "invoice_total", "project_association") 
  VALUES 
  ($1, $2, $3, $4, $5);`;

  //Query
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
  let deleteQueryText = 'DELETE FROM "story" WHERE "id"=$1;';
  pool
    .query(deleteQueryText, [id])
    .then(res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * EDIT route template
 */
router.put('/:id', async (req, res) => {
  // EDIT route code here
  let id = req.params.id;
  let story = req.body;
  let deleteTagsQuery = `DELETE FROM "story_tag" WHERE "story_id" = $1;`;
  let deleteContactsQuery = `DELETE FROM "story_contact" WHERE "story_id" = $1;`;
  let updateStoryQueryText = `
  UPDATE "story"
  SET
  "title" = $1, "subtitle"= $2, "article_text"= $3, "article_link"= $4, "notes"= $5, "type"= $6, "copies_sent"= $7, "photo_uploaded"= $8, 
  "fact_checked"= $9, "graphic_image_required"= $10, "external_link"= $11, "word_count"= $12, "date_added"= $13, "rough_draft_deadline"= $14,
  "final_draft_deadline"= $15, "publication_date"= $16, "photo_required"= $17, "fact_check_required"= $18,"graphic_image_completed"= $19
  WHERE "id" = $20;`;
  let updateStoryData = [
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
    id,
  ];
  let attachTagsQuery = `
  INSERT INTO "story_tag"
  ( "tag_id","story_id")
  VALUES 
  ($1,$2);`;

  let attachContactsQuery = `
  INSERT INTO "story_contact" 
  ("contact_id","story_id","invoice_paid", "invoice_total", "project_association") 
  VALUES 
  ($1, $2, $3, $4, $5);`;
  //Query
  const connection = await pool.connect();
  try {
    await connection.query('BEGIN;');
    console.log('In query');
    await connection.query(deleteTagsQuery, [id]);
    console.log('before delete');
    await connection.query(deleteContactsQuery, [id]);
    console.log('before update');
    await connection.query(updateStoryQueryText, updateStoryData);
    console.log('before tags');
    let tags = req.body.tags;
    for (let tag of tags) {
      await connection.query(attachTagsQuery, [tag.id, id]);
    }
    console.log('before contacts');
    let contacts = req.body.contacts;
    for (let contact of contacts) {
      await connection.query(attachContactsQuery, [
        contact.id,
        id,
        contact.invoice_paid,
        contact.invoice_total,
        contact.project_association,
      ]);
    }
    await connection.query('COMMIT');
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    await connection.query('ROLLBACK');
    res.sendStatus(500);
  } finally {
    await connection.release();
  }
});

// require ID for params and req.body to include tags
//I am uncertain what the id is for in this process. Made with the information in the body of request.
router.post('/tag/:id', (req, res) => {
  // CREATE tags for a story
  let tagId = req.params.id;
  let name = req.body.name;
  let description = req.body.description;
  let postTagQueryText =
    'INSERT INTO "tag" ("name","description") VALUES ($1, $2) RETURNING "id";';
  pool
    .query(postTagQueryText, [name, description])
    .then((response) => {
      let id = response.rows[0].id;
      res.send(id);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//Created with the idea that the tag id was params and story id is in the body of the request
router.delete('/tag/:id', (req, res) => {
  // DELETE a tag from a story
  let tagId = req.params.id;
  let storyId = req.body.id;
  let deleteTagQueryText =
    'DELETE FROM "story_tag" WHERE "story_id" = $1 AND "tag_id" = $2;';
  pool
    .query(deleteTagQueryText, [storyId, tagId])
    .then(sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
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
