const { query } = require('express');
const express = require('express');
const {
  rejectUnauthenticated,
  rejectUnauthorized,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET ALL stories route
 */
router.get('/', rejectUnauthenticated, rejectUnauthorized, async (req, res) => {
  // console.log('GETTING ALL STORIES');

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

  // Open Connection to the database
  const connection = await pool.connect();
  try {
    //Step 1: Query the database for info from all stoires, including relational tables: contact, theme, and tag
    let response = await connection.query(getAllQueryText);
    //Setting incoming data to variable 'storiesArray'
    let storiesArray = response.rows;

    let getContactDetails = `
      SELECT "contact"."id" , json_agg( "story_contact") AS "invoice"
      FROM "contact"
      LEFT JOIN "story_contact" ON "story_contact"."contact_id" = "contact"."id"
      GROUP BY "contact"."id";`;

    //Step 2: Query database for contact details in the story_contact table in database
    let contactQueryResponse = await connection.query(getContactDetails);
    //set response to variable contactResponse
    let contactsInvoiceResponse = contactQueryResponse.rows;

    //Step 3.a: Loop over every story object in 'storiesArray
    for (let story of storiesArray) {
      //for each story object, if tags, contacts, or theme array is null change to empty
      if (story.tags[0] === null) story.tags = [];
      if (story.contacts[0] === null) story.contacts = [];
      if (story.theme[0] === null) story.theme = [];
      //Step 3.b: In each story object, loop over every contact object in contacts array
      for (let contactObj of story.contacts) {
        //Step 3.c: Loop over every contact object in the contactsInvoiceResponse array (where the story_contact table info for each contact is)
        for (let contactForInvoice of contactsInvoiceResponse) {
          //Step 3.d: Loop over every invoice information object in invoice array
          for (let invoice of contactForInvoice.invoice) {
            //for each story object, if all comparison data is present process below
            if (story.id && contactForInvoice.id && contactObj && invoice) {
              // console.log(
              //   'Story Object Id:',
              //   story.id,
              //   'Invoice info story id:',
              //   invoice.story_id,
              //   'Contact Id:',
              //   contactObj.id,
              //   'InvoiceContact Id:',
              //   contactForInvoice.id
              // );
              // IF contact id of story object and invoice object matches
              //AND story id of story object and invoice object
              //add invoice info to currentStoryDetails array
              if (
                contactObj.id === contactForInvoice.id &&
                story.id === invoice.story_id
              ) {
                const { story_association, invoice_amount, invoice_paid } =
                  invoice;
                contactObj.story_association = story_association;
                contactObj.invoice_paid = invoice_paid;
                contactObj.invoice_amount = invoice_amount;
              }
            }
          }
        }
      }
    }
    //Step 4: Send the modified array of data
    res.send(response.rows);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  } finally {
    connection.release();
  }
});

//GET Story by ID

router.get(
  '/current/:id',
  rejectUnauthenticated,
  rejectUnauthorized,
  async (req, res) => {
    let id = req.params.id;
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
      //**Step 1: get all details related to the current story
      let response = await connection.query(getDetailsQueryText, [id]);
      // set story response to a variable
      let currentStoryDetails = response.rows[0];

      //**Step 2: get story contact invoice details (invoice total, invoice paid, project_association)
      let storyContactResponse = await connection.query(getContactDetails, [
        id,
      ]);
      let contactInvoiceDetails = storyContactResponse.rows;

      //If tags, contacts, or theme array is null, change to empty array
      if (currentStoryDetails.tags[0] === null) currentStoryDetails.tags = [];
      if (currentStoryDetails.contacts[0] === null)
        currentStoryDetails.contacts = [];
      if (currentStoryDetails.theme[0] === null) currentStoryDetails.theme = [];

      //**Step 3: Loop over every contact object in the story contact array
      for (let i = 0; i < currentStoryDetails.contacts.length; i++) {
        let storyContact = currentStoryDetails.contacts[i];
        //**Step 4: For each contact object in story, loop over each contactInvoiceDetail
        for (let invoiceDetail of contactInvoiceDetails) {
          // if contact id for story contacts array and contact invoice match, add invoice info to currentStoryDetails array

          if (invoiceDetail.contact_id === storyContact.id) {
            const { story_association, invoice_amount, invoice_paid } =
              invoiceDetail;
            storyContact.story_association = story_association;
            storyContact.invoice_paid = invoice_paid;
            storyContact.invoice_amount = invoice_amount;
          }
        }
      }

      //5. Send modified array as response
      // console.log('Response for individual story:', currentStoryDetails);
      res.send(currentStoryDetails);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    } finally {
      connection.release();
    }
  }
);

//* ===================================== POST POST POST ===================================

router.post(
  '/',
  rejectUnauthenticated,
  rejectUnauthorized,
  async (req, res) => {
    const {
      title,
      subtitle,
      article_text,
      article_link,
      notes,
      photo,
      type,
      copies_required,
      number_of_copies,
      copies_sent,
      photo_uploaded,
      fact_check_completed,
      fact_check_required,
      graphic_image_completed,
      graphic_image_required,
      payment_required,
      payment_completed,
      socials_required,
      socials_completed,
      underwriter_required,
      underwriter_completed,
      photo_submitted,
      photo_comments,
      external_link,
      word_count,
      date_added,
      rough_draft_deadline,
      final_draft_deadline,
      publication_date,
      contacts,
      theme,
      tags,
      copies_destination,
    } = req.body;

    // finds contacts who require payment
    const contactsRequiringPayment = contacts.filter(
      (contact) => contact?.invoice_amount > 0
    );
    let payment_needed;
    if (
      contactsRequiringPayment.reduce(
        (sum, contact) => sum + contact.invoice_amount,
        0
      ) > 0
    ) {
      payment_needed = true;
    } else {
      payment_needed = false;
    }

    let postStoryQuery = `
  INSERT INTO "story" 
  ("title","subtitle","article_text",
  "article_link","notes","photo",
  "type","copies_required","number_of_copies",
  "copies_sent","photo_uploaded",
  "fact_check_completed","payment_required","payment_completed",
  "socials_required","socials_completed","underwriter_required",
  "underwriter_completed","photo_submitted","photo_comments",
  "external_link","word_count",
  "rough_draft_deadline","final_draft_deadline","publication_date", "copies_destination",
  "fact_check_required", "graphic_image_completed", "graphic_image_required" )
  VALUES 
  ($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29)
  RETURNING "id";`; //Return id of story

    //Database Query below
    const connection = await pool.connect();

    try {
      await connection.query('BEGIN;');
      // **Step 1: query database to post story information, returning the id of the story created
      let storyResponse = await connection.query(postStoryQuery, [
        title, //1
        subtitle, //2
        article_text, //3
        article_link, //4
        notes, //5
        photo, //6
        type, //7
        copies_required, //8
        number_of_copies, //9
        copies_sent, //10
        photo_uploaded, //11
        fact_check_completed, //12
        payment_required, //13
        payment_completed, //14
        socials_required, //15
        socials_completed, //16
        underwriter_required, //17
        underwriter_completed, //18
        photo_submitted, //19
        photo_comments, //20
        external_link, //21
        word_count, //22
        rough_draft_deadline, //23
        final_draft_deadline, //24
        publication_date, //25
        copies_destination, //26
        fact_check_required, //27
        graphic_image_completed, // 28
        graphic_image_required, // 29
      ]);

      //**Step 2: Set returning id to storyId variable
      let storyId = storyResponse.rows[0].id;

      //**Step 3: query database to attach all tags and contacts to the story via joiner tables*/

      //Reducing multiple tags queries down to run in sequence with contacts
      const tagPromises = tags.map((tag) => {
        const attachTagsQuery = `
      INSERT INTO "story_tag"
      ( "tag_id","story_id")
      VALUES 
      ($1,$2);`;
        return connection.query(attachTagsQuery, [tag.id, storyId]);
      });
      //Reducing multiple contacts queries down to run in sequence with tags
      const contactPromises = contacts.map((contact) => {
        let postContactsQuery = `
      INSERT INTO "story_contact" 
      ("contact_id","story_id","invoice_paid", "invoice_amount", "story_association") 
      VALUES 
      ($1, $2, $3, $4, $5);`;
        return connection.query(postContactsQuery, [
          contact.id,
          storyId,
          contact.invoice_paid,
          contact.invoice_amount,
          contact.story_association,
        ]);
      });

      const themePromises = theme.map((theme) => {
        const attachThemeQuery = `
      INSERT INTO "theme_story"
      ("story_id", "theme_id")
      VALUES
      ($1, $2);`;
        return connection.query(attachThemeQuery, [storyId, theme.id]);
      });

      //Querying database to add contacts and tags to joiner tables
      await Promise.all([...tagPromises, ...contactPromises, ...themePromises]);
      await connection.query('COMMIT;');
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      await connection.query('ROLLBACK');
      res.sendStatus(500);
    } finally {
      connection.release();
    }
  }
);

/**
 * DELETE route template
 */
router.delete('/:id', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
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

//* ======================================= PUT PUT PUT =========================================

router.put(
  '/:id',
  rejectUnauthenticated,
  rejectUnauthorized,
  async (req, res) => {
    let id = req.params.id;
    const {
      title,
      subtitle,
      article_text,
      article_link,
      notes,
      type,
      copies_sent,
      photo_uploaded,
      fact_check_completed, // same as fact_checked, different naming conventions in data
      graphic_image_required,
      external_link,
      word_count,
      //date_added, // Don't need, auto populating with SQL
      rough_draft_deadline,
      final_draft_deadline,
      publication_date,
      // photo_required,
      fact_check_required,
      graphic_image_completed,
      payment_required,
      payment_completed,
      photo,
      copies_required,
      socials_required,
      socials_completed,
      underwriter_required,
      underwriter_completed,
      tags,
      contacts,
      theme,
      number_of_copies,
      copies_destination,
    } = req.body;

    const contactsRequiringPayment = contacts.filter(
      (contact) => contact?.invoice_amount > 0
    );
    let payment_needed;
    if (
      contactsRequiringPayment.reduce(
        (sum, contact) => sum + contact.invoice_amount,
        0
      ) > 0
    ) {
      payment_needed = true;
    } else {
      payment_needed = false;
    }

    //Query
    const connection = await pool.connect();
    try {
      await connection.query('BEGIN;');

      //**Step 1: delete all current tags and contacts associations
      let deleteTagsQuery = `DELETE FROM "story_tag" WHERE "story_id" = $1;`;
      let deleteContactsQuery = `DELETE FROM "story_contact" WHERE "story_id" = $1;`;
      const deleteThemeQuery = `DELETE FROM "theme_story" WHERE "story_id" = $1;`;

      const deleteTagsPromise = connection.query(deleteTagsQuery, [id]);
      const deleteContactsPromise = connection.query(deleteContactsQuery, [id]);
      const deleteThemePromise = connection.query(deleteThemeQuery, [id]);

      await Promise.all([deleteTagsPromise, deleteContactsPromise]);

      //**Step 2: update Story details with a put request
      let updateStoryQueryText = `
    UPDATE "story"
    SET
    "title" = $1, "subtitle"= $2, "article_text"= $3, "article_link"= $4, "notes"= $5, "type"= $6, "copies_sent"= $7, "photo_uploaded"= $8, 
    "fact_check_completed"= $9, "graphic_image_required"= $10, "external_link"= $11, "word_count"= $12, "rough_draft_deadline"= $13,
    "final_draft_deadline"= $14, "publication_date"= $15, "fact_check_required"= $16,"graphic_image_completed"= $17, "payment_required" = $18, 
    "payment_completed" = $19, "photo" = $20, "copies_required" = $21, "socials_required"= $22, "socials_completed"=$23, "underwriter_required" = $24, "underwriter_completed" = $25
    WHERE "id" = $26;`;

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
        //date_added, // don't need, auto populating with SQL
        rough_draft_deadline, //13
        final_draft_deadline, //14
        publication_date, //15
        // photo_required, //16XX
        fact_check_required, //16
        graphic_image_completed, //17
        payment_required, // 18
        payment_completed, //19
        photo, // 20
        copies_required, //21
        socials_required, // 22
        socials_completed, // 23
        underwriter_required, //24
        underwriter_completed, //25
        id, //26
      ];

      await connection.query(updateStoryQueryText, updateStoryData);

      //**Step 3: re-attach tags and contacts
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
      ("contact_id","story_id","invoice_paid", "invoice_amount", "story_association") 
      VALUES 
      ($1, $2, $3, $4, $5);`;

        return connection.query(attachContactsQuery, [
          contact.id,
          id,
          contact.invoice_paid,
          contact.invoice_amount,
          contact.story_association,
        ]);
      });

      const attachThemePromises = theme.map((theme) => {
        const attachThemeQuery = `
      INSERT INTO "theme_story"
      ("story_id", "theme_id")
      VALUES
      ($1, $2);`;
        return connection.query(attachThemeQuery, [id, theme.id]);
      });

      await Promise.all([
        ...attachContactsPromise,
        ...attachTagsPromise,
        ...attachThemePromises,
      ]);

      await connection.query('COMMIT');
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      await connection.query('ROLLBACK');
      res.sendStatus(500);
    } finally {
      await connection.release();
    }
  }
);

//POST route for adding a tag to tag data table, returning id of added tag
// written with assumption that tagId was in the params, and name and description was data in body of request.
router.post(
  '/tag/:id',
  rejectUnauthenticated,
  rejectUnauthorized,
  (req, res) => {
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
  }
);

//Created with the idea that the tag id was params and story id is in the body of the request
//Is there a place for this route in our process? Currently embedded in the put route.
router.delete(
  '/tag/:tagId/:storyId',
  rejectUnauthenticated,
  rejectUnauthorized,
  (req, res) => {
    // DELETE a tag from a story
    console.log('here');
    let tagId = req.params.tagId;
    console.log(tagId);
    let storyId = req.params.storyId;
    console.log(storyId);
    let deleteTagQueryText =
      'DELETE FROM "story_tag" WHERE "story_id" = $1 AND "tag_id" = $2;';
    pool
      .query(deleteTagQueryText, [storyId, tagId])
      .then(res.sendStatus(200))
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
);

// updates notes, initiated at story details page
router.put(
  '/notes/:id',
  rejectUnauthenticated,
  rejectUnauthorized,
  (req, res) => {
    const queryText = 'UPDATE "story" SET "notes"=$1 WHERE "id"=$2;';
    const queryParams = [req.body.notes, req.params.id];

    pool
      .query(queryText, queryParams)
      .then(() => res.sendStatus(200))
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  }
);

//Router put for updating the status of checked box on the DOM
router.put(
  '/status/:id',
  rejectUnauthenticated,
  rejectUnauthorized,
  (req, res) => {
    const statusToChange = req.body.statusToChange;
    const queryText = `UPDATE "story" SET ${statusToChange} = NOT ${statusToChange} WHERE "id"=$1 RETURNING "${statusToChange}";`;
    const queryParams = [req.body.story_id];

    pool
      .query(queryText, queryParams)
      .then((response) => {
        console.log('response from /status/:id query: ', response);
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('error in update status query:', err);
        res.sendStatus(500);
      });
  }
);

module.exports = router;
