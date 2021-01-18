module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addWatchTarget("assets");
    return {
        passthroughFileCopy: true,
        dir: {
            includes: "assets/imports",
            layouts: "assets/imports/layouts"
        }
    };
}
