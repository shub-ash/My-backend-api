const mangoose = require("mongoose");

const todoSchema = new mangoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mangoose.model("Todo", todoSchema);
