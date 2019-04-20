//---------------------------  Routes -----------------------------
//             A GET route for scraping the Website
//-----------------------------------------------------------------
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function(app) {

    // Scraping  Tools
    // =============================================================

    // Scraping Data From NyTimes Sports
        app.get("/scrape", (req, res) => {
            testmy = ""
            axios.get("https://www.nytimes.com/section/sports/").then(response => {
                const $ = cheerio.load(response.data);
                $("section .css-1cp3ece").each(function (i, element) {
                    const result = {};
                    result.title = $(element).find("h2.css-1dq8tca").text().trim()
                    result.shortSammary = $(element).find(".css-1echdzn").text().trim();
                    result.Athour = $(element).find(".css-1n7hynb").text().trim();
                    // result.Date = $(element).find(".css-umh681.e1xfvim33").find("time").text();
                    result.Date = Date.now;
                    result.linkImage = $(element).parent().find("figure").find("img").attr("src");

                    console.log(result);

                    db.Article.create(result)
                        .then(dbArticle => {
                            console.log(dbArticle);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });
                res.render('layouts/scrape');
            });
        });


    //      Home Page - HTML Route
        app.get('/', function (req, res) {

            db.Article.find()
            .populate("note")
            .then(dbArticles => {
                res.render('layouts/home', {articles: dbArticles});
            })
            .catch(function(err) {
                res.json(err);
            });
            

        });


    //      Delete An Article By ID From DB
    app.get("/articles/delete/:id", function(req, res) {
                res.render('layouts/delete', {id: req.params.id});
                
    });          

    app.delete("/articles/:id", function(req, res) {
            db.Article.findOneAndDelete({ _id: req.params.id })
            .populate("note")
            .then(dbArticles => {
                alert("delete")
                res.render('layouts/home', {articles: dbArticles});
            })
            .catch(function(err) {
                res.json(err);
            });
});    


        
    //      Get All Article From DB
        app.get("/articles", (req, res) => {
            db.Article.find()
            .populate("note")
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
        });
         


    //      Get An Article By ID From DB
        app.get("/articles/:id", function(req, res) {
            db.Article.findOne({ _id: req.params.id })
            .populate("note")
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
        });          


    //      Save Notes On Article
      app.post("/articles/:id", function(req, res) {
        db.Note.create(req.body)
          .then(dbNote => {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
          }).then(dbArticle =>{
            res.json(dbArticle);
          }).catch(err => {
            res.json(err);
          });
      });


}

