// recommend.js
require('dotenv').config();
const axios = require('axios');

async function recommendArticle(articleID) {
  const airtableBaseId = process.env.AIRTABLE_BASE_ID;
  const airtableApiKey = process.env.AIRTABLE_API_KEY;
  const airtableTableName = process.env.AIRTABLE_TABLE_NAME;

  const recordURL = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`;

  // Chercher le record avec l'articleID spécifique
  const filterFormula = `filterByFormula=articleID='${articleID}'`;
  const url = `${recordURL}?${filterFormula}`;

  try {
    // Vérifiez si un enregistrement existe pour cet articleID
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
    });

    if (response.data.records.length > 0) {
      // Si l'article existe déjà, mettez à jour la recommandation
      const recordId = response.data.records[0].id;
      const currentRecommendations = response.data.records[0].fields.Recommendations || 0;

      await axios.patch(
        `${recordURL}/${recordId}`,
        {
          fields: {
            Recommendations: currentRecommendations + 1,
            "Last-Recommended-By": "Un utilisateur unique",
            "Date of Last Recommendation": new Date().toISOString(),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${airtableApiKey}`,
          },
        }
      );
    } else {
      // Si l'article n'existe pas, créez un nouvel enregistrement
      await axios.post(
        recordURL,
        {
          fields: {
            articleID: articleID,
            Recommendations: 1,
            "Last-Recommended-By": "Un utilisateur unique",
            "Date of Last Recommendation": new Date().toISOString(),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${airtableApiKey}`,
          },
        }
      );
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la recommandation:", error);
  }
}

module.exports = { recommendArticle };
