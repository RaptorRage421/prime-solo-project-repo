const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const router = express.Router();
const sendEmail = require('../modules/sendGrid');


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



router.put('/:id', rejectUnauthenticated, async (req, res) => {
  const bookingId = req.params.id;
  const status = req.body.status;
  const userId = req.user.id;

  const client = await pool.connect();

  try {
      await client.query('BEGIN');

      // Update booking status
      const queryText = `
          UPDATE "bookings" 
          SET "status" = $1 
          WHERE "id" = $2
          AND "user_id" = $3;
      `;
      const queryParams = [status, bookingId, userId];
      await client.query(queryText, queryParams);

      // Fetch event and promoter details
      const eventQueryText = `
          SELECT 
    "events"."event_name",
    "events"."date",
    "events"."start_time",
    "events"."location",
    "promoters"."email" AS "promoter_email",
    "promoters"."stage_name" AS "promoter_stage_name",
    "dj"."stage_name" AS "dj_stage_name"
FROM "bookings"
JOIN "events" ON "bookings"."event_id" = "events"."id"
JOIN "user" AS "promoters" ON "events"."user_id" = "promoters"."id"
JOIN "user" AS "dj" ON "bookings"."user_id" = "dj"."id" 
WHERE "bookings"."id" = $1;
      `;
      const eventResult = await client.query(eventQueryText, [bookingId]);
      const event = eventResult.rows[0];

      if (!event) {
          throw new Error('Event not found for the booking.');
      }

      // Send email to promoter if status is "confirmed" or "declined"
      if (status === 'Confirmed' || status === 'Declined') {
        const formatDate = (date) => {
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
      }
          const emailSubject = `DJ Booking Status Updated: ${event.event_name}`;
          const emailText = `Dear ${event.promoter_stage_name},\n\nThe booking status of ${event.dj_stage_name} for the event "${event.event_name}" on ${formatDate(event.date)} at ${event.location} has been updated to "${status}".\n\nBest Regards,\nYour Event Team`;

          await sendEmail(event.promoter_email, emailSubject, emailText);
      }

      await client.query('COMMIT');
      res.sendStatus(200);
  } catch (error) {
      console.error('Error updating booking status:', error);
      await client.query('ROLLBACK');
      res.sendStatus(500);
  } finally {
      client.release();
  }
});

module.exports = router;