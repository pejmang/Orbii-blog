const { DateTime } = require("luxon");
require('dotenv').config();

module.exports = function(eleventyConfig) {
  // Expose environment variables as shortcodes
  eleventyConfig.addShortcode("env", function(key) {
    return process.env[key] || '';
  });

  // Filter to convert JavaScript objects to JSON strings
  eleventyConfig.addFilter("jsonify", function(value) {
    return JSON.stringify(value);
  });

  // French Collection
  eleventyConfig.addCollection("fr_posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // English Collection
  eleventyConfig.addCollection("en_posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/en/posts/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Video Collection (French and English)
  eleventyConfig.addCollection("videos", function(collectionApi) {
    return collectionApi.getAll().filter(function(item) {
      return item.data.type === "video";
    });
  });

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/fr/posts/**/*.png");
  eleventyConfig.addPassthroughCopy("src/fr/posts/**/*.gif");
  eleventyConfig.addPassthroughCopy("src/fr/posts/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/en/posts/**/*.png");
  eleventyConfig.addPassthroughCopy("src/en/posts/**/*.gif");
  eleventyConfig.addPassthroughCopy("src/en/posts/**/*.jpg");

  // Passthrough copy for JS and CSS
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/css");

  // Date filter for formatting
  eleventyConfig.addFilter("date", (dateObj, format = "MMMM dd, yyyy") => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format);
  });

  // Ajouter un filtre personnalisé pour l'encodage des URL
  eleventyConfig.addFilter("url_encode", function(value) {
    return encodeURIComponent(value);
  });

  // Configuration générale
  return {
    dir: {
      input: "src",
      output: "docs",
    },
  };
};
