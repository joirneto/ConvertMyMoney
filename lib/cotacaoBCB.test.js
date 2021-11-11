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
    console.log(axios.get.mock.calls[0][0])
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