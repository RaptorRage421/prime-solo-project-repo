const express = require('express');
const pool = require('../modules/pool');
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */
router.get('/',rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = `
  SELECT
    "events"."id" AS "event_id",
    "events"."event_name",
    "events"."location",
    "events"."date",
    "events"."start_time",
    "events"."end_time",
    "user"."stage_name" AS "dj_stage_name",
    "user"."email" AS "dj_email",
    "user"."phone_num" AS "dj_phone_num",
    "user"."avatar_image" AS "dj_avatar_image",
    "bookings"."status" AS "booking_status",
    "promoters"."stage_name" AS "promoter_username",
    "promoters"."first_name" AS "promoter_first_name",
    "promoters"."last_name" AS "promoter_last_name",
    "promoters"."email" AS "promoter_email",
    "promoters"."phone_num" AS "promoter_phone_num",
    ARRAY_AGG(DISTINCT "genres"."genre_name") AS "event_genres"
FROM
    "events"
JOIN
    "events_genres" ON "events"."id" = "events_genres"."event_id"
JOIN
    "genres" ON "events_genres"."genre_id" = "genres"."id"
LEFT JOIN
    "bookings" ON "events"."id" = "bookings"."event_id"
LEFT JOIN
    "user" ON "bookings"."user_id" = "user"."id" AND "user"."role" = 1 -- DJs
LEFT JOIN
    "user" AS "promoters" ON "events"."user_id" = "promoters"."id" AND "promoters"."role" = 2 -- Promoters
GROUP BY
    "events"."id",
    "events"."event_name",
    "events"."location",
    "events"."date",
    "events"."start_time",
    "events"."end_time",
    "user"."id", -- Group by user id to avoid aggregation issues
    "bookings"."status",
    "promoters"."id"
ORDER BY
    "events"."date" ASC;
  `
  pool.query(queryText)
.then(result => {
    res.send(result.rows)
}).catch(err => {
    console.error("error getting Event details", err)
})
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;