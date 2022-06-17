const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')

app.use(express.static(path.join(__dirname, '../../dist')))

app.get('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/index.html'))
})

app.listen(process.env.PORT, console.log('Server up'))