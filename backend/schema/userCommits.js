var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserCommits = Schema({
  userName: String,
  reposName: String,
  sha: String,
  commit: {
    author: {
      name: String,
    },
    committer: {
      name: String,
      email: String,
    },
    message: String,
  },
});

var UserCommits = mongoose.model("UserCommits", UserCommits, "usercommits");

module.exports = UserCommits;
