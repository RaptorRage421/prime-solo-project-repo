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
    SELECT 
    "bookings"."id",
    "events"."event_name" AS "event_name",
    "events"."date" AS "date",
    "promoter"."stage_name" AS "promoter_name",
    "dj"."stage_name" AS "dj_name",
    "bookings"."status"
  

  FROM "bookings"
  JOIN "events" ON "bookings"."event_id" = "events"."id"
  JOIN "user" AS "promoter" ON "events"."user_id" = "promoter"."id"
  JOIN "user" AS "dj" ON "bookings"."user_id" = "dj"."id"
  WHERE "bookings"."user_id" = $1
  ORDER BY "date"

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