/**
 * Parses words from a (sentence) string to an array
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

const parseWords = (str) => {
  return str.trim().split(' ')
}

// Exports
module.exports = parseWords
