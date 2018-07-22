var express = require("express");
var router = express.Router();

var TVShow = require("../models/tvshow.js");

/* GET Tv shows */
router.get("/", function(req, res, next) {
  console.log("GET /tvshows");
  TVShow.find(function(err, tvshows) {
    if (!err) {
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

module.exports = router;
