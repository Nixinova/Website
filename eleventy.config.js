const { execSync: exec } = require('child_process');

module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy({"meta": "."});
    eleventyConfig.addWatchTarget("assets");

    eleventyConfig.addCollection("pages", collection => {
        return collection.getFilteredByGlob("pages/**/*");
    });

    return {
        passthroughFileCopy: true,
        dir: {
            includes: "assets/imports",
            layouts: "assets/imports/layouts"
        }
    };

}
