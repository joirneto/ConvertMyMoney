const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
  res.send(`Server listenig at PORT:${PORT}`);
});

app.listen(PORT, err =>{
  if(err){
    console.log('Error: ', err);
  }
console.log(`Server listenig at PORT:${PORT}` );
})