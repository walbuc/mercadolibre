const express = require('express')
const app = require('./server/server')

app.use(express.static('client/build'))

const path = require('path')
app.get('*', (req, res) => {
  res.sendFile(path.resolve('client', 'build', 'index.html'))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT)
})
