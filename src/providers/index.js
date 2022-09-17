import axios from 'axios'
import ENVs from './env.json'

export const RebootApi = axios.create({
  baseURL: ENVs.API_URL,
})
