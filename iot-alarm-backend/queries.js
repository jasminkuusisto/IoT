/*
 * This file contains the code for querying data from the database
 */


// Connect to the database
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'IoT',
  password: 'mattiTAHTOO1',
  port: 5433,
})

// Get all the records
const getRecords = (request, response) => {
    pool.query('SELECT * FROM Records ORDER BY date ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

// Filter records by time
const getRecordsByTime = (request, response) => {
  const startTime = request.params.startTime
  const endTime = request.params.endTime

  pool.query('SELECT * FROM Records WHERE date > $1 and date < $2', [startTime, endTime], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Add a new record
const createRecord = (request, response) => {
  const { date } = request.body;
  const description = 'New alarm in room x from device y';

  pool.query('INSERT INTO Records (date, description) VALUES ($1, $2)', [date, description], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`A new record is created.`);
  });
}

// Export database functions
module.exports = {
  getRecords,
  getRecordsByTime,
  createRecord
}