const express = require("express");
const https = require("https");
const router = express.Router();
const axios = require("axios");
const UserCommits = require('../schema/userCommits');
const UserRepos = require('../schema/userRepo');


require('dotenv').config();


router.get("/userinfo/:userid", async (req, res) => {
  const userName = req.params.userid;
  const userRepo = await UserRepos.find(
    {"userName"  : userName.toLowerCase()}
  )

  console.log(userName, userRepo);
  if(userRepo.length>0){
    return res.send(userRepo);
  }
  else{

  axios.get(`https://api.github.com/users/${userName}/repos`)
    .then((resp) => {
    const user =   resp.data.map(response =>{
        return {...response , userName : response.owner.login.toLowerCase()};
      })
      UserRepos.create(user);
      res.send(resp.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }
});

router.get("/userinfo/repos/:userid/:repos", async (req, res) => {
  const userName = req.params.userid;
  const repos = req.params.repos;

    const userCommits = await UserCommits.find(
     {"userName"  : userName.toLowerCase()}
  )
  if(userCommits.length>0){
    return res.send(userCommits);
  }
  else{
  axios
    .get(`https://api.github.com/repos/${userName}/${repos}/commits`)
    .then((resp) => {
      const user =   resp.data.map(response =>{
        return {...response ,userName : userName.toLowerCase() , reposName : repos.toLowerCase()};
      })
      UserCommits.create(user);
      res.send(resp.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }
});

module.exports = router;
