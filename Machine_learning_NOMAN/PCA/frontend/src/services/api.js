import axios from 'axios'

const client = axios.create({ baseURL: 'http://127.0.0.1:5000', timeout: 30000 })

export default {
  getModelInfo: async () => {
    const { data } = await client.get('/model_info')
    return data
  },

  predictSingle: async (form) => {
    const { data } = await client.post('/get_prediction_of_heart', form)
    return data
  },

  predictBatch: async (rows) => {
    const { data } = await client.post('/batch_predict', { records: rows })
    return data
  }
}
