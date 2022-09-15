import axios from 'axios'

export const RebootApi = axios.create({
  baseURL: 'http://localhost:1009/api/v1',
})
