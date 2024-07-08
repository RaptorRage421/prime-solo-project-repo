const express = require('express');
const multer = require('multer');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// Set up Multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Create the uploads directory if it doesn't exist
const fs = require('fs');
const dir = './uploads';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}


// POST route for uploading multiple files
router.post('/uploads', rejectUnauthenticated, upload.array('files', 10), async (req, res) => {
    const userId = req.user.id;
    const files = req.files;
  
    const client = await pool.connect();
  
    try {
      await client.query('BEGIN');
  
      const queryText = `INSERT INTO "photo_gallery" (user_id, photo_url) VALUES ($1, $2) RETURNING id`;
  
      const filePromises = files.map(file => {
        const photoUrl = `/uploads/${file.filename}`;
        return client.query(queryText, [userId, photoUrl]);
      });
  
      const results = await Promise.all(filePromises);
  
      await client.query('COMMIT');
      
      const ids = results.map(result => result.rows[0].id);
      res.status(201).json({ ids, files });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error uploading files', error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  });
  

// GET route for retrieving user photos
router.get('/photos/:id', rejectUnauthenticated, (req, res) => {
  const userId = req.params.id;

  const queryText = `SELECT * FROM "photo_gallery" WHERE user_id = $1`;
  pool.query(queryText, [userId])
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error('Error retrieving photos', err);
      res.sendStatus(500);
    });
});

module.exports = router;
