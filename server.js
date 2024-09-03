require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err.stack);
    return;
  }
  console.log('Connecté à MySQL en tant que ID ' + connection.threadId);
});

app.use(express.json());

// Route pour récupérer le nombre de recommandations
app.get('/api/recommendations/:articleID', (req, res) => {
  const { articleID } = req.params;
  connection.query(
    'SELECT Recommendations FROM reco WHERE articleID = ?',
    [articleID],
    (error, results) => {
      if (error) return res.status(500).json({ error });
      res.json({ recommendations: results.length > 0 ? results[0].Recommendations : 0 });
    }
  );
});

// Route pour mettre à jour les recommandations
app.post('/api/recommendations', (req, res) => {
  const { articleID, recommendCount } = req.body;
  const dateNow = new Date().toISOString().split('T')[0];

  connection.query(
    'SELECT * FROM reco WHERE articleID = ?',
    [articleID],
    (error, results) => {
      if (error) return res.status(500).json({ error });

      if (results.length > 0) {
        // Update existing record
        connection.query(
          'UPDATE reco SET Recommendations = ?, `Last-Recommended-By` = ?, `Date of Last Recommendation` = ? WHERE articleID = ?',
          [recommendCount, 'Un utilisateur unique', dateNow, articleID],
          (updateError) => {
            if (updateError) return res.status(500).json({ error: updateError });
            res.json({ message: 'Recommendation updated' });
          }
        );
      } else {
        // Insert new record
        connection.query(
          'INSERT INTO reco (articleID, Recommendations, `Last-Recommended-By`, `Date of Last Recommendation`) VALUES (?, ?, ?, ?)',
          [articleID, recommendCount, 'Un utilisateur unique', dateNow],
          (insertError) => {
            if (insertError) return res.status(500).json({ error: insertError });
            res.json({ message: 'Recommendation created' });
          }
        );
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
