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
const queryText = `
SELECT
    "user"."id" AS "dj_id",
    "user"."stage_name" AS "dj_stage_name",
    "user"."username" AS "dj_username",
    "user"."email" AS "dj_email",
    "user"."phone_num" AS "dj_phone_num",
    "user"."avatar_image" AS "dj_avatar_image",
    "user"."years_active" AS "dj_years_active",
    ARRAY_AGG(DISTINCT "genres"."genre_name") AS "dj_genres",
    ARRAY_AGG(DISTINCT "events"."event_name") FILTER (WHERE "bookings"."status" = 'confirmed') AS "confirmed_events"
FROM
    "user"
LEFT JOIN
    "dj_genre" ON "user"."id" = "dj_genre"."user_id"
LEFT JOIN
    "genres" ON "dj_genre"."genre_id" = "genres"."id"
LEFT JOIN
    "bookings" ON "user"."id" = "bookings"."user_id" AND "bookings"."status" = 'confirmed'
LEFT JOIN
    "events" ON "bookings"."event_id" = "events"."id"
WHERE
    "user"."role" = 1  -- DJs
GROUP BY
    "user"."id"
ORDER BY
    "user"."stage_name" ASC;
`
pool.query(queryText)
.then(result => {
    console.log("Query Result: ", result.rows);
    res.send(result.rows)
}).catch(err => {
    console.error("error in this crazy ass query", err)
})
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
