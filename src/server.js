const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

app.get('/api/recommendation', async (req, res) => {
  const { articleID } = req.query;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT Recommendations FROM reco WHERE articleID = ?', [articleID]);
    await connection.end();

    if (rows.length > 0) {
      res.json({ recommendations: rows[0].Recommendations });
    } else {
      res.json({ recommendations: 0 });
    }
  } catch (error) {
    console.error('Error fetching recommendation count:', error);
    res.status(500).send('Server error');
  }
});

app.post('/api/recommendation', async (req, res) => {
  const { articleID, recommendations } = req.body;
  const dateNow = new Date().toISOString().split('T')[0];

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute('SELECT * FROM reco WHERE articleID = ?', [articleID]);

    if (rows.length > 0) {
      await connection.execute(
        'UPDATE reco SET Recommendations = ?, `Last-Recommended-By` = ?, `Date of Last Recommendation` = ? WHERE articleID = ?',
        [recommendations, 'Un utilisateur unique', dateNow, articleID]
      );
    } else {
      await connection.execute(
        'INSERT INTO reco (Recommendations, `Last-Recommended-By`, `Date of Last Recommendation`, articleID) VALUES (?, ?, ?, ?)',
        [recommendations, 'Un utilisateur unique', dateNow, articleID]
      );
    }

    await connection.end();
    res.status(200).send('Recommendation updated');
  } catch (error) {
    console.error('Error updating recommendation:', error);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
