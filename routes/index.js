var express = require("express");
var router = express.Router();
var Stat = require("../models/stat");



router.get("/activities", (req, res) => {
  Stat.find().then(foundStats => {
    res.send(foundStats);
  });
});


router.post("/activities", (req, res) => {
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


router.get("/activities/:id", (req, res) => {
  Stat.find({_id: req.params.id}, {activity:1, _id:0}).then(foundStats => {
    res.send(foundStats);
  });
});

router.put("/activities/:id", (req, res) => {
  Stat.updateOne({_id: req.params.id}, req.body)
  .then(updatedStats => {
    res.send(updatedStats);
  });
});

module.exports = router;
