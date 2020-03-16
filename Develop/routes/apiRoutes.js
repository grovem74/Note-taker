var fs = require("fs");
var path = require("path");
var shortid = require("shortid");
// var router = require("express").Router();

// routes

module.exports = function (app) {

  app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });
   
  app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    newNote.id = shortid.generate();
    console.log(req.body);
    // console.log("new note: ", newNote);
    // var path = __dirname + "../db/db.json";
    // res.appendFile(path, JSON.stringify(newNote), function (err) {
    //   if (err) throw err;
    // });
    // res.json({a: 1});

    // return getNotes()
    // .then(notes => [...notes, newNote])
    // .then (updatedNotes => this.write(updatedNotes))
    // .then(()=> newNote)

    console.log(req.query);
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      let jsonArray = JSON.parse(data);
      jsonArray.push(newNote);
      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(jsonArray), () => {
        res.json(jsonArray);
      });
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    var id = (req.params.id);
    console.log(id);
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, res) => {

      let notes = JSON.parse(res);
      console.log("original notes: ", notes);
      const filterNotes= notes.filter( item => item.id !== id)
      console.log("remaining notes: ", filterNotes);
      console.log("ID notes: ", id);
      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(filterNotes), () => {
      });
    });
    res.send("deleted note");
  });

}

// router.get("/notes", (req, res) => {
//   console.log(req);
// });

// router.post("/notes", (req, res) => {
//   console.log(`------------req---------------`);
//   console.log(req);
//   res.json({a: 1});
// });


// module.exports= router;


