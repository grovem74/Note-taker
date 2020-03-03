var express = require("express");


// set up server
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

//start server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });