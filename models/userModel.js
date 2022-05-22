let mongoose = require('mongoose');
let schema = new mongoose.Schema({
   username: {
      type: String,
      default: ''
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String
   }
});
let userModel = new mongoose.model('User', schema);
module.exports = userModel;