/* --- Routes for '/api' --- */
const express = require('express'); // import the express package

const projectsRouter = require('./projects/projectsRouter'); // import the project endpoints
const actionsRouter = require('./actions/actionsRouter'); // import the action endpoints

const router = express.Router(); // creates the route


// handle request to the /api endpoint
router.get('/', (req, res) => {
  const d = Date();
  const now = d.toString();
  res.send('Project Challenge API | By: x-zen | It is currently '+ now);
});

// assigns the route for project endpoints
router.use('/projects', projectsRouter);

// assigns the route for actions endpoints
router.use('/actions', actionsRouter);


module.exports = router; // exports the route
