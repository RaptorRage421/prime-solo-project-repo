const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
const queryText = `
SELECT * FROM "genres" 
ORDER BY "genre_name"
`

pool.query(queryText)
.then(result => {
    res.send(result.rows)
})
.catch(err => {
    console.error("error getting genres query", err, queryText)
})
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;