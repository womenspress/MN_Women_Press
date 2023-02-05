const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const contactsRouter = require('./routes/contacts.router');
const storiesRouter = require('./routes/stories.router');
const themesRouter = require('./routes/themes.router');
const tagsRouter = require('./routes/tags.router');
const rolesRouter = require('./routes/roles.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/themes', themesRouter);
app.use('/api/stories', storiesRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/roles', rolesRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
