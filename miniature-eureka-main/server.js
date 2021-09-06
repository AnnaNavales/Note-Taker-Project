const express = require('express');
const fs = require("fs");
const notes = required("./db/db.json");
const path = require("path");
const uuid =required("uuid");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

app.post("/api/notes", (req, res) => {
const notes = JSON.parse(fs.readFileSync("./db/db.json"));
const newNotes = req.body;
newNotes.id = uuid.v4();
notes.push(newNotes);
fs.writeFileSync("./db/db.json", JSON.stringify(notes))
res.json(notes);

});
// to delete notes
app.delete("./api/note/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(delnotes));
    res.json(delNote);
    

})

//HTML calls
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));

});
//call for notes.html
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, function()  {
    console.log("App listen on PORT:" + PORT);
});
