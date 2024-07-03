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
  const userId = req.user.id;
  const userRole = req.user.role; // Assuming role is available on req.user

  let queryText;
  let queryParams = [];

  if (userRole === 2 ) {
      // Fetch all bookings for promoters
      queryText = `
          SELECT 
              "bookings"."id",
              "events"."event_name" AS "event_name",
              "events"."start_time" AS "start_time",
              "events"."date" AS "date",
              "promoter"."stage_name" AS "promoter_name",
              "dj"."stage_name" AS "dj_name",
              "bookings"."status"
          FROM "bookings"
          JOIN "events" ON "bookings"."event_id" = "events"."id"
          JOIN "user" AS "promoter" ON "events"."user_id" = "promoter"."id"
          JOIN "user" AS "dj" ON "bookings"."user_id" = "dj"."id"
          WHERE "promoter"."id" = $1
          ORDER BY "date";
      `;
      queryParams = [userId];
  } else {
      queryText = `
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
          ORDER BY "date";
      `;
      queryParams = [userId];
  }

  pool.query(queryText, queryParams)
      .then(result => {
          res.send(result.rows);
      })
      .catch(err => {
          console.error("error in BOOKING get", err);
          res.sendStatus(500);
      });
});


/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;

router.put('/:id', rejectUnauthenticated, (req, res) => {
  const bookingId = req.params.id;
  const status = req.body.status;
  const userId = req.user.id;
  const userRole = req.user.role;

  let queryText;
  let queryParams;

  if (userRole === 2) {
      // Promoter can update any booking
      queryText = `
          UPDATE "bookings" 
          SET "status" = $1 
          WHERE "id" = $2;
      `;
      queryParams = [status, bookingId];
  } else {
      // DJs can only update their own bookings
      queryText = `
          UPDATE "bookings" 
          SET "status" = $1 
          WHERE "id" = $2
          AND "user_id" = $3;
      `;
      queryParams = [status, bookingId, userId];
  }

  pool.query(queryText, queryParams)
      .then(result => res.sendStatus(200))
      .catch(err => {
          console.error("error changing Booking Status", err);
          res.sendStatus(500);
      });
});