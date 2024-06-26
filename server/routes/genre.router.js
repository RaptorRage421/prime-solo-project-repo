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
router.post('/:id', rejectUnauthenticated, (req, res) => {
    const userId = req.params.id;
    const genres = req.body;
  
    const queryText = `
      INSERT INTO "dj_genre" ("genre_id", "user_id")
      VALUES ($1, $2)
    `;
  
    const queryPromises = genres.map((genreId) => {
      return pool.query(queryText, [genreId, userId]);
    });
  
    Promise.all(queryPromises)
      .then(() => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.error("error inserting genres into dj_genre", err);
        res.sendStatus(500);
      });
  });

module.exports = router;