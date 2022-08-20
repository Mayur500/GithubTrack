
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
   
   userName : String,
   id : String,
   name : String,
   full_name :  String,
   owner: {
    login: String,
    url : String
   },
});

var UserRepo= mongoose.model('UserRepo', UserSchema, 'userrepos');

module.exports = UserRepo;