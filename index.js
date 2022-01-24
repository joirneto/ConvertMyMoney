const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const path = require('path');
const PORT = 3000;
const {convert, toMoney} = require("./lib/convert")
const apiBCB = require("./lib/cotacaoBCB")

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts); 

app.get('/',async (req, res)=>{
  const {cotacao, diaUtilFormat} = await apiBCB.getCotacao()
  console.log("Cotacao", cotacao);
  console.log("DIA ", diaUtilFormat)
  res.render('home', {
    cotacao,
    type: 'initial'});
});

app.get('/cotacao', (req, res) =>{
  const {cotacao, quantidade} = req.query;
  
  if(cotacao && quantidade && !isNaN(cotacao) && !isNaN(quantidade)){
    const conversao = convert(cotacao, quantidade);
    res.render('cotacao', {
      cotacao: toMoney(cotacao),
      quantidade: toMoney(quantidade),
      conversao: toMoney(conversao),
      error: false
    });
  }else{
    res.render('cotacao', {
      error: 'Valores invádilos!'
    });
  }
});

app.listen(PORT, err =>{
  if(err){
    console.log('Error: ', err);
  }
console.log(`Server listenig at PORT:${PORT}` );
})