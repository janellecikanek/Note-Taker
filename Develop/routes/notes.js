const tips = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils.js');

// GET Route for retrieving all the notes
tips.get('/', (req, res) => {
  readFromFile('../db/dbjson').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
note.post('/', (req, res) => {
  console.log(req.body);

  const { username, topic, tip } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, '../db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;