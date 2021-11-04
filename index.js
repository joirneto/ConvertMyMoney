const express = require("express");
const app = express();

const PORT = 3000;

app.get('/', (req, res)=>{
  res.send("Servido OK");
});

app.listen(PORT, err =>{
  if(err){
    console.log("Error: ", err);
  }
console.log(`Server listenig at PORT:${PORT}` );
})