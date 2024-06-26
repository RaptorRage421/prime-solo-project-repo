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
WITH event_details AS (
    SELECT
        "user"."id" AS "dj_id",
        "user"."stage_name" AS "dj_stage_name",
        "user"."email" AS "dj_email",
        "user"."phone_num" AS "dj_phone_num",
        "user"."avatar_image" AS "dj_avatar_image",
        "user"."years_active" AS "dj_years_active",
        "events"."id" AS "event_id",
        "events"."event_name",
        "events"."date" AS "event_date",
        "events"."start_time",
        "promoters"."stage_name" AS "promoter_name",
        ARRAY_AGG(DISTINCT "event_genres"."genre_name") AS "event_genres"
    FROM
        "user"
    LEFT JOIN
        "bookings" ON "user"."id" = "bookings"."user_id" AND "bookings"."status" = 'confirmed'
    LEFT JOIN
        "events" ON "bookings"."event_id" = "events"."id"
    LEFT JOIN
        "user" AS "promoters" ON "events"."user_id" = "promoters"."id" AND "promoters"."role" = 2
    LEFT JOIN
        "events_genres" ON "events"."id" = "events_genres"."event_id"
    LEFT JOIN
        "genres" AS "event_genres" ON "events_genres"."genre_id" = "event_genres"."id"
    WHERE
        "user"."role" = 1 -- DJs
    GROUP BY
        "user"."id",
        "events"."id",
        "promoters"."stage_name"
)
SELECT
    "dj"."id" AS "dj_id",
    "dj"."stage_name" AS "dj_stage_name",
    "dj"."email" AS "dj_email",
    "dj"."phone_num" AS "dj_phone_num",
    "dj"."avatar_image" AS "dj_avatar_image",
    "dj"."years_active" AS "dj_years_active",
    ARRAY_AGG(DISTINCT "dj_genres"."genre_name") AS "dj_genres",
    ARRAY_AGG(json_build_object(
        'event_id', "event_details"."event_id",
        'event_name', "event_details"."event_name",
        'event_date', "event_details"."event_date",
        'start_time', "event_details"."start_time",
        'promoter_name', "event_details"."promoter_name",
        'event_genres', "event_details"."event_genres"
    )) AS "confirmed_events"
FROM
    "user" AS "dj"
LEFT JOIN
    "dj_genre" ON "dj"."id" = "dj_genre"."user_id"
LEFT JOIN
    "genres" AS "dj_genres" ON "dj_genre"."genre_id" = "dj_genres"."id"
LEFT JOIN
    event_details ON "dj"."id" = event_details.dj_id
WHERE
    "dj"."role" = 1 -- DJs
GROUP BY
    "dj"."id"
ORDER BY
    "dj"."stage_name" ASC;
    
    
    WITH event_details AS (
    SELECT
        "user"."id" AS "dj_id",
        "user"."stage_name" AS "dj_stage_name",
        "user"."email" AS "dj_email",
        "user"."phone_num" AS "dj_phone_num",
        "user"."avatar_image" AS "dj_avatar_image",
        "user"."years_active" AS "dj_years_active",
        "events"."id" AS "event_id",
        "events"."event_name",
        "events"."date" AS "event_date",
        "events"."start_time",
        "promoters"."stage_name" AS "promoter_name",
        ARRAY_AGG(DISTINCT "event_genres"."genre_name") AS "event_genres"
    FROM
        "user"
    LEFT JOIN
        "bookings" ON "user"."id" = "bookings"."user_id" AND "bookings"."status" = 'confirmed'
    LEFT JOIN
        "events" ON "bookings"."event_id" = "events"."id"
    LEFT JOIN
        "user" AS "promoters" ON "events"."user_id" = "promoters"."id" AND "promoters"."role" = 2
    LEFT JOIN
        "events_genres" ON "events"."id" = "events_genres"."event_id"
    LEFT JOIN
        "genres" AS "event_genres" ON "events_genres"."genre_id" = "event_genres"."id"
    WHERE
        "user"."role" = 1 -- DJs
    GROUP BY
        "user"."id",
        "events"."id",
        "promoters"."stage_name"
),
unique_event_details AS (
    SELECT DISTINCT ON ("dj_id", "event_id")
        "dj_id",
        "dj_stage_name",
        "dj_email",
        "dj_phone_num",
        "dj_avatar_image",
        "dj_years_active",
        "event_id",
        "event_name",
        "event_date",
        "start_time",
        "promoter_name",
        "event_genres"
    FROM
        event_details
)
SELECT
    "dj"."id" AS "dj_id",
    "dj"."stage_name" AS "dj_stage_name",
    "dj"."email" AS "dj_email",
    "dj"."phone_num" AS "dj_phone_num",
    "dj"."avatar_image" AS "dj_avatar_image",
    "dj"."years_active" AS "dj_years_active",
    ARRAY_AGG(DISTINCT "dj_genres"."genre_name") AS "dj_genres",
    ARRAY_AGG(json_build_object(
        'event_date', "unique_event_details"."event_date",
        'event_name', "unique_event_details"."event_name",
        'start_time', "unique_event_details"."start_time",
        'promoter_name', "unique_event_details"."promoter_name",
        'event_genres', "unique_event_details"."event_genres"
    )) AS "confirmed_events"
FROM
    "user" AS "dj"
LEFT JOIN
    "dj_genre" ON "dj"."id" = "dj_genre"."user_id"
LEFT JOIN
    "genres" AS "dj_genres" ON "dj_genre"."genre_id" = "dj_genres"."id"
LEFT JOIN
    unique_event_details ON "dj"."id" = unique_event_details.dj_id
WHERE
    "dj"."role" = 1 -- DJs
GROUP BY
    "dj"."id"
ORDER BY
    "dj"."stage_name" ASC;
`
pool.query(queryText)
.then(result => {
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
