var express = require("express");
var router = express.Router();

var TVShow = require("../models/tvshow.js");

/* GET Tv shows */
router.get("/", function(req, res, next) {
  TVShow.find(function(err, tvshows) {
    if (!err) {
      console.log("GET /tvshows");
      res.send(tvshows);
    } else {
      console.log("ERROR: " + err);
    }
  });
});

/* GET: Tv show */
router.get("/:id", function(req, res, next) {
  TVShow.findById(req.params.id, function(err, tvshow) {
    if (!err) {
      console.log("GET /tvshow/" + req.params.id);
      res.send(tvshow);
    } else {
      console.log("ERROR: " + err);
    }
  });
});

/* POST: Registro de un nuevo Tv Show */
router.post("/", function(req, res, next) {
  console.log("POST /tvshows");
  console.log(req.body);

  var tvshow = new TVShow({
    title: req.body.title,
    year: req.body.year,
    country: req.body.country,
    poster: req.body.poster,
    seasons: req.body.seasons,
    genre: req.body.genre,
    summary: req.body.summary
  });

  tvshow.save(function(err) {
    if (!err) {
      console.log("Created");
    } else {
      console.log("ERROR: " + err);
    }
  });

  res.send(tvshow);
});

/* PUT: Modificación de un Tv Show */
router.put("/:id", function(req, res, next) {
  console.log("PUT /tvshows/" + req.params.id);
  console.log(req.body);

  TVShow.findById(req.params.id, function(err, tvshow) {
    tvshow.title = req.body.petId;
    tvshow.year = req.body.year;
    tvshow.country = req.body.country;
    tvshow.poster = req.body.poster;
    tvshow.seasons = req.body.seasons;
    tvshow.genre = req.body.genre;
    tvshow.summary = req.body.summary;

    tvshow.save(function(err) {
      if (!err) {
        console.log("Updated");
      } else {
        console.log("ERROR: " + err);
      }
      res.send(tvshow);
    });
  });
});

/* POST: Eliminación de un Tv Show */
router.delete("/:id", function(req, res, next) {
  console.log("DELETE /tvshows/" + req.params.id);
  console.log(req.body);
  TVShow.findById(req.params.id, function(err, tvshow) {
    tvshow.remove(function(err) {
      if (!err) {
        console.log("Removed");
      } else {
        console.log("ERROR: " + err);
      }
      res.send(tvshow);
    });
  });
});

module.exports = router;
