var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var statSchema = new Schema({
  activity: {
    thing_measured: {
      column_name: {
        type: String,
        required: true
      },
      stat: [
        {
          date: {
            type: Date,
            required: true
          },
          value: {
            type: Number,
            required: true,
            default: 0
          }
        }
      ]
    }
  }
});

module.exports = mongoose.model("Stat", statSchema);
