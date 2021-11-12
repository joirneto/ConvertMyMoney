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