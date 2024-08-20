const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/posts/**/*.png");
  eleventyConfig.addPassthroughCopy("src/posts/**/*.gif");
  eleventyConfig.addPassthroughCopy("src/posts/**/*.jpg");
  eleventyConfig.addFilter("dt", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("MMMM dd, yyyy");
  });

  return {
    dir: {
      input: "src",
      output: "docs",
    },
  };
};
