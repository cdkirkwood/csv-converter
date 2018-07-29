'use strict'

const express = require('express')
const fs = require('fs')
const Papa = require('papaparse')

const app = express()
const port = 5000

//simple get route for the csv file
app.get('/api/csv', (req, res, next) => {
  //use fs.readFile to parse the csv file
  fs.readFile('./sample.csv', (err, data) => {
    if (err) next(err)
    //using papaparse to convert the contents of the csv file into json
    //and then sending the resulting json back to the client
    else res.json(Papa.parse(data.toString()).data)
  })
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

app.listen(port, () => console.log(`Listening on port ${port}`))