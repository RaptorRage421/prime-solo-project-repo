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

router.put('/:id', rejectUnauthenticated, (req, res) => {
    const bookingId = req.params.id
    const status = req.body.status
    const userId = req.user.id
    const queryText = `
    UPDATE "bookings" 
    SET "status" = $1 
    WHERE "id" = $2
    AND "user_id" = $3;
    `
    pool.query(queryText, [status, bookingId, userId])
    .then(result => res.sendStatus(200))
    .catch(err => {
        console.error("error changing Booking Status", err)
        res.sendStatus(500)
    })
})