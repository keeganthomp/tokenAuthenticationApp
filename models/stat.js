var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var statSchema = new Schema({
  activity: {
    type: String,
    required: true
  },
  stat: [
    {
      date: {
        type: Date,
      },
      value: {
        type: Number,
        default: 0
      }
    }
  ]
});

module.exports = mongoose.model("Stat", statSchema);
