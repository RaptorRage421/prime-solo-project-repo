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
  // GET route code here
const queryText = `
SELECT * FROM "genres" 
ORDER BY "genre_name"
`

pool.query(queryText)
.then(result => {
    res.send(result.rows)
})
.catch(err => {
    console.error("error getting genres query", err, queryText)
})
});

/**
 * POST route template
 */
router.post('/:id', rejectUnauthenticated, async (req, res) => {
  const userId = req.params.id
  const genres = req.body
  
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const queryText = `
      INSERT INTO "dj_genre" ("genre_id", "user_id")
      VALUES ($1, $2)
    `;

    for (const genreId of genres) {
      await client.query(queryText, [genreId, userId])
    }

    await client.query('COMMIT');
    res.sendStatus(201);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("error inserting genres into dj_genre", err)
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

router.delete('/:userId/:genreId', rejectUnauthenticated, (req, res) => {
  const userId = req.params.userId
  const genreId = req.params.genreId

  const queryText = `
    DELETE FROM "dj_genre"
    WHERE "user_id" = $1 AND "genre_id" = $2
  `;

  pool.query(queryText, [userId, genreId])
    .then(() => {
      res.sendStatus(204)
    })
    .catch(err => {
      console.error('Error deleting genre:', err)
      res.sendStatus(500)
    });
});

router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
    INSERT INTO "genres" ("genre_name")
    VALUES ($1)
  `;

  pool.query(queryText, [req.body.genre_name])
    .then(() => {
      res.sendStatus(201)
    })
    .catch(err => {
      console.error('Error adding genre:', err)
      res.sendStatus(500)
    });
});

module.exports = router;