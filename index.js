const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { dbURI, port } = require('./config/environment')
const bodyParser = require('body-parser')

const router = require('./config/routes')


mongoose.connect(dbURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
  },
  (err) => {
    if (err) return console.log(err)
    console.log('Mongo is Connected!')
  })


app.use(bodyParser.json())

app.use('/', router)


app.listen(port, () => console.log(`Express is listening on port ${port}`))