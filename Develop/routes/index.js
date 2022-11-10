const express = require('express');

// Import our modular routers for /notes
const tipsRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;