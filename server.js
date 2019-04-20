//---------------------------  Server -----------------------------
//                           Start App
//-----------------------------------------------------------------

const express = require("express");
const exphbs = require('express-handlebars');
const path = require("path");

// db Tools
// =============================================================
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);


// Model DB
// =============================================================
 const db = require("./models/");

// Localhost Port
// =============================================================
const PORT = process.env.PORT || 3000;

// Initialize Express
// =============================================================
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Handlebars
// =============================================================
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

const hbs = exphbs.create({
    defaultLayout: 'masterPage',
    layoutsDir: path.join(__dirname, '/views'),
    helpers: {
        formatDate: function (date, format) {
            return moment(date).format(format);
        }
    }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



// Routes
// =============================================================
// Routes
// =============================================================
require("./routes/route.js")(app);

// Connect to the Mongo DB
// =============================================================
// mongoose.connect("mongodb://localhost/dbheadlines", { useNewUrlParser: true, useCreateIndex: true });

MONGODB_URI = "mongodb://heroku_pct97z3n:spbbg9lg8ks2fn2ne9hd74qrij@ds141902.mlab.com:41902/heroku_pct97z3n"
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Listen on port 3000
app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
  });