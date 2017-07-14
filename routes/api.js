var express = require("express");
var router = express.Router();
var User = require("../models/user");
var jwt = require("jsonwebtoken");
var jwtConfig = require("../jwtConfig");
var Stat = require("../models/stat");

/* GET users listing. */
router.get("/", function(req, res, next) {
  User.find().then(allUsers => {
    res.send(allUsers);
  });
});

router.post("/signup", function(req, res) {
  let newUserData = req.body;
  var newUser = new User(newUserData);
  newUser
    .save()
    .then(function(savedUser) {
      res.send(savedUser);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

router.post("/login", (req, res) => {
  let loginUser = req.body;
  User.findOne({ user: loginUser.user }).then(foundUser => {
    if (!foundUser) {
      return res.send("Username does not exist");
    }
    if (foundUser && loginUser.password === foundUser.password) {
      var token = jwt.sign({ user: foundUser }, jwtConfig.secret, {
        expiresIn: 60 * 60 * 24
      });
      res
        .send({
          token: token,
          username: foundUser.username,
          userId: foundUser._id
        })
        .catch(function(err) {
          res.status(500).send(err);
        });
      return res.send("Your Login was correct");
    } else {
      return res.send("Password or Username is not correct");
    }
  });
});

router.get("/activities", (req, res) => {
  Stat.find().then(foundStats => {
    res.send(foundStats);
  });
});

router.post("/activities", (req, res) => {
  var activityContent = req.body;
  var newActivity = new Stat(activityContent);
  newActivity
    .save()
    .then(addedActivity => {
      res.send(addedActivity);
    })
    .then(err => {
      res.send(err);
    });
});

router.post("/activities/:id/stats", (req, res) => {
  console.log(":::::::::", req.body);
  Stat.findOne({ _id: req.params.id }).then(statToUpdate => {
    var statToUpdate = {
      activity: statToUpdate.activity,
      stat: {
        date: req.body.date,
        value: req.body.value
      }
    };
    Stat.updateOne({ _id: req.params.id }, statToUpdate);
    res.send({ this_is_your_stat_value: statToUpdate });
  });
});

router.get("/activities/:id", (req, res) => {
  Stat.find(
    { _id: req.params.id },
    { activity: 1, _id: 0 }
  ).then(foundStats => {
    res.send(foundStats);
  });
});

router.put("/activities/:id", (req, res) => {
  Stat.updateOne({ _id: req.params.id }, req.body).then(updatedStats => {
    res.send(updatedStats);
  });
});

router.delete("/activities/:id", (req, res) => {
  Stat.remove({ _id: req.params.id }).then(deletedStat => {
    res.send("You deleted an activity");
  });
});

router.delete("/activities/:activityId/stats/:statId", (req, res) => {
  Stat.findByIdAndUpdate(req.params.activityId, {
    "$pull": { "stat": { "_id": req.params.statId } }
  })
    .then(deletedStat => {
      res.send("You deleted a stat");
    })
    .catch(err => res.send(err));
});

module.exports = router;
