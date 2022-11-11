const express = require('express');
const path = require('path');
const db = require("./db/db.json")
const fs = require("fs")

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
//app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  res.json(db.slice(1))
})

app.post('/api/notes', (req, res) => {
  const newNote = createNote(req.body, db)
  res.json(newNote)
})

const createNote = (body, notesArr) => {
  const newNote = body;
  if(!Array.isArray(notesArr)) 
  notesArr = []
  if(notesArr.length === 0)
    notesArr.push(0)

  body.id = notesArr.length;
  notesArr[0]++
  notesArr.push(newNote)

  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesArr, null, 2)
  )
    return newNote
}

app.delete('/api/notes/:id', (req, res) => {
  deleteNote(req.params.id, db)
  res.json(true)
})

const deleteNote = (id, notesArr) => {
  for(let i = 0; i < notesArr.length; i++) {
    let note = notesArr[i]
    if(note.id === id) {
      notesArr.splice(i, 1)
      fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notesArr, null, 2)
      )
      break;
    }
  }
}

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);