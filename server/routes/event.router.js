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
    ARRAY_AGG(DISTINCT "dj"."stage_name") AS "djs",
    COALESCE("promoters"."stage_name", '') AS "promoter_name",
    COALESCE("promoters"."first_name", '') AS "promoter_first_name",
    COALESCE("promoters"."last_name", '') AS "promoter_last_name",
    COALESCE("promoters"."email", '') AS "promoter_email",
    COALESCE("promoters"."phone_num", '') AS "promoter_phone_num",
    ARRAY_AGG(DISTINCT "genres"."genre_name") AS "event_genres"
FROM 
    "events"
LEFT JOIN (
    SELECT 
        "events"."id" AS "event_id",
        "user"."stage_name"
    FROM 
        "bookings"
    JOIN 
        "user" ON "bookings"."user_id" = "user"."id" AND "user"."role" = 1
    JOIN 
        "events" ON "bookings"."event_id" = "events"."id"
) AS "dj" ON "events"."id" = "dj"."event_id"
LEFT JOIN 
    "events_genres" ON "events"."id" = "events_genres"."event_id"
LEFT JOIN 
    "genres" ON "events_genres"."genre_id" = "genres"."id"
LEFT JOIN 
    "user" AS "promoters" ON "events"."user_id" = "promoters"."id"
GROUP BY 
    "events"."id",
    "events"."event_name",
    "events"."location",
    "events"."date",
    "events"."start_time",
    "events"."end_time",
    "promoters"."stage_name",
    "promoters"."first_name",
    "promoters"."last_name",
    "promoters"."email",
    "promoters"."phone_num"
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
router.post('/', rejectUnauthenticated, async (req, res) => {
    const { name, location, date, start_time, end_time, genres, djs } = req.body;
    const userId = req.user.id;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const eventQueryText = `
            INSERT INTO "events" (user_id, event_name, location, date, start_time, end_time)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
        `;
        const eventResult = await client.query(eventQueryText, [userId, name, location, date, start_time, end_time]);
        const eventId = eventResult.rows[0].id;

        if (genres && genres.length > 0) {
            const genreQueryText = `
                INSERT INTO "events_genres" (event_id, genre_id)
                VALUES ($1, UNNEST($2::int[]))
            `;
            await client.query(genreQueryText, [eventId, genres]);
        }

        const bookingQueryText = `
            INSERT INTO "bookings" (event_id, user_id, status)
            VALUES ($1, $2, 'pending');
        `;
        for (const dj of djs) {
            await client.query(bookingQueryText, [eventId, dj.dj_id]);
        }

        await client.query('COMMIT');
        res.sendStatus(201);
    } catch (error) {
        console.error('Error creating event and bookings:', error);
        await client.query('ROLLBACK');
        res.sendStatus(500);
    } finally {
        client.release();
    }
});


router.get('/:id', rejectUnauthenticated, (req, res) => {
    const eventId = req.params.id
    const queryText = `
    SELECT 
    "events"."id" AS "event_id",
    "events"."event_name",
    "events"."location",
    "events"."date",
    "events"."start_time",
    "events"."end_time",
    ARRAY_AGG(DISTINCT "dj"."stage_name") AS "djs",
    COALESCE("promoters"."stage_name", '') AS "promoter_name",
    ARRAY_AGG(DISTINCT "genres"."genre_name") AS "event_genres"
FROM 
    "events"
LEFT JOIN (
    SELECT 
        "events"."id" AS "event_id",
        "user"."stage_name"
    FROM 
        "bookings"
    JOIN 
        "user" ON "bookings"."user_id" = "user"."id" AND "user"."role" = 1
    JOIN 
        "events" ON "bookings"."event_id" = "events"."id"
) AS "dj" ON "events"."id" = "dj"."event_id"
LEFT JOIN 
    "events_genres" ON "events"."id" = "events_genres"."event_id"
LEFT JOIN 
    "genres" ON "events_genres"."genre_id" = "genres"."id"
LEFT JOIN 
    "user" AS "promoters" ON "events"."user_id" = "promoters"."id"
WHERE "events"."id" = $1
GROUP BY 
    "events"."id",
    "events"."event_name",
    "events"."location",
    "events"."date",
    "events"."start_time",
    "events"."end_time",
    "promoters"."stage_name",
    "promoters"."first_name",
    "promoters"."last_name",
    "promoters"."email",
    "promoters"."phone_num";
    `
    pool.query(queryText, [eventId])
    .then(result => 
        res.send(result.rows[0])
    )   
    .catch(err => {
        console.error("error getting event details, for event ", eventId, err)
        res.sendStatus(500)
    })
})

module.exports = router;