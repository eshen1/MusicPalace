let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }

});
let User = mongoose.model('User', UserSchema);
module.exports = User;

if (req.body.username &&
  req.body.password) {
  let userData = {
    username: req.body.username,
    password: req.body.password
  }

  //use schema.create to insert data into the db
  User.create(userData, function (err, user) {
    if (err) {
      return next(err)
    } else {
      return res.redirect('/profile');
    }
  });
}
