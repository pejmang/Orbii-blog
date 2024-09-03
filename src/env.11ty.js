module.exports = class {
    data() {
      return {
        permalink: "js/env.js",
        eleventyExcludeFromCollections: true,
      };
    }
  
    render() {
      return `window.env = {
        AIRTABLE_BASE_ID: "${process.env.AIRTABLE_BASE_ID}",
        AIRTABLE_API_KEY: "${process.env.AIRTABLE_API_KEY}",
        AIRTABLE_TABLE_NAME: "${process.env.AIRTABLE_TABLE_NAME}",
      };`;
    }
  };
  