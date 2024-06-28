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
    ARRAY_AGG(json_build_object('id', "genres"."id", 'genre_name', "genres"."genre_name")) AS "dj_genres",
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

  router.get('/all', rejectUnauthenticated, (req, res) => {
    const queryText = `
        SELECT 
            "user".id AS "dj_id",
            "user".stage_name AS "dj_stage_name",
            "user".username AS "dj_username",
            "user".email AS "dj_email",
            "user".phone_num AS "dj_phone_num",
            "user".avatar_image AS "dj_avatar_image",
            "user".years_active AS "dj_years_active",
            ARRAY_AGG(DISTINCT "genres".genre_name) AS "dj_genres"
        FROM "user"
        LEFT JOIN "dj_genre" ON "user".id = "dj_genre".user_id
        LEFT JOIN "genres" ON "dj_genre".genre_id = "genres".id
        WHERE "user".role = 1
        GROUP BY "user".id
        ORDER BY "user".stage_name ASC;
    `;
    pool.query(queryText)
        .then(result => res.send(result.rows))
        .catch(err => {
            console.error('Error fetching DJs:', err);
            res.sendStatus(500);
        });
});

module.exports = router;
