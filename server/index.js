'use strict'

const express = require('express')
const fs = require('fs')
const Papa = require('papaparse')

const app = express()
const port = 5000

const config = {
	delimiter: "",	// auto-detect
	newline: "",	// auto-detect
	quoteChar: '',
	escapeChar: '',
	header: false,
	trimHeaders: false,
	dynamicTyping: false,
	preview: 0,
	encoding: "",
	worker: false,
	comments: false,
	step: undefined,
	complete: undefined,
	error: undefined,
	download: false,
	skipEmptyLines: false,
	chunk: undefined,
	fastMode: undefined,
	beforeFirstChunk: undefined,
	withCredentials: undefined,
	transform: undefined
}

//simple get route for the csv file
app.get('/api/csv', (req, res) => {
  //use fs.readFile to parse the csv file
  fs.readFile('./sample.csv', (err, data) => {
    if (err) res.send(err)
    //using papaparse to convert the contents of the csv file into json
    //and then sending the resulting json back to the client
    else res.json(Papa.parse(data.toString(), config).data)
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`))