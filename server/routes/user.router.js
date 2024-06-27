const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // console.log(req.user)
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});


router.put('/:id', rejectUnauthenticated, (req, res) => {
  const { first_name, last_name, stage_name, avatar_image, years_active } = req.body;
  const userId = req.user.id;
  const queryText = `
    UPDATE "user" 
    SET "first_name" = $1, "last_name" = $2, "stage_name" = $3, "avatar_image" = $4, "years_active" = $5
    WHERE "id" = $6
  `;
  
  pool.query(queryText, [first_name, last_name, stage_name, avatar_image, years_active, userId])
    .then(() => res.sendStatus(201))
    .catch(err => {
      console.error("error updating user info", err);
      res.sendStatus(500);
    });
});



// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  

  

  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password, role, email, phone_num)
    VALUES ($1, $2, $3, $4, $5)`;

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
  console.log(req.user)
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
