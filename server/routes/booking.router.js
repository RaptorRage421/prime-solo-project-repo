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
  const userId = req.user.id
  const userRole = req.user.role

  let queryText
  let queryParams = [userId]

  if (userRole === 2) {
    // Fetch all bookings for promoters
    queryText = `
      SELECT 
          "bookings"."id",
          "events"."event_name" AS "event_name",
          "events"."start_time" AS "start_time",
          "events"."date" AS "date",
          "promoter"."stage_name" AS "promoter_name",
          "dj"."id" AS "dj_id",
          "dj"."stage_name" AS "dj_name",
          "bookings"."status"
      FROM "bookings"
      JOIN "events" ON "bookings"."event_id" = "events"."id"
      JOIN "user" AS "promoter" ON "events"."user_id" = "promoter"."id"
      JOIN "user" AS "dj" ON "bookings"."user_id" = "dj"."id"
      WHERE "promoter"."id" = $1
      ORDER BY "date";
    `;
  } else if (userRole === 1) {
    // Fetch all bookings for DJs who are also promoters
    queryText = `
      SELECT 
          "bookings"."id",
          "events"."id" AS "event_id",
          "events"."event_name" AS "event_name",
          "events"."start_time" AS "start_time",
          "events"."date" AS "date",
          "promoter"."stage_name" AS "promoter_name",
          "dj"."id" AS "dj_id",
          "dj"."stage_name" AS "dj_name",
          "bookings"."status"
      FROM "bookings"
      JOIN "events" ON "bookings"."event_id" = "events"."id"
      JOIN "user" AS "promoter" ON "events"."user_id" = "promoter"."id"
      JOIN "user" AS "dj" ON "bookings"."user_id" = "dj"."id"
      WHERE "promoter"."id" = $1 OR "dj"."id" = $1
      ORDER BY "date";
    `;
  }

  pool.query(queryText, queryParams)
    .then(result => {
      res.send(result.rows)
    })
    .catch(err => {
      console.error("error in BOOKING get", err)
      res.sendStatus(500)
    })
})


/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});



router.put('/:id', rejectUnauthenticated, async (req, res) => {
  const bookingId = req.params.id
  const status = req.body.status
  const userId = req.user.id
  const userRole = req.user.role

  const client = await pool.connect();

  try {
    await client.query('BEGIN')

    // Update booking status
    const queryText = `
          UPDATE "bookings" 
          SET "status" = $1 
          WHERE "id" = $2;
      `;
    const queryParams = [status, bookingId];
    await client.query(queryText, queryParams);

    // Fetch event and promoter details
//     const eventQueryText = `
//           SELECT 
//     "events"."event_name",
//     "events"."date",
//     "events"."start_time",
//     "events"."location",
//     "promoters"."email" AS "promoter_email",
//     "promoters"."stage_name" AS "promoter_stage_name",
//     "dj"."stage_name" AS "dj_stage_name"
// FROM "bookings"
// JOIN "events" ON "bookings"."event_id" = "events"."id"
// JOIN "user" AS "promoters" ON "events"."user_id" = "promoters"."id"
// JOIN "user" AS "dj" ON "bookings"."user_id" = "dj"."id" 
// WHERE "bookings"."id" = $1;
//       `;
//     const eventResult = await client.query(eventQueryText, [bookingId]);
//     const event = eventResult.rows[0]

//     // Send email to promoter if status is "Confirmed" or "Declined"
//     if (status === 'Confirmed' || status === 'Declined') {
//       const formatDate = (date) => {
//         const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'  };
//         return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
//       }
//       const formatTime = (time) => {
//         if (!time) return '';
//         const [hours, minutes] = time.split(':');
//         const formattedHours = parseInt(hours) % 12 || 12;
//         const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
//         return `${formattedHours}:${minutes} ${ampm}`;
//     }
//       const emailSubject = `DJ ${event.dj_stage_name} Booking Status Updated for ${event.event_name}`
//       const emailText = `
//           <div style="font-family: Arial, sans-serif; line-height: 1.5;">
//       <p>Hi, ${event.promoter_stage_name}!</p>
//       <p><strong>Event:</strong> ${event.event_name}</p>
//       <p><strong>Date:</strong> ${formatDate(event.date)}</p>
//       <p><strong>Location:</strong> ${event.location}</p>
//       <p><strong>Start Time:</strong> ${formatTime(event.start_time)}</p>
//       <p>DJ ${event.dj_stage_name} updated their status!</p>
//       <p><strong ">Status:</strong> <strong style="font-size: 30px;">${status}<strong></p>
//       <br>
//       <p style="font-size: 14;">Best Regards,</p>
//       <p><strong>PromoDex Dev Team</strong></p>
//     </div>
//     `

//       await sendEmail(event.promoter_email, emailSubject, emailText)
//     }

    await client.query('COMMIT')
    res.sendStatus(200)
  } catch (error) {
    console.error('Error updating booking status:', error)
    await client.query('ROLLBACK')
    res.sendStatus(500)
  } finally {
    client.release()
  }
});

module.exports = router;