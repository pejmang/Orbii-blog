    // Injected Airtable credentials
    const AIRTABLE_BASE_ID = '{{ env.AIRTABLE_BASE_ID }}';
    const AIRTABLE_API_KEY = '{{ env.AIRTABLE_API_KEY }}';
    const AIRTABLE_TABLE_NAME = '{{ env.AIRTABLE_TABLE_NAME }}';

    document.addEventListener('DOMContentLoaded', async () => {
      const likedArticles = JSON.parse(localStorage.getItem('likedArticles')) || [];
      const postCards = document.querySelectorAll('.post-card');

      for (const card of postCards) {
        const articleID = card.dataset.postId;
        const button = card.querySelector('.recommend-flag');
        const recommendCountElement = button.querySelector('.recommend-count');

        try {
          const response = await fetchRecommendationCount(articleID);
          if (response) {
            const totalRecommendations = response.fields.Recommendations || 0;
            recommendCountElement.textContent = totalRecommendations;
            if (likedArticles.includes(articleID)) {
              button.classList.add('already-recommended');
            }
          } else {
            console.warn(`No record found for articleID: ${articleID}`);
            recommendCountElement.textContent = '0'; // Default to 0 if no record found
          }
        } catch (error) {
          console.error('Error fetching recommendation count:', error);
          recommendCountElement.textContent = '0'; // Default to 0 on error
        }
      }
    });

    // Function to fetch the current recommendation count from Airtable
    async function fetchRecommendationCount(articleID) {
      const recordURL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
      const filterFormula = `filterByFormula=articleID="${articleID}"`;
      const url = `${recordURL}?${filterFormula}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      });

      if (response.data.records.length > 0) {
        return response.data.records[0];
      } else {
        console.warn(`No matching record found for articleID: ${articleID}`);
        return null; // Return null if no record is found
      }
    }

    // This function is called when the recommendation button is clicked
    function handleRecommend(button) {
      const postCard = button.closest('.post-card');
      const articleID = postCard.dataset.postId;

      if (!articleID) {
        console.error('articleID is missing for this post.');
        return;
      }

      const likedArticles = JSON.parse(localStorage.getItem('likedArticles')) || [];

      if (likedArticles.includes(articleID)) {
        const recommendCountElement = button.querySelector('.recommend-count');
        let recommendCount = parseInt(recommendCountElement.textContent);
        recommendCountElement.textContent = recommendCount;
        return;
      }

      const recommendCountElement = button.querySelector('.recommend-count');
      if (recommendCountElement) {
        let recommendCount = parseInt(recommendCountElement.textContent) + 1;
        recommendCountElement.textContent = recommendCount;

        likedArticles.push(articleID);
        localStorage.setItem('likedArticles', JSON.stringify(likedArticles));

        recommendArticle(articleID, recommendCount);
      } else {
        console.error('Recommend count element not found.');
      }
    }

    // The function to send the recommendation to Airtable
    async function recommendArticle(articleID, recommendCount) {
      const recordURL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
      const filterFormula = `filterByFormula=articleID="${articleID}"`;
      const url = `${recordURL}?${filterFormula}`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          },
        });

        const dateNow = new Date().toISOString().split('T')[0];

        if (response.data.records.length > 0) {
          const recordId = response.data.records[0].id;
          const currentRecommendations = response.data.records[0].fields.Recommendations || 0;

          const updateData = {
            fields: {
              Recommendations: currentRecommendations + 1,
              "Last-Recommended-By": "Un utilisateur unique",
              "Date of Last Recommendation": dateNow,
            },
          };

          console.log("Updating record with data:", updateData);

          await axios.patch(
            `${recordURL}/${recordId}`,
            updateData,
            {
              headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}`,
              },
            }
          );
        } else {
          const postData = {
            fields: {
              articleID: articleID,
              Recommendations: recommendCount,
              "Last-Recommended-By": "Un utilisateur unique",
              "Date of Last Recommendation": dateNow,
            },
          };

          console.log("Creating new record with data:", postData);

          await axios.post(
            recordURL,
            postData,
            {
              headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}`,
              },
            }
          );
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la recommandation:", error.response ? error.response.data : error.message);
        console.log("Full error details:", error);
        if (error.response && error.response.data) {
          console.log("Airtable response data:", error.response.data);
        }
      }
    }
  </script>