var express = require("express");
var router = express.Router();
var Stat = require("../models/stat");


/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/stats", (req, res) => {
  Stat.find().then(foundStats => {
    res.send(foundStats);
  });
});

router.post("/stats", (req, res) => {
  var statContent = req.body;
  var newStat = new Stat(statContent);
  newStat.save()
    .then(addedStat => {
      res.send(addedStat);
    })
    .then(err => {
      res.send(err);
    });
});

module.exports = router;
