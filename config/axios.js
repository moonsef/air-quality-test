const axios = require('axios').default;

require('dotenv').config()

const instance = axios.create({
    baseURL: process.env.IQAIR_API_URL,
    headers: {'Content-Type': 'application/json'}
})

module.exports = instance;