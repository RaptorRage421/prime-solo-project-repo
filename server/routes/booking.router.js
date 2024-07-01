const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const router = express.Router();


/**
 * GET route template
 */
router.get('/', rejectUnauthenticated ,(req, res) => {
  // GET route code here
  const userId = req.user.id
  const queryText = `
  SELECT * FROM "bookings"
  WHERE "user_id" = $1
  `

  pool.query(queryText, [userId])
  .then(result => {
    res.send(result.rows)
  })
  .catch(err => {
    console.error("error in BOOKING get", err)
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
