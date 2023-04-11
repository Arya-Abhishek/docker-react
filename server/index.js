const keys = require('./keys')

// Express App Setup
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Postgres client setup
const {pool} = require('pg')
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost, 
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
})

// pgClient.on('error', () => console.log('Lost PG connection'))                This will throw, error since before creating a connection, we are creating a table

// pgClient.query('CREATE TABLE IF NOT EXISTS values(number INT)')
//     .catch((err) => console.log(err))

pgClient.on("connect", (client) => {
    client
      .query("CREATE TABLE IF NOT EXISTS values (number INT)")
      .catch((err) => console.error(err));
  });