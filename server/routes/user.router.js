const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
  res.send(req.user)
});


router.put('/:id', rejectUnauthenticated, (req, res) => {
  const { first_name, last_name, stage_name, avatar_image, years_active, bio, website, email, phone_num } = req.body
  const userId = req.user.id

  const fields = {
    first_name,
    last_name,
    stage_name,
    avatar_image,
    years_active,
    bio,
    website,
    email,
    phone_num
  }

  const buildQuery = []
  const queryParams = [userId]

  Object.keys(fields).forEach((key, index) => {
    if (fields[key] !== undefined) {
      queryParams.push(fields[key])
      buildQuery.push(`"${key}" = $${queryParams.length}`)
    }
  })

  if (buildQuery.length === 0) {
    res.status(400).send('No valid fields to update')
    return
  }

  const queryText = `
    UPDATE "user"
    SET ${buildQuery.join(', ')}
    WHERE "id" = $1;
  `

  pool.query(queryText, queryParams)
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.error("Error updating user info", err);
      res.sendStatus(500);
    })
})



// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  

  

  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password, role, email, phone_num)
    VALUES ($1, $2, $3, $4, $5)`

  pool.query(queryText, [req.body.username, password, req.body.role, req.body.email, req.body.phone_num])
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.error('Error registering user:', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  // console.log(req.user)
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res, next) => {
  // Use passport's built-in method to log out the user
  req.logout((err) => {
    if (err) { return next(err); }
    res.sendStatus(200);
  });
});

module.exports = router;
