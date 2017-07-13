var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var statSchema = new Schema({
  activity: {
    type: String,
    required: true
  },
  thing_measured: {
    type: String,
    required: true,
    stat: {
      type: Number,
      required: true,
      default: 0
    }
  }
});

module.exports = mongoose.model("Stat", statSchema);
