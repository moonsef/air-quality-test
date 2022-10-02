const express = require('express');
const app = express()

require('dotenv').config()


app.listen(process.env.APP_PORT, () => {
    console.log(`The server is up and running on port ${process.env.APP_PORT}`)
});



