'use strict'

const express = require('express')
const fs = require('fs')
const Papa = require('papaparse')

const app = express()
const port = 5000

//simple get route for the csv file
app.get('/api/csv', (req, res) => {
  //use fs.readFile to parse the csv file
  fs.readFile('./sample.csv', (err, data) => {
    if (err) res.send(err)
    //using papaparse to convert the contents of the csv file into json
    //and then sending the resulting json back to the client
    else res.json(Papa.parse(data.toString()).data)
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`))