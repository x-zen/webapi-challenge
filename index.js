require('dotenv').config();

const express = require('express'); // import the express package
const apiRouter = require('./api/apiRouter'); // import the post endpoints

const server = express(); // creates the server

server.use(express.json()); // add this to make POST and PUT work


// handle request to the root of the API
server.get('/', (req, res) => {
  const homeGreeting = process.env.GREET || 'Server up, no greeting available';
  res.send(`${homeGreeting}`);
});

// assigns the route for api endpoints
server.use('/api', apiRouter);


const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** Server running on http://localhost:${port} **`)
);
