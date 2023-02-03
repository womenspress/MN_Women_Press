const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
// router.get('/', async (req, res) => {
//   // GET route code here
//   console.log('In contacts router GET, getting all contacts. URL: /api/contacts');

//   const client = await pool.connect()
//   try {
//     await client.query('BEGIN')
//     let allContacts = []

//     //* 1. general info: all info in the contact table

//     const generalInfoQuery = '~~~ enter SQL stuff here ~~~'
//     const generalInfoResults = await client.query(generalInfoQuery);

//     allContacts = generalInfoResults.rows

//     //* 2. stories. query returns array of objects:
//     /* 
//       {
//         id (contact id): 
//         stories: [{},{}]
//       }
//     */

//     const storyQuery = '~~~ enter SQL stuff here ~~~'
//     const storyResults = await client.query(storyQuery);

//     for (let contact of allContacts) {
//       for (let story of storyResults.rows) {
//         if (contact.id === story.id) {
//           contact.stories = story.stories
//         }
//       }
//       if (!contact.stories) contact.stories = []
//     }

//     //* 3. themes. query returns array of objects:
//     /* 
//     {
//       id (contact id):
//       themes: [{},{}]
//     }
//     */

//     const themeQuery = '~~~ enter SQL stuff here ~~~'
//     const themeResults = await client.query(themeQuery)
//     for (let contact of allContacts) {
//       for (let theme of themeResults.rows) {
//         if (contact.id === theme.id) {
//           contact.themes = theme.themes
//         }
//       }
//       if (!contact.themes) contact.themes = []
//     }


//     //* 4. roles

//     const rolesQuery = '~~~ enter SQL stuff here ~~~'
//     const rolesResults = await client.query(rolesQuery)
//     for (let contact of allContacts) {
//       for (let roles of rolesResults.rows) {
//         if (contact.id === roles.id) {
//           contact.roles = roles.roles
//         }
//       }
//       if (!contact.roles) contact.roles = []
//     }

//     //* 5. tags

//     const tagsQuery = '~~~ enter SQL stuff here ~~~'
//     const tagsResults = await client.query(tagsQuery)
//     for (let contact of allContacts) {
//       for (let tags of tagsResults.rows) {
//         if (contact.id === tags.id) {
//           contact.tags = tags.tags
//         }
//       }
//       if (!contact.tags) contact.tags = []
//     }


//     await client.query('COMMIT')
//     res.send(allContacts)
//   }
//   catch (error) {
//     await client.query('ROLLBACK')
//     console.log('could not get all contacts info', error)
//     res.sendStatus(500)
//   }
//   finally {
//     client.release()
//   }

//   res.sendStatus(200);
// });

//* ------------- GET BY ID --------------

router.get('/current/:id', (req, res) => {
  // GET route code here. this can be done in one query.
  let id = req.params.id;
  console.log(
    `In contacts :id router GET, getting contact by id ${id}. URL: /api/contacts/current/:id`
  );
  res.sendStatus(200);
});

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

//* --------------- PUT - update contact -----------------
// based on wireframes, this should 

router.put('/:id', async (req, res) => {
  console.log('editing project. req.body: ', req.body)
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
      roles
    } = req.body;

    await client.query('BEGIN')

    //* 1. delete existing tags and roles

    const deleteRolesQuery = client.query(`~~~ SQL ~~~`, [req.params.id])
    const deleteTagsQuery = client.query(`~~~ SQL ~~~`, [req.params.id])

    await Promise.all([deleteRolesQuery, deleteTagsQuery])

    //* 2. update general info (name, ensemble_name, description)

    await client.query(`~~~ SQL ~~~`, [])

    //* 3. insert tags and roles info
    // 3a. tags
    const tagsPromises = tags.map(tag => {
      const insertTagText = `~~~ SQL ~~~`;
      const insertTagValues = [];
      return client.query(insertTagText, insertTagValues)
    });

    // 3b. roles
    const rolesPromises =roles.map(role => {
      const insertRoleText = `~~~ SQL ~~~`;
      const insertRoleValues = [];
      return client.query(insertRoleText, insertRoleValues);
    })

    //* 4. execute promises
    await Promise.all([...tagsPromises, ...rolesPromises])

    await client.query('COMMIT')
    res.sendStatus(201);
  } catch (error) {
    await client.query('ROLLBACK')
    console.log('Error PUT /api/contacts', error);
    res.sendStatus(500);
  } finally {
    client.release()
  }
  
})

router.delete('/:id', (req, res) => {
  // DELETE route goes here. straightforward thanks to ON DELETE CASCADE
  res.sendStatus(200);
})



// require ID for params and req.body to include tags
router.post('/tag/:id', (req, res) => {
  // CREATE tags for a contact. just insert one row into the junction table
  res.sendStatus(200);
})

router.delete('/tag/:id', (req, res) => {
  // DELETE a tag from a contact. delete a row from the junction table
  res.sendStatus(200);
})


module.exports = router;
