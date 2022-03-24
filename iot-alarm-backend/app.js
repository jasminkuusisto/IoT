const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

/**** Routing ****/

// Root
app.get('/', (req, res) => {
  res.send('IoT application!')
})

// Get all records
app.get('/records', db.getRecords)

// Get records that happened after startTime but before endTime
app.get('/records/:startTime&:endTime', db.getRecordsByTime)

// Add a new record to the database
app.post('/records', db.createRecord)

app.listen(port, () => {
  console.log(`IoT application is listening on port ${port}`)
})
