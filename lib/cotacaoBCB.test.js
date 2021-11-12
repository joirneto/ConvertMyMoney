const apiBCB = require('./cotacaoBCB')
const axios = require('axios');

jest.mock('axios')

test('getCotacaoAPI', ()=>{
  const res = {
    data: {
      value:[
        {cotacaoVenda: 3.90}
      ]
    }
  }
  axios.get.mockResolvedValue(res)
  apiBCB.getCotacaoApi('url').then(resp =>{
    expect(resp).toEqual(res)
    expect(axios.get.mock.calls[0][0]).toBe('url')
  })
})

test('extractCotacao',  ()=>{
  const cotacao = apiBCB.extractCotacao({
    data: {
      value:[
        {cotacaoVenda: 3.90}
      ]
    }
  })
  expect(cotacao).toBe(3.90)
})

describe('getToday', ()=>{
  const realDate = Date;

  function mockDate(date){
    global.Date = class extends realDate{
      constructor(){
        return new realDate(date)
      }
    }
  }

  afterEach(()=>{
    global.Date = realDate
  })

  test('getToday', ()=>{
    mockDate('2021-01-01T12:00:00z')
    const today = apiBCB.getToday()
    expect(today).toBe('1-1-2021')
  })
})

test('getUrl', ()=>{
  const url = apiBCB.getUrl('myUrl');
  expect(url).toBe("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='myUrl'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao")
})

test('getCotacao', ()=>{
  const res = {
    data: {
      value:[
        {cotacaoVenda: 3.90}
      ]
    }
  }

  const getToday = jest.fn()
  getToday.mockReturnValue('11-11-2021')

  const getUrl = jest.fn()
  getUrl.mockReturnValue('url')

  const getCotacaoApi = jest.fn()
  getCotacaoApi.mockResolvedValue(res)

  const extractCotacao = jest.fn()
  extractCotacao.mockReturnValue(3.9)

  apiBCB.pure.
    getCotacao({getToday, getUrl, getCotacaoApi, extractCotacao})()
    .then( res => {
      expect(res).toBe(3.9)
    })

})

test('getCotacao', ()=>{
  const res = {
    
  }

  const getToday = jest.fn()
  getToday.mockReturnValue('11-11-2021')

  const getUrl = jest.fn()
  getUrl.mockReturnValue('url')

  const getCotacaoApi = jest.fn()
  getCotacaoApi.mockReturnValue(Promise.reject('err'))

  const extractCotacao = jest.fn()
  extractCotacao.mockReturnValue(3.9)

  apiBCB.pure.
    getCotacao({getToday, getUrl, getCotacaoApi, extractCotacao})()
    .then( res => {
      expect(res).toBe('')
    })

})