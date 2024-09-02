const { DateTime } = require("luxon");
require('dotenv').config(); // Charger les variables d'environnement

module.exports = function(eleventyConfig) {
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

  // Rendre les variables d'environnement disponibles dans les templates
  eleventyConfig.addGlobalData("env", process.env);

  // Configuration générale
  return {
    dir: {
      input: "src",
      output: "docs",
    },
    // Set default language to French
    // pathPrefix: "/fr/",
  };
};
