const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // French Collection
  eleventyConfig.addCollection("fr_posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
      return a.date - b.date;
    });
  });

  // English Collection
  eleventyConfig.addCollection("en_posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/en/posts/*.md").sort((a, b) => {
      return a.date - b.date;
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

  // Date filter for formatting
  eleventyConfig.addFilter("date", (dateObj, format = "MMMM dd, yyyy") => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format);
  });

  return {
    dir: {
      input: "src",
      output: "docs",
    },
    // Set default language to French
    // pathPrefix: "/fr/",
  };
};
