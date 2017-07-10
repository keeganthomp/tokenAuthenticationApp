var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var statSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  activity: {
    type: String,
    required: true    
  },
  numberoftimes: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Stat", statSchema);
