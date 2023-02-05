const express = require('express');
const { CommandCompleteMessage } = require('pg-protocol/dist/messages');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', async (req, res) => {
  // GET route code here
  console.log('In stories router GET, getting all stories. URL: /api/stories');

  let getAllQueryText = `
  SELECT "story".*,  json_agg(DISTINCT "tag") AS "tags",  json_agg(DISTINCT "contact") AS "contacts", json_agg(DISTINCT "theme") AS "theme"
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
  const connection = await pool.connect();

  try {
    let response = await connection.query(getAllQueryText);
    let storiesArray = response.rows;

    let getContactDetails = `
    SELECT "contact"."id" , json_agg( "story_contact") AS "invoice"
    FROM "contact"
    LEFT JOIN "story_contact" ON "story_contact"."contact_id" = "contact"."id"
    GROUP BY "contact"."id";`;
    let contactQueryResponse = await connection.query(getContactDetails);
    let contactResponse = contactQueryResponse.rows;

    for (let i = 0; i < storiesArray.length; i++) {
      const story = storiesArray[i];
      for (let j = 0; j < story.contacts.length; j++) {
        const contactObj = story.contacts[j];
        for (let contactForInvoice of contactResponse) {
          for (invoice of contactForInvoice.invoice) {
            if (story.id && contactForInvoice.id && contactObj && invoice) {
              console.log(
                'Story:',
                story.id,
                'Contact:',
                contactObj.id,
                'InvoiceContact:',
                contactForInvoice.id,
                'STORY_CONTACT:',
                invoice.story_id
              );
              // if id matches add info to currentStoryDetails array
              if (
                contactObj.id === contactForInvoice.id &&
                story.id === invoice.story_id
              ) {
                console.log('IM HERE');
                const { project_association, invoice_total, invoice_paid } =
                  invoice;
                contactObj.project_association = project_association;
                contactObj.invoice_paid = invoice_paid;
                contactObj.invoice_total = invoice_total;
              }
            }
          }
        }
      }
    }
    connection.query('');
    res.send(response.rows);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  } finally {
    connection.release();
  }
});

router.get('/current/:id', async (req, res) => {
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

  let getContactDetails = `SELECT * 
  FROM "story_contact"
  WHERE "story_id" = $1; `;

  const connection = await pool.connect();
  try {
    await connection.query('BEGIN;');
    //1. get all details related to one story
    let response = await connection.query(getDetailsQueryText, [id]);
    // set story response to a variable
    let currentStoryDetails = response.rows[0];

    //2. get story contact details (invoice total, invoice paid, project_association)
    let storyContactResponse = await connection.query(getContactDetails, [id]);
    let contactPaymentDetails = storyContactResponse.rows;

    //3. loop over every contact in the story
    for (let i = 0; i < currentStoryDetails.contacts.length; i++) {
      //4. For each contact in story, loop over each contactPayment detail
      for (let paymentDetail of contactPaymentDetails) {
        console.log('RES:', paymentDetail.contact_id);
        // if id matches add info to currentStoryDetails array
        if (paymentDetail.contact_id === currentStoryDetails.contacts[i].id) {
          console.log('IM HERE');
          const { project_association, invoice_total, invoice_paid } =
            paymentDetail;
          currentStoryDetails.contacts[i].project_association =
            project_association;
          currentStoryDetails.contacts[i].invoice_paid = invoice_paid;
          currentStoryDetails.contacts[i].invoice_total = invoice_total;
        }
      }
    }

    //5. Send modified array as response
    res.send(currentStoryDetails);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

/**
 * POST route template
 */
router.post('/', async (req, res) => {
  console.log('In post route', req.body);
  console.log(req.body.tags);
  // POST route code here
  const {
    title,
    subtitle,
    article_text,
    article_link,
    notes,
    type,
    copies_sent,
    photo_uploaded,
    fact_check_completed /*9, same as fact_checked, different naming conventions in data*/,
    graphic_image_required,
    external_link,
    word_count,
    date_added,
    rough_draft_deadline,
    final_draft_deadline,
    publication_date,
    //story.photo, // will put in when exisits in DB
    //copies_required, //will put in when exisits in DB
    photo_required,
    fact_check_required,
    graphic_image_completed,
    contacts,
    tags,
  } = req.body;

  let postStoryQuery = `
  INSERT INTO "story" 
  ("title", "subtitle", "article_text", "article_link", "notes", "type", "copies_sent", "photo_uploaded", 
  "fact_checked", "graphic_image_required", "external_link", "word_count", "date_added", "rough_draft_deadline",
  "final_draft_deadline", "publication_date", "photo_required", "fact_check_required","graphic_image_completed")
  VALUES 
  ($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
  RETURNING "id";`; //Return id of story

  //Query
  const connection = await pool.connect();
  try {
    await connection.query('BEGIN;');
    console.log('In query');
    let storyResponse = await connection.query(postStoryQuery, [
      title, //1
      subtitle, //2
      article_text, //3
      article_link, //4
      notes, //5
      type, //6
      copies_sent, //7
      photo_uploaded, //8
      fact_check_completed, //9, same as fact_checked, different naming conventions in data
      graphic_image_required, //10
      external_link, //11
      word_count, //12
      date_added, //13
      rough_draft_deadline, //14
      final_draft_deadline, //15
      publication_date, //16
      photo_required, //17
      fact_check_required, //18
      graphic_image_completed, //19
      //story.payment_required,//will add when exisits in DB
      //story.payment_completed, will add when exisits in DB
      //photo, // will put in when exisits in DB
      //copies_required, //will put in when exisits in DB
    ]);
    console.log('StoryId:', storyResponse.rows[0].id);
    let storyId = storyResponse.rows[0].id;

    //I am building this under the assumption that all tags and contacts that are attached are already in the tags table.
    const tagPromises = tags.map((tag) => {
      const attachTagsQuery = `
      INSERT INTO "story_tag"
      ( "tag_id","story_id")
      VALUES 
      ($1,$2);`;
      return connection.query(attachTagsQuery, [tag.id, storyId]);
    });

    const contactPromises = contacts.map((contact) => {
      let postContactsQuery = `
      INSERT INTO "story_contact" 
      ("contact_id","story_id","invoice_paid", "invoice_total", "project_association") 
      VALUES 
      ($1, $2, $3, $4, $5);`;

      return connection.query(postContactsQuery, [
        contact.id,
        storyId,
        contact.invoice_paid,
        contact.project_association,
        contact.invoice_amount,
      ]);
    });

    await Promise.all([...tagPromises, ...contactPromises]);
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
  const {
    title, //1
    subtitle, //2
    article_text, //3
    article_link, //4
    notes, //5
    type, //6
    copies_sent, //7
    photo_uploaded, //8
    fact_check_completed, //9, same as fact_checked, different naming conventions in data
    graphic_image_required, //10
    external_link, //11
    word_count, //12
    date_added, //13
    rough_draft_deadline, //14
    final_draft_deadline, //15
    publication_date, //16
    photo_required, //17
    fact_check_required, //18
    graphic_image_completed, //19
    //payment_required,//will add when exisits in DB
    //payment_completed, will add when exisits in DB
    //photo, // will put in when exisits in DB
    //copies_required, //will put in when exisits in DB
    tags,
    contacts,
  } = req.body;

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
    title, //1
    subtitle, //2
    article_text, //3
    article_link, //4
    notes, //5
    type, //6
    copies_sent, //7
    photo_uploaded, //8
    fact_check_completed, //9, same as fact_checked, different naming conventions in data
    graphic_image_required, //10
    external_link, //11
    word_count, //12
    date_added, //13
    rough_draft_deadline, //14
    final_draft_deadline, //15
    publication_date, //16
    photo_required, //17
    fact_check_required, //18
    graphic_image_completed, //19
    //payment_required,//will add when exisits in DB
    //payment_completed, will add when exisits in DB
    //photo, // will put in when exisits in DB
    //copies_required, //will put in when exisits in DB
    id,
  ];

  //Query
  const connection = await pool.connect();
  try {
    await connection.query('BEGIN;');
    //Step 1: delete all current tag and contact associations
    const deleteTagsPromise = connection.query(deleteTagsQuery, [id]);
    const deleteContactsPromise = connection.query(deleteContactsQuery, [id]);

    await Promise.all([deleteTagsPromise, deleteContactsPromise]);

    //Step 2: update Story details
    await connection.query(updateStoryQueryText, updateStoryData);

    //Step 3: re-attach tags and contacts
    const attachTagsPromise = tags.map((tag) => {
      let attachTagsQuery = `
      INSERT INTO "story_tag"
      ( "tag_id","story_id")
      VALUES 
      ($1,$2);`;
      return connection.query(attachTagsQuery, [tag.id, id]);
    });

    const attachContactsPromise = contacts.map((contact) => {
      let attachContactsQuery = `
      INSERT INTO "story_contact" 
      ("contact_id","story_id","invoice_paid", "invoice_total", "project_association") 
      VALUES 
      ($1, $2, $3, $4, $5);`;

      return connection.query(attachContactsQuery, [
        contact.id,
        id,
        contact.invoice_paid,
        contact.invoice_total,
        contact.project_association,
      ]);
    });

    await Promise.all([...attachContactsPromise, ...attachTagsPromise]);

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
    .then(res.sendStatus(200))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
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
