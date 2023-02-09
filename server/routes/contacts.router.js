const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
  rejectUnauthorized,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, rejectUnauthorized, async (req, res) => {
  // GET route code here
  // console.log('In contacts router GET, getting all contacts. URL: /api/contacts');

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    let allContacts = [];

    //* 1. general info: all info in teh contact table

    const generalInfoQuery = `SELECT "contact".*,  json_agg(DISTINCT "story") AS "stories", json_agg(DISTINCT "tag") AS "tags", json_agg(DISTINCT "role") AS "roles"
    FROM "contact" 
    LEFT JOIN "tag_contact" ON "tag_contact"."contact_id" = "contact"."id"
    LEFT JOIN "tag" ON "tag"."id" = "tag_contact"."tag_id"
    LEFT JOIN "story_tag" ON "tag"."id" = "story_tag"."tag_id"
    LEFT JOIN "story_contact" ON "contact"."id" = "story_contact"."contact_id"
    LEFT JOIN "story" ON "story_contact"."story_id" = "story"."id"
    LEFT JOIN "contact_role" ON "contact"."id" = "contact_role"."contact_id"
    LEFT JOIN "role" ON "contact_role"."role_id" = "role"."id"
    GROUP BY "contact"."id"
    ORDER BY "contact"."date_added" ASC
    ;`;
    const generalInfoResults = await client.query(generalInfoQuery);

    allContacts = generalInfoResults.rows;

    for (let contact of allContacts) {
      if (contact.roles[0] === null) contact.roles = [];
      if (contact.tags[0] === null) contact.tags = [];
      if (contact.stories[0]===null) contact.stories = [];
    }

    //     //* 2. stories. query returns array of objects:
    //     /*
    //       {
    //         id (contact id):
    //         stories: [{},{}]
    //       }
    //     */

    // const storyQuery = '~~~ enter SQL stuff here ~~~'
    // const storyResults = await client.query(storyQuery);

    // for (let contact of allContacts) {
    //   for (let story of storyResults.rows) {
    //     if (contact.id === story.id) {
    //       contact.stories = story.stories
    //     }
    //   }
    //   if (!contact.stories) contact.stories = []
    // }

    //     //* 3. themes. query returns array of objects:
    //     /*
    //     {
    //       id (contact id):
    //       themes: [{},{}]
    //     }
    //     */

    // const themeQuery = '~~~ enter SQL stuff here ~~~'
    // const themeResults = await client.query(themeQuery)
    // for (let contact of allContacts) {
    //   for (let theme of themeResults.rows) {
    //     if (contact.id === theme.id) {
    //       contact.themes = theme.themes
    //     }
    //   }
    //   if (!contact.themes) contact.themes = []
    // }

    //* 4. roles

    // const rolesQuery = '~~~ enter SQL stuff here ~~~'
    // const rolesResults = await client.query(rolesQuery)
    // for (let contact of allContacts) {
    //   for (let roles of rolesResults.rows) {
    //     if (contact.id === roles.id) {
    //       contact.roles = roles.roles
    //     }
    //   }
    //   if (!contact.roles) contact.roles = []
    // }

    //     //* 5. tags

    // const tagsQuery = '~~~ enter SQL stuff here ~~~'
    // const tagsResults = await client.query(tagsQuery)
    // for (let contact of allContacts) {
    //   for (let tags of tagsResults.rows) {
    //     if (contact.id === tags.id) {
    //       contact.tags = tags.tags
    //     }
    //   }
    //   if (!contact.tags) contact.tags = []
    // }

    await client.query('COMMIT');
    res.send(allContacts);
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('could not get all contacts info', error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

//* ------------- GET BY ID --------------**TENTATIVELY BEING MANAGED BY PULLING OUT OF STATE**

// router.get('/current/:id', (req, res) => {
//   // GET route code here. this can be done in one query.
//   let id = req.params.id;
//   console.log(
//     `In contacts :id router GET, getting contact by id ${id}. URL: /api/contacts/current/:id`
//   );
//   res.sendStatus(200);
// });

router.post('/', rejectUnauthenticated, rejectUnauthorized, async (req, res) => {
  //console.log('editing project. req.body: ', req.body)
  const client = await pool.connect();

  try {
    const {
      name,
      pronouns,
      expertise,
      photo,
      email,
      phone,
      billing_address,
      mailing_address,
      bio,
      note,
      linkedin,
      twitter,
      instagram,
      facebook,
      tags,
      roles,
    } = req.body;

    await client.query('BEGIN');

    //* 1. Update contact table
    const contactInsertQuery = `INSERT INTO "contact"
    ("name" ,"pronouns" ,"expertise" ,"photo","email" ,"phone" ,"billing_address" , "mailing_address" , "bio" ,"note" ,"linkedIn" ,"twitter" ,"instagram" , "facebook" ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING "id";`;
    let contactResponse = await client.query(contactInsertQuery, [
      name,
      pronouns,
      expertise,
      photo,
      email,
      phone,
      billing_address,
      mailing_address,
      bio,
      note,
      linkedin,
      twitter,
      instagram,
      facebook,
    ]);

    //let contactId = contactInsertQuery.rows[0].id;
    // console.log(contactResponse.rows[0].id);
    let contactId = contactResponse.rows[0].id;

    // // //* 3. insert tags and roles info WILL DO THIS NEXT
    const tagsPromises = tags.map((tag) => {
      const insertTagText = `INSERT INTO "tag_contact" ("tag_id","contact_id") VALUES ($1,$2);`;
      const insertTagValues = [tag.id, contactId]; //this may have to change based on tag vs tag.id if an array of object
      return client.query(insertTagText, insertTagValues);
    });

    // 3b. roles

    const rolesPromises = roles.map((role) => {
      const insertRoleText = `INSERT INTO "contact_role" ("role_id","contact_id") VALUES ($1,$2);`;
      const insertRoleValues = [role.id, contactId];
      return client.query(insertRoleText, insertRoleValues);
    });

    // //* 4. execute promises
    await Promise.all([...tagsPromises, ...rolesPromises]);

    await client.query('COMMIT');
    res.sendStatus(201);
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('Error PUT /api/contacts', error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

//* --------------- PUT - update contact -----------------

router.put('/:id', rejectUnauthenticated, rejectUnauthorized, async (req, res) => {
  // console.log('editing project. req.body: ', req.body);
  const client = await pool.connect();

  try {
    const {
      name,
      pronouns,
      expertise,
      photo,
      email,
      phone,
      billing_address,
      mailing_address,
      bio,
      note,
      linkedin,
      twitter,
      instagram,
      facebook,
      tags,
      roles,
    } = req.body;

    await client.query('BEGIN');

    //* 1. delete existing tags and roles

    const deleteRolesQuery = client.query(
      `DELETE FROM "contact_role" WHERE "contact_id" = $1;`,
      [req.params.id]
    );

    const deleteTagsQuery = client.query(
      `DELETE FROM "tag_contact" WHERE "contact_id" = $1;`,
      [req.params.id]
    );

    await Promise.all([deleteRolesQuery, deleteTagsQuery]);

    //* 2. update general info (name, ensemble_name, description)

    const contactUpdateQuery = `UPDATE "contact" SET
    "name"=$1,
    "pronouns"=$2,
    "expertise"=$3,
    "photo"=$4,
    "email"=$5,
    "phone"=$6,
    "billing_address"=$7,
    "mailing_address"=$8,
    "bio"=$9,
    "note"=$10,
    "linkedIn"=$11,
    "twitter"=$12,
    "instagram"=$13,
    "facebook"=$14
    WHERE "id"=$15;`;

    await client.query(contactUpdateQuery, [
      name,
      pronouns,
      expertise,
      photo,
      email,
      phone,
      billing_address,
      mailing_address,
      bio,
      note,
      linkedin,
      twitter,
      instagram,
      facebook,
      req.params.id,
    ]);

    // //* 3. insert tags and roles info
    // // 3a. tags
    const tagsPromises = tags.map((tag) => {
      const insertTagText = `INSERT INTO "tag_contact"("tag_id", "contact_id") VALUES($1, $2);`;
      const insertTagValues = [tag.id, req.params.id];
      return client.query(insertTagText, insertTagValues);
    });

    // // 3b. roles
    const rolesPromises = roles.map((role) => {
      const insertRoleText = `INSERT INTO "contact_role" ("role_id", "contact_id") VALUES($1, $2);`;
      const insertRoleValues = [role.id, req.params.id];
      return client.query(insertRoleText, insertRoleValues);
    });

    //* 4. execute promises
    await Promise.all([...tagsPromises, ...rolesPromises]);

    await client.query('COMMIT');
    res.sendStatus(201);
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('Error PUT /api/contacts', error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

router.delete('/:id', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  // DELETE route goes here. straightforward thanks to ON DELETE CASCADE
  const deleteContactQuery = `DELETE FROM "contact" WHERE id=$1`;
  pool
    .query(deleteContactQuery, [req.params.id])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('delete contact failed: ', err);
      res.sendStatus(500);
    });
});

// CREATE tags for a contact. just insert one row into the junction table
// require ID for params and req.body to include tags
router.post('/tag/:id', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  const createTagQuery = `INSERT INTO "tag_contact"("tag_id", "contact_id") VALUES($1, $2);`;
  pool
    .query(createTagQuery, [req.body.tag.id, req.params.id]) //NOT SURE HOW THIS DATA WILL BE RECIEVED, MAY NEED TO ALTER REQ.BODY
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('create contact tag failed: ', err);
      res.sendStatus(500);
    });
});

router.delete('/tag/:contact_id/:tag_id', rejectUnauthenticated, rejectUnauthorized, (req, res) => {
  // DELETE a tag from a contact. delete a row from the junction table
  const deleteTagContactQuery = `DELETE FROM "tag_contact" WHERE "contact_id" = $1 AND "tag_id" = $2;`;


  pool
    .query(deleteTagContactQuery, [req.params.contact_id, req.params.tag_id]) //NOT SURE HOW THIS DATA WILL BE RECIEVED, MAY NEED TO ALTER REQ.BODY - FYI Cant have req.body on delete requests
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('delete contact tag failed: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
