/**
 * Database config
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

const mysql = require('mysql')
require('dotenv').config()

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'movie_guru'
})

con.connect(function (err) {
  if (err) throw err
  console.log('Database connected')
})

module.exports = con
