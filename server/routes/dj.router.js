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
    (
        SELECT json_agg(json_build_object('id', "dj_genres"."id", 'genre_name', "dj_genres"."genre_name"))
        FROM (
            SELECT DISTINCT "genres"."id", "genres"."genre_name"
            FROM "dj_genre"
            JOIN "genres" ON "dj_genre"."genre_id" = "genres"."id"
            WHERE "dj_genre"."user_id" = "user"."id"
        ) AS "dj_genres"
    ) AS "dj_genres",
    (
        SELECT json_agg(json_build_object('id', "distinct_events"."id", 'event_name', "distinct_events"."event_name", 'event_date', "distinct_events"."date"))
        FROM (
            SELECT DISTINCT
                "events"."id",
                "events"."event_name",
                "events"."date"
            FROM
                "events"
            JOIN
                "bookings" ON "events"."id" = "bookings"."event_id"
            WHERE
                "bookings"."user_id" = "user"."id" AND "bookings"."status" = 'Confirmed'
        ) AS "distinct_events"
    ) AS "confirmed_events"
FROM
    "user"
WHERE
    "user"."role" = 1
GROUP BY
    "user"."id", "user"."stage_name", "user"."username", "user"."email", "user"."phone_num", 
    "user"."avatar_image", "user"."years_active"
ORDER BY
    "user"."stage_name" ASC;


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

router.post('/by-genres', rejectUnauthenticated, (req, res) => {
    const { genres } = req.body;
    const queryText = `
       SELECT 
      "user".id AS dj_id, 
      "user".username AS dj_username,
      "user".stage_name AS dj_stage_name,
      "user".email AS dj_email,
      "user".phone_num AS dj_phone_num,
      "user".avatar_image AS dj_avatar_image,
      "user".years_active AS dj_years_active,
      ARRAY_AGG(DISTINCT "genres".genre_name) AS dj_genres
    FROM "user"
    JOIN "dj_genre" ON "user".id = "dj_genre".user_id
    JOIN "genres" ON "dj_genre".genre_id = "genres".id
    WHERE "dj_genre".genre_id = ANY($1::int[]) AND "user".role = 1
    GROUP BY "user".id
    `;
  
    pool.query(queryText, [genres])
      .then(result => res.send(result.rows))
      .catch(err => {
        console.error('Error fetching DJs by genres:', err);
        res.sendStatus(500);
      });
  });

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const userId = req.params.id
    const queryText = `
    SELECT
    "user"."id" AS "dj_id",
    "user"."stage_name" AS "dj_stage_name",
    "user"."username" AS "dj_username",
    "user"."email" AS "dj_email",
    "user"."phone_num" AS "dj_phone_num",
    "user"."avatar_image" AS "dj_avatar_image",
    "user"."years_active" AS "dj_years_active",
    "user"."bio" AS "dj_bio",
    "user"."website" AS "dj_link",
    ARRAY_AGG(json_build_object('id', "genres"."id", 'genre_name', "genres"."genre_name")) AS "dj_genres",
    (
        SELECT ARRAY_AGG(json_build_object(
            'event_name', "distinct_events"."event_name",
            'event_date', "distinct_events"."date",
            'event_location', "distinct_events"."location",
            'event_start_time', "distinct_events"."start_time"
        ))
        FROM (
            SELECT DISTINCT
                "events"."event_name",
                "events"."date",
                "events"."location",
                "events"."start_time"
            FROM
                "events"
            JOIN
                "bookings" ON "events"."id" = "bookings"."event_id"
            WHERE
                "bookings"."user_id" = "user"."id" AND "bookings"."status" = 'Confirmed'
        ) AS "distinct_events"
    ) AS "confirmed_events"
FROM
    "user"
LEFT JOIN
    "dj_genre" ON "user"."id" = "dj_genre"."user_id"
LEFT JOIN
    "genres" ON "dj_genre"."genre_id" = "genres"."id"
WHERE
    "user"."id" = $1 AND "user"."role" = 1
GROUP BY
    "user"."id";

    `
pool.query(queryText, [userId])
.then(result => 
    res.send(result.rows[0])
)
.catch(err => {
    console.error("error getting DJ Details for User", userId, err)
})
})

module.exports = router;
