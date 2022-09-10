
import axios from "axios"
import https from "https"

const dotenv = require('dotenv').config()

axios.defaults.httpAgent = new https.Agent({
    rejectUnauthorized : true
})
export const Api = axios.create({
    baseURL: process.env.API_URL
});