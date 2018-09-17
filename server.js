// server file

// My dependencies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
// My port either designate port or 3000
var PORT = process.env.PORT || 3000;

var app = express();

// Express router
var router = express.Router();

require("./config/routes")(router);

// Make Public folder as a static directory
app.use(express.static(__dirname + "/public"));


app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");


// bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}));

// Requests will go through my router middleware
app.use(router);


var db = process.env.MONGOOSE_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db, function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection is successful");
    }
});





// Port listening
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});