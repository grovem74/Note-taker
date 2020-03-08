var fs = require("fs");
var path = require("path");
// var router = require("express").Router();

// routes

module.exports = function (app) {

  app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });

  app.post("/api/notes", function (req, res) {
    var newNote = req.query;
    // console.log("new note: ", newNote);
    // var path = __dirname + "../db/db.json";
    // res.appendFile(path, JSON.stringify(newNote), function (err) {
    //   if (err) throw err;
    // });
    // res.json({a: 1});
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, res) => {
      let jsonArray = JSON.parse(res);
      jsonArray.push(newNote);
      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(jsonArray), () => {
      });
    });
    res.json();
  });

  app.delete("/api/notes/:id", function (req, res) {
    var deletedNote = parseInt(req.params.id);
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, res) => {

      let notes = JSON.parse(res);
      console.log("original notes: ", notes);
      console.log("Removed note: ", notes.splice(deletedNote, 1));
      console.log("remaining notes: ", notes);
      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), () => {
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


