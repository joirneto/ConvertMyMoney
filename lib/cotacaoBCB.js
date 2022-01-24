const axios = require('axios');
const moment = require('moment');
const ehDiaUtil = require('@lfreneda/eh-dia-util');

const getToday = () =>{
  let diaUtil = moment().format('MM-DD-YYYY')
  let diaUtilFormat = moment().format('YYYY-MM-DD')
  if(ehDiaUtil(diaUtilFormat)){
    return {diaUtil,diaUtilFormat}
  }
  else{
    for(let i=1;i>0;i++){ 
      diaUtil = moment().subtract(i, 'days').format('YYYY-MM-DD')
      if(ehDiaUtil(diaUtil)){
        diaUtil = moment().subtract(i, 'days').format('MM-DD-YYYY')
        diaUtilFormat = moment().subtract(i, 'days').format('DD-MM-YYYY')
        return {diaUtil,diaUtilFormat}
      }
    }
  }
}

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoApi = url => axios.get(url)

const extractCotacao = res => res.data.value[0].cotacaoVenda
    
const getCotacao = ({getToday, getUrl, getCotacaoApi, extractCotacao}) => async () =>{
  const {diaUtil, diaUtilFormat} = getToday(); 
  let cotacao = ''
  try {  
    const url = getUrl(diaUtil);
    const res = await getCotacaoApi(url)
    cotacao = extractCotacao(res)
    return {cotacao, diaUtilFormat}
  } catch (error) {
    return {cotacao, diaUtilFormat}
    
  }
  
}

module.exports = {
  getUrl,
  extractCotacao,
  getCotacao: getCotacao({getToday, getUrl, getCotacaoApi, extractCotacao}),
  getCotacaoApi,
  getToday,
  pure:{
    getCotacao
  }
}



