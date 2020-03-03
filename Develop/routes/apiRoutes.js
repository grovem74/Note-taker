var path = require("fs");
var path = require("path");

// routes

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });

  app.post("api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
    console.log("gf");
  });

  app.delete("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });


};


  
  