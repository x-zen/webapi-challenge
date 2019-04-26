/* --- Routes for '/api/projects' --- */
const express = require('express'); // import the express package

const db = require('../../data/helpers/projectModel.js'); // import data helpers

const router = express.Router(); // creates the route


// POST - Creates a project using info sent in request body
router.post('/', (req, res) => {
  const { name, description } = req.body;
  const project =  { name, description };
  if (!name || !description) {
    res.status(400).json({ error: 'Please provide a name and description for this project.' })
  }
  db
  .insert(project)
  .then(newProject => {
    res.status(201).json(newProject);
  })
  .catch(err => {
    res.status(500).json({ error: 'There was an error while saving the project to the database.' });
  })
})

// GET - Returns an array of all projects in database
router.get('/', (req, res) => {
  db
  .get()
  .then(projects => {
    res.status(200).json(projects);
  })
  .catch(err => {
    res.status(500).json({ error: 'The projects information could not be retrieved.' });
  })
})

// GET - Returns project with the specified ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(project => {
      if (project.length === 0) {
        res.status(404).json({ error: 'The project with the specified ID does not exist.'});
        return;
      }
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ error: 'The project information could not be retrieved.'});
    })
})

// GET - Returns an array of all actions for project with the specified ID
router.get('/:projectId/actions', (req, res) => {
  const { projectId } = req.params;
  db
    .getProjectActions(projectId)
    .then(actions => {
      if (!actions) {
        res.status(404).json({ error: 'Could not find any actions for this project.'});
        return;
      } else {
        res.status(200).json(actions);
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'This projects actions could not be retrieved.'});
    })
})

// DELETE - Deletes project with specified ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db
  .remove(id)
  .then(deleted => {
    if (deleted === 0) {
      res.status(404).json({ error: 'The project with the specified ID does not exist.'});
      return;
    }
    res.status(204).end();
  })
  .catch(err => {
    res.status(500).json({ error: 'The project could not be removed.' });
  })
})

// PUT - Updates project with specified ID & returns the moded project
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const updates =  { name, description };
  if (!name || !description) {
    res.status(400).json({ error: 'Please provide a name and description for the project.' });
  }
  db
  .update(id, updates)
  .then(count => {
    if (null) {
      res.status(404).json({ error: 'The project with the specified ID does not exist.'});
    } else {
      res.status(200).json(updates);
    }
  })
  .catch(err => {
    res.status(500).json({ error: 'The project information could not be modified.' });
  })
})


module.exports = router; // exports the route
