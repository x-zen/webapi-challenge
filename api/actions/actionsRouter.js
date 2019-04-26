/* --- Routes for '/api/projects' --- */
const express = require('express'); // import the express package

const db = require('../../data/helpers/actionModel.js'); // import data helpers
const proDb = require('../../data/helpers/projectModel.js'); // import data helpers

const router = express.Router(); // creates the route


// POST - Creates a action using info sent in request body
router.post('/', (req, res) => {
  const { project_id, description, notes } = req.body;
  const action =  { project_id, description, notes };
  const proCheck = proDb.get(project_id);
  if (!project_id || !description || !notes) {
    res.status(400).json({ error: 'Please provide a ID, name, and notes for this action.' })
  }
  else if (proCheck.project_id !== project_id) {
    res.status(400).json({ error: `The project with ID# ${project_id} was not found` })
  } else {
    db
    .insert(action)
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error while saving the action to the database.' });
    })
  }
})

// GET - Returns an array of all actions in database
router.get('/', (req, res) => {
  db
  .get()
  .then(actions => {
    res.status(200).json(actions);
  })
  .catch(err => {
    res.status(500).json({ error: 'The actions information could not be retrieved.' });
  })
})

// GET - Returns action with the specified ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db
    .get(id)
    .then(action => {
      if (action.length === 0) {
        res.status(404).json({ error: 'The action with the specified ID does not exist.'});
        return;
      }
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ error: 'The action information could not be retrieved.'});
    })
})

// DELETE - Deletes action with specified ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db
  .remove(id)
  .then(deleted => {
    if (deleted === 0) {
      res.status(404).json({ error: 'The action with the specified ID does not exist.'});
      return;
    }
    res.status(204).end();
  })
  .catch(err => {
    res.status(500).json({ error: 'The action could not be removed.' });
  })
})

// PUT - Updates action with specified ID & returns the moded action
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes } = req.body;
  const updates =  { project_id, description, notes };
  if (!project_id || !description || !notes) {
    res.status(400).json({ error: 'Please provide a ID, name, and notes for this action.' });
  }
  db
  .update(id, updates)
  .then(count => {
    if (null) {
      res.status(404).json({ error: 'The aaction with the specified ID does not exist.'});
    } else {
      res.status(200).json(updates);
    }
  })
  .catch(err => {
    res.status(500).json({ error: 'The action information could not be modified.' });
  })
})


module.exports = router; // exports the route
