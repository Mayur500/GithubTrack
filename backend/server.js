const express = require("express");
const usersDetails = require("./routes/index");

const app = express();
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');

require('dotenv').config();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Success Connection");
  })
  .catch((err) => {
    console.log("No Connection", err);
  });


app.use("/users/", usersDetails);

const PORT = process.env.PORT || 8080;


// ----deployment----

__dirname = path.resolve();

if(process.env.NODE_ENV === 'production'){

  app.use(express.static(path.join(__dirname,'/frontend/build')));

  app.get("*" , (req,res)=>{
  return res.sendFile(path.resolve(__dirname , 'frontend', 'build', 'index.html'));
  })
}
else{
  app.get("/", (req, res) => {
     return res.send('Api is running');
  });
}


app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running,and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});