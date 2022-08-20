const express = require("express");
const usersDetails = require("./routes/index");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');

require('dotenv').config();

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

const PORT = process.env.PORT;


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