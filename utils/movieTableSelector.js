/**
 * Calculates which table or view a users movie
 * query results should be taken from
 *
 * @author Niall Thurrat
 * @version 1.0.0
 * @credits getAge func written on stack overflow by André Snede Kock at....
 * https://stackoverflow.com/questions/4060004/
 * calculate-age-given-the-birth-date-in-the-format-yyyymmdd
 */

'use strict'

/**
 * Selects movie table/view based on a users birthday
 *
 * @param {date} birthday
 * @returns {string} table - a movie table/view from db
 */
const movieTable = (birthday) => {
  const age = getAge(birthday)
  let table

  if (age < 15) {
    table = 'under_15_movies'
  } else if (age >= 15 && age < 18) {
    table = 'under_18_movies'
  } else {
    table = 'movies'
  }

  return table
}

/**
 * Gets someones age based on their date of birth.
 *
 * @param {date} birthday
 */
function getAge (birthday) {
  var ageDifMs = Date.now() - birthday.getTime()
  var ageDate = new Date(ageDifMs) // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

// Exports
module.exports = movieTable
