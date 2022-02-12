const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
const projectsRouter = require('./projects/projects-router')
// Build your projects router in /api/projects/projects-router.js
const actionsRouter = require('./actions/actions-router')
// Do NOT `server.listen()` inside this file!
server.use(express.json())
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.get('*', (req, res, next) => {
    res.send(`
      <h1> I'm Working Here! </h1>
   `)
})

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
});

module.exports = server;
