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
