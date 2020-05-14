const express = require('express')
const app = express()
// const mongoose = require('mongoose')
const bodyParser = require('body-parser')





app.use(bodyParser.json())


app.listen(8000, () => console.log('Express is listening on port 8000'))